<?php

/**
* 
*/
use Controller\Controller;

class map_hid extends Controller
{
	
	private $find_replace = ["R", "0"];
	private $replaced = ["+", "X"];

	function __construct()
	{

	}

	public function convert($text="", $filename="")
	{
		if ($text == "") return false;

		$foundMapFlag = false;
		$PASS = 0;
		$FAIL = 0;
		$REF = 0;
		$NULL = 0;
		$mapText = "";
		$mapSplit = explode("\n", $text);
		foreach ($mapSplit as $key => $map) {
			if (substr($map, 0, 3) == "...") $foundMapFlag = true;
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
		preg_match_all('/WaferId\: \s*(.*?)\s+\n/', $text, $waferID1);
		preg_match_all('/WAFERID\=\s*(.*?)\s+\n/', $text, $waferID2);
		$waferID 	= (isset($waferID1[1][0]) ? $waferID1[1][0] : (isset($waferID2[1][0]) ? $waferID2[1][0] : "-"));
			
		$container = [$waferID.".txt", $waferID, $PASS];
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
				"header" => "FILE_NAME,WaferId,GoodTY",
				"container" => $container,
				"filename" => $waferID.".csv",
			]
		];

		return false;
	}
}