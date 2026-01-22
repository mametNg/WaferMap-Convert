<?php

# PROFILE API

use Controller\Controller;

class v2 extends Controller
{
	private $request;
	private $users;
	
	function __construct()
	{	
		$this->config();
		$this->request = $this->helper('request');
		$this->users = $this->model('db_user_models');
	}

	public function change_profile()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();

		// Filter name
		if (!isset($params['name']) || empty($params['name'])) $this->printJson($this->invalid(false, 403, "This name cannot be empty!"));

		$userGet = $this->users->get_users_by(['username' => $_SESSION['qc_usr']], 1);
		if (!$userGet) $this->printJson($this->invalid(false, 403, "This user not found!"));

		$dataTable = [
			"name" => $this->e(ucwords(strtolower($params['name']))),
		];

		// Password filtering
		if (isset($params['on-password']) && !empty($params['on-password'])) {
			// Filter old password
			if (!isset($params['old-password']) || empty($params['old-password'])) $this->printJson($this->invalid(false, 403, "This old password cannot be empty!"));

			// Filter new passowrd
			if (!isset($params['new-password']) || empty($params['new-password'])) $this->printJson($this->invalid(false, 403, "This new password cannot be empty!"));

			// Filter confirm new passowrd
			if (!isset($params['confirm-new-password']) || empty($params['confirm-new-password'])) $this->printJson($this->invalid(false, 403, "This confirm new password cannot be empty!"));

			// Valid password
			if (!password_verify($this->e($params['old-password']), $userGet['password'])) $this->printJson($this->invalid(false, 403, "Wrong Password!"));

			// sync pass
			if ($this->e($params['new-password']) !== $this->e($params['confirm-new-password'])) $this->printJson($this->invalid(false, 403, "New password isn't sync!"));

			// sync pass
			if ($this->e($params['new-password']) == $this->e($params['old-password'])) $this->printJson($this->invalid(false, 403, "You have used this password!"));
			
			$dataTable['password'] = password_hash($this->e($params['new-password']), PASSWORD_DEFAULT);
		}

		// Change avatar True or false
		if (isset($params['on-image']) && $params['on-image'] == true) {
			// Filter image original avatar user
			if (!isset($_FILES['original-avatar']) || empty($_FILES['original-avatar'])) $this->printJson($this->invalid(false, 403, "This original avatar cannot be empty!"));

			// Filter image avatar user
			if (!isset($_FILES['avatar']) || empty($_FILES['avatar'])) $this->printJson($this->invalid(false, 403, "This avatar cannot be empty!"));

			// Valid original avatar user
			$filterImg = $this->filterImg($_FILES['original-avatar']);
			if ($filterImg['status'] !== true) $this->printJson($this->invalid(false, 403, $filterImg['msg']));

			// Valid avatar user
			$filterImg = $this->filterImg($_FILES['avatar']);
			if ($filterImg['status'] !== true) $this->printJson($this->invalid(false, 403, $filterImg['msg']));

			// Random file name
			$randFilename = $this->randString(50);

			// extract avatar file
			$thumbnail = [
				'size'		=> trim($_FILES['avatar']['size']),
				'tmp'		=> trim($_FILES['avatar']['tmp_name']),
				'pixel'		=> @getimagesize($_FILES['avatar']['tmp_name']),
				'error'		=> trim($_FILES['avatar']['error']),
				'extension'	=> explode(".", trim($_FILES['avatar']['name'])),
			];

			// extract original avatar file
			$original = [
				'size'		=> trim($_FILES['original-avatar']['size']),
				'tmp'		=> trim($_FILES['original-avatar']['tmp_name']),
				'pixel'		=> @getimagesize($_FILES['original-avatar']['tmp_name']),
				'error'		=> trim($_FILES['original-avatar']['error']),
				'extension'	=> explode(".", trim($_FILES['original-avatar']['name'])),
			];

			// image params
			$img = [
				'filename'	=> $randFilename.".".end($original['extension']),
				'pathThumb'	=> "assets/img/profiles/",
				'pathOri'	=> "assets/img/profiles/original/",
			];

			// valid extension
			if (end($thumbnail['extension']) == 'svg' || end($original['extension']) == 'svg') $this->printJson($this->invalid(false, 403, "The file must be an image!"));

			// valid size
			if ($thumbnail['size'] > 6000000 || $original['size'] > 6000000) $this->printJson($this->invalid(false, 403, "Max size 6MB!"));

			// valid pixel
			if ($thumbnail['pixel'][0] > 5000 && $thumbnail['pixel'][1] > 5000 || $original['pixel'][0] > 5000 && $original['pixel'][1] > 5000) $this->printJson($this->invalid(false, 403, "Upload JPG or PNG image. 5000 x 5000 required!"));

			// Upload Image
			$upThumb = move_uploaded_file($thumbnail['tmp'], $img['pathThumb'] . $img['filename']);
			$upOri = move_uploaded_file($original['tmp'], $img['pathOri'] . $img['filename']);

			// valid upload image
			if (!$upThumb || !$upOri) {
				// remove thumbnail
				if (file_exists($img['pathThumb'] . $img['filename'])) unlink($img['pathThumb'] . $img['filename']);
				// remove image original
				if (file_exists($img['pathOri'] . $img['filename'])) unlink($img['pathOri'] . $img['filename']);
			}

			// Remove thumbnail avatar
			if (file_exists($img['pathThumb'] . $userGet['img'])) unlink($img['pathThumb'] . $userGet['img']);
			// Remove original avatar
			if (file_exists($img['pathOri'] . $userGet['img'])) unlink($img['pathOri'] . $userGet['img']);

			$dataTable['img'] = $img['filename'];
		}

		$edit = $this->users->edit_user($dataTable, "id", $userGet['id']);

		if (!$edit) $this->printJson($this->invalid(false, 403, "Edit profile failed!"));
		$this->printJson($this->invalid(true, 200, "Edit profile success."));
	}
}