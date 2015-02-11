<?php
class ShoppingListHeaderDAO {
	
	private $dbConn = null;
	
	public function __construct($dbConn) {
		$this->dbConn = $dbConn;
	}
	
	public function create ($userId) {
		$sql = "INSERT INTO shoppingListHeader (userId) VALUES ('$userId')";
		
		mysqli_query($this->dbConn,$sql);
		
		return mysqli_insert_id($this->dbConn);
	}
	
	public function read ($id) {
		$sql = "SELECT * FROM shoppingListHeader WHERE id = '$id'";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$obj = new ShoppingListHeaderDTO();
			while ($row = $result->fetch_assoc()) {
				$obj = $this->resultSetToObject($row);
			}
			return $u;
		}
	}
	
	public function update ($shoppingListHeaderId, $itemName, $aisle, $inStock, $dateUpdated, $amount, $quantity, $additionalComments) {
		//check to see if connection is valid
		
		//make db call using dbConn
		
		//return $result
	}
	
	public function delete ($username) {
		//check to see if connection is valid
		
		//make db call using dbConn
		
		//return $result
	}

	public function findByUserId ($userId) {
		$sql = "SELECT * FROM shoppingListHeader WHERE userId = '$userId'";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$obj = new ShoppingListHeaderDTO();
			while ($row = $result->fetch_assoc()) {
				$obj = $this->resultSetToObject($row);
			}
			return $obj;
		}
	}

	public function resultSetToObject ($row) {
		$obj = new ShoppingListHeaderDTO();
		foreach ($row as $key => $value) {
			if (!empty($row[$key])) {
				//print "$key => $value\n";
				$obj->$key = $value;
			}
		}
		return $obj;
	}
}