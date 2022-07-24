<?php
	require 'ConnectionDB.php';
	$position = $_GET['pCode'];
	$department = $_GET['dCode'];
	$pageNumber = $_GET['pNumber'];
	$pageSize = $_GET['pSize'];
	$skip = ($pageNumber-1)*$pageSize;
	$code = "";
	$page = " LIMIT $skip, $pageSize ";
	if($position == -1 && $department == -1){
    $code = "";
  }
  else if($position != -1 && $department == -1){
    $code = " WHERE e.PositionCode = $position ";
  }
  else if ($position == -1 && $department != -1){
    $code = " WHERE e.DepartmentCode = $department ";
  }
  else{
    $code = " WHERE e.PositionCode = $position AND e.DepartmentCode = $department ";
  }
	$sql = " SELECT
      e.EmployeeID,
      e.EmployeeCode,
      e.EmployeeName,
      e.DateOfBirth,
      e.Gender,
      e.PeopleID,
      e.AddressRange,
      e.DateRange,
      e.Email,
      e.Phone,
      e.PositionCode,
      p.PositionName,
      e.DepartmentCode,
      d.DepartmentName,
      e.SingerCode,
      e.Salary,
      e.DateOfJoin,
      e.WorkStatus,
      e.CreatedDate
    FROM  `wdt.2022.pvdinh`.`employee` e
      INNER JOIN  `wdt.2022.pvdinh`.`department` d
        ON e.DepartmentCode = d.DepartmentCode
      INNER JOIN  `wdt.2022.pvdinh`.`positions` p
        ON e.PositionCode = p.PositionCode 
		$code 
		ORDER BY CreatedDate DESC
		$page;";
	$employees = $conn->query($sql);
	$employeeList = array();
	while($row = $employees->fetch(PDO::FETCH_ASSOC)){
		$employeeList[] = array('employeeCode' => $row['EmployeeCode'],
							   'employeeName' => $row['EmployeeName'],
							   'gender' => $row['Gender'],
							   'dateOfBirth' => $row['DateOfBirth'],
							   'phone' => $row['Phone'],
							   'email' => $row['Email'],
							   'positionName' => $row['PositionName'],
							   'departmentName' => $row['DepartmentName'],
							   'salary' => $row['Salary'],
							   'workStatus' => $row['WorkStatus']);
	}
	echo json_encode($employeeList);
?>