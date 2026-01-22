<?php

/**
 * 
 */
use Controller\Controller;

class db_inspect_models extends Controller
{
	
	private static $tb_name = "inspect_outgoing";
	private $DB;

	function __construct()
	{
		$this->config();
		$this->DB = $this->model('db_models');
	}

	public function get_inspect_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_name." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function insert_inspect($params=false, $multi=false)
	{
		return $this->DB->insertTB(static::$tb_name, $params, $multi);
	}

	public function update_inspect($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_name, $params, $key, $value);
	}
}