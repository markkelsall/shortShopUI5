<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/UserDTO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';

header('Content-Type: application/json');

//check email and password from post parameters
if(!isset($_GET['email']) || !isset($_GET['password'])) {
	$response = array('user'=> null,'result'=>FALSE, 'message'=>'Email and password are both required.');
	echo json_encode($response);
	exit();
}

session_start();

//get email and password from post parameters
$email = $_GET['email'];
$password = $_GET['password'];

try {
	//start database connection
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	//query against user table
	$user = new UserDAO($con);
	$u = $user->login($email, $password);
	
	//check for a response
	if ($u->id == null || $u->id == "") {
		$response = array('user'=> $u,'result'=>FALSE, 'message'=>'No user found');
		echo json_encode($response);
	} else {

		//save the logged in user details to the session for access later
		$_SESSION['loggedInUserId'] = $u->id;
		$_SESSION['loggedInUserFirstName'] = $u->firstName;
		$_SESSION['loggedInUserLastName'] = $u->lastName;
		$_SESSION['loggedInUserEmail'] = $u->email;

		//get the list header for the user
		$slhd = new ShoppingListHeaderDAO($con);
		$slh = $slhd->findByUserId($u->id);

		//save the list header id and count for access later
		$_SESSION['loggedInUserListHeaderId'] = $slh->id;
		$_SESSION['loggedInUserListHeaderCount'] = $slh->itemCount;
		
		$slid = new ShoppingListItemDAO($con);
		$slil = $slid->findAllItemsByHeaderId($slh->id);

		//close database connection
		$dbConn->dbClose();

		//need to figure out how to json encode array
		$response = array('user'=> $u, 'listHeader'=>$slh, 'listItems'=>$slil, 'result'=>TRUE);
		echo json_encode($response);
	}
} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>