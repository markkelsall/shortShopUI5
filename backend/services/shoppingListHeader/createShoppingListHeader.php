<?php
include '../../includes/DAO/DbConn.php';
include '../../includes/DAO/ShoppingListHeaderDAO.php';
include '../../includes/DTO/ShoppingListHeaderDTO.php';
session_start();


try {
	$dbConn = new DbConn();
	$con = $dbConn->dbConnect();
	
	$userId = $_SESSION['userId'];

	$slhd = new ShoppingListHeaderDAO($con);
	$slhr = $slhd->create($userId);
	
	//close database connection
	$dbConn->dbClose();
	
} catch (Exception $e) {
	
	
}
?>