<?php

/**
 * 
 */
use Controller\Controller;

class db_user_models extends Controller
{
	
	private static $tb_user = "db_users_admin";
	private static $tb_role = "users_role";
	private static $tb_dept = "db_departement";
	private $DB;

	function __construct()
	{
		$this->config();
		$this->DB = $this->model('db_models');
	}

	public function get_all_users()
	{
		return $this->DB->getAllTB(static::$tb_user);
	}

	public function get_all_role()
	{
		return $this->DB->getAllTB(static::$tb_role);
	}

	public function get_all_dept()
	{
		return $this->DB->getAllTB(static::$tb_dept);
	}

	public function get_users_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_user." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function get_role_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_role." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function get_dept_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_dept." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function insert_user($params=false)
	{
		return $this->DB->insertTB(static::$tb_user, $params);
	}

	public function insert_role($params=false)
	{
		return $this->DB->insertTB(static::$tb_role, $params);
	}

	public function insert_dept($params=false)
	{
		return $this->DB->insertTB(static::$tb_dept, $params);
	}

	public function edit_user($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_user, $params, $key, $value);
	}

	public function edit_role($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_role, $params, $key, $value);
	}

	public function edit_dept($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_dept, $params, $key, $value);
	}
}