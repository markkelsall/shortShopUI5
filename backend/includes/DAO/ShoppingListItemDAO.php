<?php
class ShoppingListItemDAO {
	
	private $dbConn = null;
	
	public function __construct($dbConn) {
		$this->dbConn = $dbConn;
	}
	
	public function create ($shoppingListHeaderId, $itemName, $aisle, $inStock, $amount, $quantity, $additionalComments) {
		$sql = "INSERT INTO shoppingListItem VALUES (NULL, '$shoppingListHeaderId', '$itemName', '$aisle', '$inStock', NOW(), '$amount', '$quantity', '$additionalComments', NOW(), 'GBP')";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			return $this->dbConn->insert_id;
		}
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
	
	public function update ($itemId, $itemName, $aisle, $inStock, $amount, $quantity, $additionalComments) {
		$sql = "UPDATE shoppingListItem SET itemName = '$itemName', aisle = '$aisle', inStock = '$inStock', amount = '$amount', quantity = '$quantity', additionalComments = '$additionalComments', dateUpdated = now() WHERE id = '$itemId'";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			return mysqli_affected_rows($this->dbConn);
		}
	}
	
	public function delete ($id) {
		$sql = "DELETE FROM shoppingListItem WHERE id = $id";
		$this->dbConn->escape_string($sql);
		if(!$result = $this->dbConn->query($sql)){
			throw new Exception('There was an error running the query [' . $this->dbConn->error . ']');
		} else {
			return mysqli_affected_rows($this->dbConn);
		}
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
				$objArray[$i] = $this->resultSetToObject($row);
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