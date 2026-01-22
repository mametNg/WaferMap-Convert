<?php

/**
 * 
 */

use Controller\Controller;

class console extends Controller
{
	public $numb		= 1;
    public $danger   	= "\033[31;1m";
    public $success  	= "\033[32;1m";
    public $warning  	= "\033[33;1m";
    public $primary  	= "\033[34;1m";
    public $purple   	= "\033[35;1m";
    public $info     	= "\033[36;1m";
    public $light    	= "\033[37;1m";

	function __construct()
	{
		// code...
	}

	public function printLight($msg='', $numb=false)
    {
        if ($numb) {
            echo $this->numb .".\t| ". date("Y-m-d H:i:s") ." | ". $this->light . $msg . $this->light ."\n";
            $this->numb++;
        }

        if (!$numb) {
            echo "\t| ". date("Y-m-d H:i:s") ." | ". $this->light . $msg . $this->light ."\n";
        }
    }

	public function printSuccess($msg='', $numb=false)
    {
        if ($numb) {
            echo $this->numb .".\t| ". date("Y-m-d H:i:s") ." | ". $this->success . $msg . $this->light ."\n";
            $this->numb++;
        }

        if (!$numb) {
            echo "\t| ". date("Y-m-d H:i:s") ." | ". $this->success . $msg . $this->light ."\n";
        }
    }

	public function printDanger($msg='', $numb=false)
    {
        if ($numb) {
            echo $this->numb .".\t| ". date("Y-m-d H:i:s") ." | ". $this->danger . $msg . $this->light ."\n";
            $this->numb++;
        }

        if (!$numb) {
            echo "\t| ". date("Y-m-d H:i:s") ." | ". $this->danger . $msg . $this->light ."\n";
        }
    }

	public function printWarning($msg='', $numb=false)
    {
        if ($numb) {
            echo $this->numb .".\t| ". date("Y-m-d H:i:s") ." | ". $this->warning . $msg . $this->light ."\n";
            $this->numb++;
        }

        if (!$numb) {
            echo "\t| ". date("Y-m-d H:i:s") ." | ". $this->warning . $msg . $this->light ."\n";
        }
    }

	public function printPrimary($msg='', $numb=false)
    {
        if ($numb) {
            echo $this->numb .".\t| ". date("Y-m-d H:i:s") ." | ". $this->primary . $msg . $this->light ."\n";
            $this->numb++;
        }

        if (!$numb) {
            echo "\t| ". date("Y-m-d H:i:s") ." | ". $this->primary . $msg . $this->light ."\n";
        }
    }

	public function printPurple($msg='', $numb=false)
    {
        if ($numb) {
            echo $this->numb .".\t| ". date("Y-m-d H:i:s") ." | ". $this->purple . $msg . $this->light ."\n";
            $this->numb++;
        }

        if (!$numb) {
            echo "\t| ". date("Y-m-d H:i:s") ." | ". $this->purple . $msg . $this->light ."\n";
        }
    }

	public function printInfo($msg='', $numb=false)
    {
        if ($numb) {
            echo $this->numb .".\t| ". date("Y-m-d H:i:s") ." | ". $this->info . $msg . $this->light ."\n";
            $this->numb++;
        }

        if (!$numb) {
            echo "\t| ". date("Y-m-d H:i:s") ." | ". $this->info . $msg . $this->light ."\n";
        }
    }
}