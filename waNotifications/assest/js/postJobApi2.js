// post-a-job form validation and api functions
let noError, deptNoError;
let isJobPostEligible;
let isFreeTrailUsed;
let jobPostId;
let job_id;
let city_list_Arr = [];
// let iscontactNumVeified = false;
let isalternateNumVeified = false;
let errFieldsArr = [];
let noOfOpenings = $("#NoOfOPening").attr("id");
// to geot employer details  array
var empDetailsArr = getEmpDetails();

// console.log(empDetailsArr);

$(document).ready(function () {
  $("#add-male").click(function () {
    var value = parseInt($("#gender_male .no-of-openings").val());
    $("#gender_male .no-of-openings").val(value + 1);
  });

  $("#reduce-male").click(function () {
    var value = parseInt($("#gender_male .no-of-openings").val());
    if (value > 0) {
      $("#gender_male .no-of-openings").val(value - 1);
    }
  });
});

$(document).ready(function () {
  $("#add-Female").click(function () {
    var value = parseInt($("#gender_Female .no-of-openings").val());
    $("#gender_Female .no-of-openings").val(value + 1);
  });

  $("#reduce-Female").click(function () {
    var value = parseInt($("#gender_Female .no-of-openings").val());
    if (value > 0) {
      $("#gender_Female .no-of-openings").val(value - 1);
    }
  });
});

function postJobValidationFN() {
  noError = 0;
  errFieldsArr = [];
  var male = parseInt($("#gender_male").text());
  var female = parseInt($("#gender_female").text());
  var noOfOpenings = parseInt($("#NoOfOPening").val());

  if ($("#employerId").val() == "") {
    $("#employerId").parents(".form-group").addClass("error");
    errFieldsArr.push("EmployerLabel");
    noError++;
  } else {
    $("#employerId").parents(".form-group").removeClass("error");
  }

  if ($("#radioOption1").is(":checked")) {
    if ($("#draftId").val() == "") {
      $("#draftId").parents(".form-group").addClass("error");
      errFieldsArr.push("DraftLabel");
      noError++;
    } else {
      $("#draftId").parents(".form-group").removeClass("error");
    }
  }

  if ($("#jobRoleCategory").val() == "") {
    $("#jobRoleCategory").parents(".form-group").addClass("error");
    errFieldsArr.push("jobRoleLabel");
    noError++;
  } else {
    $("#jobRoleCategory").parents(".form-group").removeClass("error");
  }

  if (benefits_text.length == 0) {
    addError("benefits_text_area");
    errFieldsArr.push("benefitsLabel");
    noError++;
  } else {
    removeError("benefits_text_area");
  }

  if ($("#minSalary").val() == "") {
    $("#minSalary").parents(".form-group").addClass("error");
    errFieldsArr.push("salaryLabel");
    noError++;
  } else {
    $("#minSalary").parents(".form-group").removeClass("error");
  }

  if ($("#companyName").val() == "") {
    $("#companyName").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#companyName").parents(".form-group").removeClass("error");
  }
  if ($("#locationUrl").val() == "") {
    $("#locationUrl").parents(".form-group").addClass("error");

    noError++;
  } else {
    $("#locationUrl").parents(".form-group").removeClass("error");
  }

  if ($("#maxSalary").val() == "") {
    $("#maxSalary").parents(".form-group").addClass("error");
    errFieldsArr.push("salaryLabel");
    noError++;
  } else {
    $("#maxSalary").parents(".form-group").removeClass("error");
  }

  if ($("#minExp").val() == "") {
    $("#minExp").parents(".form-group").addClass("error");
    errFieldsArr.push("minExpLabel");
    noError++;
  } else {
    $("#minExp").parents(".form-group").removeClass("error");
  }

  if (ks_valueArr.length == 0) {
    addError("keySkill_input");
    errFieldsArr.push("keySkillsLabel");
    noError++;
  } else {
    removeError("keySkill_input");
  }

  // if ($("#JobDescription").val() == "") {
  //   $("#JobDescription").parents(".form-group").addClass("error");
  //   errFieldsArr.push("JobDescription");
  //   noError++;
  // } else {
  //   $("#JobDescription").parents(".form-group").removeClass("error");
  // }

  if ($("#eduQualification").val() == "") {
    $("#eduQualification").parents(".form-group").addClass("error");
    errFieldsArr.push("educationLabel");
    noError++;
  } else {
    $("#eduQualification").parents(".form-group").removeClass("error");
  }

  if (eq_valueArr.length == 0) {
    addError("edu_quality_error");
    errFieldsArr.push("educationLabel");
    noError++;
  } else {
    removeError("edu_quality_error");
  }

  // if ($("input[name='gender']:checked").length != 1) {
  //   addError("gender_input");
  //   errFieldsArr.push("genderLabel");
  //   noError++;
  // } else {
  //   removeError("gender_input");
  // }

  if (male == 0 && female == 0) {
    $("#gender_male").parents(".form-group").addClass("error");
    $(".maleFemaleErr").text("Please Enter Gender");
    errFieldsArr.push("genderLabel");
    noError++;
  } else if (male + female != noOfOpenings) {
    $(".maleFemaleErr").text(
      `You have purchased a plan for ${noOfOpenings} candidates.`
    );
    addError("genderLabel");

    noError++;
  } else {
    removeError("genderLabel");
  }

  if ($("#NoOfOpening").val() == "") {
    $("#NoOfOpening").parents(".form-group").addClass("error");
    errFieldsArr.push("NoOfOpeningLabel");
    noError++;
  } else {
    $("#NoOfOpening").parents(".form-group").removeClass("error");
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
  // if ($("#latitudeName").val() == "") {
  //   $("#latitudeName").parents(".form-group").addClass("error");
  //   noError++;
  // } else {
  //   $("#latitudeName").parents(".form-group").removeClass("error");
  // }
  // if ($("#longitueName").val() == "") {
  //   $("#longitueName").parents(".form-group").addClass("error");
  //   noError++;
  // } else {
  //   $("#longitueName").parents(".form-group").removeClass("error");
  // }
  if ($("#Country_id").val() == "") {
    $("#Country_id").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#Country_id").parents(".form-group").removeClass("error");
  }
  if ($("#state_id").val() == "") {
    $("#state_id").parents(".form-group").addClass("error");
    noError++;
  } else {
    $("#state_id").parents(".form-group").removeClass("error");
  }

  // if ($("#whatsAppCheck").is(":checked") == false) {
  //     $("#whatsAppCheck").parents('.form-group').addClass("error");
  //     noError++;
  // } else {
  //     $("#whatsAppCheck").parents('.form-group').removeClass("error");
  // }

  // if (deptNoError != false) {
  //   if ($("#department").val() == "") {
  //     $("#department").parents(".form-group").addClass("error");
  //     // noError++;
  //   } else {
  //     $("#department").parents(".form-group").removeClass("error");
  //   }
  // }

  if ($("input[name='otType']:checked").length != 1) {
    addError("overTime-1");
    errFieldsArr.push("overTimeLabel");
    noError++;
  } else {
    removeError("overTime-1");
  }

  if ($("input[name='shiftType']:checked").length != 1) {
    addError("option-1");
    errFieldsArr.push("shiftLabel");
    noError++;
  } else {
    removeError("option-1");
  }

  if ($("#workHours").val() == "") {
    addError("workHours");
    errFieldsArr.push("workHoursLabel");
    noError++;
  } else {
    removeError("workHours");
  }

  if ($("#contactPersonName").val() == "") {
    $("#contactPersonName").parents(".form-group").addClass("error");
    errFieldsArr.push("contactNameLabel");
    noError++;
  } else {
    $("#contactPersonName").parents(".form-group").removeClass("error");
  }

  if ($("#contactNum").val() == "") {
    $("#contactNum").parents(".form-group").addClass("error");
    $(".contactErr").text("Please fill out this field");
    errFieldsArr.push("contactNumberLabel");
    noError++;
  } else if (
    $("#contactNum").val().length < 10 &&
    $("#contactNum").val().length > 0
  ) {
    $("#contactNum").parents(".form-group").addClass("error");
    $(".contactErr").text("Please enter valid mobile number");
    errFieldsArr.push("contactNumberLabel");
    noError++;
  } else {
    $("#contactNum").parents(".form-group").removeClass("error");
  }

  if ($("#alternateNum").val() != "") {
    if ($("#alternateNum").val() == "") {
      $("#alternateNum").parents(".form-group").addClass("error");
      $(".alternateNumErr").text("Please fill out this field");
      errFieldsArr.push("alternateNum");
      noError++;
    } else if (
      $("#alternateNum").val().length < 10 &&
      $("#alternateNum").val().length > 0
    ) {
      $("#alternateNum").parents(".form-group").addClass("error");
      $(".alternateNumErr").text("Please enter valid mobile number");
      errFieldsArr.push("alternateNum");
      noError++;
    } else {
      $("#alternateNum").parents(".form-group").removeClass("error");
    }
  }

  // if ($("input[name='isWhatsAppNumber']:checked").length != 1) {
  //   addError("yes_same_number");
  //   errFieldsArr.push("yes_same_number");
  //   noError++;
  // } else {
  //   removeError("yes_same_number");
  // }
  if (showDetails.whatsapp) {
    if ($("#whatAppNumber").val() == "") {
      addError("whatAppNumber");
      errFieldsArr.push("whatAppNumber");
      noError++;
    } else if (
      $("#whatAppNumber").val().length > 0 &&
      $("#whatAppNumber").val().length < 10
    ) {
      addError("whatAppNumber");
      errFieldsArr.push("whatAppNumber");
      noError++;
    } else {
      removeError("whatAppNumber");
    }
  }

  if ($("#whatAppNumber").val() == "") {
    $("#whatAppNumber").parents(".form-group").addClass("error");
    errFieldsArr.push("WhatsappNumberLabel");
    noError++;
  } else if (
    $("#whatAppNumber").val().length < 10 &&
    $("#whatAppNumber").val().length > 0
  ) {
    addError("whatAppNumber");
    errFieldsArr.push("whatAppNumber");
    noError++;
  } else {
    $("#whatAppNumber").parents(".form-group").removeClass("error");
  }
  console.log(noError);
}

// end of validation function --------

$(document).on("click", "#btn_publish", function (e) {
  // alert("hihihi")
  // window.scrollTo(0, document.body.scrollHeight);
  // getJobId(JobId);
  postJobValidationFN();
  SubmitPostJob(JobId);

  console.log(noError);
});

let doc_Loction = window.location.href;
let urlStatus = new URL(doc_Loction);
let draftJobId =
  urlStatus.searchParams.get("draftJob_id") != null
    ? urlStatus.searchParams.get("draftJob_id")
    : null;
let savedJobId = urlStatus.searchParams.get("savedJob_id");
let repostId = urlStatus.searchParams.get("repostJob_id");
let JobId = urlStatus.searchParams.get("jobId");
getJobId(JobId);

// console.log(savedJobId);

if (savedJobId != null) {
  savedJobPrefillFn(savedJobId);
} else if (repostId != null) {
  savedJobPrefillFn(repostId);
} else {
  $("#rangePrimary").ionRangeSlider({
    type: "double",
    grid: true,
    grid_num: 4,
    min: 10000,
    max: 50000,
    from: 14000,
    to: 20000,
    value: 0,
    step: 500,
    prefix: "₹",
  });
  // console.log($("#rangePrimary").val())
  $("#fromSal").prop("value", 14000);
  $("#toSal").prop("value", 20000);
}
// draft job prefill function

if (draftJobId != null) {
  // console.log("heloooooo simmouyyyyy")
  draftJobPrefillFn(draftJobId);
  $("#rangePrimary").ionRangeSlider({
    type: "double",
    grid: true,
    grid_num: 4,
    min: 10000,
    max: 50000,
    from: 14000,
    to: 20000,
    value: 0,
    step: 500,
    prefix: "₹",
  });
  // console.log($("#rangePrimary").val())
  $("#fromSal").prop("value", 14000);
  $("#toSal").prop("value", 20000);
  // $("#frequently_posted_jobpopups").addClass("d-none")
} else {
  // window.location.href = "select-plan";
  // showDraftJobsPopup();
  // $("#frequently_posted_jobpopups").removeClass("d-none")
}
$(document).ready(function () {
  $("#post-btn").click(function () {
    window.location.href = "select-plan";
  });
});
function draftJobPrefillFn(id) {
  let settings = {
    url: getBaseUrl() + "/draftJob/" + id,
    method: "GET",
    contentType: "application/json; charset=utf-8",
  };
  $.ajax(settings)
    .done(function (res) {
      clear_all_field();
      // console.log(res);
      // alert(res.jobIndustry);
      // let jobDetails = res.jobDetails;
      let jobCategory = res.jobCategory;
      let jobIndustry = res.jobIndustry;
      let noOfOpenings = res.noOfOpenings;

      $("#jobRoleCategory").val(jobCategory != null ? jobCategory : "");
      $("#jobRole").val(jobIndustry != null ? jobIndustry : "");
      // $("#jobRole").val(jobindustry != null ? jobindustry : "");
      $("#NoOfOpening").val(noOfOpenings != null ? noOfOpenings : "");
      // draftJobPrefillFn(res.data.id);
    })
    .fail(() => {
      window.location.href = "select-plan";
    });
}

// post a job api function
// function draftJobApiFn(endUrl, reqMethod, used_free_trial) {
//   if (noError == 0) {
//     $("#btn_publish").prop("disabled", true);
//     let noOfOpenings = parseInt($("#NoOfOpening").val());

//     let employerId,
//     draftJobId,
//       industry,
//       jobCategory,
//       NoOfOPening,
//       salary,
//       maxSalary,
//       jobExp,
//       jobMaxExp,
//       qualification,
//       specialization,
//       contactPersonName,
//       mobileNumber,
//       alternateMobileNumber,
//       shiftType,
//       workHours,
//       ot,
//       benefits,
//       whatsappNoti,
//       settings,
//       male,
//       female,
//       keyskills,
//       gender,
//       obj,
//       whatsappNumber;

//     //  employerId = localStorage.getItem("userID");
//     // employerId = document.getElementById("employerId");
//     //  employerId = document.getElementById("employerId").value;
//     // employerId = $('#employerId').val();
//     //  employerId = document.getElementById("EmployerLabel").htmlFor;
//     draftJobId =
//     $("#draftId").val() != null && $("#draftId").val() != ""
//       ? $("#draftId").val()
//       : null;
//       employerId =
//     $("#employerId").val() != null && $("#employerId").val() != ""
//       ? $("#employerId").val()
//       : null;
//     jobCategory =
//     $("#jobRoleCategory").val() != null && $("#jobRoleCategory").val() != ""
//       ? $("#jobRoleCategory").val()
//       : null;
//     industry =
//       $("#jobRole").val() != null && $("#jobRole").val() != ""
//         ? $("#jobRole").val()
//         : null;
//     salary = $("#minSalary").val() != 0 ? $("#minSalary").val() : "14000";
//     maxSalary = $("#maxSalary").val() != 0 ? $("#maxSalary").val() : "20000";
//     qualification = eq_valueArr.length != 0 ? eq_valueArr.join(", ") : null;
//     specialization =
//       $("#department").val() != null ? $("#department").val() : null;
//     contactPersonName =
//       $("#contactPersonName").val() != null
//         ? $("#contactPersonName").val()
//         : null;
//     mobileNumber =
//       $("#contactNum").val() != null ? $("#contactNum").val() : null;
//     shiftType =
//       $("input[type='radio'][name='shiftType']:checked").val() != null
//         ? $("input[type='radio'][name='shiftType']:checked").val()
//         : null;
//     ot =
//       $("input[type='radio'][name='otType']:checked").val() != null
//         ? $("input[type='radio'][name='otType']:checked").val()
//         : null;
//     // gender =
//     //   $("input[type='radio'][name='gender']:checked").val() != null
//     //     ? $("input[type='radio'][name='gender']:checked").val()
//     //     : null;
//     male = $("#gender_male").text();
//     female = $("#gender_female").text();
//     keyskills = ks_valueArr.length != 0 ? ks_valueArr.join(", ") : null;

//     if (benefits_text.length == 0) {
//       benefits = null;
//     } else {
//       benefits = benefits_text.join(", ");
//     }

//     if ($("#workHours").val() == "") {
//       workHours = null;
//     } else {
//       workHours = $("#workHours").val();
//     }

//     if ($("#whatsAppCheck").is(":checked")) {
//       whatsappNoti = true;
//       // it is checked
//     } else {
//       whatsappNoti = false;
//     }

//     if ($("#minExp").val() == "0 - 1") {
//       jobExp = "0";
//       jobMaxExp = "1";
//     } else if ($("#minExp").val() == "Freshers") {
//       jobExp = "0";
//       jobMaxExp = "0";
//     } else {
//       jobExp = $("#minExp").val();
//       jobMaxExp = $("#minExp").val();
//     }

//     if ($("#alternateNum").val() != "") {
//       alternateMobileNumber = $("#alternateNum").val();
//     } else {
//       alternateMobileNumber = null;
//     }

//       whatsappNumber = $("#whatAppNumber").val();

//       if (male == 0 && female > 0) {
//         gender = "female";
//       } else if (female == 0 && male > 0) {
//         gender = "male";
//       } else if (male != 0 && female != 0) {
//         gender = "both";
//       }

//     obj = {
//       employerId: employerId,
//       // draftId: draftJobId,
//       industry: industry,
//       jobCategory: jobCategory,
//       salary: salary,
//       maxSalary: maxSalary,
//       jobExp: jobExp,
//       jobMaxExp: jobMaxExp,
//       qualification: qualification,
//       specialization: specialization,
//       contactPersonName: contactPersonName,
//       mobileNumber: mobileNumber,
//       alternateMobileNumber: alternateMobileNumber,
//       shiftType: shiftType,
//       workHours: workHours,
//       male: male,
//       female: female,
//       ot: ot,
//       benefits: benefits,
//       whatsappNoti: whatsappNoti,
//       keyskills: keyskills,
//       gender: gender,
//       whatsappNumber: whatsappNumber,
//       noOfOpenings: noOfOpenings,
//     };
//     settings = {
//       async: true,
//       crossDomain: true,
//       // url: getBaseUrl() + `/${endUrl}?draftId=${draftJobId}`,
//       url: getBaseUrl() + `/${endUrl}?draftId=${draftJobId}`,
//       method: reqMethod,
//       contentType: "application/json; charset=utf-8",
//       processData: false,
//       data: JSON.stringify(obj),
//     };
//     $.ajax(settings)
//       .done(function (res) {
//         successPopup("Job Published");
//         window.location.reload();
//         // console.log(res);
//         // console.log("published");
//         $("#btn_publish").prop("disabled", false);
//       })
//       .fail(function (res) {
//         alert("Sorry , somthing went wrong ");
//         // console.log(res);
//         // console.log("failed");
//         $("#btn_publish").prop("disabled", false);
//       });
//   } else {
//     // window.scrollBy(0, -document.body.scrollHeight);
//     window.location.href = `#${errFieldsArr[0]}`;
//     // console.log(errFieldsArr);
//   }
// }
// // var empDetails = getEmpDetails();
// // $(document).ready(function() {
// //   $("employerId").on('input', function() {
// //     var empId = $(this).val();
// //     if (empId) {
// //       $('#contactPersonName').response.data.contactPersonName;
// //       $('#contactNumber').response.data.mobileNumber;
// //       $('#whatsappNumber').response.data.companyDetailsFilled;
// //     }
// //     else {
// //       $('#contactPersonName').val('');
// //       $('#contactNumber').val('');
// //       $('#whatsappNumber').val('');

// //     }
// //   })
// // })
// // $(document).ready(function() {
// //   $("employerId").on('input', function() {
// //     var empId = $(this).val();
// //   let settings={
// //         url:`${getBaseUrl()}/empDetails?emp_id=${empId}`,
// //         "method": "GET",
// //         "timeout": 0,
// //         "processData": false,
// //         "mimeType": "multipart/form-data",
// //         "contentType": false,
// //      }
// //         $ajax(settings).done(function (res) {
// //           console.log(res);
// //           $('#contactPersonName').val(data.contactPersonName);
// //           $('#contactNumber').val(data.contactNumber);
// //           $('#whatsappNumber').val(data.whatsappNumber);
// //         })
// //         .fail(function (res) {
// //           console.log(res);

// //         $('#contactPersonName').val('');
// //         $('#contactNumber').val('');
// //         $('#whatsappNumber').val('');
// //         });
// //       });
// // })
// // end of  post a job api function

// function newJobApiFn(endUrl, reqMethod) {
//   if (noError == 0) {
//     $("#btn_publish").prop("disabled", true);
//     let noOfOpenings = parseInt($("#NoOfOpening").val());

//     let employerId,
//       industry,
//       jobCategory,
//       NoOfOPening,
//       salary,
//       maxSalary,
//       jobExp,
//       jobMaxExp,
//       qualification,
//       specialization,
//       contactPersonName,
//       mobileNumber,
//       alternateMobileNumber,
//       shiftType,
//       workHours,
//       ot,
//       benefits,
//       whatsappNoti,
//       settings,
//       male,
//       female,
//       keyskills,
//       gender,
//       obj,
//       whatsappNumber;

//     //  employerId = localStorage.getItem("userID");
//     // employerId = document.getElementById("employerId");
//     //  employerId = document.getElementById("employerId").value;
//     // employerId = $('#employerId').val();
//     //  employerId = document.getElementById("EmployerLabel").htmlFor;

//     // employerId = localStorage.getItem("userID");

//     employerId =
//     $("#employerId").val() != null && $("#employerId").val() != ""
//       ? $("#employerId").val()
//       : null;
//     jobCategory =
//     $("#jobRoleCategory").val() != null && $("#jobRoleCategory").val() != ""
//       ? $("#jobRoleCategory").val()
//       : null;
//     industry =
//       $("#jobRole").val() != null && $("#jobRole").val() != ""
//         ? $("#jobRole").val()
//         : null;
//     salary = $("#minSalary").val() != 0 ? $("#minSalary").val() : "14000";
//     maxSalary = $("#maxSalary").val() != 0 ? $("#maxSalary").val() : "20000";
//     qualification = eq_valueArr.length != 0 ? eq_valueArr.join(", ") : null;
//     specialization =
//       $("#department").val() != null ? $("#department").val() : null;
//     contactPersonName =
//       $("#contactPersonName").val() != null
//         ? $("#contactPersonName").val()
//         : null;
//     mobileNumber =
//       $("#contactNum").val() != null ? $("#contactNum").val() : null;
//     shiftType =
//       $("input[type='radio'][name='shiftType']:checked").val() != null
//         ? $("input[type='radio'][name='shiftType']:checked").val()
//         : null;
//     ot =
//       $("input[type='radio'][name='otType']:checked").val() != null
//         ? $("input[type='radio'][name='otType']:checked").val()
//         : null;
//     // gender =
//     //   $("input[type='radio'][name='gender']:checked").val() != null
//     //     ? $("input[type='radio'][name='gender']:checked").val()
//     //     : null;
//     male = $("#gender_male").text();
//     female = $("#gender_female").text();
//     keyskills = ks_valueArr.length != 0 ? ks_valueArr.join(", ") : null;

//     if (benefits_text.length == 0) {
//       benefits = null;
//     } else {
//       benefits = benefits_text.join(", ");
//     }

//     if ($("#workHours").val() == "") {
//       workHours = null;
//     } else {
//       workHours = $("#workHours").val();
//     }

//     if ($("#whatsAppCheck").is(":checked")) {
//       whatsappNoti = true;
//       // it is checked
//     } else {
//       whatsappNoti = false;
//     }

//     if ($("#minExp").val() == "0 - 1") {
//       jobExp = "0";
//       jobMaxExp = "1";
//     } else if ($("#minExp").val() == "Freshers") {
//       jobExp = "0";
//       jobMaxExp = "0";
//     } else {
//       jobExp = $("#minExp").val();
//       jobMaxExp = $("#minExp").val();
//     }

//     if ($("#alternateNum").val() != "") {
//       alternateMobileNumber = $("#alternateNum").val();
//     } else {
//       alternateMobileNumber = null;
//     }

//       whatsappNumber = $("#whatAppNumber").val();

//       if (male == 0 && female > 0) {
//         gender = "female";
//       } else if (female == 0 && male > 0) {
//         gender = "male";
//       } else if (male != 0 && female != 0) {
//         gender = "both";
//       }

//     obj = {
//       employerId: employerId,
//       industry: industry,
//       jobCategory: jobCategory,
//       salary: salary,
//       maxSalary: maxSalary,
//       jobExp: jobExp,
//       jobMaxExp: jobMaxExp,
//       qualification: qualification,
//       specialization: specialization,
//       contactPersonName: contactPersonName,
//       mobileNumber: mobileNumber,
//       alternateMobileNumber: alternateMobileNumber,
//       shiftType: shiftType,
//       workHours: workHours,
//       male: male,
//       female: female,
//       ot: ot,
//       benefits: benefits,
//       whatsappNoti: whatsappNoti,
//       keyskills: keyskills,
//       gender: gender,
//       whatsappNumber: whatsappNumber,
//       noOfOpenings: noOfOpenings,
//     };
//     settings = {
//       async: true,
//       crossDomain: true,
//       // url: getAdminBaseUrl() + `/${endUrl}?employerId=` + localStorage.getItem("userID"),
//       url: getAdminBaseUrl() + `/${endUrl}?employer_id=` + employerId,
//       method: reqMethod,
//       contentType: "application/json; charset=utf-8",
//       processData: false,
//       data: JSON.stringify(obj),
//     };
//     $.ajax(settings)
//       .done(function (res) {
//         successPopup("Job Published");
//         window.location.reload();
//         // console.log(res);
//         // console.log("published");
//         $("#btn_publish").prop("disabled", false);
//       })
//       .fail(function (res) {
//         alert("Sorry , somthing went wrong ");
//         // console.log(res);
//         // console.log("failed");
//         $("#btn_publish").prop("disabled", false);
//       });
//   } else {
//     // window.scrollBy(0, -document.body.scrollHeight);
//     window.location.href = `#${errFieldsArr[0]}`;
//     // console.log(errFieldsArr);
//   }
// }

// $("#btn_publish").click(function () {
//   draftJobValidationFN();
//   // console.log("noError");
//   // draftJobId = id;
//   // draftJobPrefillFn(id);
//   postJobApiFn("newPostJob", "POST", false);
//   // successPopup("Job Published");
// });

function showFields(selectedOption) {
  const fieldsContainer = document.getElementById("fieldsContainer");
  const draftId = document.getElementById("draftId");
  const draftLabel = document.getElementById("DraftLabel");

  if (selectedOption === "radioOption1" || selectedOption === "radioOption2") {
    fieldsContainer.style.display = "block";

    // Handle #draftId and #DraftLabel visibility based on the selectedOption
    if (selectedOption === "radioOption2") {
      draftId.style.display = "none";
      draftLabel.style.display = "none";
    } else if (selectedOption === "radioOption1") {
      draftId.style.display = "block";
      draftLabel.style.display = "block";
    }
  } else {
    // In case neither radioOption1 nor radioOption2 is selected, hide the fields container, draftId, and draftLabel
    fieldsContainer.style.display = "none";
    draftId.style.display = "none";
    draftLabel.style.display = "none";
  }
}

// showFields(selectedOption);

// var postJobFunction = {
//   draftJob : draftJobApiFn(),
//   newJob : newJobApiFn()
// }

// // var newjob = $("#radioOption2")
// // var draftjob = $("#radioOption1")

// var option = $('input[name="radioOption"]:checked');

// if (option==newJob){
//   $("#btn_publish").click(function () {
//     postJobValidationFN();
//     // console.log("noError");
//     // draftJobId = id;
//     // draftJobPrefillFn(id);
//     newJobApiFn("newPostJob", "POST", false);
//     // successPopup("Job Published");
//   });
// }else{
//   $("#btn_publish").click(function () {
//     postJobValidationFN();
//     // console.log("noError");
//     // draftJobId = id;
//     // draftJobPrefillFn(id);
//     draftJobApiFn("newPostJob", "POST", false);
//     // successPopup("Job Published");
//   });
// }

// let postJobFunction = {
//   draftJob: draftJobApiFn(),
//   newJob: newJobApiFn()
// }

// $("#btn_publish").click(function () {
//   postJobValidationFN();

//   var option = $('input[name="radioOption"]:checked').val();
//   if (option === "newJob") {
//     postJobFunction.newJob("newPostJob", "POST", false);
//     // successPopup("Job Published");
//   } else {
//     postJobFunction.draftJob("newPostJob", "POST", false);
//     // successPopup("Job Published");
//   }
// });

// let postJobFunction = {
//   draftJob: draftJobApiFn,
//   newJob: newJobApiFn
// };

// $("#btn_publish").click(function () {
//   postJobValidationFN();

//   var option = $('input[name="radioOption"]:checked').val();
//   if (option === "newJob") {
//     postJobFunction.newJob("newPostJob", "POST", false);
//     // successPopup("Job Published");
//   } else {
//     postJobFunction.draftJob("newPostJob", "POST", false);
//     // successPopup("Job Published");
//   }
// });

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

function hidePopup() {
  document.getElementById("jobIdPopup").classList.add("d-none");
}

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

// function uploadCompanyDetails(empId,empDetailsArr) {
//   let settings = {
//     url: getBaseUrl() + "/empDetails?emp_id=" + empId,
//     method: "GET",
//     "timeout": 0,
//     contentType: "application/json; charset=utf-8",
//   };

//   $.ajax(settings)
//     .done(function (response) {
//       console.log(response)
//       // clear_all_field();

//       if (response && response.data) {
//         let city = response.data.city;
//         let area = response.data.area;
//         let address = response.data.address;
//         let latitude = response.data.latitude;
//         let longitude = response.data.longitude;
//         let company = response.data.companyName;

//         $("#cityName").val(city);
//         $("#areaName").val(area);
//         $("#addressText").val(address);
//         $("#latitudeName").val(latitude);
//         $("#longitueName").val(longitude);
//         $("#companyName").val(company);
//       }
//     })

//     .fail(() => {

//     });
// }

$(document).ready(function () {
  function clearCityAndArea() {
    $("#cityName").val("");
    $("#areaName").val("");
  }

  $("#companyName").on("change", function () {
    clearCityAndArea();
  });
});

//   job prefill functction
function getJobId(JobId) {
  let settings = {
    url: getBaseUrl() + "/job/" + JobId,
    method: "GET",
    contentType: "application/json; charset=utf-8",
  };
  $.ajax(settings)
    .done(function (res) {
      // clear_all_field();
      console.log(res);
      let jobDetails = res.jobDetails;
      let minExperience = jobDetails.jobExp;
      let maxExperience = jobDetails.jobMaxExp;
      let noOfOpenings = jobDetails.noOfOpenings;
      let whatsappNumber = jobDetails.whatsappNumber;
      // let city = city_string.charAt(0).toUpperCase() + city_string.slice(1).toLowerCase();
      // let ot = jobDetails.ot;

      let employerId = jobDetails.employerId;

      $("#employerId").val(employerId);

      $("#areaName").val(jobDetails.area != null ? jobDetails.area : "");
      $("#addressText").val(
        jobDetails.jobLocationAddr != null ? jobDetails.jobLocationAddr : ""
      );
      $("#cityName").val(
        jobDetails.jobLocation != null ? jobDetails.jobLocation : ""
      );

      $("#latitudeName").val(
        jobDetails.jobLatitude != null ? jobDetails.jobLatitude : ""
      );
      $("#longitueName").val(
        jobDetails.jobLongitude != null ? jobDetails.jobLongitude : ""
      );
      $("#companyName").val(
        jobDetails.companyName != null ? jobDetails.companyName : ""
      );

      $("#state_id").val(jobDetails.state != null ? jobDetails.state : "");

      $("#JobDescription").val(jobDetails.jobDescription);
      // $("#formFile").val(jobDetails.jobDescriptionLink);
      // Function to handle file input change
      document
        .getElementById("formFile")
        .addEventListener("change", function () {
          // Get the selected file
          let fileInput = this.files[0];

          // If no file is selected, clear the jobDescriptionLinkName and return
          if (!fileInput) {
            document.getElementById("jobDescriptionLinkName").innerHTML =
              "<b>JD Description:</b>";
            return;
          }

          // Set the jobDescriptionLinkName to the filename as an anchor tag
          document.getElementById("jobDescriptionLinkName").innerHTML =
            "<b>JD Description:</b> <a href='" +
            URL.createObjectURL(fileInput) +
            "' target='_blank'>" +
            fileInput.name +
            "</a>";
        });

      // Initially set jobDescriptionLinkName based on jobDetails.jobDescriptionLink
      document.getElementById("jobDescriptionLinkName").innerHTML =
        "<b>JD Description:</b> " +
        (jobDetails.jobDescriptionLink
          ? "<a href='" +
            jobDetails.jobDescriptionLink +
            "' target='_blank'>" +
            jobDetails.jobDescriptionLink +
            "</a>"
          : "");

      // document.getElementById("jobDescriptionLinkName").textContent =
      //   jobDetails.jobDescriptionLink;

      // $("#latitudeName").val(
      //   jobDetails.jobLatitude!= null ? jobDetails.jobLatitude: ""
      // );

      // $("#longitueName").val(
      //   jobDetails.jobLongitude != null ? jobDetails.jobLongitude : ""
      // );

      $("#jobRoleCategory").val(
        jobDetails.jobCategory != null ? jobDetails.jobCategory : ""
      );
      $("#jobRole").val(jobDetails.industry != null ? jobDetails.industry : "");
      $("#minSalary").val(
        jobDetails.salary != null && jobDetails.salary != 0
          ? jobDetails.salary
          : "14000"
      );
      $("#maxSalary").val(
        jobDetails.maxSalary != null && jobDetails.maxSalary != 0
          ? jobDetails.maxSalary
          : "20000"
      );

      $("#contactPersonName").val(
        jobDetails.contactPersonName != null ? jobDetails.contactPersonName : ""
      );
      $("#locationUrl").val(
        jobDetails.companyLocationUrl != null
          ? jobDetails.companyLocationUrl
          : ""
      );

      $("#Country_id").val(
        jobDetails.jobCountry != null ? jobDetails.jobCountry : ""
      );
      $("#contactNum").val(
        jobDetails.mobileNumber != null ? jobDetails.mobileNumber : ""
      );
      $("#eduQualification").val(
        jobDetails.qualification != null ? jobDetails.qualification : ""
      );
      $("#whatsAppCheck").prop("checked", jobDetails.whatsappNoti);
      // document.getElementById("gender_male .no-of-openings").value = jobDetails.male;
      // document.getElementById("gender_Female .no-of-openings").value = jobDetails.female;

      $("#gender_male").text(jobDetails.male != null ? jobDetails.male : "");

      $("#gender_female").text(
        jobDetails.female != null ? jobDetails.female : ""
      );

      $("#NoOfOPening").val(noOfOpenings);
      $("#whatAppNumber").val(whatsappNumber);

      // $(".posttime").text(
      //   job_details.jobPostedTime != null
      //     ? timeSince(new Date(job_details.jobPostedTime)) + " ago"
      //     : "1 day(s) ago"
      // );

      let education_list_Arr = [
        "Below 10th",
        "10th Pass and Above",
        "ITI",
        "Diploma",
        "UG",
        "PG",
      ];

      if (jobDetails.qualification != "" && jobDetails.qualification != null) {
        let prefill_education_Arr = jobDetails.qualification.split(", ");
        let education_qualification_value = [];

        education_list_Arr.map((element) => {
          if (prefill_education_Arr.indexOf(element) != -1) {
            education_qualification_value.push(element);
          } else {
          }
        });

        $(".eduQuality_input").html(education_qualification_value.join(", "));
      } else {
      }

      $("#keySkill_input").html(jobDetails.keyskills);

      eq_valueArr = [];

      if (jobDetails.qualification != null && jobDetails.qualification != "") {
        jobDetails.qualification.split(", ").map((el) => {
          eq_valueArr.push(el);
        });
      } else {
        eq_valueArr = [];
      }

      ks_valueArr = [];

      if (jobDetails.keyskills != null && jobDetails.keyskills != "") {
        jobDetails.keyskills.split(", ").map((el) => {
          ks_valueArr.push(el);
        });
      } else {
        ks_valueArr = [];
      }

      const duplicate_ks_valueArr = [...ks_valueArr];
      const duplicate_eq_valueArr = [...eq_valueArr];

      selected_keySkill = [];
      if (jobDetails.keyskills != null && jobDetails.keyskills != "") {
        let settings = {
          method: "GET",
          url: getBaseUrl() + "/keySkills",
          async: false,
        };
        $.ajax(settings).done(function (res) {
          console.log(res);

          let all_keySKills = res.data;

          all_keySKills.map((el, index) => {
            if (duplicate_ks_valueArr.indexOf(el.skill) != -1) {
              selected_keySkill.push(el.skill + "/" + index + "_ks");
            } else {
            }
          });
        });
      } else {
      }

      $(document).ready(function () {
        keykill_api_fn();
        $(".keySkills_list input").each(function () {
          let thisValue = $(this).attr("data-keyValue");
          // console.log(thisValue)
          // console.log(duplicate_ks_valueArr)
          let condition =
            duplicate_ks_valueArr.indexOf(thisValue.split("-").join(" ")) != -1;
          if (condition) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        });

        $(".eduQuality_list input").each(function () {
          let thisValue = $(this).attr("data-eq-Value");
          let condition =
            duplicate_eq_valueArr.indexOf(thisValue.split("-").join(" ")) != -1;
          if (condition) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        });
      });

      // if (jobDetails.gender == "Male") {
      //   $("#gender_male").prop("checked", true);
      // } else if (jobDetails.gender == "Female") {
      //   $("#gender_female").prop("checked", true);
      // } else if (jobDetails.gender == "Both") {
      //   $("#gender_both").prop("checked", true);
      // } else {
      // }

      if (minExperience == 0 && maxExperience == 0) {
        $("#expFresher").trigger("click");
      } else if (minExperience == 0 && maxExperience == 1) {
        $("#exp0-1").trigger("click");
      } else if (minExperience != 0) {
        $("#minExp").val(minExperience);
      } else {
      }

      if (jobDetails.alternateMobileNumber != null) {
        $("#addAltrBtn").trigger("click");
        $("#alternateNum").val(jobDetails.alternateMobileNumber);
        $(".verifyBtnAlt").removeClass("d-none");
      } else {
        $("#alternateNum").val("");
      }

      if (jobDetails.additionalDetailsFilled) {
        $(".addDetailsBtn").trigger("click");

        if (jobDetails.shiftType == "General") {
          $("#option-1").trigger("click");
        } else if (jobDetails.shiftType == "Rotational") {
          $("#option-2").trigger("click");
        } else {
        }

        if (jobDetails.ot == "Yes") {
          $("#overTime-1").trigger("click");
        } else if (jobDetails.ot == "No") {
          $("#overTime-2").trigger("click");
        } else {
        }

        // console.log(jobDetails.benefits);

        if (jobDetails.benefits != null) {
          benefits_text = jobDetails.benefits.split(", ");
          $("#benefits_text_area").val(jobDetails.benefits);
          $("#benefits_text_area").css("height", "35px");
          $("#benefits_text_area").css(
            "height",
            $("#benefits_text_area").prop("scrollHeight") + "px"
          );
        } else {
        }

        $("#workHours").val(
          jobDetails.workHours != null ? jobDetails.workHours : ""
        );
      }

      $("#rangePrimary").ionRangeSlider({
        type: "double",
        grid: true,
        grid_num: 4,
        min: 10000,
        max: 50000,
        from:
          jobDetails.salary != null && jobDetails.salary != 0
            ? jobDetails.salary
            : 14000,
        to:
          jobDetails.maxSalary != null && jobDetails.maxSalary != 0
            ? jobDetails.maxSalary
            : 20000,
        value: 0,
        step: 500,
        prefix: "₹",
      });
      // console.log($("#rangePrimary").val())
      $("#fromSal").prop(
        "value",
        jobDetails.salary != null && jobDetails.salary != 0
          ? jobDetails.salary
          : 14000
      );
      $("#toSal").prop(
        "value",
        jobDetails.maxSalary != null && jobDetails.maxSalary != 0
          ? jobDetails.maxSalary
          : 20000
      );
      removeError("alternateNum");
      removeError("contactNum");
      removeError("contactPersonName");
      removeError("eduQualification");
      removeError("minExp");
      removeError("maxSalary");
      removeError("minSalary");
      removeError("jobRoleCategory");
      removeError("keySkill_input");
      removeError("gender_input");
      removeError("edu_quality_error");
      removeError("benefits_text_area");
      removeError("workHours");
      // uploadCompanyDetails(employerId, jobDetails);
    })
    .fail(function () {
      // console.log("failed")
    });
}

// end of  job prefill functction

function SubmitPostJob(JobId) {
  if (noError == 0) {
    let employerId = $("#employerId").val();
    let jobCategory = $("#jobRoleCategory").val();
    let industry = $("#jobRole").val();
    let salary = $("#minSalary").val();
    // let jobExp = $("#minExp").val();
    let area = $("#areaName").val().trim();
    let address = $("#addressText").val().trim();
    let city_string = $("#cityName").val();
    let city =
      city_string.charAt(0).toUpperCase() + city_string.slice(1).toLowerCase();
    // let jobMaxExp = $("#maxExp").val();
    let maxSalary = $("#maxSalary").val().trim();
    let gender_male = $("#gender_male").text();
    let gender_female = $("#gender_female").text();
    let benefits = $("#benefits_text_area").val().trim();
    // let qualification = $("#eduQualification").val();
    let education_qualification_value = $(".eduQuality_input")
      .html()
      .split(", ");
    // let keySkills = $("#keySkill_input").html();
    let qualification = education_qualification_value.join(", ");
    // keySkills = keySkills.trim();
    let contactPersonName = $("#contactPersonName").val();
    let companyLocationUrl = $("#locationUrl").val();
    let companyName = $("#companyName").val();
    let jobCountry = $("#jobCountry").val();
    let noOfOpenings = $("#NoOfOPening").val();
    let workHours = $("#workHours").val().trim();
    let whatsappNumber = $("#whatAppNumber").val().trim();
    let mobileNumber = $("#contactNum").val().trim();
    let alternateMobileNumber = $("#alternateNum").val();
    // let keyskills = $("#keySkill_input").val();
    let keyskills = selected_keySkill.join(", ");
    // let shiftType = $("#shiftType").val();
    // let ot = $("#otType").val();
    let ot;
    let shiftType;

    function updateOTValue() {
      if ($("#overTime-1").prop("checked")) {
        ot = "Yes";
      } else if ($("#overTime-2").prop("checked")) {
        ot = "No";
      } else {
        ot = "";
      }
    }

    $("#overTime-1").on("click", updateOTValue);
    $("#overTime-2").on("click", updateOTValue);

    updateOTValue();

    function shiftValue() {
      if ($("#option-1").prop("checked")) {
        shiftType = "General";
      } else if ($("#option-2").prop("checked")) {
        shiftType = "Rotational";
      } else {
        shiftType = "";
      }
    }

    $("#option-1").on("click", shiftValue);
    $("#option-2").on("click", shiftValue);

    shiftValue();

    if ($("#minExp").val() == "0 - 1") {
      jobExp = "0";
      jobMaxExp = "1";
    } else if (
      $("#minExp").val() == "Freshers" ||
      $("#minExp").val() == "Fresher"
    ) {
      jobExp = "0";
      jobMaxExp = "0";
    } else {
      jobExp = $("#minExp").val();
      jobMaxExp = $("#minExp").val();
    }

    let jobDescription = $("#JobDescription").val();

    let obj = {
      employerId: employerId,
      jobType: "Full Time",
      industry: industry,
      jobCategory: jobCategory,
      salary: salary,
      maxSalary: maxSalary,
      jobExp: jobExp,
      // jobMaxExp: jobMaxExp,
      qualification: qualification,
      contactPersonName: contactPersonName,
      mobileNumber: mobileNumber,
      companyName: companyName,
      alternateMobileNumber: alternateMobileNumber,
      shiftType: shiftType,
      workHours: workHours,
      ot: ot,
      companyLocationUrl: companyLocationUrl,
      jobLatitude: user_location_details.latitude,
      jobLongitude: user_location_details.longitude,
      jobCountry: jobCountry,
      pincode: user_location_details.pin_code,
      state: user_location_details.state,
      country: user_location_details.country,
      jobLocation: city,
      area: area,
      jobLocationAddr: address,
      benefits: benefits,
      keyskills: keyskills,
      male: gender_male,
      female: gender_female,
      noOfOpenings: noOfOpenings,
      whatsappNumber: whatsappNumber,
      jobDescription: jobDescription,
    };
    console.log(obj);
    var settings = {
      url: `${getBaseUrl()}/updateNewPostJob?jobId=${JobId}`,
      // url: getBaseUrl() + "updateNewPostJob?jobId=" + JobId,
      method: "PUT",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(obj),
    };

    $.ajax(settings)
      .done(function (response) {
        successPopup("Job Published");
        getJDUpload(JobId);
        // window.location.reload();
        // console.log(res);
        // console.log("published");
        $("#btn_publish").prop("disabled", false);
      })
      .fail(function (response) {
        alert("Sorry , somthing went wrong ");
        // console.log(res);
        // console.log("failed");
        $("#btn_publish").prop("disabled", false);
      });
  }
}
function getJDUpload(JobId) {
  // let fileInput = document.getElementById("formFile");
  // let form = new FormData();
  // form.append("file", fileInput.files[0], "");
  var form = new FormData();
  var file_data = $("#formFile").prop("files")[0];
  form.append("file", file_data);
  let settings = {
    url: `${getAdminBaseUrl()}/jobDescriptionUpload?id=${JobId}`,
    method: "PUT",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings)
    .done(function (response) {
      // Success handling
      console.log("File uploaded successfully");
      // document.getElementById("jobDescriptionLinkName").textContent = fileInput;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // Failure handling
      console.error("Error:", textStatus, errorThrown);
    });
}

// $(document).on("click","#okbutton",function(e){
//   e.preventDefault();
//   const job_id = $('#JobId').val();
//   //  console.log('hi')
//   getJobId(job_id);
//   hidePopup();
// })
