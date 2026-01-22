<?php

/**
 * 
 */
use Controller\Controller;

class db_history_user_models extends Controller
{
	
	private static $tb_name = "history_user";
	private $DB;

	function __construct()
	{
		$this->config();
		$this->DB = $this->model('db_models');
	}

	public function get_all_activity()
	{
		return $this->DB->getAllTB(static::$tb_name);
	}

	public function get_activity_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_name." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function get_activity($startDate=false, $endDate=false, $params=false)
	{
		return $this->DB->query(
		"
		SELECT DISTINCT 
		*
		FROM 
		".static::$tb_name." 
		WHERE 
		created >='$startDate' AND created <= '$endDate' 
		ORDER BY created DESC
		LIMIT 100
		");
	}

	public function insert_activity($params=false)
	{
		return $this->DB->insertTB(static::$tb_name, $params);
	}
}