<?php
include '../../includes/util/util.php';

header('Content-Type: application/json');
session_start();

try {
	expireSession();
	$response = array('user'=> null,'result'=>TRUE, 'message'=>"You have been logged out.");
	echo json_encode($response);
} catch (Exception $e) {
	$response = array('user'=> null,'result'=>TRUE, 'message'=>$e->getMessage());
	echo json_encode($response);
}
?>