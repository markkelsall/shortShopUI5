<?php
class ShoppingListHeaderDAO {
	
	private $dbConn = null;
	
	public function __construct($dbConn) {
		$this->dbConn = $dbConn;
	}
	
	public function create ($userId) {
		$sql = "INSERT INTO shoppingListHeader (userId) VALUES ('$userId')";
		$this->dbConn->escape_string($sql);
		
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			return $this->dbConn->insert_id;
		}
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

	public function updateItemCount ($itemHeaderId, $operator) {

		$sql = "SELECT `itemCount` FROM `shoppingListHeader` WHERE `id` = '$itemHeaderId'";
		
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$obj = new ShoppingListHeaderDTO();
			$itemCount = 0;
			while ($row = $result->fetch_assoc()) {
				$itemCount = $row['itemCount'];
			}

			if ($operator == "add") {
				$itemCount = $itemCount + 1;
			} else if ($operator == "minus") {
				$itemCount = $itemCount - 1;
			}
			
			
			$sql = "UPDATE shoppingListHeader SET itemCount = '$itemCount', dateUpdated = NOW() WHERE id = '$itemHeaderId'";
			$this->dbConn->escape_string($sql);
			if(!$result = $this->dbConn->query($sql)){
				throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
			} else {
				return mysqli_affected_rows($this->dbConn);
			}
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