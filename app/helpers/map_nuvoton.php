<?php

/**
* 
*/
use Controller\Controller;

class map_nuvoton extends Controller
{
	private $find_replace = ["0"];
	private $replaced = ["X"];

	function __construct()
	{

	}

	public function convert($text="")
	{
		$xml = @simplexml_load_string($text, "SimpleXMLElement", LIBXML_NOCDATA);
		if (!$xml) return false;

		$xmlLoad = @json_decode(@json_encode($xml), true);
		if (!$xmlLoad) return false;
		if ($xmlLoad['Device']['@attributes']['ProductId'] != "CAN44183AC") return false;
		$mapSplit = $xmlLoad['Device']['Data']['Row'];
		$BIN = $xmlLoad['Device']['Bin'];
		$filename = $xmlLoad['@attributes']['WaferId'];
		
		$mapText = "";
		$PASS = 0;
		$FAIL = 0;
		$NULL = 0;
		foreach ($mapSplit as $key => $map) {
			if (strlen($map) >= 10) {
				$mapTmp = str_replace($this->find_replace, $this->replaced, $map);
				$PASS = $PASS+substr_count($mapTmp, '1');
				$FAIL = $FAIL+substr_count($mapTmp, 'X');
				$NULL = $NULL+substr_count($mapTmp, '.');
				$mapText .= $mapTmp."\n";
			}
		}

		$WAFER_ID = $filename;
		$PRODUCT_ID = $xmlLoad['Device']['@attributes']['ProductId'];
		$CTEATED_DATE = $xmlLoad['Device']['@attributes']['CreateDate'];


		$container = [$filename.".txt", $WAFER_ID, $PRODUCT_ID, $CTEATED_DATE, $PASS, $FAIL];
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
				],
			],
			"csv" => [
				"header" => "FILE_NAME,WAFER_ID,PRODUCT_ID,CTEATED_DATE,PASS,FAIL",
				"container" => $container,
				"filename" => $filename.".csv",
			]
		];
	}
}