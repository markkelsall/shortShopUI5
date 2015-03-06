<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/util/util.php';
include '../../includes/DAO/UserDAO.php';
include '../../includes/DTO/UserDTO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';

header('Content-Type: application/json');
session_start();

try {
	$loggedIn = checkStillLoggedIn();

	if ($loggedIn == true) {

		//start database connection
		$dbConn = new DbConn();
		$con = $dbConn->dbConnect();

		$user = new UserDAO($con);
		$u = $user->checkEmailExists($_SESSION['loggedInUserEmail']);

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
	} else {
		exit();
	}
} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>