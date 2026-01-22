<?php

/**
* 
*/
use Controller\Controller;

class map_advanide extends Controller
{
	
	private $find_replace = ["0F", "FF", "00", "01", "11"];
	private $replaced = ["+", ".", "1", "X", "Z"];
	private $wfCode = ["RCSA012C", "RCSA212C", "C6-FF"];

	function __construct()
	{

	}

	public function convert($text="", $code="")
	{
		if ($text == "") return false;
		if ($code == "") return false;
		if (!in_array($code, $this->wfCode)) return false;


		if ($code == "RCSA012C") {
			$xml = @simplexml_load_string($text, "SimpleXMLElement", LIBXML_NOCDATA);
			if (!$xml) return false;

			$xmlLoad = @json_decode(@json_encode($xml), true);
			if (!$xmlLoad) return false;
			if ($xmlLoad['Device']['@attributes']['ProductId'] != "RC-SA01/2C") return false;
			$mapSplit = $xmlLoad['Device']['Data']['Row'];
			$BIN = $xmlLoad['Device']['Bin'];
			$filename = $xmlLoad['@attributes']['WaferId'];

			$mapText = "";
			$PASS = 0;
			$FAIL = 0;
			$NULL = 0;
			$REF = 0;
			foreach ($mapSplit as $key => $map) {
				if (strlen($map) >= 10) {
					$mapTextTmp = "";
					$mapSplitFind = str_split($map, 2);
					for ($i=0; $i < count($mapSplitFind); $i++) { 
						$mapTextTmp .= str_replace($this->find_replace, $this->replaced, $mapSplitFind[$i]);
					}
					$mapText .= $mapTextTmp."\n";
				}
			}

			foreach ($BIN as $key => $value) {
				if ($value['@attributes']['BinDescription'] == "Pass") $PASS = $value['@attributes']['BinCount'];
				if ($value['@attributes']['BinDescription'] == "Fail") $FAIL = $value['@attributes']['BinCount'];
				if ($value['@attributes']['BinDescription'] == "Null") $NULL = $value['@attributes']['BinCount'];
				if ($value['@attributes']['BinDescription'] == "Ref") $REF = $value['@attributes']['BinCount'];
			}

			$container = [$filename.".txt", $PASS, $FAIL, $NULL, $REF];
			$container = implode(",", $container);

			return [
				"convert" => true,
				"mapData" => [
					"filename" => $filename.".txt",
					"wafermap" => $mapText,
					"opt" => [
						"1" => "die-pass",
						"X" => "die-fail",
						"." => "die-null",
						"+" => "die-ref",
					],
					"desc" => [
						"1" => [
							"PASS",
							"mx-1 bg-success text-white",
							$PASS
						],
						"X" => [
							"FAIL",
							"mx-1 bg-danger text-white",
							$FAIL
						],
						"." => [
							"NULL",
							"mx-1 bg-white",
							$NULL
						],
						"+" => [
							"REF",
							"mx-1 bg-warning text-white",
							$REF
						],
					],
				],
				"csv" => [
					"header" => "FILE_NAME,PASS,FAIL,NULL,REF",
					"container" => $container,
					"filename" => $filename.".csv",
				]
			];
		}

		if ($code == "RCSA212C") {
			$xml = @simplexml_load_string($text, "SimpleXMLElement", LIBXML_NOCDATA);
			if (!$xml) return false;

			$xmlLoad = @json_decode(@json_encode($xml), true);
			if (!$xmlLoad) return false;
			if ($xmlLoad['Device']['@attributes']['ProductId'] != "RC-SA21/2C") return false;
			$mapSplit = $xmlLoad['Device']['Data']['Row'];
			$BIN = $xmlLoad['Device']['Bin'];
			$filename = $xmlLoad['@attributes']['WaferId'];

			$mapText = "";
			$PASS = 0;
			$FAIL = 0;
			$NULL = 0;
			$REF = 0;
			$TEG = 0;
			foreach ($mapSplit as $key => $map) {
				if (strlen($map) >= 10) {
					$mapTextTmp = "";
					$mapSplitFind = str_split($map, 2);
					for ($i=0; $i < count($mapSplitFind); $i++) { 
						$mapTextTmp .= str_replace($this->find_replace, $this->replaced, $mapSplitFind[$i]);
					}
					$mapText .= $mapTextTmp."\n";
				}
			}

			foreach ($BIN as $key => $value) {
				if ($value['@attributes']['BinDescription'] == "Pass") $PASS = $value['@attributes']['BinCount'];
				if ($value['@attributes']['BinDescription'] == "Fail") $FAIL = $value['@attributes']['BinCount'];
				if ($value['@attributes']['BinDescription'] == "Null") $NULL = $value['@attributes']['BinCount'];
				if ($value['@attributes']['BinDescription'] == "Ref") $REF = $value['@attributes']['BinCount'];
				if ($value['@attributes']['BinDescription'] == "Teg") $TEG = $value['@attributes']['BinCount'];
			}

			$container = [$filename.".txt", $PASS, $FAIL, $NULL, $REF, $TEG];
			$container = implode(",", $container);

			return [
				"convert" => true,
				"mapData" => [
					"filename" => $filename.".txt",
					"wafermap" => $mapText,
					"opt" => [
						"1" => "die-pass",
						"X" => "die-fail",
						"." => "die-null",
						"+" => "die-ref",
						"Z" => "die-teg",
					],
					"desc" => [
						"1" => [
							"PASS",
							"mx-1 bg-success text-white",
							$PASS
						],
						"X" => [
							"FAIL",
							"mx-1 bg-danger text-white",
							$FAIL
						],
						"." => [
							"NULL",
							"mx-1 bg-white",
							$NULL
						],
						"+" => [
							"REF",
							"mx-1 bg-warning text-white",
							$REF
						],
						"Z" => [
							"TEG",
							"mx-1 bg-info text-white",
							$TEG
						],
					],
				],
				"csv" => [
					"header" => "FILE_NAME,PASS,FAIL,NULL,REF,TEG",
					"container" => $container,
					"filename" => $filename.".csv",
				]
			];
		}

		if ($code == "C6-FF") {
			$foundMapFlag = false;
			$REFCNT = 0;
			$REFBIN = 0;
			$PASSED = 0;
			$UNKNOW = 0;
			$NULL = 0;
			$mapText = "";
			$mapSplit = explode("\n", $text);
			foreach ($mapSplit as $key => $map) {
				// if (substr($map, 3, 1) == ".") $foundMapFlag = false;
				if (substr($map, 3, 1) == ".") $foundMapFlag = true;
				if ($foundMapFlag && strlen($map) >= 30) {
					$mapTmp = substr($map, 3, strlen($map));
					$mapTmp = str_replace("X", "+", $mapTmp);

					$REFCNT = $REFCNT+substr_count($mapTmp, '0');
					$REFBIN = $REFBIN+substr_count($mapTmp, '+');
					$PASSED = $PASSED+substr_count($mapTmp, 'P');
					$UNKNOW = $UNKNOW+substr_count($mapTmp, 'F');
					$NULL = $NULL+substr_count($mapTmp, '.');
					$mapText .= $mapTmp."\n";
				}
			}

			if (strlen($mapText) <= 100) return false;
			preg_match_all('/MAPID1 \s*(.*?)\s+\n/', $text, $filename);
			$filename 	= (isset($filename[1][0]) ? str_replace(" ", "", $filename[1][0]) : "-");

			$container = [$filename.".txt", $REFCNT, $REFBIN, $PASSED];
			$container = implode(",", $container);
			return [
				"convert" => true,
				"mapData" => [
					"filename" => $filename.".txt",
					"wafermap" => $mapText,
					"opt" => [
						"0" => "die-fail",
						"+" => "die-ref",
						"P" => "die-pass",
						"F" => "die-null",
						"." => "die-null",
					],
					"desc" => [
						"0" => [
							"REFCNT",
							"mx-1 bg-danger text-white",
							$REFCNT
						],
						"+" => [
							"REFBIN",
							"mx-1 bg-warning text-white",
							$REFBIN
						],
						"P" => [
							"PASSED",
							"mx-1 bg-success text-white",
							$PASSED
						],
						"F" => [
							"UNKNOW",
							"mx-1 bg-white",
							$UNKNOW
						],
						"." => [
							"NULL",
							"mx-1 bg-white",
							$NULL
						],
					],
				],
				"csv" => [
					"header" => "FILE_NAME,REFCNT (0),REFBIN (X),PASSED (P)",
					"container" => $container,
					"filename" => $filename.".csv",
				]
			];
		}

		return false;
	}
}