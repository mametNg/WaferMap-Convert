<?php

/**
* 
*/
use Controller\Controller;

class map_stm extends Controller
{
	private $rpc1 = ["i", "¡", "�"];
	private $rpcd1 = '1';

	private $rpc2 = ['*','&','H','n','N','p','_','J','j','F','@','d','e','%','u','$','a','7','5','\\','U','0', 'g', ';', '\'', ')', 'P'];
	private $rpcd2 = 'X';

	private $rpc3 = ['}', '~', 'z'];
	private $rpcd3 = ['+', '.', '0'];

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
		$encodings = ['UTF-8', 'Windows-1252', 'ISO-8859-1', 'ASCII'];
		$text = mb_convert_encoding($text, 'UTF-8', implode(',', $encodings));
		$mapSplit = explode("\n", $text);
		foreach ($mapSplit as $key => $map) {
			if (substr($map, 0, 1) == "~") $foundMapFlag = true;
			if ($foundMapFlag && strlen($map) >= 55) {
				$mapTextTmp = str_replace($this->rpc1, $this->rpcd1, $map);
				$mapTextTmp = str_replace($this->rpc3, $this->rpcd3, $mapTextTmp);
				$mapTextTmp = str_replace($this->rpc2, $this->rpcd2, $mapTextTmp);

				$PASS = $PASS+substr_count($mapTextTmp, '1');
				$FAIL = $FAIL+substr_count($mapTextTmp, 'X');
				$REF = $REF+substr_count($mapTextTmp, '+');
				$NULL = $NULL+substr_count($mapTextTmp, '.');
				$mapText .= $mapTextTmp."\n";
			}
		}

		if (strlen($mapText) <= 100) return false;
		preg_match_all('/READER\s*(.*?)\s+\n/', $text, $READER);
		preg_match_all('/GOODS\s*(.*?)\s+\n/', $text, $GOODS);

		$READER 	= (isset($READER[1][0]) ? $READER[1][0] : "-");
		$GOODS 	= (isset($GOODS[1][0]) ? $GOODS[1][0] : "-");

		$container = [$filename.".txt", $READER, $GOODS];
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
					]
				],
			],
			"csv" => [
				"header" => "FILE_NAME,READER,GOODS",
				"container" => $container,
				"filename" => $filename.".csv",
			]
		];
	}
}