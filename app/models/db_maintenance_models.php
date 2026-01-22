<?php

/**
 * 
 */
use Controller\Controller;

class db_maintenance_models extends Controller
{
	
	private static $tb_name = "addons";
	private $DB;

	function __construct()
	{
		$this->config();
		$this->DB = $this->model('db_models');
	}

	public function get_maintenance_status()
	{
		$mst = $this->DB->query("SELECT flag FROM ".static::$tb_name." WHERE id='1'", 1);
		return $mst;
	}

	public function update_maintenance($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_name, $params, $key, $value);
	}
}