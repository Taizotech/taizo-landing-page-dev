var pathArray = window.location.pathname.split('/');
var baseUrl = "";
for (i = 1; i < pathArray.length - 1; i++) {
    baseUrl += pathArray[i];
    baseUrl += "/";
}
// if(localStorage.getItem("userID")==null || localStorage.getItem("userID")=='')
// {
//   window.location.assign(baseUrl+'login_new.html');
// }
var url_string = window.location.href
var url = new URL(url_string);
var draft_id = url.searchParams.get("job_id");

var $inputFrom = $(".js-input-from"),
    $inputsalary = $(".SalaryPerMon"),
    $inputTo = $(".js-input-to");
var custom_values = [7000, 10000, 25000, 40000, 50000];

// be careful! FROM and TO should be index of values array
var my_from = custom_values.indexOf(10);
var my_to = custom_values.indexOf(10000);
if (draft_id != null) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": getBaseUrl() + "/job/" + draft_id,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
            "cache-control": "no-cache"
        },
        "processData": false
    }
    $.ajax(settings).done(function(response) {
        if (response != "") {
            $('#jobRole').val(response.jobDetails.industry);
            $('#jobRoleCategory').val(response.jobDetails.jobCategory);
            $('#fromSal').val(response.jobDetails.salary);
            $('#SalaryPerMon').val("₹" + response.jobDetails.salary + " - ₹" + response.jobDetails.maxSalary);
            $('#toSal').val(response.jobDetails.maxSalary);
            $("#expYearChoose").val(response.jobDetails.jobExp).change();
            $("#Country").val(response.jobDetails.jobCountry);
            $("#longitude").val(response.jobDetails.jobLongitude);
            $("#latitude").val(response.jobDetails.jobLatitude);
            $("#State").val(response.jobDetails.state);
            $("#Area").val(response.jobDetails.area);
            $("#joblocaddress").val(response.jobDetails.jobLocationAddr);
            $("#City").val(response.jobDetails.jobLocation);
            $('input#callcontactperName').val(response.jobDetails.contactPersonName);
            $('input#callphone').val(response.jobDetails.mobileNumber);
            $('input#walkinContPerson').val(response.jobDetails.contactPersonName);
            $('input#walkinphone').val(response.jobDetails.mobileNumber);
            $("#walkinstartdate").val(response.jobDetails.wstartDate);
            $("#walkinenddate").val(response.jobDetails.wendDate);
            $("#walkinstarttime").val(response.jobDetails.wstartTime);
            $("#walkinendtime").val(response.jobDetails.wendTime);
            // $("#RequiredDoc").val().join(response.jobDetails.wdocRequired);
            $("#intlocaddress").val(response.jobDetails.waddress);
            $("#intLat").val(response.jobDetails.walkinLatitude);
            $("#intLong").val(response.jobDetails.walkinLongitude);
            $("#ApplyEmail").val(response.jobDetails.emailId);
            localStorage.setItem("wdocRequired", response.jobDetails.wdocRequired);
            if (response.jobDetails.jobLocationAddr != "") {
                $('.locaddtxt, .jsDtPerLocAddPrev').html(response.jobDetails.jobLocationAddr);
                $('.PsJsBdyWrp.active .JobLocationAdd').show();
                $('.PsJsSp1 .PSJobLocPlaceholderWrp').hide();
                $('.map-choose-location').text(response.jobDetails.jobLocationAddr);
                $("div.map-canvas").addClass('active');
                $(".map-sidebar-1").css("display", "block");
                $(".map-sidebar-2").css("display", "block");
            }
            if (response.jobDetails.jobExp == 0) {
                $("#expFresher").prop('checked', true);
                $('#expYearChoose').attr("disabled", true);
                $("#expYearChoose").val(0);
                $("#expYear").val(0);
            }
            $('.intlocaddtxt, .jsDtPerIntAddPrev').html(response.jobDetails.waddress);
            $('#intLong').val(response.jobDetails.walkinLongitude);
            $('#intLat').val(response.jobDetails.walkinLatitude);
            // $('#intlocaddress').val($("#lstJobAdr").val());
            $("#lstIntAdr").val(response.jobDetails.waddress);
            $("#lstIntLat").val(response.jobDetails.walkinLatitude);
            $("#lstIntLng").val(response.jobDetails.walkinLongitude);

            $("#rangePrimary").ionRangeSlider({
                type: "double",
                grid: true,
                grid_num: 4,
                min: 7000,
                max: 50000,
                from: response.jobDetails.salary,
                to: response.jobDetails.maxSalary,
                value: 0,
                step: 500,
                prefix: "$"
            });

        }
    });


} else {
    if (localStorage.getItem("salary") != null && localStorage.getItem("salary") != "") {
        my_from = localStorage.getItem("salary");
        my_to = localStorage.getItem("maxsalary");

        $("#rangePrimary").ionRangeSlider({
            type: "double",
            grid: true,
            grid_num: 4,
            min: 7000,
            max: 50000,
            from: my_from,
            to: my_to,
            value: 0,
            step: 500,
            prefix: "₹"
        });
    } else {

        $("#rangePrimary").ionRangeSlider({
            type: "double",
            grid: true,
            grid_num: 4,
            min: 7000,
            max: 50000,
            from: 14000,
            to: 20000,
            value: 0,
            step: 500,
            prefix: "₹"
        });
        $inputFrom.prop("value", 14000);
        $inputTo.prop("value", 20000);
        $inputFrom.prop("value", 14000);
        $inputsalary.prop("value", 14000);
    }

}

$("#rangePrimary").on("change", function() {
    var $this = $(this),
        value = $this.prop("value").split(";");
    var minPrice = value[0];
    var maxPrice = value[1];
    $inputFrom.prop("value", minPrice);
    $inputTo.prop("value", maxPrice);
    $inputFrom.prop("value", minPrice);
    $inputsalary.prop("value", minPrice);
});

$("#salaryConfirmBtn").click(function() {
    var max = $('#toSal').val();
    var min = $('#fromSal').val();

    // $(".SalaryPerMon").prop("value","£" + min + " - £" + max);
    $('#SalaryPerMon').val("₹" + min + " - ₹" + max);
    $('#SalaryPerMon').attr("disable", true);

});





$('.PsJs2Box').click(function() {
    $('.PsJs2Box').removeClass('active');
    $(this).addClass('active');
});




// header
// $.ajax({url: "logged-header.html", success: function(result){
//     $(".HeadrWrp").html(result);
//   }});
// End of header


// New map selection layout
$(document).on('click', '.PsJsBdyWrp.active span.PSJobLocBtn, .PsJsBdyWrp.active span.changeLocBtn', function() {
    $("#CurMapLoc").val($(this).attr('id'));
    // console.log($("#CurMapLoc").val());
    $("div.map-canvas").removeClass('active');
    $('.PsJsBdyWrp.active .locMapsWrp').fadeIn();
    $(".HeadrWrp").removeClass("sticky-top");
    if ($(this).attr('id') == "JobLoc") {
        $('.map-choose-location').text($("#joblocaddress").val());
    } else {
        $('.map-choose-location').text($("#intlocaddress").val());
    }
    //  $(".map-sidebar-1").css("display","block");
    //  $(".map-sidebar-2").css("display","block");
});

$(document).on('click', '.PsJsBdyWrp.active span.locMapsWrpClsBtn', function() {
    $('.PsJsBdyWrp.active .locMapsWrp').fadeOut();
    $(".HeadrWrp").addClass("sticky-top");

    //  $('#latitude').val('');
    //  $('#longitude').val('');
    //  $('#City').val('');
    //  $('#joblocaddress').val('');
    //  $('.intlocaddtxt, .jsDtPerIntAddPrev').html('');
    //  $('.PsJsBdyWrp.active .JobLocationAdd').show();
    // 	$('.PsJsSp1 .PSJobLocPlaceholderWrp').hide();
});

$(document).on('keypress', '.callphone', function(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
        return true;
    } else {
        return false;
    }
});

$(document).on('click', '.cancel-map', function() {
    $('.PsJsBdyWrp.active .locMapsWrp').fadeOut();
    $(".HeadrWrp").addClass("sticky-top");
    //  $('#latitude').val('');
    //  $('#longitude').val('');
    //  $('#City').val('');
    //  $('#joblocaddress').val('');
    //  $('.intlocaddtxt, .jsDtPerIntAddPrev').html('');
    //  $('.PsJsBdyWrp.active .JobLocationAdd').show();
    // 	$('.PsJsSp1 .PSJobLocPlaceholderWrp').hide();
});

$(document).on('click', '.confirm-map', function() {
    $('.PsJsBdyWrp.active .locMapsWrp').fadeOut();
    $(".HeadrWrp").addClass("sticky-top");
    //  $('.intlocaddtxt, .jsDtPerIntAddPrev').html('');
    $('.PsJsBdyWrp.active .JobLocationAdd').show();
    $('.PsJsSp1 .PSJobLocPlaceholderWrp').hide();
    if ($("#CurMapLoc").val() == "JobLoc") {
        // console.log($("#lstJobCty").val());
        $('.locaddtxt, .jsDtPerLocAddPrev').html($("#lstJobAdr").val());
        $('#City').val($("#lstJobCty").val());
        $('#longitude').val($("#lstJobLng").val());
        $('#latitude').val($("#lstJobLat").val());
        $('#jsJbAddress').text($("#lstJobAdr").val());
        $('#joblocaddress').val($("#lstJobAdr").val());
        $('#locaddtxt').text($("#lstJobAdr").val());
        $('#Country').val($("#lstJobCunt").val());
        $('#State').val($("#lstJobStat").val());
        $('#Area').val($("#lstJobAre").val());

        if ($(".intlocaddtxt").text() == "") {
            $('.intlocaddtxt, .jsDtPerIntAddPrev').html($("#lstJobAdr").val());
            $('#intCity').val($("#lstJobCty").val());
            $('#intLong').val($("#lstJobLng").val());
            $('#intLat').val($("#lstJobLat").val());
            $('#intlocaddress').val($("#lstJobAdr").val());
            $('#locaddtxt').text($("#lstJobAdr").val());
        }
    }

    if ($("#CurMapLoc").val() == "IntLoc") {
        // console.log($("#lstIntCty").val());
        $('.intlocaddtxt, .jsDtPerIntAddPrev').html($("#lstIntAdr").val());
        $('#intCity').val($("#lstIntCty").val());
        $('#intLong').val($("#lstIntLng").val());
        $('#intLat').val($("#lstIntLat").val());
        $('#jsJbAddress').text($("#lstIntAdr").val());
        $('#intlocaddress').val($("#lstIntAdr").val());
        $('#locaddtxt').text($("#lstIntAdr").val());
        // console.log("asd");
    }

    if ($(this).data('stp') == 2) {
        $('.intLocPlcMapwrp').css('display', 'none');
        $('.intLocationAdd').css('display', 'block');
    }

});

$(document).on('click', '#expFresher', function() {
    if ($("#expFresher").is(':checked') == true) {
        $('#expYearChoose').attr("disabled", true);
        $("#freshers").addClass("");
        $("#expYearChoose").val(11);

        // $("#expYearChoose").text(parseInt(0));
        $("#expYear").val(0);
    } else {
        $('#expYearChoose').attr("disabled", false);
        $("#freshers").addClass("hidden");
        $("#expYearChoose").val("");
        $("#expYear").val("");
    }
});

$(document).on('click change', '#expYearChoose', function() {
    $("#expYear").val($(this).val());
});
$(document).on('click', '.btn-job-industry', function() {
    $(".btn-job-industry").removeClass('active');
    $(this).addClass('active');
    $("#jobRole").val($(this).attr('data-value'));
});

$(document).on('click', '.btn-job-role', function() {
    $(".btn-job-role").removeClass('active');
    // to show the confirm btn after jobRole selected
    $("#confirmBtn").removeClass('hidden')
    $(this).addClass('active');
    $("#jobRoleCategory").val($(this).attr('data-value'));
    $(".body-submit-btn").show();
    $(".invalid-confirm").hide();
});
$(document).on('click', '.confirm-job-role', function() {
    if ($("#jobRoleCategory").val() != "") {
        $(".close").trigger('click');
    } else {
        $(".invalid-confirm").show();
        $(".invalid-confirm").css("color", 'red');
    }

});
// to hide the confirm btn after dissmisal of modal
$(document).on('click', "#closeBtn", function() {
    $('#confirmBtn').addClass("hidden");
})

$(document).ready(function() {
        $('#curType').val('₹ INR');
    })
    // New map selection layout



//Load Industry Data
$(document).on('click', 'input#jobRoleCategory', function() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": getBaseUrl() + "/jobIndustries",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
            "cache-control": "no-cache"
        },
        "processData": false
    }

    $.ajax(settings).done(function(response) {
        if (response.data != "" && response.data.length > 0) {
            var str = '';
            for (var i = 0; i < response.data.length; i++) {
                str = str + '<button type="button" class="btn-job-industry" data-id="' + response.data[i].id + '"  data-value="' + response.data[i].industry + '">' + response.data[i].industry + ' </button>';
            }
            $(".list-industry").html('');
            $(".list-industry").html(str);
            $(".body-list-role").hide();
            $(".body-submit-btn").hide();

        }
    });
});

$(document).on('click', '.btn-job-industry', function() {

    var id = $(this).attr('data-id');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": getBaseUrl() + "/fullTimeJobRoles?industry_id=" + id,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
            "cache-control": "no-cache"
        },
        "processData": false
    }

    $.ajax(settings).done(function(response) {
        // console.log(response.data);
        if (response.data != "" && response.data.length > 0) {
            $(".body-list-role").css("display", 'block');
            var str = '';

            for (var i = 0; i < response.data.length; i++) {
                str = str + '<button type="button" class="btn-job-role" data-id="' + response.data[i].id + '" data-value="' + response.data[i].jobRoles + '">' + response.data[i].jobRoles + ' </button>';
            }
            $(".list-role").html('');
            $(".list-role").html(str);
            $(".body-list-role").show();
        }

    });
});




$(document).on('click', '#expFresher', function() {
    if ($("#expFresher").is(':checked') == true) {
        $('#expYear').attr("disabled", true);
    } else {
        $('#expYear').attr("disabled", false);
    }
});






function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}


// Post a job - step 1
$('.NxtStp2  a.NxtStpBtn').click(function() {

    // step 1 validation

    var stp1count = 0;
    var readed = 0;
    $('.PsJsSp1 .reqdField').each(function() {
        if ($(this).val() == null || $(this).val() == "") {
            $(this).parents('.form-group').addClass('error');
            stp1count++;
        } else {
            $(this).parents('.form-group').removeClass('error');
        }
        // console.log($(this).val() + "  " + readed++);
    });
    if ($("#showCmpnyNm").val() == "") {
        $(".valError").removeClass("d-none");
        stp1count++;

    }

    if ($('.PsJsSp1 #nwjblat').val() == "") {
        $('.PsJsSp1 #map-search').parents('.form-group').addClass('error');
        stp1count++;
    } else {
        $('.PsJsSp1 #map-search').parents('.form-group').removeClass('error');
    }

    // console.log("stp1count: " + stp1count);

    if (stp1count == 0) {

        //   localStorage.setItem('jobId', response.id);


        // API call for Step 1
        let jbindustry = $('#jobRoleCategory').val();
        let jbCategory = $('#jobRole').val();
        let jbminsal = $('#fromSal').val();
        let jbmaxsal = $('#toSal').val();
        let jbexp = $('#expYear').val();
        let jbcmpnme = $('#nwjbcmpnme').val();
        let jbcmpaddrs = $('#nwjbaddress').val();
        let jbcmpcnty = $('#nwjbcmpcountry').val();
        let jbcmpstate = $('#nwjbcmpstate').val();
        let jbcmpcity = $('#nwjbcmpcty').val();
        let jbcmparea = $('#nwjbarea').val();
        let jbcmplat = $('#nwjblat').val();
        let jbcmplng = $('#nwjblng').val();
        // alert($('#nwjbarea').val())

        // console.log(emailId,empID);

        var jobApi = {
            "async": true,
            "crossDomain": true,
            "url": getBaseUrl() + "/webPostJob",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "authorization": "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
                "cache-control": "no-cache",
                "postman-token": "62e1b270-12a3-197d-edc5-96f167557895"
            },
            "processData": false,
            "data": "{\r\n  \"industry\": \"" + jbindustry + "\",\r\n  \"jobCategory\": \"" + jbCategory + "\",\r\n  \"minSalary\": " + jbminsal + ",\r\n  \"maxSalary\": " + jbmaxsal + ",\r\n  \"jobExp\": " + jbexp + ",\r\n  \"companyName\": \"" + jbcmpnme + "\",\r\n  \"jobLocationAddr\": \"" + jbcmpaddrs + "\",\r\n  \"jobCountry\": \"" + jbcmpcnty + "\",\r\n  \"state\": \"" + jbcmpstate + "\",\r\n  \"jobCity\": \"" + jbcmpcity + "\",\r\n  \"area\": \"" + jbcmparea + "\",\r\n  \"jobLatitude\": \"" + jbcmplat + "\",\r\n  \"jobLongitude\": \"" + jbcmplng + "\"\r\n,\r\n  \"emailId\": \"string\"\r\n,\r\n  \"employerId\": 0\r\n}"
        }

        $.ajax(jobApi).done(function(response) {
            // console.log(response);
            localStorage.setItem("pstJbEmpID", response.id);
            $(".PsJbSave").attr("id", 2);
            $('.PsJsBdyWrp').removeClass('active');
            $('.PgLstItem.stp1').addClass('full');
            $('.PsJsSp2').addClass('active');
            $('.PgLstItem.stp2').addClass('active');
            $('a.PsJbSave').addClass('active');
            $('a.PsJbSave span').html('Saved');
            // window.location.href="/console/index.html";
        });
        // end of API call for Step 1



    }

    // end of step 1 validation
    return false;
});
// end of Post a job - step 1

// registration
$(document).on('click', '.registercontinuebtn', function() {

    var regCount = 0;

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    $(".RegstepOne input").each(function() {
        if (!isNaN(this.value)) {
            $(this).parent().addClass('error');
            //regCount++;
        } else {
            $(this).parent().removeClass('error');
        }
    });
    // Email validation
    var emailid = $('.RegstepOne #regemail').val();
    if (emailid) {
        if (!validateEmail(emailid)) {
            $('.RegstepOne #regemail').parent().addClass('error');
            $('.valid-email').html('Please enter valid Email id');
            regCount++;
        } else {
            $('.RegstepOne #email').parent().removeClass('error');
        }
    }
    // Email validation
    if (!document.getElementById('registerpolicy').checked) {
        $('.registerpolicybox').addClass('error');
        regCount++;
    } else {
        $('.registerpolicybox').removeClass('error');
    }


    // password validation
    var passwordRegix = /.{8,}/
    var password = $('#regpwd').val();
    if (password) {
        if (passwordRegix.test(password) == false) {
            $('.valid-password').html(`Password must be a minimum of 8 characters `);
            $('.RegstepOne #regpwd').parent().addClass('error');
            regCount++;
        } else {
            $('.RegstepOne #regpwd').parent().removeClass('error');
        }
    }

    // End of password validation

    if (regCount === 0) {

        $('.regbtnwrp').html('<img src="images/loader.gif">');

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": getBaseUrl() + "/register?email_id=" + emailid + "&password=" + password,
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "authorization": "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
                "cache-control": "no-cache",
            }
        }

        $.ajax(settings).done(function(response) {
            if (response.message == "Register Successfully") {
                let emailId = $('.RegstepOne #regemail').val();
                let PsjobID = localStorage.getItem('pstJbEmpID');

                // console.log(emailId,empID);

                var jobApi = {
                    "async": true,
                    "crossDomain": true,
                    "url": getBaseUrl() + "/webEmpRegister?job_id=" + PsjobID + "&email_id=" + emailId,
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "authorization": "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": "{\r\n  \"emailId\": \"" + emailId + "\"\r\n}"
                }

                $.ajax(jobApi).done(function(response) {
                    //Localhost
                    // window.open(
                    //     'http://127.0.0.1:5500/taizoemployer-bootstrap/post-a-job.html?redirect=true&emp_id=' + response.employerId + '&job_id=' + response.id,
                    //     '_self'
                    // );
                    // window.open(
                    //     'http://localhost/taizoemployer-bootstrap/post-a-job.html?redirect=true&emp_id=' + response.employerId + '&job_id=' + response.id,
                    //     '_self'
                    // );
                    // window.location.href('http://localhost/taizoemployer-bootstrap/post-a-job.html?redirect=true&emp_id=' + response.employerId + '&job_id=' + response.id);

                    //Development
                    // window.open(
                    //     'http://console/post-a-job.html?redirect=true&emp_id=' + response.employerId + '&job_id=' + response.id,
                    //     '_self'
                    // );


                });

            } else if (response.message == "Email ID Already exists") {
                $('.regbtnwrp').html('<a class="btn registercontinuebtn">Next</a>');
                $('.RegstepOne .valid-email').html("Email ID already Exist.");
                $('.RegstepOne #regemail').parent().addClass('error');
            }
        });

    }

});
// End of registration

// autocomplete


$(document).ready(function() {
    let areaArr = [];
    let cityArr = [];

    let cityNames = {
        "async": true,
        "crossDomain": true,
        "url": getBaseUrl() + "/cities?state_id=0",
        "method": "GET"
    }
    $.ajax(cityNames).done(function(response) {
        // console.log(response);
        let city = response.data;

        let cityName = " ";

        for (let i = 0; i < city.length; i++) {

            cityName = cityName + `<li class=" dropdown-item " data-cityId="${city[i].id}">${city[i].city}</li>`
            cityArr.push(city[i].city);


        }
        $("#cityList").html(cityName);

        $("#cityList li.dropdown-item").click(function() {
            $(".areaField").removeClass("d-none")
            $(".areacontainer").css("margin-top", "7px")

            $('#nwjbcmpcty').val($(this).html());
            $(".validate3").addClass('d-none');
            let cityid = $(this).attr("data-cityId");
            // console.log("cityId" + cityid);

            let areaNames = {
                "async": true,
                "crossDomain": true,
                "url": getBaseUrl() + "/areas?city_id=" + cityid,
                "method": "GET"
            }

            $.ajax(areaNames).done(function(res) {
                    let areaName = ""

                    // console.log(res);
                    let area = res.data;
                    for (let i = 0; i < area.length; i++) {

                        // areaName = areaName + `<li class=" dropdown-item " data-cityId="${area[i].id}">  ${area[i].area} </li>`
                        areaName = areaName + `<option  value="${area[i].area}">${area[i].area}</option>`
                            // areaArr.push(area[i].area);


                    }
                    // console.log(areaArr)
                    $("#nwjbarea").html(`<option  value="0">-- select --</option>` + areaName);
                    $("#nwjbarea").select2({
                        dropdownParent: $("#locateModal .modal-content")
                    });

                    // $("#areaList").html(areaName);

                })
                // $("#nwjbarea").autocomplete({

        })

    })


    $(".cnfrmLoctn").click(function() {
        let cmpnyname = $("#nwjbcmpnme").val();
        let preCmpnyAdd = localStorage.getItem("cmpnyAdd");
        if (preCmpnyAdd != $("#nwjbaddress").val()) {
            $("#nwjblng").val(null);
            $("#nwjblat").val(null);

        }

        if ((($("#nwjbcmpnme").val() != "") || ($("#map-search").val() != "")) && ($("#nwjbarea").val() != null && $("#nwjbarea").val() != "0") && ($("#nwjbcmpcty").val() != "") && ($("#nwjbaddress").val() != "")) {
            $(".btn-close").trigger("click");
            $("#changeadress,#cmpnyAdress").removeClass("d-none");
            $(".valError").addClass("d-none");
            $("#showCmpnyNm").val(cmpnyname);
            $("#cmpnyAdress").html(`   <span style=" font-size: 13px;
            font-weight: bold;">Address</span><br>` + $("#nwjbaddress").val())

            if ($("#map-search").val() != "") {
                if ($("#nwjbcmpnme").val() == null || $("#nwjbcmpnme").val() == "") {
                    $("#nwjbcmpnme").val($("#map-search").val());
                    $("#showCmpnyNm").val($("#nwjbcmpnme").val());
                }
                // alert($("#nwjbcmpnme").val());
            }
        }

        // location popup validation
        if (($("#nwjbcmpnme").val() != "") || ($("#map-search").val() != "")) {
            $(".validate1").addClass('d-none');
        } else {
            $(".validate1").addClass('valError');
            $(".validate1").removeClass('d-none');
        }
        if ($("#nwjbarea").val() != null && $("#nwjbarea").val() != "0") {
            $(".validate2").addClass('d-none');
        } else {
            $(".validate2").addClass('valError');
            $(".validate2").removeClass('d-none');
        }
        if ($("#nwjbcmpcty").val() != "") {
            $(".validate3").addClass('d-none');
        } else {
            $(".validate3").addClass('valError');
            $(".validate3").removeClass('d-none');
        }
        if ($("#nwjbaddress").val() != "") {
            $(".validate4").addClass('d-none');
        } else {
            $(".validate4").addClass('valError');
            $(".validate4").removeClass('d-none');
        }

        // let string = $("#nwjbcmpcty").val();
        // console.log(typeof string)

        // let citycheck = cityArr.indexOf("Chennai");
        // console.log(cityArr)
        // console.log(citycheck);

        // if (citycheck != -1) {
        //     $(".validcity").addClass('d-none');
        // } else {
        //     $(".validcity").addClass('valError');
        //     $(".validcity").removeClass('d-none');

        // }





        // location popup validation end


    })
})


// change address
$('.chgSltdCmpBtn').click(function() {
    $('.sltCmpnme').show();
    $('.sltedCmpnme').hide();
    $('input#map-search').val("");
    $('#nwjblat').val("");
    $("#nwjbarea").val("0");
    $("#nwjbcmpnme").addClass("d-none");
    $("#nwjbcmpcty").val('');
    $("#nwjbaddress").val("");
    $("#nwjbcmpnme").val("");
    $('#chngbtn').addClass("d-none")
    $("#showCmpnyNm").val("");
    $("#cmpnyAdress").addClass("d-none");
    $("#changeadress").addClass("d-none");
    $("#nwjbarea").html('');
    $(".areaField").addClass("d-none");

})


$("body").on('click', '#togglePassword', function() {
    $(this).toggleClass("bi bi-eye ");

    var input = $("#regpwd");

    if (input.attr("type") === "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
// cnfrmLctn




// change address


// Existing email id
// $('.RegstepOne #regemail').change(function(){

// var emailid = $(this).val();

//   console.log(emailid);

// function validateEmail($email) {
//   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//   return emailReg.test( $email );
// }

// if(validateEmail(emailid)) {
//   var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": getBaseUrl()+"/register?email_id="+emailid+"&password=test12345",
//   "method": "POST",
//   "headers": {
//     "content-type": "application/json",
//     "authorization": "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
//     "cache-control": "no-cache",
//   },
//   "processData": false,
//   "data": "{\r\n  \"emailId\": \""+emailid+"\"\r\n}"
// }

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });
// }

// });
// End of Existing email id