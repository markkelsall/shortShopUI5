<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';

header('Content-Type: application/json');

//get userId from post
if(!isset($_POST['userId'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'No user ID supplied');
	echo json_encode($response);
	exit();
}

$userId = $_POST['userId'];

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	$user = new UserDAO($con);
	$u = $user->read($userId);
	
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