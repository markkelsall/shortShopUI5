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

function encrypt ($password) {
	// $hash = password_hash($password, PASSWORD_BCRYPT);
	// return $hash;
	$hash = crypt($password, "st");
	return $hash;
}

function comparePassword ($password, $hash) {
	// if (password_verify($password, $hash)) {
	//     return true;
	// } else {
	// 	return false;
	// }
	$pHash = encrypt($password);
	if ($pHash == $hash) {
		return true;
	} else {
		return false;
	}
}
?>