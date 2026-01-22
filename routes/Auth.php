<?php

$app = require_once dirname(__DIR__) . '/config/app.php';
$db = require_once dirname(__DIR__) . '/config/database.php';

define('DB_HOST', $db['db_host']);
define('DB_USER', $db['db_user']);
define('DB_PASS', $db['db_pass']);
define('DB_NAME', $db['db_name']);
define('DB_DRIVER', $db['db_driver']);
define("BASE_URL", $app['url']);
define("SERVER_NAME", $app['websocket']['host']);
define("SERVER_PORT", $app['websocket']['port']);
define("SOCK_CLIENT", $app['websocket']['client']);