<?php
function checkStillLoggedIn () {
	if (isset($_SESSION['LAST_ACTIVITY'])) {
		if (time() - $_SESSION['LAST_ACTIVITY'] < 1800) {
			$_SESSION['LAST_ACTIVITY'] = time();
			return true;
		} else {
			expireSession();
			$response = array('result'=>FALSE, 'message'=>'Please login again.');
			echo json_encode($response);
			return false;
		}
	} else {
		expireSession();
		$response = array('result'=>FALSE);
		echo json_encode($response);
		return false;
	}
}

function expireSession () {
	session_unset();
    session_destroy();
}

function encrypt($string) {
	$salt = getGlobalSalt();
	$enc_pass = sha1($salt.$string);
	return $enc_pass;
}
 
function getGlobalSalt() {
        return "random";
}
?>