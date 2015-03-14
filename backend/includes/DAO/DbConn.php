<?php
class DbConn {
	private $con = null;
	
	private $host = "mysql09.iomart.com"; //local: localhost live: mysql09.iomart.com
	private $user = "kelshh177"; // local: root live: kelshh177
	private $pass = "markr879"; //local: "" admin live: markr879
	private $db = "kelshh177"; //local: shortShop live: kelshh177
	
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
