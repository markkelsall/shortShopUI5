<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';

header('Content-Type: application/json');

//get object sent
if(!isset($_GET['itemName']) || !isset($_GET['quantity']) || !isset($_GET['amount'])) {
	$response = array('shoppingListItem'=> null,'result'=>FALSE, 'message'=>'The item name, quantity and amount are all required');
	echo json_encode($response);
	exit();
}

$itemName = $_GET['itemName'];
$quantity = $_GET['quantity'];
$amount = $_GET['amount'];

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	$slid = new ShoppingListItemDAO($con);
	$sli = $uslid->create($shoppingListItemId);
	
	//close database connection
	$dbConn->dbClose();
	
	if ($sli->id == null || $sli->id == "") {
		$response = array('user'=> $sli,'result'=>FALSE, 'message'=>'No item found');
		echo json_encode($response);
	} else {
		$response = array('user'=> $sli,'result'=>TRUE);
		echo json_encode($response);
	}
} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>