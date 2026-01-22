<?php

/**
* 
*/
use Controller\Controller;

class map_abov extends Controller
{
	
	private $find_replace = [" ", "/", "F"];
	private $replaced = [".", "1", "X"];

	function __construct()
	{

	}

	public function convert($text="")
	{
		if ($text == "") return false;

		$foundMapFlag = false;
		$PASS = 0;
		$FAIL = 0;
		$YIELD = 0;
		$NULL = 0;
		$mapText = "";
		$mapSplit = explode("\n", $text);
		foreach ($mapSplit as $key => $map) {
			if (substr($map, 0, 3) == "[X]") $foundMapFlag = false;
			if ($foundMapFlag) {
				$mapTmp = substr($map, 3, strlen($map));
				$mapTmp = str_replace($this->find_replace, $this->replaced, $mapTmp);

				$PASS = $PASS+substr_count($mapTmp, '1');
				$FAIL = $FAIL+substr_count($mapTmp, 'X');
				$NULL = $NULL+substr_count($mapTmp, '.');
				$mapText .= $mapTmp."\n";
			}
			if (substr($map, 0, 3) == "[Y]") $foundMapFlag = true;
		}
		
		if (strlen($mapText) <= 100) return false;

		if (($PASS+$FAIL) >= 1) {
			$YIELD = round((($PASS/($PASS+$FAIL)) * 100), 2)."%";
		} else {
			$YIELD = $YIELD."%";
		}

		preg_match_all('/W\/F ID:\s*(.*?)\s+OP:/', $text, $waferID);
		$waferID 	= (isset($waferID[1][0]) ? $waferID[1][0] : "-");

		$container = [$waferID, substr($waferID, 1, strlen($waferID)).".txt", $PASS, $FAIL, $YIELD];
		$container = implode(",", $container);
		return [
			"convert" => true,
			"mapData" => [
				"filename" => substr($waferID, 1, strlen($waferID)).".txt",
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
				"header" => "WAFER ID,FILE_NAME,PASS,FAIL,YIELD",
				"container" => $container,
				"filename" => substr($waferID, 1, strlen($waferID)).".csv",
			]
		];
	}
}