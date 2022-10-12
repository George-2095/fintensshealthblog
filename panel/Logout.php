<?php
class Logout
{
    public function __construct()
    {
        session_start();

        session_destroy();
        header('location: http://localhost:8000/panel/login.html');
    }
}

$logout = new Logout();
