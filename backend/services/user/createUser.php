<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';

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
$password = $_POST['passwordAgain'];

try {

	$options = [
	    'cost' => 11,
	];

	$hash = password_hash($password, PASSWORD_BCRYPT, $options);

	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();

	$user = new UserDAO($con);
	$userId = $user->create($email, $firstName, $lastName, $hash);

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