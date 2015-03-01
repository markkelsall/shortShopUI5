<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';

header('Content-Type: application/json');
session_start();

//get object sent
if(!isset($_GET['id'])) {
	$response = array('shoppingListItem'=> null,'result'=>FALSE, 'message'=>'The item id is required');
	echo json_encode($response);
	exit();
}

$userId = $_SESSION['loggedInUserId'];
$listHeaderId = $_SESSION['loggedInUserListHeaderId'];

$id = $_GET['id'];

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();

	$slid = new ShoppingListItemDAO($con);
	$itemsAffected = $slid->delete($id);
	
	$slhd = new ShoppingListHeaderDAO($con);
	$id = $slhd->updateItemCount($listHeaderId, "minus");

	//close database connection
	$dbConn->dbClose();
	
	if ($id == null || $id == "") {
		$response = array('result'=>FALSE, 'message'=>'Could not delete item.');
		echo json_encode($response);
	} else {
		$response = array('item'=> $itemsAffected,'result'=>TRUE);
		echo json_encode($response);
	}
} catch (Exception $e) {
	$response = array('item'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>