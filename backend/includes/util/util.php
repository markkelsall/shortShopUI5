<?php
function checkStillLoggedIn () {
	if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] < 1800)) {
		$_SESSION['LAST_ACTIVITY'] = time();
		return true;
	} else {
		return false;
	}
}

function expireSession () {
	session_unset();
    session_destroy();
}
?>