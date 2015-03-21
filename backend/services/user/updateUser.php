<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';
include '../../includes/util/util.php';

header('Content-Type: application/json');

//POST the user details from POST
if(!isset($_POST['email']) || !isset($_POST['firstName']) || !isset($_POST['lastName']) ||
	!isset($_POST['emailAgain'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'All fields are required');
	echo json_encode($response);
	exit();
}

session_start();

$email = $_POST['email'];
$emailAgain = $_POST['emailAgain'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];

try {

	if ($email != $emailAgain) {
		$response = array('user'=> null,'result'=>FALSE, 'message'=>"The emails entered don't match.");
		echo json_encode($response);
		exit();
	}
	
	$userId = $_SESSION['loggedInUserId'];

	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();

	$userDao = new UserDAO($con);
	$u = $userDao->update($userId, $firstName, $lastName, $email);
	
	if ($u != null && $u == true) {
		//user exists so echo and finish
		$response = array('result'=>TRUE, 'message'=> 'Details updated.');
		echo json_encode($response);
	} else {
		$response = array('result'=>FALSE, 'message'=>"We couldn't update your details.");
		echo json_encode($response);
	}

	$dbConn->dbClose();

} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>