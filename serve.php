<?php
date_default_timezone_set('Asia/Jakarta');
ini_set('memory_limit', '-1');
set_time_limit(-1);
ini_set('max_input_vars', -1);
if (!isset($_SESSION)) session_start();
// Authorization: Bearer <token>

require_once __DIR__ . '/terminate/autoload.php';

use Controller\Controller;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class serve extends Controller
{
	
	function __construct()
	{
		// $this->config();
		// $this->ws = $this->librarie("chat");
	}

	public function index()
	{	
		## data form file
		$data = [];

		$server = IoServer::factory(
			new HttpServer(
				new WsServer(
					Controller::librarie("chat"),
				)
			),
			$this->base_port(),
			$this->base_host()
		);

		$server->run();
	}
}

$serve = new serve();
$serve->index();

