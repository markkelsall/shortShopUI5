<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';

//get the user details from post
if(!isset($_POST['email']) || !isset($_POST['firstName']) || !isset($_POST['lastName']) ||
	|| !isset($_POST['password'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'Email, first name, last name and password are all required');
	echo json_encode($response);
	exit();
}

$email = $_POST['email'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$password = $_POST['password'];

$dbConn = new DbConn();
$con = $dbConn->dbConnect();

$user = new UserDAO($con);
$createResp = $user->create($email, $firstName, $lastName, $password);

//close database connection
$dbConn->dbClose();

if ($createResp != null && $createResp != "") {
	$response = array('result'=>TRUE, 'message'=>'User created.');
	echo json_encode($response);
} else {
	$response = array('result'=>FALSE, 'message'=>'Could not create user.');
	echo json_encode($response);
}
?>