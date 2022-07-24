<?php
    require "ConnectionDB.php";

    $EmployeeCode = $_POST['EmployeeCode'];
	$EmployeeName = $_POST['EmployeeName'];
	if(empty($_POST['DateOfBirth']))
		$DateOfBirth = null;
	else
		$DateOfBirth = $_POST['DateOfBirth'];

	$Gender = $_POST['Gender'];
	$PeopleID = $_POST['PeopleID'];
	if(empty($_POST['AddressRange']))
		$AddressRange = "";
	else
		$AddressRange = $_POST['AddressRange'];

	if(empty($_POST['DateRange']))
		$DateRange = null;
	else
		$DateRange = $_POST['DateRange'];

	$Email = $_POST['Email'];
	$Phone = $_POST['Phone'];
	$PositionCode = $_POST['PositionCode'];
	$DepartmentCode = $_POST['DepartmentCode'];
	if(empty($_POST['SingerCode']))
		$SingerCode = "";
	else
		$SingerCode = $_POST['SingerCode'];

	if(empty($_POST['Salary']))
		$Salary = 0;
	else	
		$Salary = $_POST['Salary'];

	if(empty($_POST['DateOfJoin']))
		$DateOfJoin = null;
	else	
		$DateOfJoin = $_POST['DateOfJoin'];

	if(empty($_POST['WorkStatus']))
		$WorkStatus = 0;
	else
		$WorkStatus = $_POST['WorkStatus'];

    $sql = "UPDATE employee SET 
    EmployeeName = :EmployeeName,
    DateOfBirth = :DateOfBirth,
    Gender = :Gender,
    PeopleID = :PeopleID,
    DateRange = :DateRange,
    AddressRange = :AddressRange,
    Email = :Email,
    Phone = :Phone,
    SingerCode = :SingerCode,
    Salary = :Salary,
    DateOfJoin = :DateOfJoin,
    WorkStatus = :WorkStatus,
    PositionCode = :PositionCode,
    DepartmentCode = :DepartmentCode
    WHERE EmployeeCode = :EmployeeCode;";

    $stmt = $conn->prepare($sql);
    $parameters = array('EmployeeCode'=>$EmployeeCode,
						'EmployeeName'=>$EmployeeName,
						'DateOfBirth'=>$DateOfBirth,
						'Gender'=>$Gender,
						'PeopleID'=>$PeopleID,
						'AddressRange'=>$AddressRange,
						'DateRange'=>$DateRange,
						'Email'=>$Email,
						'Phone'=>$Phone,
						'PositionCode'=>$PositionCode,
						'DepartmentCode'=>$DepartmentCode,
						'SingerCode'=>$SingerCode,
						'Salary'=>$Salary,
						'DateOfJoin'=>$DateOfJoin,
						'WorkStatus'=>$WorkStatus);
	$stmt->execute($parameters);
?>