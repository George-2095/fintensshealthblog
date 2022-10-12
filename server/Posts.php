<?php
class Posts
{
    public function index()
    {
        require_once __DIR__ . '/Connect.php';
        $array = array();
        $posts = "SELECT * FROM `posts` ORDER BY `id` DESC";
        $postsresult = $connect->conn->query($posts);
        if ($postsresult->num_rows > 0) {
            while ($postsrow = $postsresult->fetch_assoc()) {
                $array[] = $postsrow;
            }
        }
        echo json_encode($array);
    }

    public function makepost()
    {
        require_once __DIR__ . '/Connect.php';
        session_start();
        if (isset($_SESSION['username'])) {
            $username = $_SESSION['username'];
            $authuser = "SELECT * FROM `users` WHERE `username` = '$username'";
            $authuserresult = $connect->conn->query($authuser);
            if ($authuserresult->num_rows === 1) {
                while ($authuserrow = $authuserresult->fetch_assoc()) {
                    if ($authuserrow['privileges'] === 'admin') {
                        $data = json_decode(file_get_contents("php://input"), true);
                        $post = $data['post'];
                        $makepost = "INSERT INTO `posts`(`post`)VALUES('$post')";
                        if ($connect->conn->query($makepost) !== TRUE) {
                            echo "Insert error: " . $makepost . ' ' . $connect->conn->error;
                        }
                    } else {
                        echo "You can not make a post";
                    }
                }
            }
        }
    }
}

$posts = new Posts();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $posts->index();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $posts->makepost();
}
