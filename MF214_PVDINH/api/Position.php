<?php
	require 'ConnectionDB.php';
	$sql = "SELECT*FROM positions";
	$positions = $conn->query($sql);
	$positionList = array();
	while($row = $positions->fetch(PDO::FETCH_ASSOC)){
		$positionList[] = array('positionCode' => $row['PositionCode'],
							   'positionName' => $row['PositionName']);
	}
	echo json_encode($positionList);
?>