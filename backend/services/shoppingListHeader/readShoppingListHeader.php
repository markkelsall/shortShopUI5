<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingHeaderDAO.php';
include '../../includes/DTO/ShoppingHeaderDTO.php';

header('Content-Type: application/json');

//get shoppingListItem from post
if(!isset($_GET['shoppingListHeaderId'])) {
	$response = array('slh'=> null,'result'=>FALSE, 'message'=>'No shopping header item ID supplied');
	echo json_encode($response);
	exit();
}

$shoppingListHeaderId = $_GET['shoppingListHeaderId'];

try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	$slhd = new ShoppingListHeaderDAO($con);
	$slh = $slhd->read($shoppingListHeaderId);
	
	//close database connection
	$dbConn->dbClose();
	
	if ($slh->id == null || $slh->id == "") {
		$response = array('slh'=> $slh,'result'=>FALSE, 'message'=>'No header found');
		echo json_encode($response);
	} else {
		$response = array('slh'=> $slh,'result'=>TRUE);
		echo json_encode($response);
	}
} catch (Exception $e) {
	$response = array('slh'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>