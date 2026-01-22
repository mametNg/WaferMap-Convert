<?php

/**
 * MENU MANAGEMENT
 */

use Controller\Controller;

class v6 extends Controller
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

	public function get_all_data()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		$menus = $this->menu->get_all_menu();
		if (!$menus) $this->printJson($this->invalid(false, 403, "Data is empty!"));

		for ($i=0; $i < count($menus); $i++) { 
			$menus[$i]['submenu'] = [];

			if ($menus[$i]['is_submenu']) {
				$menus[$i]['submenu'] = $this->menu->get_submenu_by(['menu' => $menus[$i]['id']]);

				if ($menus[$i]['submenu']) {
					for ($x=0; $x < count($menus[$i]['submenu']); $x++) { 
						$menus[$i]['submenu'][$x]['menu'] = $menus[$i]['name'];
						$menus[$i]['submenu'][$x]['flag'] = ($menus[$i]['submenu'][$x]['flag'] == 1 ? "Active" : "Non-Active");
					}
				}
			}

			$menus[$i]['flag'] = ($menus[$i]['flag'] == 1 ? "Active" : "Non-Active");
			$menus[$i]['is_submenu'] = ($menus[$i]['is_submenu'] == 1 ? "Active" : "Non-Active");
		}

		$this->printJson($this->invalid(true, 200, "ok!", $menus));
	}

	public function get_menu_by()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['id']) || empty($params['id'])) $this->printJson($this->invalid(false, 403, "Target cannot be empty!"));

		$getMenu = $this->menu->get_menu_by(["id" => $this->e($params['id'])], 1);
		if (!$getMenu) $this->printJson($this->invalid(false, 403, "This menu not found!"));

		$getMenu['flag'] = ($getMenu['flag'] == 1 ? "Active" : "Non-Active");
		$getMenu['is_submenu'] = ($getMenu['is_submenu'] == 1 ? "Active" : "Non-Active");

		$this->printJson($this->invalid(true, 200, "ok.", $getMenu));
	}

	public function new_menu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['name']) || empty($params['name'])) $this->printJson($this->invalid(false, 403, "This name cannot be empty!"));
		if (!isset($params['icon']) || empty($params['icon'])) $this->printJson($this->invalid(false, 403, "This icon cannot be empty!"));
		if (!isset($params['path']) || empty($params['path'])) $this->printJson($this->invalid(false, 403, "This path cannot be empty!"));
		if (!isset($params['filename']) || empty($params['filename'])) $this->printJson($this->invalid(false, 403, "This filename cannot be empty!"));
		if (!isset($params['submenu']) || empty($params['submenu'])) $this->printJson($this->invalid(false, 403, "This submenu cannot be empty!"));
		if (!isset($params['order']) || empty($params['order'])) $this->printJson($this->invalid(false, 403, "This order cannot be empty!"));
		if (!isset($params['flag']) || empty($params['flag'])) $this->printJson($this->invalid(false, 403, "This flag cannot be empty!"));

		$params['submenu'] = ($this->e($params['submenu']) == "Active" ? 1 : 0);
		$params['flag'] = ($this->e($params['flag']) == "Active" ? 1 : 0);

		$getMenu = $this->menu->get_menu_by(["name" => $this->e($params['name'])], 1);
		if ($getMenu) $this->printJson($this->invalid(false, 403, "This menu name already exist!"));

		$tables = [
			"flag" => $this->e($params['flag']),
			"name" => $this->e($params['name']),
			"icon" => $this->e($params['icon']),
			"path" => $this->e($params['path']),
			"filename" => $this->e($params['filename']),
			"is_submenu" => $this->e($params['submenu']),
			"order_no" => $this->e($params['order']),
		];

		$insert = $this->menu->insert_menu($tables);
		if (!$insert) $this->printJson($this->invalid(false, 403, "Add new menu failed!"));
		$this->printJson($this->invalid(true, 200, "Add new menu success."));
	}

	public function edit_menu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "Target cannot be empty!"));
		if (!isset($params['name']) || empty($params['name'])) $this->printJson($this->invalid(false, 403, "This name cannot be empty!"));
		if (!isset($params['icon']) || empty($params['icon'])) $this->printJson($this->invalid(false, 403, "This icon cannot be empty!"));
		if (!isset($params['path']) || empty($params['path'])) $this->printJson($this->invalid(false, 403, "This path cannot be empty!"));
		if (!isset($params['filename']) || empty($params['filename'])) $this->printJson($this->invalid(false, 403, "This filename cannot be empty!"));
		if (!isset($params['submenu']) || empty($params['submenu'])) $this->printJson($this->invalid(false, 403, "This submenu cannot be empty!"));
		if (!isset($params['order']) || empty($params['order'])) $this->printJson($this->invalid(false, 403, "This order cannot be empty!"));
		if (!isset($params['flag']) || empty($params['flag'])) $this->printJson($this->invalid(false, 403, "This flag cannot be empty!"));

		$params['submenu'] = ($this->e($params['submenu']) == "Active" ? 1 : 0);
		$params['flag'] = ($this->e($params['flag']) == "Active" ? 1 : 0);

		$getMenu = $this->menu->get_menu_by(["name" => $this->e($params['name'])], 1);
		if ($getMenu && intval($getMenu['id']) !== intval($this->e($params['target']))) $this->printJson($this->invalid(false, 403, "This menu name already exist!"));

		$tables = [
			"flag" => $this->e($params['flag']),
			"name" => $this->e($params['name']),
			"icon" => $this->e($params['icon']),
			"path" => $this->e($params['path']),
			"filename" => $this->e($params['filename']),
			"is_submenu" => $this->e($params['submenu']),
			"order_no" => $this->e($params['order']),
		];

		$execute = $this->menu->edit_menu($tables, 'id', intval($this->e($params['target'])));
		if (!$execute) $this->printJson($this->invalid(false, 403, "Edit menu failed!"));
		$this->printJson($this->invalid(true, 200, "Edit menu success!"));
	}

	public function delete_menu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "This target cannot be empty!"));
		$data = @json_decode($params['target'], true);
		if (!$data) $this->printJson($this->invalid(false, 403, "This data cannot be empty!"));

		$this->printJson($this->invalid(false, 403, "This feature is disabled!"));
	}

	public function new_submenu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['menu']) || empty($params['menu'])) $this->printJson($this->invalid(false, 403, "This menu cannot be empty!"));
		if (!isset($params['name']) || empty($params['name'])) $this->printJson($this->invalid(false, 403, "This name cannot be empty!"));
		if (!isset($params['path']) || empty($params['path'])) $this->printJson($this->invalid(false, 403, "This path cannot be empty!"));
		if (!isset($params['filename']) || empty($params['filename'])) $this->printJson($this->invalid(false, 403, "This filename cannot be empty!"));
		if (!isset($params['order']) || empty($params['order'])) $this->printJson($this->invalid(false, 403, "This order cannot be empty!"));
		if (!isset($params['flag']) || empty($params['flag'])) $this->printJson($this->invalid(false, 403, "This flag cannot be empty!"));

		$params['flag'] = ($this->e($params['flag']) == "Active" ? 1 : 0);

		$getMenu = $this->menu->get_submenu_by(["menu" => $this->e($params['menu']), "name" => $this->e($params['name'])], 1);
		if ($getMenu) $this->printJson($this->invalid(false, 403, "This submenu name already exist!"));

		$tables = [
			"flag" => $this->e($params['flag']),
			"menu" => $this->e($params['menu']),
			"name" => $this->e($params['name']),
			"path" => $this->e($params['path']),
			"filename" => $this->e($params['filename']),
			"order_no" => $this->e($params['order']),
		];

		$insert = $this->menu->insert_submenu($tables);
		if (!$insert) $this->printJson($this->invalid(false, 403, "Add new submenu failed!"));
		$this->printJson($this->invalid(true, 200, "Add new submenu success."));
	}

	public function get_submenu_by()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['id']) || empty($params['id'])) $this->printJson($this->invalid(false, 403, "Target cannot be empty!"));

		$getSubmenu = $this->menu->get_submenu_by(["id" => $this->e($params['id'])], 1);
		if (!$getSubmenu) $this->printJson($this->invalid(false, 403, "This submenu not found!"));

		$getSubmenu['flag'] = ($getSubmenu['flag'] == 1 ? "Active" : "Non-Active");

		$this->printJson($this->invalid(true, 200, "ok.", $getSubmenu));
	}

	public function edit_submenu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "Target cannot be empty!"));
		if (!isset($params['menu']) || empty($params['menu'])) $this->printJson($this->invalid(false, 403, "This menu cannot be empty!"));
		if (!isset($params['name']) || empty($params['name'])) $this->printJson($this->invalid(false, 403, "This name cannot be empty!"));
		if (!isset($params['path']) || empty($params['path'])) $this->printJson($this->invalid(false, 403, "This path cannot be empty!"));
		if (!isset($params['filename']) || empty($params['filename'])) $this->printJson($this->invalid(false, 403, "This filename cannot be empty!"));
		if (!isset($params['order']) || empty($params['order'])) $this->printJson($this->invalid(false, 403, "This order cannot be empty!"));
		if (!isset($params['flag']) || empty($params['flag'])) $this->printJson($this->invalid(false, 403, "This flag cannot be empty!"));

		$params['flag'] = ($this->e($params['flag']) == "Active" ? 1 : 0);

		$getMenu = $this->menu->get_submenu_by(["menu" => $this->e($params['menu']), "name" => $this->e($params['name'])], 1);
		if ($getMenu && intval($getMenu['id']) !== intval($this->e($params['target']))) $this->printJson($this->invalid(false, 403, "This menu name already exist!"));


		$tables = [
			"flag" => $this->e($params['flag']),
			"menu" => $this->e($params['menu']),
			"name" => $this->e($params['name']),
			"path" => $this->e($params['path']),
			"filename" => $this->e($params['filename']),
			"order_no" => $this->e($params['order']),
		];

		$execute = $this->menu->edit_submenu($tables, 'id', intval($this->e($params['target'])));
		if (!$execute) $this->printJson($this->invalid(false, 403, "Edit submenu failed!"));
		$this->printJson($this->invalid(true, 200, "Edit submenu success!"));
	}

	public function delete_submenu()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->e($this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role']);
		if ($access !== "3") $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "This target cannot be empty!"));
		$data = @json_decode($params['target'], true);
		if (!$data) $this->printJson($this->invalid(false, 403, "This data cannot be empty!"));

		$this->printJson($this->invalid(false, 403, "This feature is disabled!"));
	}
}