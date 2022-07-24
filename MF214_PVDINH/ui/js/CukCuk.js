

$(document).ready(function(){
    //Lấy dữ liệu
    getData();
    getPosition();
    getDepartment();

    $('#Department').off("change");
    $('#Department').on("change", function(){
        getData();
    })

    $('#Position').off("change");
    $('#Position').on("change", function(){
        getData();
    })
    
    $('#page-size').off("change");
    $('#page-size').on("change", function(){
        getData();
    })

    $('.number').on("click", function(){
        $(`.menu-page`).find(".page-active").removeClass("page-active");
        $(this).addClass("page-active");
        getData();
    });

});

// Hàm format số tiền - copy
function FormatMoney(money){
    if(money && !isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
}
//
function Gender(number){
    if(number == 0)
        return "Nữ";
    else if(number == 1)
        return "Nam";
    else
        return "Khác";
}
//
function WorkStatus(number){
    if(number == 0)
        return "Chưa làm việc";
    else if(number == 1)
        return "Đang làm việc";
    else if(number == 2)
        return "Ngừng làm việc";
    else
        return "Đã nghỉ việc";
}
// Format ngày tháng - copy
function FormatDate(dateSrc){
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
}
function FormatDateInput(dateSrc){
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
//PhamDinh(13/7/2022): Tạo hàm kiểm tra dữ liệu bắt buộc phải nhập
function CheckData(data, dataName){
    if(!data){
        $(`#${dataName}`).addClass("boder-red");
        $(`#${dataName}`).attr("title","Bạn phải nhập thông tin này");
        return false;
    }
    else{
        $(`#${dataName}`).removeClass("boder-red");
        $(`#${dataName}`).removeAttr("title");
        return true;
    }
}
//Hàm kiểm tra định dạng email - copy trên mạng
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function StartForm(){
    //Ẩn form còn lại
    $('#DeleteForm').hide();
    //Hiện form thêm mới
    $('#AddForm').show();
    $("#EmployeeCode").focus();
    //Xóa dữ liệu trên form
    $("#AddForm input").val('');
    $('#AddForm select').prop('selectedIndex',0);
    //Ẩn form hiện tại
    $('#XAddForm').off("click");
    $('#XAddForm').on("click", function(){
        $('#AddForm').hide();
    });
    //Ẩn form hiện tại
    $('#CancelAdd').off("click");
    $('#CancelAdd').on("click", function(){
        $('#AddForm').hide();
    });

    let Url1 = "http://localhost/MF214_PVDINH/api/Position.php";
    $.ajax({
        url: Url1,
        method: "GET",
        dataType: "json"
    })
    .done(function(result){
        $('#PositionI').empty();
        $.each(result, function(index, item){
            let option = `<option value="`+item.positionCode+`">`+item.positionName+`</option>`;
            $('#PositionI').append(option);
        })
    })
    .fail(function(result){
        alert("Error for get position data");
    })

    let Url2 = "http://localhost/MF214_PVDINH/api/Department.php";
    $.ajax({
        url: Url2,
        method: "GET",
        dataType: "json"
    })
    .done(function(result){
        $('#DepartmentI').empty();
        $.each(result, function(index, item){
            let option = `<option value="`+item.departmentCode+`">`+item.departmentName+`</option>`;
            $('#DepartmentI').append(option);
        })
    })
    .fail(function(result){
        alert("Error for get department data");
    })
}
//PhamDinh(13/7/2022): Tạo hàm lấy dữ liệu của nhân viên
function getData(){
    let pCode, dCode, pNumber, pSize;
    pCode = $('#Position').val();
    dCode = $('#Department').val();
    pNumber = $('.page-active').text();
    pSize = $('#page-size').val();
    Url = "http://localhost/MF214_PVDINH/api/CukCuk.php";
    $.ajax({
        url: Url,
        method: "GET",
        dataType: "json",
        data: {
            pCode : $('#Position').val(),
            dCode : $('#Department').val(),
            pNumber : $('.page-active').text(),
            pSize : $('#page-size').val()
        }
    }).done(function(result){
        if(result){
            $('#EmployeeData').empty();
            $.each(result, function(index, item){
                let trTable = `<tr>
                <td>`+item.employeeCode+`</td>
                <td>`+item.employeeName+`</td>
                <td>`+Gender(item.gender)+`</td>
                <td class='align-center'>`+FormatDate(item.dateOfBirth)+`</td>
                <td>`+item.phone+`</td>
                <td>`+item.email+`</td>
                <td>`+item.positionName+`</td>
                <td>`+item.departmentName+`</td>
                <td class='align-right'>`+FormatMoney(item.salary)+`</td>
                <td>`+WorkStatus(item.workStatus)+`</td>
            </tr>`;
                $('#EmployeeData').append(trTable);
            })
        }
    }).fail(function(result){
    })
}
//PhamDinh(13/7/2022): Tạo hàm xử lý lưu dữ liệu nhân viên mới thêm
function ConfirmAdd(){
    var employee = {};
    employee.CreatedBy = "admin";
    employee.CreatedDate = new Date();
    employee.EmployeeCode = $("#EmployeeCode").val();
    employee.EmployeeName = $("#EmployeeName").val();
    employee.DateOfBirth = $("#DateOfBirth").val();
    if(employee.DateOfBirth == "") employee.DateOfBirth = null;
    employee.Gender = $("#Gender").val();
    employee.PeopleID = $("#PeopleID").val();

    employee.DateRange = $("#DateRange").val();
    if(employee.DateRange == "") employee.DateRange = null;
    employee.AddressRange = $("#AddressRange").val();
    employee.Email = $("#Email").val();
    employee.PositionCode = $("#PositionI").val();
    employee.Phone = $("#Phone").val();

    employee.DepartmentCode = $("#DepartmentI").val();
    employee.SingerCode = $("#SingerCode").val();
    employee.Salary = $("#Salary").val();
    if(employee.Salary == "") employee.Salary = 0;
    employee.DateOfJoin = $("#DateOfJoin").val();
    if(employee.DateOfJoin == "") employee.DateOfJoin = null;
    employee.WorkStatus = $("#WorkStatus").val();
    if(employee.WorkStatus == "") employee.WorkStatus = 0;

    let code = CheckData(employee.EmployeeCode, "EmployeeCode");
    let name = CheckData(employee.EmployeeName, "EmployeeName");
    let id = CheckData(employee.PeopleID, "PeopleID");
    let email = CheckData(employee.Email, "Email");
    let phone = CheckData(employee.Phone, "Phone");
    if(code && name && id && email && phone){
        if(!IsEmail(employee.Email)){
            $("#Email").addClass("boder-red");
            $("#Email").attr("title","Định dạng email không đúng");
        }
        else{
            $("#Email").removeClass("boder-red");
            $("#Email").removeAttr("title");
            $.ajax({
                url: "http://localhost/MF214_PVDINH/api/InsertEmployee.php",
                type: "POST",
                data: {
                    EmployeeCode: employee.EmployeeCode,
                    EmployeeName: employee.EmployeeName,
                    DateOfBirth: employee.DateOfBirth,
                    Gender: employee.Gender,
                    PeopleID: employee.PeopleID,
                    AddressRange: employee.AddressRange,
                    DateRange: employee.DateRange,
                    Email: employee.Email,
                    Phone: employee.Phone,
                    PositionCode: employee.PositionCode,
                    DepartmentCode: employee.DepartmentCode,
                    SingerCode: employee.SingerCode,
                    Salary: employee.Salary,
                    DateOfJoin: employee.DateOfJoin,
                    WorkStatus: employee.WorkStatus,
                    CreatedBy: employee.CreatedBy,
                    CreatedDate: employee.CreatedDate
                },
                dataType: "text"
            }).done(function(status){
                if(status == 0)
                    alert("Mã nhân viên này đã được sử dụng");
                else{
                    $('#AddForm').hide();
                    getData();
                }
            })
            .fail(function(status){
                alert("Insert error");
            })
        }
    }
}
function getPosition(){
    let Url = "http://localhost/MF214_PVDINH/api/Position.php";
    $.ajax({
        url: Url,
        method: "GET",
        dataType: "json"
    })
    .done(function(result){
        $.each(result, function(index, item){
            let option = `<option value="`+item.positionCode+`">`+item.positionName+`</option>`;
            $('#Position').append(option);
        })
    })
    .fail(function(result){
        alert("Error for get position data");
    })
}
function getDepartment(){
    let Url = "http://localhost/MF214_PVDINH/api/Department.php";
    $.ajax({
        url: Url,
        method: "GET",
        dataType: "json"
    })
    .done(function(result){
        $.each(result, function(index, item){
            let option = `<option value="`+item.departmentCode+`">`+item.departmentName+`</option>`;
            $('#Department').append(option);
        })
    })
    .fail(function(result){
        alert("Error for get department data");
    })
}
function DataForm(employeeCode){
    Url = "http://localhost/MF214_PVDINH/api/EmployeeData.php";
    $.ajax({
        url: Url,
        method: "GET",
        data: {
            employeeCode: employeeCode
        },
        dataType: "json"
    })
    .done(function(employee){
        $("#EmployeeCode").val(employeeCode);
        $("#EmployeeName").val(employee.EmployeeName);
        $("#DateOfBirth").val(FormatDateInput(employee.DateOfBirth));
        $("#Gender").val(employee.Gender);
        $("#PeopleID").val( employee.PeopleID);

        $("#DateRange").val(FormatDateInput(employee.DateRange));
        $("#AddressRange").val(employee.AddressRange);
        $("#Email").val(employee.Email);
        $("#PositionI").val(employee.PositionCode);
        $("#Phone").val(employee.Phone);

        $("#DepartmentI").val(employee.DepartmentCode);
        $("#SingerCode").val(employee.SingerCode);
        $("#Salary").val(employee.Salary);
        $("#DateOfJoin").val(FormatDateInput(employee.DateOfJoin));
        $("#WorkStatus").val(employee.WorkStatus);
    })
}
function UpdateData(employeeCode){
    var employee = {};
    employee.EmployeeCode = $("#EmployeeCode").val();
    employee.EmployeeName = $("#EmployeeName").val();
    employee.DateOfBirth = $("#DateOfBirth").val();
    if(employee.DateOfBirth == "") employee.DateOfBirth = null;
    employee.Gender = $("#Gender").val();
    employee.PeopleID = $("#PeopleID").val();

    employee.DateRange = $("#DateRange").val();
    if(employee.DateRange == "") employee.DateRange = null;
    employee.AddressRange = $("#AddressRange").val();
    employee.Email = $("#Email").val();
    employee.PositionCode = $("#PositionI").val();
    employee.Phone = $("#Phone").val();

    employee.DepartmentCode = $("#DepartmentI").val();
    employee.SingerCode = $("#SingerCode").val();
    employee.Salary = $("#Salary").val();
    if(employee.Salary == "") employee.Salary = 0;
    employee.DateOfJoin = $("#DateOfJoin").val();
    if(employee.DateOfJoin == "") employee.DateOfJoin = null;
    employee.WorkStatus = $("#WorkStatus").val();
    if(employee.WorkStatus == "") employee.WorkStatus = 0;

    let code = CheckData(employee.EmployeeCode, "EmployeeCode");
    let name = CheckData(employee.EmployeeName, "EmployeeName");
    let id = CheckData(employee.PeopleID, "PeopleID");
    let email = CheckData(employee.Email, "Email");
    let phone = CheckData(employee.Phone, "Phone");

    if(code && name && id && email && phone){
        if(!IsEmail(employee.Email)){
            $("#Email").addClass("boder-red");
            $("#Email").attr("title","Định dạng email không đúng");
        }
        else{
            Url = "http://localhost/MF214_PVDINH/api/UpdateEmployee.php";
            $.ajax({
                url: Url,
                type: "POST",
                data: {
                    EmployeeCode: employee.EmployeeCode,
                    EmployeeName: employee.EmployeeName,
                    DateOfBirth: employee.DateOfBirth,
                    Gender: employee.Gender,
                    PeopleID: employee.PeopleID,
                    AddressRange: employee.AddressRange,
                    DateRange: employee.DateRange,
                    Email: employee.Email,
                    Phone: employee.Phone,
                    PositionCode: employee.PositionCode,
                    DepartmentCode: employee.DepartmentCode,
                    SingerCode: employee.SingerCode,
                    Salary: employee.Salary,
                    DateOfJoin: employee.DateOfJoin,
                    WorkStatus: employee.WorkStatus,
                    CreatedBy: employee.CreatedBy,
                    CreatedDate: employee.CreatedDate
                },
                dataType: "text"
            }).done(function(res){
                getData();
                $('#AddForm').hide();
            })
            .fail(function(res){
                alert('Update error');
            });
        }
    }
}