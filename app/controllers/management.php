<?php

/**
* 
*/
use Controller\Controller;

class management extends Controller
{	
	public $user_models;
	public $menu_models;
	public $maintence;
	public $header;
	
	function __construct()
	{
		$this->config();
		$this->user_models = $this->model('db_user_models');
		$this->menu_models = $this->model('db_menu_management_models');
		$this->maintence = $this->model('db_maintenance_models');
		$this->header = $this->model('db_header_models');
	}

	public function index()
	{	
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) {
			header("Location:".$this->base_url('auth/login'));
			exit();
		}

		$urls = $this->get_url();
		$user = $this->user_models->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1);

		$mt = $this->maintence->get_maintenance_status();
		$header = $this->header->get_header_by(['id' => 1], 1);

		## data form file
		$data = [
			'header' => [
				'title' => $this->e($header['title']),
				'title_sec' => $this->e($header['title']),
				'img' => $this->base_url('assets/img/brand/'.$this->e($header['img'])),
				'desc' => $this->e($header['description']),
				'brand' => $this->e($header['brand']),
			],
			'user' => $user,
			'user-menu' => $this->menu_models->user_menu(),
			'on-menu' => [
				'menu-name' => false,
				'submenu-name' => false,
				'menu' => (isset($urls[0]) ? $urls[0] : false),
				'submenu' => (isset($urls[1]) ? $urls[1] : false),
				'filename' => "errors/404_1",
			],
			'maintenance' => $mt['flag'],
		];
		$data['user']['role'] = $this->user_models->get_role_by(['id' => $data['user']['role']], 1)['name'];
		$data['user']['dept'] = $this->user_models->get_dept_by(['code' => $data['user']['dept_code']], 1)['name'];

		// Find filename
		foreach ($data['user-menu'] as $menu) {
			if ($menu['path'] == $data['on-menu']['menu']) {

				$data['header']['title'] = $menu['name'];
				$data['on-menu']['filename'] = $menu['filename'];
				$data['on-menu']['menu-name'] = $menu['name'];

				if ($menu['is_submenu'] == "1") {
					foreach ($menu['submenu'] as $submenu) {
						if ($submenu['path'] == $data['on-menu']['submenu']) {
							$data['header']['title'] = $menu['name']." || ".$submenu['name'];
							$data['on-menu']['filename'] = $submenu['filename'];
							$data['on-menu']['submenu-name'] = $submenu['name'];
							break;
						}
					}
				}
				break;
			}
		}

		if ($mt['flag'] && $data['user']['role'] !== "Development") $data['on-menu']['filename'] = "addons/maintenance";

		$files = [
			"templates/dashboard/header",
			"templates/dashboard/topbar",
			"templates/dashboard/sidebar",
			$data['on-menu']['filename'],
			"templates/dashboard/footer",
		];

		$this->views($files, $data);
	}
}