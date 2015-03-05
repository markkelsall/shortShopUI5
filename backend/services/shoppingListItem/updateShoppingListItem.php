<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';

header('Content-Type: application/json');
session_start();

//get object sent
if(!isset($_POST['id']) || !isset($_POST['itemName']) || !isset($_POST['quantity'])) {
	$response = array('shoppingListItem'=> null,'result'=>FALSE, 'message'=>'The item id, name and quantity are required');
	echo json_encode($response);
	exit();
}

$userId = $_SESSION['loggedInUserId'];

$itemName = $_POST['itemName'];
$quantity = $_POST['quantity'];
$id = $_POST['id'];

$aisle = "";
if (isset($_POST['aisle'])) {
	$aisle = $_POST['aisle'];
}

$inStock = "";
if (isset($_POST['inStock'])) {
	$inStock = $_POST['inStock'];
}

$amount = "";
if (isset($_POST['amount'])) {
	$amount = $_POST['amount'];
}

$additionalComments = "";
if (isset($_POST['additionalComments'])) {
	$additionalComments = $_POST['additionalComments'];
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