<?php
class Connect
{
    public $conn;
    public function __construct()
    {
        define('DB_HOST', 'localhost');
        define('DB_USER', 'root');
        define('DB_PASSWORD', '');
        define('DB_NAME', 'fitnesshealthblog');

        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if ($this->conn->connect_error) {
            die($this->conn->conn->connect_error);
        }
    }
}

$connect = new Connect();
