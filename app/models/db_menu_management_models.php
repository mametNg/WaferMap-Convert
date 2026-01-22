<?php

/**
 * 
 */
use Controller\Controller;

class db_menu_management_models extends Controller
{
	
	private static $tb_menu = "table_menu";
	private static $tb_submenu = "table_submenu";
	private static $tb_acc_menu = "table_access_menu";
	private $DB;

	function __construct()
	{
		$this->config();
		$this->DB = $this->model('db_models');
	}

	public function get_all_menu()
	{
		return $this->DB->getAllTB(static::$tb_menu);
	}

	public function get_menu_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_menu." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function edit_menu($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_menu, $params, $key, $value);
	}

	public function insert_menu($params=false)
	{
		return $this->DB->insertTB(static::$tb_menu, $params);
	}

	// =====================================================================================================================
	public function get_all_submenu()
	{
		return $this->DB->getAllTB(static::$tb_submenu);
	}

	public function get_submenu_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_submenu." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function edit_submenu($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_submenu, $params, $key, $value);
	}

	public function insert_submenu($params=false)
	{
		return $this->DB->insertTB(static::$tb_submenu, $params);
	}

	// =====================================================================================================================
	// =====================================================================================================================
	public function get_all_acc_menu()
	{
		return $this->DB->getAllTB(static::$tb_acc_menu);
	}

	public function get_acc_menu_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("SELECT * FROM ".static::$tb_acc_menu." WHERE $sql", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function edit_acc_menu($params=false,$key=false,$value=false)
	{
		return $this->DB->updateTB(static::$tb_acc_menu, $params, $key, $value);
	}

	public function insert_acc_menu($params=false)
	{
		return $this->DB->insertTB(static::$tb_acc_menu, $params);
	}
	// =====================================================================================================================
	public function user_menu()
	{

		$getMenu = $this->DB->query("
			SELECT DISTINCT
				mn.name,
				mn.icon,
				mn.path,
				mn.filename,
				mn.is_submenu,
				ac.menu
			FROM
				".static::$tb_acc_menu." ac
			INNER JOIN 
				".static::$tb_menu." mn
			ON 
				mn.id = ac.menu 
				and mn.flag = ac.flag
			WHERE
				ac.uid = '".$_SESSION['qc_usr']."'
				AND ac.flag = '1'
			GROUP BY 
				ac.menu, ac.uid
			ORDER BY 
				mn.order_no ASC
		");

		if (!$getMenu) return false;

		for ($i=0; $i < count($getMenu); $i++) { 
			$getMenu[$i]['submenu'] = false;
			if ($getMenu[$i]['is_submenu'] == "1") {
				$submenu = $this->get_user_submenu_by([
					'acsmn.uid' => $_SESSION['qc_usr'], 
					'acsmn.flag' => 1, 
					'acsmn.menu' => $getMenu[$i]['menu']
				]);

				if ($submenu) $getMenu[$i]['submenu'] = $submenu;
			}
		}

		return $getMenu;
	}

	public function get_user_submenu_by($params=false, $single=false)
	{
		if (!$params) return false;

		$sql = '';
		foreach ($params as $key => $value) $sql .= " AND $key='$value'";
		$sql = trim($sql, " AND");

		$mst = $this->DB->query("
			SELECT 
				* 
			FROM 
				".static::$tb_acc_menu." acsmn
			INNER JOIN
				".static::$tb_submenu." smn
			ON
				smn.id = acsmn.submenu 
				and smn.menu = acsmn.menu
				and smn.flag = acsmn.flag
			WHERE 
				$sql
			ORDER BY
				smn.order_no ASC
		", $single);
		if (!$mst) return false;
		return $mst;
	}

	public function get_user_menu_registration($uid=false)
	{
		return $this->DB->query("
			SELECT
				tm.name menu,
				tm.id menu_id,
				tm.path menu_path,
				tm.is_submenu,
				ts.name submenu,
				ts.id submenu_id,
				ts.path submenu_path,
				IF(
					(
						SELECT
						tam.menu
						FROM
						table_access_menu tam
						WHERE
						tam.uid ='$uid'
						AND tam.menu = tm.id
						LIMIT 1
					),
					true,
					false
				) menu_registered,
				IF(
					(
						SELECT
						tam.menu
						FROM
						table_access_menu tam
						WHERE
						tam.uid ='$uid'
						AND tam.menu = tm.id
						AND tam.submenu = ts.id
					),
					true,
					false
				) submenu_registered,
				IF(
					(
						SELECT
						tam.menu
						FROM
						table_access_menu tam
						WHERE
						tam.uid ='$uid'
						AND tam.menu = tm.id
						AND tam.flag = 1
						LIMIT 1
					),
					true,
					false
				) flag_menu,
				IF(
					(
						SELECT
						tam.flag
						FROM
						table_access_menu tam
						WHERE
						tam.uid ='$uid'
						AND tam.menu = tm.id
						AND tam.submenu = ts.id
						AND tam.flag = '1'
					),
					true,
					false
				) flag_submenu
			FROM
				table_menu tm
			LEFT JOIN 
				table_submenu ts
			ON
				tm.id = ts.menu
			ORDER BY 
				tm.order_no, ts.order_no ASC
		");
	}
}