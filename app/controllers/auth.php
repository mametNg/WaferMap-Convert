<?php

/**
* 
*/
use Controller\Controller;

class auth extends Controller
{
	
	private $header;

	function __construct()
	{
		$this->config();
		$this->header = $this->model('db_header_models');	
	}

	public function index()
	{
		$this->printJson($this->invalid());
	}


	public function api($apis=false, $method=false)
	{
		$option = [];
		$myArrays = $this->get_url();
		$start = 0;
		$i = 0;

		foreach ($myArrays as $key => $param) {
			if ($start) {
				$option[$i] = $param;
				$i++;
			}	
			if ($method == $param) $start = 1;
		}

		if (!file_exists('app/api/'.$this->e($apis).'.php')) $this->printJson($this->invalid());

		$api = $this->authApi($this->e($apis));
		$method = str_replace("-", "_", $method);
		
		if (in_array($this->e($method), get_class_methods($api)) == false) $this->printJson($this->invalid());

		$api->$method($option);
	}

	public function login()
	{
		if (isset($_SESSION['qc_usr']) && !empty($_SESSION['qc_usr'])) {
			header("Location:".$this->base_url());
			exit();
		}

		$header = $this->header->get_header_by(['id' => 1], 1);

		$data = [
			'header' => [
				'title' => 'Login || '.$this->e($header['title']),
				'img' => $this->base_url('assets/img/brand/'.$this->e($header['img'])),
				'brand' => $this->e($header['brand']),
				'desc' => $this->e($header['description']),
			],
		];

		$files = [
			"templates/login/header",
			"login/login",
			"templates/login/footer",
		];

		$this->views($files, $data);
	}

	public function logout()
	{
		if (isset($_SESSION['qc_usr'])) unset($_SESSION['qc_usr']);
		header("Location:".$this->base_url('auth/login'));
		exit();
	}
}