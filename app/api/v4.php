<?php

# USER MANAGEMENT

use Controller\Controller;

class v4 extends Controller
{
	private $request;
	private $users;
	
	function __construct()
	{	
		$this->config();
		$this->request = $this->helper('request');
		$this->users = $this->model('db_user_models');
	}

	public function load_all_user()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($this->e($access) !== "3" && $this->e($access) !== "1") $this->printJson($this->invalid());


		$users = $this->users->get_all_users();

		if (!$users) $this->printJson($this->invalid(false, 403, "Data is empty!"));

		$new_users = [];
		foreach ($users as $user) {

			if (isset($user['password'])) unset($user['password']);
			$user['role'] = $this->users->get_role_by(['id' => $user['role']], 1)['name'];
			$user['dept'] = $this->users->get_dept_by(['code' => $user['dept_code']], 1)['name'];
			$user['flag'] = ($this->e($user['flag']) !== "1" ? ($this->e($user['flag']) !== "3" ?  : "Active New User") : "Active");
			$user['register_date'] = date("Y-m-d", $user['register_date']);

			if ($user['username'] !== $_SESSION['qc_usr']) $new_users[] = $user;
		}

		$result = [
			"users" => $new_users,
			"role" => $this->users->get_all_role(),
			"dept" => $this->users->get_dept_by(['flag' => '1'])
		];

		$this->printJson($this->invalid(true, 200, "ok!", $result));
	}

	public function get_user_by()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($this->e($access) !== "3" && $this->e($access) !== "1") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['id']) || empty($params['id'])) $this->printJson($this->invalid(false, 403, "This target cannot be empty!"));

		$user = $this->users->get_users_by(['id' => $this->e($params['id'])], 1);
		if (!$user) $this->printJson($this->invalid(false, 403, "This user not found!"));

		if (isset($user['password'])) unset($user['password']);
		// $user['role'] = $this->users->get_role_by(['id' => $user['role']], 1)['name'];
		// $user['flag'] = ($user['flag'] !== 1 ? "In-active" : "Active");
		// $user['register_date'] = date("Y-m-d", $user['register_date']);
		// $user['img'] = $this->base_url(). "/assets/img/profiles/" .$user['img'];

		unset($user['flag']);
		unset($user['img']);
		unset($user['register_date']);
		unset($user['created_date']);
		unset($user['created_by']);
		unset($user['update_date']);
		unset($user['update_by']);

		$this->printJson($this->invalid(true, 200, "ok!", $user));
	}

	public function new_user()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($this->e($access) !== "3" && $this->e($access) !== "1") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['username']) || empty($params['username'])) $this->printJson($this->invalid(false, 403, "Username cannot be empty!"));
		if (!isset($params['mail']) || empty($params['mail'])) $this->printJson($this->invalid(false, 403, "Email cannot be empty!"));
		if (!isset($params['name']) || empty($params['name'])) $this->printJson($this->invalid(false, 403, "Name cannot be empty!"));
		if (!isset($params['role']) || empty($params['role'])) $this->printJson($this->invalid(false, 403, "Role cannot be empty!"));
		if (!isset($params['station']) || empty($params['station'])) $this->printJson($this->invalid(false, 403, "Station cannot be empty!"));
		if (!isset($params['password']) || empty($params['password'])) $this->printJson($this->invalid(false, 403, "Password cannot be empty!"));
		if (!isset($params['confirm-password']) || empty($params['confirm-password'])) $this->printJson($this->invalid(false, 403, "Confirm password cannot be empty!"));

		$newUser = $this->users->get_users_by(['username' => $this->e($params['username'])], 1);
		if ($newUser) $this->printJson($this->invalid(false, 403, "This username is registered!"));
	
		$email = $this->users->get_users_by(['email' => $this->e($params['mail'])], 1);
		if ($email) $this->printJson($this->invalid(false, 403, "This email is registered!"));

		$role = $this->users->get_role_by(['id' => $this->e($params['role'])], 1);
		if (!$role) $this->printJson($this->invalid(false, 403, "This role is not registered!"));

		$dept = $this->users->get_dept_by(['code' => $this->e($params['dept'])], 1);
		if (!$dept) $this->printJson($this->invalid(false, 403, "This dept is not registered!"));

		if ($this->e($params['password']) !== $this->e($params['confirm-password'])) $this->printJson($this->invalid(false, 403, "Password invalid!"));

		$tables = [
			"flag" => '1',
			"name" => ucwords(strtolower($this->e($params['name']))),
			"username" => $this->e($params['username']),
			"email" => $this->e($params['mail']),
			"password" => password_hash($this->e($params['password']), PASSWORD_DEFAULT),
			"img" => "default.jpg",
			"dept_code" => $this->e($params['dept']),
			"role" => $this->e($params['role']),
			"station" => $this->e($params['station']),
			"register_date" => time(),
			"created_date" => time(),
			"created_by" => $_SESSION['qc_usr'],
		];

		$insert = $this->users->insert_user($tables);
		if (!$insert) $this->printJson($this->invalid(false, 403, "Add new user failed!"));
		$this->printJson($this->invalid(true, 200, "Add new user success!"));
	}

	public function edit_user()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($this->e($access) !== "3" && $this->e($access) !== "1") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "target cannot be empty!"));
		if (!isset($params['username']) || empty($params['username'])) $this->printJson($this->invalid(false, 403, "Username cannot be empty!"));
		if (!isset($params['mail']) || empty($params['mail'])) $this->printJson($this->invalid(false, 403, "Email cannot be empty!"));
		if (!isset($params['name']) || empty($params['name'])) $this->printJson($this->invalid(false, 403, "Name cannot be empty!"));
		if (!isset($params['role']) || empty($params['role'])) $this->printJson($this->invalid(false, 403, "Role cannot be empty!"));
		if (!isset($params['station']) || empty($params['station'])) $this->printJson($this->invalid(false, 403, "Station cannot be empty!"));
		if (!isset($params['new-password'])) $this->printJson($this->invalid(false, 403, "Password cannot be empty!"));

		if ($this->e($params['new-password'])) {
			if (!isset($params['password']) || empty($params['password'])) $this->printJson($this->invalid(false, 403, "Password cannot be empty!"));
			if (!isset($params['confirm-password']) || empty($params['confirm-password'])) $this->printJson($this->invalid(false, 403, "Confirm password cannot be empty!"));
		}

		$user = $this->users->get_users_by(['id' => $this->e($params['target'])], 1);
		if (!$user) $this->printJson($this->invalid(false, 403, "This user is not registered!"));

		$newUser = $this->users->get_users_by(['username' => $this->e($params['username'])], 1);
		if ($newUser && $user['id'] !== $newUser['id']) $this->printJson($this->invalid(false, 403, "This username is registered!"));
	
		$email = $this->users->get_users_by(['email' => $this->e($params['mail'])], 1);
		if ($email && $user['id'] !== $email['id']) $this->printJson($this->invalid(false, 403, "This email is registered!"));

		$role = $this->users->get_role_by(['id' => $this->e($params['role'])], 1);
		if (!$role) $this->printJson($this->invalid(false, 403, "This role is not registered!"));

		$dept = $this->users->get_dept_by(['code' => $this->e($params['dept'])], 1);
		if (!$dept) $this->printJson($this->invalid(false, 403, "This dept is not registered!"));

		if ($this->e($params['new-password'])) {
			if ($this->e($params['password']) !== $this->e($params['confirm-password'])) $this->printJson($this->invalid(false, 403, "Password invalid!"));
		}

		$tables = [
			"name" => ucwords(strtolower($this->e($params['name']))),
			"username" => $this->e($params['username']),
			"email" => $this->e($params['mail']),
			"dept_code" => $this->e($params['dept']),
			"role" => $this->e($params['role']),
			"station" => $this->e($params['station']),
			"update_date" => time(),
			"update_by" => $_SESSION['qc_usr'],
		];

		if ($this->e($params['new-password'])) {
			$tables['flag'] = '1';
			$tables['password'] = password_hash($this->e($params['password']), PASSWORD_DEFAULT);
		}

		$insert = $this->users->edit_user($tables, 'id', $user['id']);
		if (!$insert) $this->printJson($this->invalid(false, 403, "Edit user failed!"));
		$this->printJson($this->invalid(true, 200, "Edit user success!"));
	}

	public function disable_user()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($this->e($access) !== "3" && $this->e($access) !== "1") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "This target cannot be empty!"));
		$data = @json_decode($params['target'], true);
		if (!$data) $this->printJson($this->invalid(false, 403, "This data cannot be empty!"));

		foreach ($data as $uid) {

			$tables = [
				"flag" => '0',
				"update_date" => time(),
				"update_by" => $_SESSION['qc_usr'],
			];

			$insert = $this->users->edit_user($tables, 'id', $uid);
			if (!$insert) $this->printJson($this->invalid(false, 403, "Disable user failed!"));
		}
		$this->printJson($this->invalid(true, 200, "Disable user success!"));
	}

	public function enable_user()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($this->e($access) !== "3" && $this->e($access) !== "1") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "This target cannot be empty!"));
		$data = @json_decode($params['target'], true);
		if (!$data) $this->printJson($this->invalid(false, 403, "This data cannot be empty!"));

		foreach ($data as $uid) {

			$tables = [
				"flag" => '1',
				"update_date" => time(),
				"update_by" => $_SESSION['qc_usr'],
			];

			$insert = $this->users->edit_user($tables, 'id', $uid);
			if (!$insert) $this->printJson($this->invalid(false, 403, "Enable user failed!"));
		}
		$this->printJson($this->invalid(true, 200, "Enable user success!"));
	}

	public function new_user_passwd()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 3], 1);
		if (!$access) $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		if (!isset($params['username']) || empty($params['username'])) $this->printJson($this->invalid(false, 403, "User not found!"));
		if (!isset($params['password']) || empty($params['password'])) $this->printJson($this->invalid(false, 403, "Password cannot be empty!"));
		if (!isset($params['confirm-password']) || empty($params['confirm-password'])) $this->printJson($this->invalid(false, 403, "Confirm password cannot be empty!"));

		$newUser = $this->users->get_users_by(['username' => $this->e($params['username']), 'flag' => 3], 1);
		if (!$newUser) $this->printJson($this->invalid(false, 403, "This username is not registered!"));
	
		if ($this->e($params['password']) !== $this->e($params['confirm-password'])) $this->printJson($this->invalid(false, 403, "Password invalid!"));

		$tables = [
			"flag" => '1',
			"password" => password_hash($this->e($params['password']), PASSWORD_DEFAULT),
			"update_date" => time(),
			"update_by" => $_SESSION['qc_usr'],
		];

		$insert = $this->users->edit_user($tables, 'id', $access['id']);
		if (!$insert) $this->printJson($this->invalid(false, 403, "Change password failed!"));
		$this->printJson($this->invalid(true, 200, "Change password success!"));
	}
}