<?php
class DbConn {
	private $con = null;
	
	private $host = "";
	private $user = "";
	private $pass = "";
	private $db = "";
	
	public function __construct() {
		$this->determineServer();
	}

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

	private function determineServer () {
		if($_SERVER['SERVER_NAME'] == 'localhost') {
			$this->host = "localhost";
			$this->user = "root";
			$this->pass = "";
			$this->db = "shortShop";
		} else {
			$this->host = "mysql09.iomart.com";
			$this->user = "kelshh177";
			$this->pass = "markr879";
			$this->db = "kelshh177";
		}
	}
}
?>