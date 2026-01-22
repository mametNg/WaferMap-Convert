<?php

/**
 * 
 */
use Controller\Controller;

class db_history_login_models extends Controller
{
	
	private static $tb_name = "history_login";
	private $DB;

	function __construct()
	{
		$this->config();
		$this->DB = $this->model('db_models');
	}

	public function get_all_login()
	{
		return $this->DB->getAllTB(static::$tb_name);
	}

	public function get_login_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_name." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function get_login($startDate=false, $endDate=false, $docCode=false)
	{
		return $this->DB->query(
		"
		SELECT DISTINCT 
		*
		FROM 
		".static::$tb_name." 
		WHERE 
		created >='$startDate' AND created <= '$endDate' 
		ORDER BY created ASC
		");
	}

	public function insert_login($params=false)
	{
		return $this->DB->insertTB(static::$tb_name, $params);
	}
}