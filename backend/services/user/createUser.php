<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';
include '../../includes/util/util.php';

header('Content-Type: application/json');

//POST the user details from POST
if(!isset($_POST['email']) || !isset($_POST['firstName']) || !isset($_POST['lastName']) || !isset($_POST['password']) ||
	!isset($_POST['emailAgain']) || !isset($_POST['passwordAgain'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'All fields are required');
	echo json_encode($response);
	exit();
}

session_start();

$email = $_POST['email'];
$emailAgain = $_POST['emailAgain'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$password = $_POST['password'];
$passwordAgain = $_POST['passwordAgain'];

try {

	if ($password != $passwordAgain) {
		$response = array('user'=> null,'result'=>FALSE, 'message'=>"The passwords entered don't match.");
		echo json_encode($response);
		exit();
	}

	if ($email != $emailAgain) {
		$response = array('user'=> null,'result'=>FALSE, 'message'=>"The emails entered don't match.");
		echo json_encode($response);
		exit();
	}

	$hash = encrypt($password);
	
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();

	$userDao = new UserDAO($con);
	$user = $userDao->checkEmailExists($email);
	
	if ($user != null && $user->id != null) {
		//user exists so echo and finish
		$response = array('result'=>FALSE, 'message'=> $email.' already exists.');
		echo json_encode($response);
	} else {
		$userId = $userDao->create($email, $firstName, $lastName, $hash);

		if ($userId != null) {

			$slhd = new ShoppingListHeaderDAO($con);
			$listHeaderId = $slhd->create($userId);

			if ($listHeaderId != null) {

				//save the logged in user details to the session for access later
				$_SESSION['loggedInUserId'] = $userId;
				$_SESSION['loggedInUserFirstName'] = $firstName;
				$_SESSION['loggedInUserLastName'] = $lastName;
				$_SESSION['loggedInUserEmail'] = $email;

				$_SESSION['loggedInUserListHeaderId'] = $listHeaderId;

				$u = new stdClass();
   				$u->id = $userId;
   				$u->email = $email;
   				$u->firstName = $firstName;
   				$u->lastName = $lastName;

   				$slh = new stdClass();
   				$slh->userId = $userId;
				$slh->id = $listHeaderId;
				$slh->itemCount = 0;

				$response = array('user'=> $u, 'listHeader'=>$slh, 'result'=>TRUE);
				echo json_encode($response);
			}
			
		} else {
			$response = array('result'=>FALSE, 'message'=>'Could not create user.');
			echo json_encode($response);
		}
	}

	$dbConn->dbClose();

} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->POSTMessage());
	echo json_encode($response);
}
?>