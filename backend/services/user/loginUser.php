<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';
include '../../includes/util/util.php';

header('Content-Type: application/json');

//check email and password from post parameters
if(!isset($_POST['email']) || !isset($_POST['password'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'Email and password are both required.');
	echo json_encode($response);
	exit();
}

session_start();

//get email and password from post parameters
$email = $_POST['email'];
$password = $_POST['password'];

try {
	//start database connection
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	//query against user table
	$user = new UserDAO($con);
	$u = $user->login($email);
	
	//verify password with hash
	if(!comparePassword($password, $u->password)) {
		$response = array('user'=> null,'result'=>FALSE, 'message'=>"Sorry, the password provided doesn't match.");
		echo json_encode($response);
		exit();
	}

	//check for a response
	if ($u->id == null || $u->id == "") {
		$response = array('user'=> null,'result'=>FALSE, 'message'=>'No user found');
		echo json_encode($response);
	} else {
		$u->password = "";

		//save the logged in user details to the session for access later
		$_SESSION['loggedInUserId'] = $u->id;
		$_SESSION['loggedInUserFirstName'] = $u->firstName;
		$_SESSION['loggedInUserLastName'] = $u->lastName;
		$_SESSION['loggedInUserEmail'] = $u->email;
		$_SESSION['LAST_ACTIVITY'] = time();
		
		//get the list header for the user
		$slhd = new ShoppingListHeaderDAO($con);
		$slh = $slhd->findByUserId($u->id);
		
		//save the list header id for access later
		$_SESSION['loggedInUserListHeaderId'] = $slh->id;
		
		$slid = new ShoppingListItemDAO($con);
		$slil = $slid->findAllItemsByHeaderId($slh->id);
		
		//close database connection
		$dbConn->dbClose();

		$_SESSION['LAST_ACTIVITY'] = time();
		
		$response = array('user'=> $u, 'listHeader'=>$slh, 'result'=>TRUE, 'listItems'=>$slil);
		echo json_encode($response);
	}
} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>