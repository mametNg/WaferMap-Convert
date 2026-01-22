<?php

// LOGIN API

use Controller\Controller;

class v1 extends Controller
{
	private $request;
	private $users;
	private $hs_login;

	function __construct()
	{	
		$this->config();
		$this->request = $this->helper('request');
		$this->users = $this->model('db_user_models');
		$this->hs_login = $this->model('db_history_login_models');
	}

	public function login()
	{
		if (isset($_SESSION['qc_usr']) && !empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter username
		if (!isset($params['username']) || empty($params['username'])) $this->printJson($this->invalid(false, 403, "This username cannot be empty!"));

		// Filter Password
		if (!isset($params['password']) || empty($params['password'])) $this->printJson($this->invalid(false, 403, "This password cannot be empty!"));

		// User Flag
		// 0. Non-Active (Delete)
		// 1. Active
		// 2. Log (Cancel)
		// 3. New User

		$rowsI = [
			'flag'			=> '1',
			'username'		=> $this->e($params['username'])
		];

		$history = [
			"username"		=> $this->e($params['username']),
			"status"		=> "2", // not registered
			"ip_address"	=> $this->ip,
			"device"		=> $this->ua,
			"created"		=> time(),
		];

		$getuser = $this->users->get_users_by($rowsI, 1);
		if (!$getuser ) {
			$this->hs_login->insert_login($history);
			$this->printJson($this->invalid(false, 403, "This username isn't registered!"));
		}

		$ldap = ldap_connect("id.utacgroup.com");
		ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
		$bind = @ldap_bind($ldap, $getuser['email'], $params['password']);

		if (!$bind) {
			$history['status'] = 0; // wrong password
			$this->hs_login->insert_login($history);
			$this->printJson($this->invalid(false, 403, "Wrong password!"));
		}

		if ($getuser['flag'] !== 1) {
			$history['status'] = 3; // Suspend account
			$this->hs_login->insert_login($history);
			$this->printJson($this->invalid(false, 403, "This user suspened!"));
		}

		$_SESSION['qc_usr'] = $this->e($params['username']);

		$history['status'] = 1; // Login succes
		$this->hs_login->insert_login($history);
		$this->printJson($this->invalid(true, 200, "Login success!"));
	}
}