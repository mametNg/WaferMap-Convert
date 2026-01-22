<?php

/**
 * INSPECTION - OUTGOING
 */

use Controller\Controller;

class v7 extends Controller
{
	private $request;
	private $users;
	private $inspect;
	
	function __construct()
	{
		$this->config();
		$this->request = $this->helper('request');
		$this->users = $this->model('db_user_models');
		$this->inspect = $this->model('db_inspect_models');
	}

	public function load_inspect()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		$load = $this->inspect->get_inspect_by(['flag' => 1]);
		if (!$load) $this->printJson($this->invalid(false, 403, "Data is empty!"));

		for ($i=0; $i < count($load); $i++) { 
			unset($load[$i]['flag']);
			unset($load[$i]['created_date']);
			unset($load[$i]['created_by']);
			unset($load[$i]['updated_date']);
			unset($load[$i]['updated_by']);
		}

		$this->printJson($this->invalid(true, 200, "ok.", $load));
	}

	public function get_inspect()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		$params = $this->request->get();
		if (!isset($params['id']) || empty($params['id'])) $this->printJson($this->invalid(false, 403, "This inspect date cannot be empty!"));

		$get = $this->inspect->get_inspect_by(['id' => $this->e($params['id']), 'flag' => 1], 1);
		if (!$get) $this->printJson($this->invalid(false, 403, "This data not found!"));

		unset($get['id']);
		unset($get['flag']);
		unset($get['created_date']);
		unset($get['created_by']);
		unset($get['updated_date']);
		unset($get['updated_by']);

		$this->printJson($this->invalid(true, 200, "ok!", $get));
	}

	public function new_inspect()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		$params = $this->request->get();
		if (!isset($params['inspectDate']) || empty($params['inspectDate'])) $this->printJson($this->invalid(false, 403, "This inspect date cannot be empty!"));
		if (!isset($params['inspectOuter']) || empty($params['inspectOuter'])) $this->printJson($this->invalid(false, 403, "This inspect outer cannot be empty!"));
		if (!isset($params['inspectLot']) || empty($params['inspectLot'])) $this->printJson($this->invalid(false, 403, "This inspect lot cannot be empty!"));
		if (!isset($params['inspectCartonCondition']) || empty($params['inspectCartonCondition'])) $this->printJson($this->invalid(false, 403, "This inspect carton condition cannot be empty!"));
		if (!isset($params['inspectLabelPosition']) || empty($params['inspectLabelPosition'])) $this->printJson($this->invalid(false, 403, "This inspect label position cannot be empty!"));
		if (!isset($params['inspectPrintingCondition']) || empty($params['inspectPrintingCondition'])) $this->printJson($this->invalid(false, 403, "This inspect printing condition cannot be empty!"));
		if (!isset($params['inspectBarcodeScan']) || empty($params['inspectBarcodeScan'])) $this->printJson($this->invalid(false, 403, "This inspect barcode scan cannot be empty!"));
		if (!isset($params['inspectLabelRead']) || empty($params['inspectLabelRead'])) $this->printJson($this->invalid(false, 403, "This inspect label read cannot be empty!"));
		if (!isset($params['inspectRemark']) || empty($params['inspectRemark'])) $this->printJson($this->invalid(false, 403, "This inspect remark cannot be empty!"));
		if (!isset($params['inspectQa']) || empty($params['inspectQa'])) $this->printJson($this->invalid(false, 403, "This inspect qa cannot be empty!"));

		$row = [
			"flag" => 1,
			"inspect_date" => $this->e($params['inspectDate']),
			"outer_no" => $this->e($params['inspectOuter']),
			"lot_id" => $this->e($params['inspectLot']),
			"carton_condition" => $this->e($params['inspectCartonCondition']),
			"label_shp_condition" => $this->e($params['inspectLabelPosition']),
			"print_condition" => $this->e($params['inspectPrintingCondition']),
			"barcode_carton_scan" => $this->e($params['inspectBarcodeScan']),
			"barcode_label_read" => $this->e($params['inspectLabelRead']),
			"remark" => $this->e($params['inspectRemark']),
			"inspect_qa" => $this->e($params['inspectQa']),
			"created_by" => $this->e($_SESSION['qc_usr']),
			"created_date" => time(),
		];

		$insert = $this->inspect->insert_inspect($row);
		if (!$insert) $this->printJson($this->invalid(false, 403, "Add new outgoig inspection failed!"));
		$this->printJson($this->invalid(true, 200, "Add new outgoig inspection success!"));
	}

	public function edit_inspect()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		$params = $this->request->get();
		if (!isset($params['target']) || empty($params['target'])) $this->printJson($this->invalid(false, 403, "This target cannot be empty!"));
		if (!isset($params['inspectDate']) || empty($params['inspectDate'])) $this->printJson($this->invalid(false, 403, "This inspect date cannot be empty!"));
		if (!isset($params['inspectOuter']) || empty($params['inspectOuter'])) $this->printJson($this->invalid(false, 403, "This inspect outer cannot be empty!"));
		if (!isset($params['inspectLot']) || empty($params['inspectLot'])) $this->printJson($this->invalid(false, 403, "This inspect lot cannot be empty!"));
		if (!isset($params['inspectCartonCondition']) || empty($params['inspectCartonCondition'])) $this->printJson($this->invalid(false, 403, "This inspect carton condition cannot be empty!"));
		if (!isset($params['inspectLabelPosition']) || empty($params['inspectLabelPosition'])) $this->printJson($this->invalid(false, 403, "This inspect label position cannot be empty!"));
		if (!isset($params['inspectPrintingCondition']) || empty($params['inspectPrintingCondition'])) $this->printJson($this->invalid(false, 403, "This inspect printing condition cannot be empty!"));
		if (!isset($params['inspectBarcodeScan']) || empty($params['inspectBarcodeScan'])) $this->printJson($this->invalid(false, 403, "This inspect barcode scan cannot be empty!"));
		if (!isset($params['inspectLabelRead']) || empty($params['inspectLabelRead'])) $this->printJson($this->invalid(false, 403, "This inspect label read cannot be empty!"));
		if (!isset($params['inspectRemark']) || empty($params['inspectRemark'])) $this->printJson($this->invalid(false, 403, "This inspect remark cannot be empty!"));
		if (!isset($params['inspectQa']) || empty($params['inspectQa'])) $this->printJson($this->invalid(false, 403, "This inspect qa cannot be empty!"));

		$get = $this->inspect->get_inspect_by(['id' => $this->e($params['target']), 'flag' => 1], 1);
		if (!$get) $this->printJson($this->invalid(false, 403, "This data not found!"));

		$row = [
			"flag" => 0,
			"updated_by" => $this->e($_SESSION['qc_usr']),
			"updated_date" => time(),
		];

		$change = $this->inspect->update_inspect($row, "id", $this->e($params['target']));
		if (!$change) $this->printJson($this->invalid(false, 403, "Edit outgoig inspection failed!"));

		$row = [
			"flag" => 1,
			"inspect_date" => $this->e($params['inspectDate']),
			"outer_no" => $this->e($params['inspectOuter']),
			"lot_id" => $this->e($params['inspectLot']),
			"carton_condition" => $this->e($params['inspectCartonCondition']),
			"label_shp_condition" => $this->e($params['inspectLabelPosition']),
			"print_condition" => $this->e($params['inspectPrintingCondition']),
			"barcode_carton_scan" => $this->e($params['inspectBarcodeScan']),
			"barcode_label_read" => $this->e($params['inspectLabelRead']),
			"remark" => $this->e($params['inspectRemark']),
			"inspect_qa" => $this->e($params['inspectQa']),
			"created_by" => $this->e($_SESSION['qc_usr']),
			"created_date" => time(),
		];
		$insert = $this->inspect->insert_inspect($row);
		if (!$insert) $this->printJson($this->invalid(false, 403, "Edit outgoig inspection failed!"));
		$this->printJson($this->invalid(true, 200, "Edit outgoig inspection success!"));
	}
}