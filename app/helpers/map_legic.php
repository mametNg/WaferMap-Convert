<?php

/**
* 
*/
use Controller\Controller;

class map_legic extends Controller
{
	
	private $find_replace = ["0", "R"];
	private $replaced = ["X", "+"];
	private $wfCode = ["M/PM410", "ATC 1024"];

	function __construct()
	{

	}

	public function convert($text="", $code="")
	{
		if ($text == "") return false;
		if ($code == "") return false;
		if (!in_array($code, $this->wfCode)) return false;

		if ($code == "M/PM410") {
			$foundMapFlag = false;
			$PASS = 0;
			$FAIL = 0;
			$REF = 0;
			$NULL = 0;
			$mapText = "";
			$mapSplit = explode("\n", $text);
			foreach ($mapSplit as $key => $map) {
				if (substr($map, 3, 1) == ".") $foundMapFlag = true;
				if ($foundMapFlag && strlen($map) >= 30) {
					$mapTmp = str_replace($this->find_replace, $this->replaced, $map);

					$PASS = $PASS+substr_count($mapTmp, '1');
					$FAIL = $FAIL+substr_count($mapTmp, 'X');
					$REF = $REF+substr_count($mapTmp, '+');
					$NULL = $NULL+substr_count($mapTmp, '.');
					$mapText .= $mapTmp."\n";
				}
			}

			if (strlen($mapText) <= 100) return false;

			preg_match_all('/WaferId\: \s*(.*?)\s+\n/', $text, $waferID);
			preg_match_all('/Flat\/Notch\: \s*(.*?)\s+\n/', $text, $flatNotch);
			preg_match_all('/MaxXY\: \s*(.*?)\s+\n/', $text, $maxXY);
			preg_match_all('/TotDie\: \s*(.*?)\s+\n/', $text, $totDie);
			preg_match_all('/Tested\: \s*(.*?)\s+\n/', $text, $tested);
			preg_match_all('/Pickable\: \s*(.*?)\s+\n/', $text, $picable);
			
			$waferID 	= (isset($waferID[1][0]) ? $waferID[1][0] : "-");
			$flatNotch 	= (isset($flatNotch[1][0]) ? $flatNotch[1][0] : "-");
			$maxXY 		= (isset($maxXY[1][0]) ? $maxXY[1][0] : "-");
			$totDie 	= (isset($totDie[1][0]) ? $totDie[1][0] : "-");
			$tested 	= (isset($tested[1][0]) ? $tested[1][0] : "-");
			$picable 	= (isset($picable[1][0]) ? $picable[1][0] : "-");

			$container = [$waferID.".txt", $waferID, $flatNotch, $maxXY, $totDie, $tested, $picable];
			$container = implode(",", $container);

			return [
				"convert" => true,
				"mapData" => [
					"filename" => $waferID.".txt",
					"wafermap" => $mapText,
					"opt" => [
						"1" => "die-pass",
						"X" => "die-fail",
						"+" => "die-ref",
						"." => "die-null",
					],
					"desc" => [
						"1" => [
							"PASS",
							"mx-1 bg-success text-white",
							$PASS
						],
						"X" => [
							"DIE",
							"mx-1 bg-danger text-white",
							$FAIL
						],
						"+" => [
							"REF",
							"mx-1 bg-warning text-white",
							$REF
						],
						"." => [
							"NULL",
							"mx-1 bg-white",
							$NULL
						],
					],
				],
				"csv" => [
					"header" => "FILE_NAME;WaferId;Flat/Notch;MaxXY;TotDie;Tested;Pickable",
					"container" => $container,
					"filename" => $waferID.".csv",
				]
			];
		}
		if ($code == "ATC 1024") {
			$foundMapFlag = false;
			$PASS = 0;
			$FAIL = 0;
			$REF = 0;
			$NULL = 0;
			$mapText = "";
			$mapSplit = explode("\n", $text);
			foreach ($mapSplit as $key => $map) {
				if (substr($map, 0, 6) == "MAP001") $foundMapFlag = true;
				if ($foundMapFlag && strlen($map) >= 30) {
					$mapTmp = str_replace("X", "+", substr($map, 7, strlen($map)));
					$mapTmp = str_replace("0", "X", $mapTmp);

					$PASS = $PASS+substr_count($mapTmp, '1');
					$FAIL = $FAIL+substr_count($mapTmp, 'X');
					$REF = $REF+substr_count($mapTmp, '+');
					$NULL = $NULL+substr_count($mapTmp, '.');
					$mapText .= $mapTmp."\n";
				}
			}
			if (strlen($mapText) <= 100) return false;

			preg_match_all('/VERSID \s*(.*?)\s+\n/', $text, $VERSID);
			preg_match_all('/TIMEST \s*(.*?)\s+\n/', $text, $TIMEST);
			preg_match_all('/MAPTYP \s*(.*?)\s+\n/', $text, $MAPTYP);
			preg_match_all('/DESIGN \s*(.*?)\s+\n/', $text, $DESIGN);
			preg_match_all('/LOTMEA \s*(.*?)\s+\n/', $text, $LOTMEA);
			preg_match_all('/REFCNT \s*(.*?)\s+\n/', $text, $REFCNT);
			preg_match_all('/REFBIN \s*(.*?)\s+\n/', $text, $REFBIN);
			preg_match_all('/REFTP1 \s*(.*?)\s+\n/', $text, $REFTP1);
			preg_match_all('/REFPX1 \s*(.*?)\s+\n/', $text, $REFPX1);
			preg_match_all('/REFPY1 \s*(.*?)\s+\n/', $text, $REFPY1);
			preg_match_all('/REFTP2 \s*(.*?)\s+\n/', $text, $REFTP2);
			preg_match_all('/REFPX2 \s*(.*?)\s+\n/', $text, $REFPX2);
			preg_match_all('/REFPY2 \s*(.*?)\s+\n/', $text, $REFPY2);
			preg_match_all('/REFTP3 \s*(.*?)\s+\n/', $text, $REFTP3);
			preg_match_all('/REFPX3 \s*(.*?)\s+\n/', $text, $REFPX3);
			preg_match_all('/REFPY3 \s*(.*?)\s+\n/', $text, $REFPY3);
			preg_match_all('/FNLOC1 \s*(.*?)\s+\n/', $text, $FNLOC1);
			preg_match_all('/ORLOC1 \s*(.*?)\s+\n/', $text, $ORLOC1);
			preg_match_all('/ROWCNT \s*(.*?)\s+\n/', $text, $ROWCNT);
			preg_match_all('/COLCNT \s*(.*?)\s+\n/', $text, $COLCNT);
			preg_match_all('/WAFDIA \s*(.*?)\s+\n/', $text, $WAFDIA);
			preg_match_all('/XDIES1 \s*(.*?)\s+\n/', $text, $XDIES1);
			preg_match_all('/YDIES1 \s*(.*?)\s+\n/', $text, $YDIES1);
			preg_match_all('/PASBIN \s*(.*?)\s+\n/', $text, $PASBIN);
			preg_match_all('/SUMPAS \s*(.*?)\s+\n/', $text, $SUMPAS);
			preg_match_all('/COMPRE \s*(.*?)\s+\n/', $text, $COMPRE);
			preg_match_all('/SKIPDI \s*(.*?)\s+\n/', $text, $SKIPDI);
			preg_match_all('/MAPID1 \s*(.*?)\s+\n/', $text, $MAPID1);

			$VERSID = (isset($VERSID[1][0]) ? $VERSID[1][0] : "-");
			$TIMEST = (isset($TIMEST[1][0]) ? $TIMEST[1][0] : "-");
			$MAPTYP = (isset($MAPTYP[1][0]) ? $MAPTYP[1][0] : "-");
			$DESIGN = (isset($DESIGN[1][0]) ? $DESIGN[1][0] : "-");
			$LOTMEA = (isset($LOTMEA[1][0]) ? $LOTMEA[1][0] : "-");
			$REFCNT = (isset($REFCNT[1][0]) ? $REFCNT[1][0] : "-");
			$REFBIN = (isset($REFBIN[1][0]) ? $REFBIN[1][0] : "-");
			$REFTP1 = (isset($REFTP1[1][0]) ? $REFTP1[1][0] : "-");
			$REFPX1 = (isset($REFPX1[1][0]) ? $REFPX1[1][0] : "-");
			$REFPY1 = (isset($REFPY1[1][0]) ? $REFPY1[1][0] : "-");
			$REFTP2 = (isset($REFTP2[1][0]) ? $REFTP2[1][0] : "-");
			$REFPX2 = (isset($REFPX2[1][0]) ? $REFPX2[1][0] : "-");
			$REFPY2 = (isset($REFPY2[1][0]) ? $REFPY2[1][0] : "-");
			$REFTP3 = (isset($REFTP3[1][0]) ? $REFTP3[1][0] : "-");
			$REFPX3 = (isset($REFPX3[1][0]) ? $REFPX3[1][0] : "-");
			$REFPY3 = (isset($REFPY3[1][0]) ? $REFPY3[1][0] : "-");
			$FNLOC1 = (isset($FNLOC1[1][0]) ? $FNLOC1[1][0] : "-");
			$ORLOC1 = (isset($ORLOC1[1][0]) ? $ORLOC1[1][0] : "-");
			$ROWCNT = (isset($ROWCNT[1][0]) ? $ROWCNT[1][0] : "-");
			$COLCNT = (isset($COLCNT[1][0]) ? $COLCNT[1][0] : "-");
			$WAFDIA = (isset($WAFDIA[1][0]) ? $WAFDIA[1][0] : "-");
			$XDIES1 = (isset($XDIES1[1][0]) ? $XDIES1[1][0] : "-");
			$YDIES1 = (isset($YDIES1[1][0]) ? $YDIES1[1][0] : "-");
			$PASBIN = (isset($PASBIN[1][0]) ? $PASBIN[1][0] : "-");
			$SUMPAS = (isset($SUMPAS[1][0]) ? $SUMPAS[1][0] : "-");
			$COMPRE = (isset($COMPRE[1][0]) ? $COMPRE[1][0] : "-");
			$SKIPDI = (isset($SKIPDI[1][0]) ? $SKIPDI[1][0] : "-");
			$MAPID1 = (isset($MAPID1[1][0]) ? $MAPID1[1][0] : "-");

			$container = [$MAPID1.".txt", $VERSID, $TIMEST, $MAPTYP, $DESIGN, $LOTMEA, $REFCNT, $REFBIN, $REFTP1, $REFPX1, $REFPY1, $REFTP2, $REFPX2, $REFPY2, $REFTP3, $REFPX3, $REFPY3, $FNLOC1, $ORLOC1, $ROWCNT, $COLCNT, $WAFDIA, $XDIES1, $YDIES1, $PASBIN, $SUMPAS, $COMPRE, $SKIPDI, $MAPID1];
			$container = implode(";", $container);

			return [
				"convert" => true,
				"mapData" => [
					"filename" => $MAPID1.".txt",
					"wafermap" => $mapText,
					"opt" => [
						"1" => "die-pass",
						"X" => "die-fail",
						"+" => "die-ref",
						"." => "die-null",
					],
					"desc" => [
						"1" => [
							"PASS",
							"mx-1 bg-success text-white",
							$PASS
						],
						"X" => [
							"DIE",
							"mx-1 bg-danger text-white",
							$FAIL
						],
						"+" => [
							"REF",
							"mx-1 bg-warning text-white",
							$REF
						],
						"." => [
							"NULL",
							"mx-1 bg-white",
							$NULL
						],
					],
				],
				"csv" => [
					"header" => "FILE_NAME;VERSID;TIMEST;MAPTYP;DESIGN;LOTMEA;REFCNT;REFBIN;REFTP1;REFPX1;REFPY1;REFTP2;REFPX2;REFPY2;REFTP3;REFPX3;REFPY3;FNLOC1;ORLOC1;ROWCNT;COLCNT;WAFDIA;XDIES1;YDIES1;PASBIN;SUMPAS;COMPRE;SKIPDI;MAPID1",
					"container" => $container,
					"filename" => $MAPID1.".csv",
				]
			];
		}
		return false;
	}
}