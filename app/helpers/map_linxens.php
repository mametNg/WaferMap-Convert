<?php

/**
* 
*/
use Controller\Controller;

class map_linxens extends Controller
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
		$REF = 0;
		$NULL = 0;
		$mapText = "";
		$mapSplit = explode("\n", $text);
		foreach ($mapSplit as $key => $map) {
			if (substr($map, 0, 1) == ".") $foundMapFlag = true;
			if ($foundMapFlag) {
				$PASS = $PASS+substr_count($map, '1');
				$FAIL = $FAIL+substr_count($map, 'X');
				$REF = $REF+substr_count($map, '+');
				$NULL = $NULL+substr_count($map, '.');
				$mapText .= $map."\n";
			}
		}
		// echo $mapText;die;
		if (strlen($mapText) <= 100) return false;

		preg_match_all('/DEVICE\:\s*(.*?)\n/', $text, $DEVICE);
		preg_match_all('/WAFERID\:\s*(.*?)\n/', $text, $WAFERID);
		preg_match_all('/X\:\s*(.*?)\n/', $text, $X);
		preg_match_all('/Y\:\s*(.*?)\n/', $text, $Y);
		preg_match_all('/GOOD\:\s*(.*?)\n/', $text, $_GOOD);
		preg_match_all('/FAIL\:\s*(.*?)\n/', $text, $_FAIL);
		preg_match_all('/FLAT\:\s*(.*?)\n/', $text, $_FLAT);

		$DEVICE 	= (isset($DEVICE[1][0]) ? $DEVICE[1][0] : "-");
		$WAFERID 	= (isset($WAFERID[1][0]) ? $WAFERID[1][0] : "-");
		$X 	= (isset($X[1][0]) ? $X[1][0] : "-");
		$Y 	= (isset($Y[1][0]) ? $Y[1][0] : "-");
		$_GOOD 	= (isset($_GOOD[1][0]) ? $_GOOD[1][0] : "-");
		$_FAIL 	= (isset($_FAIL[1][0]) ? $_FAIL[1][0] : "-");
		$_FLAT 	= (isset($_FLAT[1][0]) ? $_FLAT[1][0] : "-");

		$container = [$WAFERID.".txt", $DEVICE, $WAFERID, $X, $Y, $_GOOD, $_FAIL];
		$container = implode(",", $container);

		return [
			"convert" => true,
			"mapData" => [
				"filename" => $WAFERID.".txt",
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
						"FAIL",
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
				"header" => "FILE_NAME,DEVICE,WAFERID,X,Y,GOOD,FAIL",
				"container" => $container,
				"filename" => $WAFERID.".csv",
			]
		];
	}
}