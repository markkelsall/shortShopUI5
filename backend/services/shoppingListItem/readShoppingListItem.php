<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingListItemDAO.php';
include '../../includes/DTO/ShoppingListItemDTO.php';

header('Content-Type: application/json');

//get shoppingListItem from post
if(!isset($_POST['shoppingListItemId'])) {
	$response = array('shoppingListItem'=> null,'result'=>FALSE, 'message'=>'No shopping list item ID supplied');
	echo json_encode($response);
	exit();
}

$shoppingListItemId = $_POST['shoppingListItemId'];

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	$slid = new ShoppingListItemDAO($con);
	$sli = $uslid->read($shoppingListItemId);
	
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