let noError, mobileNum;

let city_list_Arr = [];
let errFieldsArr = [];

function EmployerValidationFN() {
  // alert("hii")
  noError = 0;
  // errFieldsArr = [];

  if ($("#companyName").val() == "") {
    $("#companyName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#companyNamee").parents(".form-group").removeClass("error");
  }
  if ($("#industry").val() == "") {
    $("#industry").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#industry").parents(".form-group").removeClass("error");
  }
  if ($("#contactName").val() == "") {
    $("#contactName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#contactName").parents(".form-group").removeClass("error");
  }
  if ($("#designation").val() == "") {
    $("#designation").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#designation").parents(".form-group").removeClass("error");
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

  if ($("#cityName").val() == "") {
    $("#cityName").parents(".form-group").addClass("error");
    noError++;
  } else {
    removeError("cityName");
  }
}

$("#nextStep1").click(function (event) {
  event.preventDefault();
  EmployerValidationFN();
  contactDetailsApiFn1();
});
document
  .getElementById("companyName")
  .addEventListener("input", function (event) {
    var companyNameValue = event.target.value.trim();
    var companyNameRegex = /^[a-zA-Z\s.]+$/; // Allow letters, spaces, and dots

    if (!companyNameRegex.test(companyNameValue)) {
      event.target.value = companyNameValue.replace(/[^a-zA-Z\s.]/g, ""); // Remove invalid characters
    }
  });

document
  .getElementById("contactName")
  .addEventListener("input", function (event) {
    var companyNameValue = event.target.value.trim();
    var companyNameRegex = /^[a-zA-Z\s]+$/; // Define your regex pattern here

    if (!companyNameRegex.test(companyNameValue)) {
      event.target.value = companyNameValue.replace(/[^a-zA-Z\s]/g, ""); // Remove invalid characters
    }
  });

document
  .getElementById("designation")
  .addEventListener("input", function (event) {
    var companyNameValue = event.target.value.trim();
    var companyNameRegex = /^[a-zA-Z\s]+$/; // Define your regex pattern here

    if (!companyNameRegex.test(companyNameValue)) {
      event.target.value = companyNameValue.replace(/[^a-zA-Z\s]/g, ""); // Remove invalid characters
    }
  });

// function matched_city_status() {
//     // console.log("matched_city_status");
//     let city_matched = false;
//     let entered_city = $("#cityName").val().toUpperCase();

//     let cityNames = {
//       async: false,
//       crossDomain: true,
//       url: getBaseUrl() + "/cities?state_id=0",
//       method: "GET",
//     };
//     $.ajax(cityNames).done(function (response) {
//       cities = response.data;
//       // console.log(response);

//       cities.map((el) => {
//         if (el.city.toUpperCase() == entered_city) {
//           city_matched = true;
//           // console.log("city matched");
//         }
//       });
//     });

//     return city_matched;
//   }
var settings = {
  async: true,
  crossDomain: true,
  url: getlandingUrl() + "/jobIndustries",
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

var cityNames = {
  async: true,
  crossDomain: true,
  url: getlandingUrl() + "/cities?state_id=0",
  method: "GET",
};

$.ajax(cityNames).done(function (response) {
  console.log(response);
  let city = response.data;
  let areaAJX_call;

  let cityName = " ";
  let cityLen = city.length;
  console.log(cityLen);
  for (let i = 0; i < cityLen; i++) {
    cityName =
      cityName +
      `   <option data-cityId="${city[i].id}" value="${city[i].city}">${city[i].city}</option>`;
    city_list_Arr.push(city[i].city);
  }
  cityName =
    `<option selected value='' style='color: red'>Select City</option>` +
    cityName;

  $("#cityName").html(cityName);
  // $("#cityName").html(   "<option selected value=''> Select City</option>"+cityName);
});

//   let cityNames = {
//     async: true,
//     crossDomain: true,
//     url: getBaseUrl() + "/cities?state_id=0",
//     method: "GET",
//   };
//   $.ajax(cityNames).done(function (response) {
//     // console.log(response);
//     let city = response.data;
//     let areaAJX_call;

//     let cityName = " ";
//     let cityLen = city.length;

//     for (let i = 0; i < cityLen; i++) {
//       cityName =
//         cityName +
//         `   <option data-cityId="${city[i].id}" value="${city[i].city}">`;
//       city_list_Arr.push(city[i].city);
//     }
//     $("#city_list").html(cityName);
//   });
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

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

function contactDetailsApiFn1() {
  if (noError == 0) {
    let industry = $("#industry").val();
    let company = $("#companyName").val();
    let email = $("#emailValue").val();
    let city_string = $("#cityName").val();
    let city = city_string.charAt(0).toUpperCase() + city_string.slice(1);
    let contactName = $("#contactName").val();
    let mobileNUm = $("#mobileNum").val();
    let designation = $("#designation").val();

    let obj = {
      companyName: company.trim(),
      contactPersonName: contactName.trim(),
      mobileCountryCode: "91",
      mobileNumber: mobileNUm,
      emailId: email.trim(),
      industry: industry,
      city: city_string,
      designation: designation.trim(),
    };
    var settings = {
      url: getlandingUrl() + "/empEnquiry",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(obj),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      successPopup("Thank You! We will contact you shortly");

      setTimeout(function () {
        window.location.reload();
      }, 5000);

      console.log(response);
      // console.log("published");
      $("#nextStep1").prop("disabled", false);
    });
  }
}

let enteredMobileNumber = "";

$("#mobileNum").on("input", function () {
  enteredMobileNumber = $(this).val();

  if (enteredMobileNumber.length === 10) {
    checkMobileAvailability(enteredMobileNumber);
  } else {
    clearFormFields();
    //   $("#manualEntryMessage").text("Please enter your details manually.");
  }
});

function checkMobileAvailability(mobileNumber) {
  var settings = {
    url: getlandingUrl() + "/checkMobileNo?mobileNumber=" + mobileNumber,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    if (response.data) {
      $("#companyName").val(response.data.companyName);
      $("#industry").val(response.data.industry);
      $("#contactName").val(response.data.contactPersonName);
      $("#emailValue").val(response.data.emailId);
      $("#cityName").val(response.data.city);
      $("#designation").val(response.data.designation);

      $(".form-group").removeClass("error");

      $(".emailError").text("");
      // $(".city_err_text").text("");
    } else {
      clearFormFields();
      //   $("#manualEntryMessage").text("Please enter your details manually.");
    }
  });
}

function clearFormFields() {
  // Clear all form fields
  $("#companyName").val("");
  $("#industry").val("");
  $("#contactName").val("");
  $("#emailValue").val("");
  $("#cityName").val("");
  $("designation").Val("");
}
