<?php
class ShoppingListItemDAO {
	
	private $dbConn = null;
	
	public function __construct($dbConn) {
		$this->dbConn = $dbConn;
	}
	
	public function create ($shoppingListHeaderId, $itemName, $aisle, $inStock, $dateCreated, $dateUpdated, $amount, $quantity, $additionalComments) {
		$sql = "INSERT INTO shoppingListItem (shoppingListHeaderId, itemName, aisle, inStock, dateCreated, dateUpdated, amount, quantity, additionalComments) VALUES
		 ($shoppingListHeaderId', '$itemName', '$aisle', '$inStock', '$dateCreated', '$dateUpdated', '$amount', '$quantity', '$additionalComments')";
		
		mysqli_query($this->dbConn,$sql);
		
		return mysqli_insert_id($this->dbConn);
	}
	
	public function read ($id) {
		$sql = "SELECT * FROM shoppingListItem WHERE id = '$id'";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$obj = new ShoppingListItemDTO();
			while ($row = $result->fetch_assoc()) {
				$obj = resultSetToObject($row);
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

	public function findAllItemsByHeaderId ($shoppingListHeaderId) {
		$sql = "SELECT * FROM shoppingListItem WHERE shoppingListHeaderId = '$shoppingListHeaderId'";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			$objArray = array();
			$i = 0;
			while ($row = $result->fetch_assoc()) {
				$obj = $this->resultSetToObject($row);
				$objArray[$i] = $obj;
				$i++;
			}
			return $objArray;
		}
	}

	public function resultSetToObject ($row) {
		$obj = new ShoppingListItemDTO();
		foreach ($row as $key => $value) {
			if (!empty($row[$key])) {
				//print "$key => $value\n";
				$obj->$key = $value;
			}
		}
		return $obj;
	}
}