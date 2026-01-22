<?php

/**
* 
*/
use Controller\Controller;

class map_sony extends Controller
{
	private $find_replace = ["FF", "0F", "00", "01", "11"];
	private $replaced = [".", "+", "1", "X", "D"];

	function __construct()
	{

	}

	public function convert($text="")
	{
		$xml = @simplexml_load_string($text, "SimpleXMLElement", LIBXML_NOCDATA);
		if (!$xml) return false;

		$xmlLoad = @json_decode(@json_encode($xml), true);
		if (!$xmlLoad) return false;
		// if ($xmlLoad['Device']['@attributes']['ProductId'] != "RC-S966/1A") return false;
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

				$PASS = $PASS+substr_count($mapTextTmp, '1');
				$FAIL = $FAIL+substr_count($mapTextTmp, 'X');
				$NULL = $NULL+substr_count($mapTextTmp, '.');
				$REF = $REF+substr_count($mapTextTmp, '+');
				$TEG = $TEG+substr_count($mapTextTmp, 'D');

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

		$container = [$filename.".txt", $filename, $PASS, $FAIL, $REF, $TEG];
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
					"D" => "die-teg",
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
					"D" => [
						"TEG",
						"mx-1 bg-info text-white",
						$TEG
					],
				],
			],
			"csv" => [
				"header" => "FILE_NAME,WAFERID,PASS,FAIL,REF,TEG",
				"container" => $container,
				"filename" => $filename.".csv",
			]
		];
	}
}