<?php

# PROFILE API

use Controller\Controller;

class v80 extends Controller
{
	private $request;
	private $abov;
	private $advanide;
	private $advanide_eu;
	private $hid;
	private $legic;
	private $linxens;
	private $nuvoton;
	private $sony;
	private $stm;
	private $mlx;
	private $mchp;
	private $nxp;
	private $tdk;
	private $infineon;
	private $users;
	
	function __construct()
	{	
		$this->config();
		$this->request = $this->helper('request');
		$this->abov = $this->helper('map_abov'); 		
		$this->advanide = $this->helper('map_advanide');
		$this->advanide_eu = $this->helper('map_advanide_eu');
		$this->hid = $this->helper('map_hid');
		$this->legic = $this->helper('map_legic');		
		$this->linxens = $this->helper('map_linxens');	
		$this->nuvoton = $this->helper('map_nuvoton');	
		$this->sony = $this->helper('map_sony');
		$this->stm = $this->helper('map_stm');
		$this->mlx = $this->helper('map_mlx');
		$this->mchp = $this->helper('map_mchp');
		$this->nxp = $this->helper('map_nxp');
		$this->tdk = $this->helper('map_tdk');
		$this->infineon = $this->helper('map_infineon');
		$this->users = $this->model('db_user_models');
	}

	public function wafermap_abov()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
	    if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

	    $filename = $_FILES['mapfile']['name'];
	    $tmpPath = $_FILES['mapfile']['tmp_name'];
	    $content = file_get_contents($tmpPath);
	    $convert = $this->abov->convert($content);
	    if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
        $this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_advanide()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();
		if (!isset($params['wafer-code']) || empty($params['wafer-code'])) $this->printJson($this->invalid(false, 403, "This wafer code cannot be empty!"));
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
	    if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

	    $filename = $_FILES['mapfile']['name'];
	    $tmpPath = $_FILES['mapfile']['tmp_name'];
	    $content = file_get_contents($tmpPath);
	    $convert = $this->advanide->convert($content, $params['wafer-code']);
	    if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
        $this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_hid()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
		if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

		$filename = $_FILES['mapfile']['name'];
		$tmpPath = $_FILES['mapfile']['tmp_name'];
		$content = file_get_contents($tmpPath);
		$convert = $this->hid->convert($content, $filename);
		if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
		$this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_legic()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());

		// get request
		$params = $this->request->get();
		if (!isset($params['wafer-code']) || empty($params['wafer-code'])) $this->printJson($this->invalid(false, 403, "This wafer code cannot be empty!"));
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
	    if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

	    $filename = $_FILES['mapfile']['name'];
	    $tmpPath = $_FILES['mapfile']['tmp_name'];
	    $content = file_get_contents($tmpPath);
	    $convert = $this->legic->convert($content, $params['wafer-code']);
	    if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
        $this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_linxens()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
	    if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

	    $filename = $_FILES['mapfile']['name'];
	    $tmpPath = $_FILES['mapfile']['tmp_name'];
	    $content = file_get_contents($tmpPath);
	    $convert = $this->linxens->convert($content);
	    if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
        $this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_nuvoton()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
	    if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

	    $filename = $_FILES['mapfile']['name'];
	    $tmpPath = $_FILES['mapfile']['tmp_name'];
	    $content = file_get_contents($tmpPath);
	    $convert = $this->nuvoton->convert($content);
	    if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
        $this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_sony()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
	    if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

	    $filename = $_FILES['mapfile']['name'];
	    $tmpPath = $_FILES['mapfile']['tmp_name'];
	    $content = file_get_contents($tmpPath);
	    $convert = $this->sony->convert($content);
	    if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
        $this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_stm()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
	    if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

	    $filename = $_FILES['mapfile']['name'];
	    $tmpPath = $_FILES['mapfile']['tmp_name'];
	    $content = file_get_contents($tmpPath);
	    $convert = $this->stm->convert($content, $filename);
	    if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
	    $this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_mlx()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
		if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

		$filename = $_FILES['mapfile']['name'];
		$tmpPath = $_FILES['mapfile']['tmp_name'];
		$content = file_get_contents($tmpPath);
		$convert = $this->mlx->convert($content, $filename);
		if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
		$this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_mchp()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
		if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

		$filename = $_FILES['mapfile']['name'];
		$tmpPath = $_FILES['mapfile']['tmp_name'];
		$content = file_get_contents($tmpPath);
		$convert = $this->mchp->convert($content, $filename);
		if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
		$this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_nxp()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
		if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

		$filename = $_FILES['mapfile']['name'];
		$tmpPath = $_FILES['mapfile']['tmp_name'];
		$content = file_get_contents($tmpPath);
		$convert = $this->nxp->convert($content, $filename);
		if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
		$this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_tdk()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
		if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

		$filename = $_FILES['mapfile']['name'];
		$tmpPath = $_FILES['mapfile']['tmp_name'];
		$content = file_get_contents($tmpPath);
		$convert = $this->tdk->convert($content, $filename);
		if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
		$this->printJson($this->invalid(true, 200, "ok.", $convert));
	}

	public function wafermap_infineon()
	{
		if (!isset($_SESSION['qc_usr']) || empty($_SESSION['qc_usr'])) $this->printJson($this->invalid());
		if (!isset($_FILES['mapfile']) || empty($_FILES['mapfile'])) $this->printJson($this->invalid(false, 403, "Wafermap file cannot be empty!"));
		
		$fileError = $_FILES['mapfile']['error'];
		if ($fileError !== UPLOAD_ERR_OK) $this->printJson($this->invalid(false, 403, "Invalid wafermap!"));

		$filename = $_FILES['mapfile']['name'];
		$tmpPath = $_FILES['mapfile']['tmp_name'];
		$content = file_get_contents($tmpPath);
		$convert = $this->infineon->convert($content, $filename);
		if (!$convert) $this->printJson($this->invalid(false, 403, "Convert failed!"));
		$this->printJson($this->invalid(true, 200, "ok.", $convert));
	}
}