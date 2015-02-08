<?php
class DbConn {
	private $con = null;
	
	private $host = "localhost"; //local: localhost live: ?????
	private $user = "root"; // local: root live: ?????
	private $pass = ""; //local: admin live: ?????
	private $db = "shortShop"; //local: teamVsTeam live: ?????
	
	public function dbConnect () {
		$con = new mysqli($this->host, $this->user, $this->pass, $this->db);
		
		// Check connection
		if ($con->connect_errno > 0) {
			throw new Exception("Failed to connect to MySQL: " . mysqli_connect_error());
		}
		
		$this->con = $con;
		return $con;
	}
	
	public function dbClose () {
		//close database connection
		$this->con->close();
	}
}
?>
