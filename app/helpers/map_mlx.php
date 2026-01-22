<?php

/**
* 
*/
use Controller\Controller;

class map_mlx extends Controller
{
	private $rpc1 = ["t", "T"];
	private $rpcd1 = ['+', '+'];

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
			if (substr($map, 0, 1) == ".") $foundMapFlag = true;
			if ($foundMapFlag && strlen($map) >= 55) {
				$mapTextTmp = str_replace($this->rpc1, $this->rpcd1, $map);

				$PASS = $PASS+substr_count($mapTextTmp, '1');
				$FAIL = $FAIL+substr_count($mapTextTmp, 'X');
				$REF = $REF+substr_count($mapTextTmp, '+');
				$NULL = $NULL+substr_count($mapTextTmp, '.');
				$mapText .= $mapTextTmp."\n";
			}
		}

		if (strlen($mapText) <= 100) return false;
		preg_match_all('/WaferId\:\s*(.*?)\s+\n/', $text, $WaferId);
		preg_match_all('/Pickable\:\s*(.*?)\s+\n/', $text, $Pickable);

		$WaferId 	= (isset($WaferId[1][0]) ? $WaferId[1][0] : "-");
		$Pickable 	= (isset($Pickable[1][0]) ? $Pickable[1][0] : "-");

		$container = [$WaferId, $WaferId.".txt", $Pickable];
		$container = implode(",", $container);
		return [
			"convert" => true,
			"mapData" => [
				"filename" => $WaferId.".txt",
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
					]
				],
			],
			"csv" => [
				"header" => "WAFER_ID,FILENAME,QTY",
				"container" => $container,
				"filename" => $WaferId.".csv",
			]
		];
	}
}