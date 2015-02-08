<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';

header('Content-Type: application/json');

//get userId from post
if(!isset($_GET['email']) || !isset($_GET['password'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'Email and password are both required.');
	echo json_encode($response);
	exit();
}

$email = $_GET['email'];
$password = $_GET['password'];

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	$user = new UserDAO($con);
	$u = $user->login($email, $password);
	
	//close database connection
	$dbConn->dbClose();
	
	if ($u->id == null || $u->id == "") {
		$response = array('user'=> $u,'result'=>FALSE, 'message'=>'No user found');
		echo json_encode($response);
	} else {
		$response = array('user'=> $u,'result'=>TRUE);
		echo json_encode($response);
	}
} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>