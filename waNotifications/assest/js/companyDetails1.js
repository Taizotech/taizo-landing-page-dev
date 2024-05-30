// check  setLocalStorage.js  for page status !!!
let noError,
  email_Cd,
  empDetails,
  empId,
  empId_Cd,
  mobileNum,
  currentUrl,
  currentStatus,
  verifyEmailId;
let city_list_Arr = [];
let errFieldsArr = [];
let doc_Loction = window.location.href;
let urlStatus = new URL(doc_Loction);
let admin_id = urlStatus.searchParams.get("admin_id");

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

// Google auto complete

function EmployerValidationFN() {
  noError = 0;
  errFieldsArr = [];
  let defaultLogo = $("#companyImg").attr("src");
  if (defaultLogo == "images/Company-Logo.png") {
    // $("#companyImg").parents(".form-group").addClass("error");
    // noError++;
  } else {
    var fileInput = document.getElementById("myfile");
    var filePath = fileInput.value;
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
      // alert('Invalid file type');
      fileInput.value = "";
      $(".fileValidate").text("Invalid file type");
      $("#companyImg").parents(".form-group").addClass("error");
      noError++;
    } else {
      $("#companyImg").parents(".form-group").removeClass("error");
    }
    // $("#companyImg").parents('.form-group').removeClass("error");
  }
  if ($("#industry").val() == "") {
    $("#industry").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#industry").parents(".form-group").removeClass("error");
  }
  if ($("#business_type").val() == "") {
    $("#business_type").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#business_type").parents(".form-group").removeClass("error");
  }
  if ($("#companyName").val() == "") {
    $("#companyName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#companyName").parents(".form-group").removeClass("error");
  }
  if ($("#cityName").val() == "") {
    $("#cityName").parents(".form-group").addClass("error");
    noError++;
  } else {
    if (city_list_Arr.indexOf($("#cityName").val()) != -1) {
      $("#cityName").parents(".form-group").removeClass("error");
    } else {
      $(".city_err_text").text("Result not found");
      $("#cityName").parents(".form-group").addClass("error");
      setTimeout(() => {
        $("#cityName").val("");
      }, 2000);
    }
  }
  if ($("#emailValue").val() == "") {
    $(".emailError").text("Please enter your email id");
    $("#emailValue").parents(".form-group").addClass("error");
    noError++;
  } else {
    let emailId = $("#emailValue").val();
    if (!validateEmail(emailId)) {
      $(".emailError").text("Please enter a valid email address");
      $("#emailValue").parents(".form-group").addClass("error");
      noError++;
    } else {
      $("#emailValue").parents(".form-group").removeClass("error");
    }
  }
  if ($("#areaName").val() == "") {
    $("#areaName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#areaName").parents(".form-group").removeClass("error");
  }
  if ($("#addressText").val() == "") {
    $("#addressText").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#addressText").parents(".form-group").removeClass("error");
  }
  if ($("#latitudeName").val() == "") {
    $("#latitudeName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#latitudeName").parents(".form-group").removeClass("error");
  }
  if ($("#longitueName").val() == "") {
    $("#longitueName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#longitueName").parents(".form-group").removeClass("error");
  }
  if ($("#contactName").val() == "") {
    $("#contactName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#contactName").parents(".form-group").removeClass("error");
  }
  if ($("#websiteURL").val() == "") {
    websiteUrl = null;
  } else {
    websiteUrl = $("#websiteURL").val();
  }
  if ($("#numOfEmployes").val() == "") {
    $("#numOfEmployes").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#numOfEmployes").parents(".form-group").removeClass("error");
  }
  if ($("#whatapp_number").val() == "") {
    addError("whatapp_number");
    noError++;
  } else if (
    $("#whatapp_number").val().length > 0 &&
    $("#whatapp_number").val().length < 10
  ) {
    addError("whatapp_number");
    noError++;
  } else {
    removeError("whatapp_number");
  }
  if ($("#mobileNum").val() == "") {
    addError("mobileNum");
    noError++;
  } else if (
    $("#mobileNum").val().length > 0 &&
    $("#mobileNum").val().length < 10
  ) {
    addError("mobileNum");
    noError++;
  } else {
    removeError("mobileNum");
  }
  // if ($("#contactNum").val() == "") {
  //   $("#contactNum").parents('.form-group').addClass("error");
  //   noError++;
  // } else {
  //   $("#contactNum").parents('.form-group').removeClass("error");
  // }
  if ($("#yearFound").val() == "") {
    $("#yearFound").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#yearFound").parents(".form-group").removeClass("error");
  }
  if ($("#gstNum").val() == "") {
    $("#gstNum").parents(".form-group").addClass("error");
    noError++;
  } else {
    ValidateGst($("#gstNum").val());
  }
  if ($("#referalOption").val() == "") {
    $("#referalOption").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#referalOption").parents(".form-group").removeClass("error");
  }
}
$("#nextStep1").click(function () {
  // alert("hihihi")
  EmployerValidationFN();
  // window.scrollTo(0, document.body.scrollHeight);
  contactDetailsApiFn1();
  // console.log(noError);
});

// function ValidateEmail(mail) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//     // alert("correct")
//     $("#emailValue").parents(".form-group").removeClass("error");
//     return true;
//   } else {
//     // $(".emailError").removeClass("d-none");
//     $(".emailError").text("Please enter a valid email address");
//     $("#emailValue").parents(".form-group").addClass("error");
//     noError++;
//     // alert("You have entered an invalid email address!")
//     return false;
//   }
// }

function ValidateGst(gst) {
  let testGst = gst.toUpperCase();
  if (/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(testGst)) {
    $("#gstNum").parents(".form-group").removeClass("error");
    // return (true)
  } else {
    $("#gstNum").parents(".form-group").addClass("error");
    noError++;
    // alert("You have entered an invalid email address!")
    // return (false);
  }
}

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
// UPLOAD COMPANY LOGO
$("#companyImg_btn , #uploadLogo").click(function () {
  $("#myfile").prop("disabled", false);
  $("#myfile").click();
});
var loadImg = function (event) {
  //Gk_console.log("Img change");
  var output = document.getElementById("companyImg");
  output.src = URL.createObjectURL(event.target.files[0]);
  $("#uploadLogo").text("Change");
  removeError("companyImg");
  // console.log(output.src);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
    // free memory
  };
};

function matched_city_status() {
  // console.log("matched_city_status");
  let city_matched = false;
  let entered_city = $("#cityName").val().toUpperCase();

  let cityNames = {
    async: false,
    crossDomain: true,
    url: getBaseUrl() + "/cities?state_id=0",
    method: "GET",
  };
  $.ajax(cityNames).done(function (response) {
    cities = response.data;
    // console.log(response);

    cities.map((el) => {
      if (el.city.toUpperCase() == entered_city) {
        city_matched = true;
        // console.log("city matched");
      }
    });
  });

  return city_matched;
}
var settings = {
  async: true,
  crossDomain: true,
  url: getBaseUrl() + "/jobIndustries",
  method: "GET",
};

$.ajax(settings).done(function (response) {
  // //Gk_console.log(response.results);
  if (response.data != "" && response.data.length > 0) {
    //Gk_console.log(response.data);
    var str = "";
    for (var i = 0; i < response.data.length; i++) {
      str =
        str +
        `<option value="${response.data[i].industry}">${response.data[i].industry}</option>`;
    }
    //Gk_console.log(str);
    $("#industry").html("");
    $("#industry").html(
      `<option selected  value="">Select Industry</option>` + str
    );
  }
});
let city_matched = matched_city_status();
// console.log(city_matched);
if (noError == 0) {
  let companyLogo = response.data.companyLogo;
  let industry = $("#industry").val();
  let area = $("#areaName").val();
  let company = $("#companyName").val();
  let address = $("#addressText").val();
  email_Cd = $("#emailValue").val();
  let city_string = $("#cityName").val();
  let city = city_string.charAt(0).toUpperCase() + city_string.slice(1);
  let category = $("#business_type").val();

  let obj = {
    companyName: company.trim(),
    emailId: email_Cd,
    address: address.trim(),
    area: area.trim(),
    city: city,
    pincode: user_location_details.pin_code,
    state: user_location_details.state,
    country: user_location_details.country,
    industry: industry,
    latitude: user_location_details.latitude,
    longitude: user_location_details.longitude,
    mobileCountryCode: "91",
    mobileNumber: mobileNum,
    phoneCountryCode: null,
    category: category,
  };

  if (city_matched) {
    var settings = {
      async: true,
      crossDomain: true,
      url: getBaseUrl() + "/companyBasicDetails",
      method: "POST",
      // dataType: "application/json",
      contentType: "application/json; charset=utf-8",
      processData: false,
      data: JSON.stringify(obj),
    };

    $.ajax(settings).done(function (res) {
      // console.log(res.data.emailId);
      // console.log(res);

      empId_Cd = res.data.id;
      localStorage.setItem("userID", res.data.id);
      clevertap.onUserLogin.push({
        Site: {
          // Name: res.data.companyName, // String
          Email: res.data.emailId, // Email address of the use
          Latitude: res.data.latitude != null ? res.data.latitude : "",
          Longitude: res.data.longitude != null ? res.data.longitude : "",
          Location: res.data.city,
          "Employer Id": res.data.id,
          "Company Details Filled": "true",
          "Company Name": res.data.companyName,
          // optional fields. controls whether the user will be sent email, push etc.
          "MSG-email": true, // Disable email notifications
          "MSG-push": true, // Enable push notifications
          "MSG-sms": true, // Enable sms notifications
          "MSG-whatsapp": true, // Enable WhatsApp notifications
        },
      });
    });
  }
}
let cityNames = {
  async: true,
  crossDomain: true,
  url: getBaseUrl() + "/cities?state_id=0",
  method: "GET",
};
$.ajax(cityNames).done(function (response) {
  // console.log(response);
  let city = response.data;
  let areaAJX_call;

  let cityName = " ";
  let cityLen = city.length;

  for (let i = 0; i < cityLen; i++) {
    cityName =
      cityName +
      `   <option data-cityId="${city[i].id}" value="${city[i].city}">`;
    city_list_Arr.push(city[i].city);
  }
  $("#city_list").html(cityName);

  $(document).on("change", "#cityName", function () {
    $(this).val($(this).val().charAt(0).toUpperCase() + $(this).val().slice(1));
    let input_value = $(this).val().toUpperCase();
    city.map((element) => {
      let city_name = element.city.toUpperCase();
      if (city_name == input_value) {
        areaAJX(element.id);
        $("#areaName").val("");
      } else {
      }
    });
  });
});
// area ajax call
let areaArr = [];
let cityArr = [];
let cityIdNo;
let areaAJX = (cityId) => {
  let areaNames = {
    async: true,
    crossDomain: true,
    url: getBaseUrl() + "/areas?city_id=" + cityId,
    method: "GET",
  };

  $.ajax(areaNames).done(function (res) {
    let areaName = "";

    // console.log(res);
    let area = res.data;
    let areaLen = area.length;
    for (let i = 0; i < areaLen; i++) {
      areaName = areaName + `<option  value="${area[i].area}">`;
    }
    $("#areaDt").html(areaName);
  });
};

// year found list
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let yearStr = "";
for (let i = currentYear; i > 1899; i--) {
  yearStr += `<option value="${i}">${i}</option>`;
}
$("#yearFounded_list").html(yearStr);

$("#yearFound").keydown(function (e) {
  var key = e.keyCode;
  if ($(this).val().length == 4) {
    if (!(key == 13 || key == 9 || key == 8)) {
      e.preventDefault();
    }
  } else {
  }
});

// companyLogo api

function uploadCompanyLogo(empId) {
  // var form = new FormData();
  // empId_Cd = response.data.id;
  // var file_data = $("#myfile").prop("files")[0];
  // form.append("logo", file_data);
  // EmployerValidationFN();
  var form = new FormData();
  var file_data = $("#myfile").prop("files")[0];
  form.append("employer_id", empId);
  form.append("logo", file_data);
  var settings = {
    url: getBaseUrl() + "/updateCompanyLogo",
    method: "PUT",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };
  $.ajax(settings)
    .done(function (response) {
      let companyLogo = response.data.companyLogo;
      if (companyLogo != null) {
        // console.log(response.results.companyLogo);
        $("#companyImg").prop("src", response.results.companyLogo);
      }
      // console.log(response);
      alert("correct ");
      // console.log(settings.url);
    })
    .fail(function (response) {
      // console.log(response);
      alert("wrong");
      // console.log(settings.url);
    });
}

// function uploadCompanyLogo(empId) {
//   if (noError == 0) {
//     var settings = {
//       "url": getBaseUrl() + "/updateCompanyLogo?emp_id=" +empId,
//       "method": "PUT",
//       "timeout": 0,
//       "processData": false,
//       "mimeType": "multipart/form-data",
//       "contentType": false,
//       "data": form
//     };
//     $.ajax(settings)
//       .done(function (response) {
//         let  companyLogo = response.data.companyLogo;
//         if (companyLogo != null) {
//           // console.log(response.results.companyLogo);
//           $("#companyImg").prop("src", response.results.companyLogo);
//         }
//         console.log(response);
//         alert("correct ");
//       })
//       .fail(function (response) {
//         console.log(response);
//         alert("wrong")
//       });
//   }
// }

// api call
function contactDetailsApiFn1() {
  if (noError == 0) {
    let industry = $("#industry").val();
    let category = $("#business_type").val();
    let company = $("#companyName").val();
    email_Cd = $("#emailValue").val();
    let city_string = $("#cityName").val();
    let city = city_string.charAt(0).toUpperCase() + city_string.slice(1);
    let area = $("#areaName").val();
    let address = $("#addressText").val();
    let GST = $("#gstNum").val().toUpperCase();
    let contactName,
      websiteUrl,
      numOfEmployes,
      yearFound,
      whatsappNumber,
      contactNum;
    yearFound = $("#yearFound").val();
    whatsappNumber = $("#whatapp_number").val();
    numOfEmployes = $("#numOfEmployes").val();
    contactNum = $("#contactNum").val();
    contactName = $("#contactName").val();
    websiteUrl = $("#websiteUrl").val();
    let mobileNum = $("#mobileNum").val();
    // let user_location_details = JSON.parse(localStorage.getItem("user_location_details"));

    let obj = {
      companyName: company.trim(),
      emailId: email_Cd.trim(),
      address: address.trim(),
      area: area.trim(),
      city: city,
      pincode: user_location_details.pin_code,
      state: user_location_details.state,
      country: user_location_details.country,
      industry: industry,
      latitude: user_location_details.latitude,
      longitude: user_location_details.longitude,
      mobileCountryCode: "91",
      mobileNumber: mobileNum,
      phoneCountryCode: null,
      category: category,
      yearFounded: yearFound,
      contactPersonName: toTitleCase(contactName),
      noOfEmployees: numOfEmployes,
      websiteUrl: websiteUrl,
      phone: contactNum,
      whatsappNumber: whatsappNumber,
      regProofNumber: GST,
      reference: $("#referalOption").val(),
    };
    var settings = {
      // async: true,
      // crossDomain: true,
      url: getAdminBaseUrl() + "/employerRegistration?admin_id=" + admin_id,
      method: "POST",
      timeout: 0,
      contentType: "application/json; charset=utf-8",
      // processData: false,
      data: JSON.stringify(obj),
    };
    $.ajax(settings)
      .done(function (response) {
        successPopup("Employer Registration Successful");
        window.location.reload();
        console.log(response);
        // console.log("published");
        $("#nextStep1").prop("disabled", false);
        console.log("success");
        // window.location.reload();
        uploadCompanyLogo(response.data.id);
      })
      .fail(function (response) {
        alert("Sorry , somthing went wrong ");
        console.log(response);
        // console.log("failed");
        $("#nextStep1").prop("disabled", false);
        console.log("failed");
      });
  }
}