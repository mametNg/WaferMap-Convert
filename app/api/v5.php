<?php

/**
 * USER ACCESS MENU MANAGEMENT
 */

use Controller\Controller;

class v5 extends Controller
{
	private $request;
	private $users;
	private $menu;
	
	function __construct()
	{
		$this->config();
		$this->request = $this->helper('request');
		$this->users = $this->model('db_user_models');
		$this->menu = $this->model('db_menu_management_models');
	}

	public function get_all_user_access_menu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3" && $access !== "1") $this->printJson($this->invalid());

		$users = $this->users->get_all_users();

		if (!$users) $this->printJson($this->invalid(false, 403, "Data is empty!"));

		$new_users = [];
		foreach ($users as $user) {

			if (isset($user['password'])) unset($user['password']);
			$user['role'] = $this->users->get_role_by(['id' => $user['role']], 1)['name'];
			$user['dept'] = $this->users->get_dept_by(['code' => $user['dept_code']], 1)['name'];

			unset($user['id']);
			unset($user['flag']);
			unset($user['email']);
			unset($user['password']);
			unset($user['dept_code']);
			unset($user['register_date']);
			unset($user['created_date']);
			unset($user['created_by']);
			unset($user['update_date']);
			unset($user['update_by']);

			$new_users[] = $user;

			// if ($user['username'] !== $_SESSION['qc_usr']) $new_users[] = $user;
		}

		$this->printJson($this->invalid(true, 200, "ok!", $new_users));
	}

	public function get_user_access_menu_by()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3" && $access !== "1") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['id']) || empty($params['id'])) $this->printJson($this->invalid(false, 403, "Target cannot be empty!"));

		$gets = $this->menu->get_user_menu_registration($this->e($params['id']));
		$gets = $this->array_group($gets, 'menu');

		$menus = [];

		$x = 0;
		foreach ($gets as $key => $get) {
			for ($i=0; $i < count($get); $i++) { 
				$menus[$x] = [
					"menu_id" => $get[$i]['menu_id'],
					"name" => $get[$i]['menu'],
					"path" => $get[$i]['menu_path'],
					"registered" => $get[$i]['menu_registered'],
					"flag" => $get[$i]['flag_menu'],
					"is_submenu" => $get[$i]['is_submenu'],
					"submenu" => [],
				];

				for ($z=0; $z < count($get); $z++) { 
					if ($get[$i]['is_submenu']) {
						$menus[$x]['submenu'][$z]['submenu_id'] = $get[$z]['submenu_id'];
						$menus[$x]['submenu'][$z]['name'] = $get[$z]['submenu'];
						$menus[$x]['submenu'][$z]['path'] = $get[$z]['submenu_path'];
						$menus[$x]['submenu'][$z]['registered'] = $get[$z]['submenu_registered'];
						$menus[$x]['submenu'][$z]['flag'] = $get[$z]['flag_submenu'];
					}
				}
			}
			$x++;
		}

		$this->printJson($this->invalid(true, 200, "ok!", $menus));
	}

	public function setup_user_access_menu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3" && $access !== "1") $this->printJson($this->invalid());

		$params = $_POST;

		if (!isset($params['data']) || empty($params['data'])) $this->printJson($this->invalid(false, 403, "Error parameter!"));
		$data = @json_decode($params['data'], true);
		if (!isset($data['data'])) $this->printJson($this->invalid(false, 403, "This data cannot be empty!"));
		if (!isset($data['target'])) $this->printJson($this->invalid(false, 403, "This data cannot be empty!"));

		$user = $this->users->get_users_by(['username' => $this->e($data['target'])], 1);
		if (!$user) $this->printJson($this->invalid(false, 403, "This user not found!"));

		foreach ($data['data'] as $menu) {

			if ($menu['is-submenu'] == "0") {
				$rows = [
					"uid" => $this->e($data['target']),
					"menu" => $this->e($menu['menu']),
					"submenu" => '0',
				];
				
				$check = $this->menu->get_acc_menu_by($rows, 1);
				$rows['flag'] = ($menu['data'] ? "1" : "0");

				if ($check) {
					$edit = $this->menu->edit_acc_menu($rows, 'id', $check['id']);
					if (!$edit) $this->printJson($this->invalid(false, 403, "Setup failed!"));
				}

				if (!$check) {
					// insert
					$insert = $this->menu->insert_acc_menu($rows);
					if (!$insert) $this->printJson($this->invalid(false, 403, "Setup failed!"));
				}
			}

			if ($menu['is-submenu'] == "1" && count($menu['submenu']) >= 1) {
				for ($x=0; $x < count($menu['submenu']); $x++) {
					$rows = [
						"uid" => $this->e($data['target']),
						"menu" => $this->e($menu['menu']),
						"submenu" => $this->e($menu['submenu'][$x]['submenu']),
					];

					$check = $this->menu->get_acc_menu_by($rows, 1);
					$rows['flag'] = "0";
					if ($menu['data']) $rows['flag'] = ($menu['submenu'][$x]['data'] ? "1" : "0");

					if ($check) {
					// edit
						$edit = $this->menu->edit_acc_menu($rows, 'id', $check['id']);
						if (!$edit) $this->printJson($this->invalid(false, 403, "Setup failed!"));
					}

					if (!$check) {
						// insert
						$insert = $this->menu->insert_acc_menu($rows);
						if (!$insert) $this->printJson($this->invalid(false, 403, "Setup failed!"));
					}
				}
			}
		}

		$this->printJson($this->invalid(true, 200, "Setup success!"));
	}
}