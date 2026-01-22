<?php

# MANAGEMENT - WEB SETTING API

use Controller\Controller;

class v3 extends Controller
{
	private $request;
	private $users;
	private $maintence;
	private $header;
	
	function __construct()
	{	
		$this->config();
		$this->request = $this->helper('request');
		$this->users = $this->model('db_user_models');

		$this->maintence = $this->model('db_maintenance_models');
		$this->header = $this->model('db_header_models');
	}

	public function set_web_setting()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($access !== 3) $this->printJson($this->invalid(false, 403, "You don't have access!"));
		
		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['title']) || empty($params['title'])) $this->printJson($this->invalid(false, 403, "This title cannot be empty!"));
		if (!isset($params['brand']) || empty($params['brand'])) $this->printJson($this->invalid(false, 403, "This brand cannot be empty!"));
		if (!isset($params['description']) || empty($params['description'])) $this->printJson($this->invalid(false, 403, "This description cannot be empty!"));

		$header = $this->header->get_header_by(['id' => 1], 1);
		if (!$header) $this->printJson($this->invalid(false, 403, "This user not found!"));

		$dataTable = [
			"title" => $this->e($params['title']),
			"brand" => $this->e($params['brand']),
			"description" => $this->e($params['description']),
		];

		// Change icon True or false
		if (isset($params['on-image']) && $params['on-image'] == true) {
			// Filter image icon user
			if (!isset($_FILES['icon']) || empty($_FILES['icon'])) $this->printJson($this->invalid(false, 403, "This icon cannot be empty!"));

			// Valid icon user
			$filterImg = $this->filterImg($_FILES['icon']);
			if ($filterImg['status'] !== true) $this->printJson($this->invalid(false, 403, $filterImg['msg']));

			// Random file name
			$randFilename = $this->randString(50);

			// extract icon file
			$original = [
				'size'		=> trim($_FILES['icon']['size']),
				'tmp'		=> trim($_FILES['icon']['tmp_name']),
				'pixel'		=> @getimagesize($_FILES['icon']['tmp_name']),
				'error'		=> trim($_FILES['icon']['error']),
				'extension'	=> explode(".", trim($_FILES['icon']['name'])),
			];

			// image params
			$img = [
				'filename'	=> $randFilename.".".end($original['extension']),
				'pathOri'	=> "assets/img/brand/",
			];

			// valid extension
			if (end($original['extension']) == 'svg') $this->printJson($this->invalid(false, 403, "The file must be an image!"));

			// valid size
			if ($original['size'] > 6000000) $this->printJson($this->invalid(false, 403, "Max size 6MB!"));

			// valid pixel
			if ($original['pixel'][0] > 5000 && $original['pixel'][1] > 5000) $this->printJson($this->invalid(false, 403, "Upload JPG or PNG image. 5000 x 5000 required!"));

			// // Upload Image
			$upOri = move_uploaded_file($original['tmp'], $img['pathOri'] . $img['filename']);

			// valid upload image
			if (!$upOri) {
				// remove image original
				if (file_exists($img['pathOri'] . $img['filename'])) unlink($img['pathOri'] . $img['filename']);
			}

			// // Remove original icon
			// if (file_exists($img['pathOri'] . $user['img'])) unlink($img['pathOri'] . $user['img']);

			$dataTable['img'] = $img['filename'];
		}

		$edit = $this->header->update_header($dataTable, "id", $header['id']);

		if (!$edit) $this->printJson($this->invalid(false, 403, "Setup web setting failed!"));
		$this->printJson($this->invalid(true, 200, "Setup web setting success."));
	}

	public function set_maintenance()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		$access = $this->users->get_users_by(['username' => $_SESSION['qc_usr'], 'flag' => 1], 1)['role'];
		if ($access !== 3) $this->printJson($this->invalid(false, 403, "You don't have access!"));
		
		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['target'])) $this->printJson($this->invalid(false, 403, "This target cannot be empty!"));

		$edit = $this->maintence->update_maintenance(['flag' => ($this->e($params['target']) ? "1" : "0")], 'id', '1');
		if (!$edit) $this->printJson($this->invalid(false, 403, "Setup maintenance failed!"));
		$this->printJson($this->invalid(true, 200, "Maintenance is change."));
	}
}