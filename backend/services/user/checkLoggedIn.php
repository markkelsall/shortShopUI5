<?php
include '../../includes/util/util.php';

header('Content-Type: application/json');
session_start();

$loggedIn = checkStillLoggedIn();

if ($loggedIn != true) {
	expireSession();
	$response = array('result'=>FALSE, 'message'=>'Please login.');
	echo json_encode($response);
} else {
	$response = array('result'=>TRUE, 'message'=>'Still logged in.');
	echo json_encode($response);
}
?>