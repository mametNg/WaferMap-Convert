<?php
/**
 * 
 */
use Controller\Controller;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class chat implements MessageComponentInterface {
    protected $clients;
    protected $controller;
    protected $console;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->controller = new Controller();

        $this->console = $this->controller->librarie("console");
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        $this->console->printSuccess("New client connected", 1);
        $this->console->printLight("Client ID : ".$conn->resourceId);
        $conn->send("Connected");
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        // echo sprintf('Connections %d sending message "%s" to %d other connection%s' . "\n", $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
        $this->console->printLight("Receiving command", 1);
        $this->console->printLight($msg, 1);

        $msgJson = @json_decode($msg, true);
        if (!$msgJson) {
            $this->console->printDanger("Error", 1);
            $this->console->printLight("Connection ID : ". $this->console->danger.$from->resourceId);
            $this->console->printLight("msg : ". $this->controller->e($msg));

            $from->send("Access denied!");
            return false;
        }

        if ((!isset($msgJson['target']) || empty($msgJson['target'])) && (!isset($msgJson['token']) || empty($msgJson['token']))) {
            $this->console->printDanger("Error", 1);
            $this->console->printLight("Connection ID : ". $this->console->danger.$from->resourceId);
            $this->console->printLight("msg : ". $this->controller->e($msg));

            $from->send("Access denied!");
            return false;
        }

        $tokens = $this->controller->w3llDecode($this->controller->e($msgJson['token']));
        if ($this->controller->e($tokens) == "") {
            $this->console->printDanger("Error", 1);
            $this->console->printLight("Client ID : ". $this->console->danger.$from->resourceId);
            $this->console->printLight("msg : ". $this->controller->e($msg));

            $from->send("Access denied!");
            return false;
        }

        $token = @json_decode($tokens, true);
        if (!$token) {
            $this->console->printDanger("Error", 1);
            $this->console->printLight("Connection ID : ". $this->console->danger.$from->resourceId);
            $this->console->printLight("msg : ". $this->controller->e($msg));

            $from->send("Access denied!");
            return false;
        }
        
        $path = $this->controller->e($msgJson['target']);
        $this->console->printLight("Client ID : ". $from->resourceId);
        $this->console->printLight("msg : ". $command);

        var_dump(json_encode($_SERVER));
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        $this->console->printWarning("Client disconnected", 1);
        $this->console->printLight("Client ID : ".$conn->resourceId);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        // echo "An error has occurred: {$e->getMessage()}\n";
        $this->console->printDanger("Error", 1);
        $this->console->printLight("Client ID : ". $this->console->danger.$conn->resourceId);
        $this->console->printLight("msg : ". $e->getMessage());
        $conn->close();
    }
}