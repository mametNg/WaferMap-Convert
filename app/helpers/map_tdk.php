<?php

/**
* 
*/
use Controller\Controller;

class map_tdk extends Controller
{
	private $find_replace = ["4", "5", "g"];
	private $replaced = ["X", "X", "X"];

	function __construct()
	{

	}

	public function convert($text="", $filename="")
	{
		$xml = @simplexml_load_string($text, "SimpleXMLElement", LIBXML_NOCDATA);
		if (!$xml) return false;

		$xmlLoad = @json_decode(@json_encode($xml), true);
		if (!$xmlLoad) return false;
		if ($text == "") return false;

		$mapSplit = $xmlLoad['Device']['Data']['Row'];
		$BIN = $xmlLoad['Device']['Bin'];
		$filename = $xmlLoad['@attributes']['SubstrateId'];

		$mapText = "";
		$PASS = 0;
		$FAIL = 0;
		$NULL = 0;
		$REF = 0;
		foreach ($mapSplit as $key => $map) {
			if (strlen($map) >= 10) {
				$mapTextTmp = str_replace($this->find_replace, $this->replaced, $map);

				$PASS = $PASS+substr_count($mapTextTmp, '1');
				$FAIL = $FAIL+substr_count($mapTextTmp, 'X');
				$REF = $REF+substr_count($mapTextTmp, '+');
				$NULL = $NULL+substr_count($mapTextTmp, '.');
				$mapText .= $mapTextTmp."\n";
			}
		}

		if (strlen($mapText) <= 100) return false;
		// foreach ($BIN as $key => $value) {
		// 	if ($value['@attributes']['BinDescription'] == "Pass") $PASS = $value['@attributes']['BinCount'];
		// 	if ($value['@attributes']['BinDescription'] == "Fail") $FAIL = $value['@attributes']['BinCount'];
		// 	if ($value['@attributes']['BinDescription'] == "Null") $NULL = $value['@attributes']['BinCount'];
		// 	if ($value['@attributes']['BinDescription'] == "Ref") $REF = $value['@attributes']['BinCount'];
		// }

		$container = [$filename.".txt", $filename, $PASS];
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
				"header" => "FILE_NAME,WAFERID,PASS",
				"container" => $container,
				"filename" => $filename.".csv",
			]
		];
	}
}