<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';

//get the user details from post
if(!isset($_GET['email']) || !isset($_GET['firstName']) || !isset($_GET['lastName']) || !isset($_GET['password'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'Email, first name, last name and password are all required');
	echo json_encode($response);
	exit();
}

$email = $_GET['email'];
$firstName = $_GET['firstName'];
$lastName = $_GET['lastName'];
$password = $_GET['password'];
$password = $_GET['passwordAgain'];

try {

	$options = [
	    'cost' => 11,
	];

	$hash = password_hash($password, PASSWORD_BCRYPT, $options);
	
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();

	$$user->checkEmailExists($email);

	if ($user ) {

	}

	$userDao = new UserDAO($con);
	$userId = $userDao->create($email, $firstName, $lastName, $hash);

	if ($userId != null) {

		$slhd = new ShoppingListHeaderDAO($con);
		$listHeaderId = $slhd->create($userId);

		$response = array('result'=>TRUE, 'message'=>'User created.');
		echo json_encode($response);
	} else {
		$response = array('result'=>FALSE, 'message'=>'Could not create user.');
		echo json_encode($response);
	}

	$dbConn->dbClose();

} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>