<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';

header('Content-Type: application/json');
session_start();

//get object sent
if(!isset($_GET['name']) || !isset($_GET['quantity'])) {
	$response = array('shoppingListItem'=> null,'result'=>FALSE, 'message'=>'The item name, quantity and amount are all required');
	echo json_encode($response);
	exit();
}

$userId = $_SESSION['loggedInUserId'];
$listHeaderId = $_SESSION['loggedInUserListHeaderId'];

$itemName = $_GET['name'];
$quantity = $_GET['quantity'];
$additionalComments = $_GET['additionalComments'];

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();

	$slid = new ShoppingListItemDAO($con);
	$id = $slid->create($listHeaderId, $itemName, '1', 'Y', '10.99', $quantity, $additionalComments);
	
	$slhd = new ShoppingListHeaderDAO($con);
	$id = $slhd->updateItemCount($listHeaderId);
	
	//close database connection
	$dbConn->dbClose();
	
	if ($id == null || $id == "") {
		$response = array('item'=> $id,'result'=>FALSE, 'message'=>'Could not create item.');
		echo json_encode($response);
	} else {
		$response = array('item'=> $id,'result'=>TRUE);
		echo json_encode($response);
	}
} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>