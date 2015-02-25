<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';

header('Content-Type: application/json');
session_start();

//get object sent
if(!isset($_GET['id']) || !isset($_GET['itemName']) || !isset($_GET['quantity'])) {
	$response = array('shoppingListItem'=> null,'result'=>FALSE, 'message'=>'The item id, name and quantity are required');
	echo json_encode($response);
	exit();
}

$userId = $_SESSION['loggedInUserId'];

$itemName = $_GET['itemName'];
$quantity = $_GET['quantity'];
$id = $_GET['id'];

$aisle = "";
if (isset($_GET['aisle'])) {
	$aisle = $_GET['aisle'];
}

$inStock = "";
if (isset($_GET['inStock'])) {
	$inStock = $_GET['inStock'];
}

$amount = "";
if (isset($_GET['amount'])) {
	$amount = $_GET['amount'];
}

$additionalComments = "";
if (isset($_GET['additionalComments'])) {
	$additionalComments = $_GET['additionalComments'];
}

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();

	$slid = new ShoppingListItemDAO($con);
	$itemsAffected = $slid->update($id, $itemName, $aisle, $inStock, $amount, $quantity, $additionalComments) ;
	
	//close database connection
	$dbConn->dbClose();
	
	if ($id == null || $id == "") {
		$response = array('result'=>FALSE, 'message'=>'Could not update item.');
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