<?php
session_start();
class Auth
{
    public function index()
    {
        require_once __DIR__ . '/Connect.php';
        $array = array();
        if (isset($_SESSION['username'])) {
            $username = $_SESSION['username'];
            $authuser = "SELECT * FROM `users` WHERE `username` = '$username'";
            $authuserresult = $connect->conn->query($authuser);
            if ($authuserresult->num_rows === 1) {
                while ($authuserrow = $authuserresult->fetch_assoc()) {
                    $array[] = $authuserrow;
                }
            }
        }
        echo json_encode($array);
    }

    public function login()
    {
        require_once __DIR__ . '/Connect.php';
        if (!isset($_SESSION['username'])) {
            $data = json_decode(file_get_contents("php://input"), true);
            $username = htmlspecialchars($data['username']);
            $password = md5(htmlspecialchars($data['password']));
            $login = "SELECT * FROM `users` WHERE `username` = '$username' AND `password` = '$password'";
            $loginresult = $connect->conn->query($login);
            if ($loginresult->num_rows === 1) {
                $_SESSION['username'] = $username;
            } else {
                echo 'A username or a password is incorrected';
            }
        }
    }
}

$auth = new Auth();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $auth->index();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth->login();
}
