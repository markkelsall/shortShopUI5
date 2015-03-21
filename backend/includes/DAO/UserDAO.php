<?php
class UserDAO {
	
	private $dbConn = null;
	
	public function __construct($dbConn) {
		$this->dbConn = $dbConn;
	}
	
	public function create ($email, $firstName, $lastName, $password) {
		$sql = "INSERT INTO user VALUES (NULL, '$firstName', '$lastName', '$email', '$password', NOW(), NOW())";
		$this->dbConn->escape_string($sql);
		
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			return $this->dbConn->insert_id;
		}
	}
	
	public function read ($id) {
		$sql = "SELECT * FROM user WHERE id = '$id'";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$u = new UserDTO();
			while ($row = $result->fetch_assoc()) {
				$u = $this->resultSetToObject($row);
			}
			return $u;
		}
	}
	
	public function update ($id, $firstName, $lastName, $email) {
		
		$sql = "UPDATE user SET firstName='$firstName', lastName='$lastName', email='$email' WHERE id=$id";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			return true;
		}
	}
	
	public function updatePassword ($id, $password) {
		$sql = "UPDATE user SET password='$password' WHERE id=$id";

		if ($dbConn->query($sql) === TRUE) {
			return true;
		} else {
			return false;
		}
	}
	
	public function delete ($username) {
		$sql = "DELETE FROM user WHERE id=$id";
		
		if ($conn->query($sql) === TRUE) {
			return true;
		} else {
    		return false;
		}
	}
	
	public function login ($email) {
		$sql = "SELECT * FROM user WHERE email = '$email'";
		$this->dbConn->escape_string($sql);
		
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$u = new UserDTO();
			while ($row = $result->fetch_assoc()) {
				$u = $this->resultSetToObject($row);
			}
			return $u;
		}
	}

	public function checkEmailExists ($email) {
		$sql = "SELECT * FROM user WHERE email = '$email'";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$u = new UserDTO();
			while ($row = $result->fetch_assoc()) {
				$u = $this->resultSetToObject($row);
			}
			return $u;
		}
	}

	public function resultSetToObject ($row) {
		$obj = new UserDTO();
		foreach ($row as $key => $value) {
			if (!empty($row[$key])) {
				//print "$key => $value\n";
				$obj->$key = $value;
			}
		}
		return $obj;
	}
}