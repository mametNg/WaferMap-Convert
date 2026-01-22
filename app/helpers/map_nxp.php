<?php

/**
* 
*/
use Controller\Controller;

class map_nxp extends Controller
{
	private $rpc1 = ["/", "*"];
	private $rpcd1 = ["0", "+"];

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

		$foundMapFlag = false;
		$PASS = 0;
		$FAIL = 0;
		$REF = 0;
		$NULL = 0;
		$mapText = "";
		$mapDataText = $xmlLoad['WAFER_MAP'];
		$waferID = $xmlLoad['HEADER']['WAFER_OCR_ID'];
		$goodQty = $xmlLoad['HEADER']['BIN_COUNT_PASS'];

		$colX = $xmlLoad['HEADER']['ROW_COUNT'];
		$colY = $xmlLoad['HEADER']['COLUMN_COUNT'];
		$len = strlen($mapDataText);
		for ($i = 0; $i < $len; $i += $colY) {
			$map = substr($mapDataText, $i, $colY);
			$mapTextTmp = str_replace($this->rpc1, $this->rpcd1, $map);

			$PASS = $PASS+substr_count($mapTextTmp, '1');
			$FAIL = $FAIL+substr_count($mapTextTmp, 'X');
			$REF = $REF+substr_count($mapTextTmp, '+');
			$NULL = $NULL+substr_count($mapTextTmp, '.');
			$mapText .= $mapTextTmp . "\n";
		}
		
		if (strlen($mapText) <= 100) return false;
		if (strlen($mapDataText) !== ($colX*$colY)) return false;
		
		$container = [$waferID, $waferID.".txt", $goodQty];
		$container = implode(",", $container);
		return [
			"convert" => true,
			"mapData" => [
				"filename" => $waferID.".txt",
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
				"filename" => $waferID.".csv",
			]
		];
	}
}