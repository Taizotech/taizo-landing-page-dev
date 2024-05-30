// post-a-job form validation and api functions
let noError, deptNoError;
let isJobPostEligible;
let isFreeTrailUsed;
let jobPostId;
let globalJobId;
// let iscontactNumVeified = false;
let isalternateNumVeified = false;
let errFieldsArr = [];
let draftId;
let noOfOpenings = $("#NoOfOPening").attr("id");
// to geot employer details  array
var empDetailsArr = getEmpDetails();

var url = new URL(window.location.href);

let adminId = url.searchParams.get("adminId");

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
  // var nidhdh=$("#NoOfOPening").val()
  // alert(nidhdh,noOfOpenings)

  if ($("#employerId").val() == "") {
    $("#employerId").parents(".form-group").addClass("error");
    errFieldsArr.push("EmployerLabel");
    noError++;
  } else {
    $("#employerId").parents(".form-group").removeClass("error");
  }
  if ($("#CategoryOption").val() == "") {
    $("#CategoryOption").parents(".form-group").addClass("error");
    errFieldsArr.push("CategoryLabel");
    noError++;
  } else {
    $("#CategoryOption").parents(".form-group").removeClass("error");
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

  if ($("#eduQualification").val() == "") {
    $("#eduQualification").parents(".form-group").addClass("error");
    errFieldsArr.push("educationLabel");
    noError++;
  } else {
    $("#eduQualification").parents(".form-group").removeClass("error");
  }

  // if ($("#JobDescription").val() == "") {
  //   $("#JobDescription").parents(".form-group").addClass("error");
  //   errFieldsArr.push("JobDescription");
  //   noError++;
  // } else {
  //   $("#JobDescription").parents(".form-group").removeClass("error");
  // }

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

  if ($("#NoOfOPening").val() == "") {
    $("#NoOfOPening").parents(".form-group").addClass("error");
    errFieldsArr.push("NoOfOpeningLabel");
    noError++;
  } else {
    $("#NoOfOPening").parents(".form-group").removeClass("error");
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

  if ($("#locationUrl").val() == "") {
    $("#locationUrl").parents(".form-group").addClass("error");
    errFieldsArr.push("LocationurlLabel");
    noError++;
  } else {
    $("#locationUrl").parents(".form-group").removeClass("error");
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if ($("#emailID").val() == "") {
    $("#emailID").parents(".form-group").addClass("error");
    noError++;
  } else if (!emailRegex.test($("#emailID").val())) {
    $("#emailID").parents(".form-group").addClass("error");

    noError++;
  } else {
    $("#emailID").parents(".form-group").removeClass("error");
  }

  console.log(noError);
}

// end of validation function --------

let doc_Loction = window.location.href;
let urlStatus = new URL(doc_Loction);
// let draftJobId =
//   urlStatus.searchParams.get("draftJob_id") != null
//     ? urlStatus.searchParams.get("draftJob_id")
//     : null;
let employerId =
  urlStatus.searchParams.get("employer_id") != null
    ? urlStatus.searchParams.get("employer_id")
    : null;
let placementId =
  urlStatus.searchParams.get("placement_id") != null
    ? urlStatus.searchParams.get("placement_id")
    : null;
let savedJobId = urlStatus.searchParams.get("savedJob_id");
let repostId = urlStatus.searchParams.get("repostJob_id");
let JobId = urlStatus.searchParams.get("jobId");
// getJobId(JobId);

if (employerId != null) {
  // draftJobPrefillFn(placementId);
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

  $("#placementId").val(placementId);
  $("#employerId").val(employerId);
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
// function draftJobPrefillFn(id) {
//   let settings = {
//     url: getBaseUrl() + "/placementPlanDetailsById/" + id,
//     method: "GET",
//     contentType: "application/json; charset=utf-8",
//   };
//   $.ajax(settings)
//     .done(function (res) {
//       clear_all_field();
//       console.log(res);
//       // alert(res.jobIndustry);
//       // let jobDetails = res.jobDetails;
//       let jobCategory = res.jobCategory;
//       let jobIndustry = res.jobIndustry;
//       let noOfOpenings = res.noOfOpenings;

//       $("#jobRoleCategory").val(jobCategory != null ? jobCategory : "");
//       $("#jobRole").val(jobIndustry != null ? jobIndustry : "");
//       // $("#jobRole").val(jobindustry != null ? jobindustry : "");
//       $("#NoOfOPening").val(noOfOpenings != null ? noOfOpenings : "");
//       // draftJobPrefillFn(res.data.id);
//     })
//     .fail(() => {
//       window.location.href = "select-plan";
//     });
// }

// function draftJobPrefillFn(employerId, paymentId) {
//   let settings = {
//     url: getBaseUrl() + "/placementPlanDetailsById/" +employerId +paymentId,
//     method: "GET",
//     contentType: "application/json; charset=utf-8",
//     data: {
//       employerId: res.data.id,
//       paymentId: res.data.paymentId
//       ,
//     },
//   };

//   $.ajax(settings)
//     .done(function (res) {
//       clear_all_field();
//       console.log(res);

//       if (res.data.jobCategory) {
//         $("#jobRoleCategory").val(res.data.jobCategory);
//       }
//       if (res.data.industry) {
//         $("#jobRole").val(res.data.industry);
//       }
//       if (res.data.isExperienced) {
//         if (res.data.isExperienced === true) {
//           $("#minExp").val("Freshers");
//         } else {
//           $("#minExp").val(experienceValue);
//         }
//       }
//     })
//     .fail(() => {
//       window.location.href = "select-plan";
//     });
// }

// $(document).ready(function () {
//   const employerId = $("#employerId").val();
//   const paymentId = $("#paymentId").val();

//   if (employerId && paymentId) {
//     draftJobPrefillFn(employerId, paymentId);
//   }
// });

// function draftJobPrefillFn(id) {
//   let settings = {
//     url: getBaseUrl() + "/placementPlanDetailsById/" + id,
//     method: "GET",
//     contentType: "application/json; charset=utf-8",
//   };
//   $.ajax(settings)
//     .done(function (res) {
//       // clear_all_field();
//       console.log(res);
//       let fresher_experiencee = res.data.isExperienced;

//       const Plan = res.data;
//       if (Plan.isExperienced) {

//          // Disable the select field
//          $(".fresherOption").addClass("d-none")
//       } else {
//         $("#minExp").val("Freshers");

//         $(".experienceOption").addClass("d-none")
//       }

//       if (res.data.jobCategory) {
//         $("#jobRoleCategory").val(res.data.jobCategory);
//       }
//       if (res.data.industry) {
//         $("#jobRole").val(res.data.industry);
//       }

//       if (res.data.noOfOpenings) {
//         $("#jobRole").val(res.data.noOfOpenings);
//       }
//       // if (res.data.isExperienced) {
//       //   if (res.data.isExperienced === true) {
//       //     $("#minExp").val("Freshers");
//       //   } else {
//       //     $("#minExp").val(experienceValue);
//       //   }
//       // }
//     })
//     .fail(() => {
//       // window.location.href = "select-plan";
//     });
// }

function draftJobPrefillFn(id) {
  let settings = {
    url: getBaseUrl() + "/placementPlanDetailsById/" + id,
    method: "GET",
    contentType: "application/json; charset=utf-8",
  };
  $.ajax(settings)
    .done(function (res) {
      // clear_all_field();
      console.log(res);

      // const Plan = res.data;
      // if (Plan.isExperienced) {

      //    // Disable the select field
      //    $(".fresherOption").addClass("d-none")
      // } else {
      //   $("#minExp").val("Freshers");

      //   $(".experienceOption").addClass("d-none")
      // }

      // alert(res.jobIndustry);
      // let jobDetails = res.jobDetails;
      let jobCategory = res.data.jobCategory;
      let industry = res.data.industry;
      let noOfOpenings = res.data.noOfOpenings;
      let fresher_experiencee = res.data.isExperienced;
      let minSalary = res.data.minSalary;
      let maxSalary = res.data.maxSalary;
      // let jobExp =res.data.jobMinExp ==0 ?"Fresher": res.data.jobMinExp;
      // let jobExp = res.data.jobMinExp === 0 ? "Fresher" : "Freshers";
      let jobExp =
        res.data.jobMinExp === 0 ? "Freshers" : res.data.jobMinExp.toString();

      let workHours = res.data.workHours + " hours";

      $("#jobRoleCategory").val(jobCategory != null ? jobCategory : "");
      $("#jobRole").val(industry != null ? industry : "");
      // $("#jobRole").val(jobindustry != null ? jobindustry : "");
      $("#NoOfOPening").val(noOfOpenings != null ? noOfOpenings : "");
      $("#minSalary").val(minSalary != null ? minSalary : "");
      $("#maxSalary").val(maxSalary != null ? maxSalary : "");
      $("#minExp").val(jobExp != null ? jobExp : "");
      console.log(jobExp);
      $("#workHours").val(workHours != null ? workHours : "");
      console.log(workHours);
      // $("#minExp").val(fresher_experiencee != null ? fresher_experiencee : "");
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
//     let noOfOpenings = parseInt($("#NoOfOPening").val());

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
//       url: getBaseUrl() + `/${endUrl}?placementPlanId=${draftJobId}`,
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
// var empDetails = getEmpDetails();
// $(document).ready(function() {
//   $("employerId").on('input', function() {
//     var empId = $(this).val();
//     if (empId) {
//       $('#contactPersonName').response.data.contactPersonName;
//       $('#contactNumber').response.data.mobileNumber;
//       $('#whatsappNumber').response.data.companyDetailsFilled;
//     }
//     else {
//       $('#contactPersonName').val('');
//       $('#contactNumber').val('');
//       $('#whatsappNumber').val('');

//     }
//   })
// })
// $(document).ready(function() {
//   $("employerId").on('input', function() {
//     var empId = $(this).val();
//   let settings={
//         url:`${getBaseUrl()}/empDetails?emp_id=${empId}`,
//         "method": "GET",
//         "timeout": 0,
//         "processData": false,
//         "mimeType": "multipart/form-data",
//         "contentType": false,
//      }
//         $ajax(settings).done(function (res) {
//           console.log(res);
//           $('#contactPersonName').val(data.contactPersonName);
//           $('#contactNumber').val(data.contactNumber);
//           $('#whatsappNumber').val(data.whatsappNumber);
//         })
//         .fail(function (res) {
//           console.log(res);

//         $('#contactPersonName').val('');
//         $('#contactNumber').val('');
//         $('#whatsappNumber').val('');
//         });
//       });
// })
// end of  post a job api function

function getEmployerDetails() {
  employerId =
    $("#employerId").val() != null && $("#employerId").val() != ""
      ? $("#employerId").val()
      : null;
  let userId = localStorage.getItem("userID");
  let settings = {
    async: false,
    method: "GET",
    url: getBaseUrl() + "/empDetails?emp_id=" + employerId,
  };
  $.ajax(settings)
    .done(function (res) {
      console.log(res);
      let contactPersonName = res.employer.contactPersonName;
      let mobileNumber = res.employer.mobileNumber;
      let whatsappNumber = res.employer.whatsappNumber;

      let planType = res.employer.plan;
      let planJobCount = res.employer.planJobCount;
      let pricingErrText = "";
      let pricingAlertText = "";
      let planExpDate = res.employer.expiryDate;
      let x = new Date();
      let y = new Date(planExpDate);

      if (planType == 5) {
        pricingAlertText = "Job not published!";
        pricingErrText =
          "Taizo's free trial period has ended. <br> You can subscribe for a monthly or annual plan that meets your requirements to continue to post the job.";
      } else if (planType == 7 && planJobCount == 0) {
        pricingAlertText = "Job not published!";
        pricingErrText =
          "Your job posting limit has been exceeded.<br> You can subscribe for a monthly or annual plan that meets your requirements to continue to post the job.";
      } else if (planType == 7 && x > y) {
        pricingAlertText = "Job not published!";
        pricingErrText =
          "Your Taizo subscription has expired.<br> You can subscribe for a monthly or annual plan that meets your requirements to continue to post the job.";
      } else {
        pricingAlertText = "Post a Job!";
        pricingErrText =
          "A simple hiring platform to serve <br> the manufacturing units' hiring needs.";
      }
      $(".pricingAlertText").text(pricingAlertText);
      $(".pricingErrText").html(pricingErrText);

      if (res.employer.usedFreeTrial == "Yes") {
        isFreeTrailUsed = true;
      } else {
        isFreeTrailUsed = false;
      }

      if (contactPersonName != null || mobileNumber != null) {
        $("#contactPersonName").val(contactPersonName);
        $("#contactNum").val(mobileNumber);
        $("#whatapp_number").val(whatsappNumber);
        $(".empWhatAppNumber").text(res.employer.whatsappNumber);
        // console.log("whatsapp", res.data.whatsappNumber);
        $(".verifyTxt").removeClass("d-none");
        $(".verifyBtn").addClass("d-none");
        iscontactNumVeified = true;
      }
    })
    .fail(function (err) {
      alert("Sorry , somthing went wrong " + err);
    });

  //  to get the job post eligible status
  let setting = {
    async: false,
    method: "GET",
    url: getBaseUrl() + "/getEmployerPlanStatus?employer_id=" + userId,
    // url: getBaseUrl() + "/empDetails?emp_id=26",
  };
  $.ajax(setting).done(function (res) {
    if (res.status) {
      isJobPostEligible = true;
    } else {
      isJobPostEligible = false;
    }

    if (isJobPostEligible) {
      $("#btn_publish").text("Publish");
    }
    // console.log(res);
  });
  // if (isFreeTrailUsed == false) {
  //   $("#btn_publish").text("Publish");
  // } else if (isJobPostEligible) {
  //   $("#btn_publish").text("Publish");
  // } else {
  //   $("#btn_publish").text("Upgrade to Publish");
  // }
}

getEmployerDetails();

function newJobApiFn(endUrl, reqMethod) {
  if (noError == 0) {
    $("#btn_publish").prop("disabled", true);
    let noOfOpenings = parseInt($("#NoOfOPening").val());

    let employerId,
    CategoryOption,
      industry,
      jobCategory,
      NoOfOPening,
      jobDescription,
      salary,
      maxSalary,
      jobExp,
      jobMaxExp,
      companyLocationUrl,
      qualification,
      specialization,
      contactPersonName,
      mobileNumber,
      alternateMobileNumber,
      shiftType,
      workHours,
      ot,
      benefits,
      whatsappNoti,
      settings,
      male,
      female,
      keyskills,
      gender,
      obj,
      whatsappNumber,
      emailId;

    //  employerId = localStorage.getItem("userID");
    // employerId = document.getElementById("employerId");
    //  employerId = document.getElementById("employerId").value;
    // employerId = $('#employerId').val();
    //  employerId = document.getElementById("EmployerLabel").htmlFor;

    // employerId = localStorage.getItem("userID");

    employerId =
      $("#employerId").val() != null && $("#employerId").val() != ""
        ? $("#employerId").val()
        : null;
    jobCategory =
      $("#jobRoleCategory").val() != null && $("#jobRoleCategory").val() != ""
        ? $("#jobRoleCategory").val()
        : null;
    industry =
      $("#jobRole").val() != null && $("#jobRole").val() != ""
        ? $("#jobRole").val()
        : null;
    salary = $("#minSalary").val() != 0 ? $("#minSalary").val() : "14000";
    maxSalary = $("#maxSalary").val() != 0 ? $("#maxSalary").val() : "20000";
    qualification = eq_valueArr.length != 0 ? eq_valueArr.join(", ") : null;
    specialization =
      $("#department").val() != null ? $("#department").val() : null;
    contactPersonName =
      $("#contactPersonName").val() != null
        ? $("#contactPersonName").val()
        : null;
    mobileNumber =
      $("#contactNum").val() != null ? $("#contactNum").val() : null;
    shiftType =
      $("input[type='radio'][name='shiftType']:checked").val() != null
        ? $("input[type='radio'][name='shiftType']:checked").val()
        : null;
    ot =
      $("input[type='radio'][name='otType']:checked").val() != null
        ? $("input[type='radio'][name='otType']:checked").val()
        : null;
    // gender =
    //   $("input[type='radio'][name='gender']:checked").val() != null
    //     ? $("input[type='radio'][name='gender']:checked").val()
    //     : null;
    male = $("#gender_male").text();
    female = $("#gender_female").text();
    keyskills = ks_valueArr.length != 0 ? ks_valueArr.join(", ") : null;
    companyLocationUrl =
      $("#locationUrl").val() != null ? $("#locationUrl").val() : null;

    if (benefits_text.length == 0) {
      benefits = null;
    } else {
      benefits = benefits_text.join(", ");
    }

    if ($("#workHours").val() == "") {
      workHours = null;
    } else {
      workHours = $("#workHours").val();
    }

    if ($("#whatsAppCheck").is(":checked")) {
      whatsappNoti = true;
      // it is checked
    } else {
      whatsappNoti = false;
    }

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

    if ($("#emailID").val() != "") {
      emailId = $("#emailID").val();
    } else {
      emailId = null;
    }

    if ($("#alternateNum").val() != "") {
      alternateMobileNumber = $("#alternateNum").val();
    } else {
      alternateMobileNumber = null;
    }

    whatsappNumber = $("#whatAppNumber").val();

    if (male == 0 && female > 0) {
      gender = "female";
    } else if (female == 0 && male > 0) {
      gender = "male";
    } else if (male != 0 && female != 0) {
      gender = "both";
    }

    jobDescription = $("#JobDescription").val();
    CategoryOption = $("#CategoryOption").val();

    obj = {
      employerId: employerId,
      industry: industry,
      jobCategory: jobCategory,
      salary: salary,
      maxSalary: maxSalary,
      jobExp: jobExp,
      jobMaxExp: jobMaxExp,
      qualification: qualification,
      specialization: specialization,
      contactPersonName: contactPersonName,
      companyLocationUrl: companyLocationUrl,
      mobileNumber: mobileNumber,
      alternateMobileNumber: alternateMobileNumber,
      shiftType: shiftType,
      workHours: workHours,
      male: male,
      female: female,
      ot: ot,
      benefits: benefits,
      whatsappNoti: whatsappNoti,
      keyskills: keyskills,
      gender: gender,
      whatsappNumber: whatsappNumber,
      noOfOpenings: noOfOpenings,
      emailId: emailId,
      jobDescription: jobDescription,
      collarType: CategoryOption,
    };
    settings = {
      async: true,
      crossDomain: true,
      // url: getAdminBaseUrl() + `/${endUrl}?employerId=` + localStorage.getItem("userID"),
      // url: getAdminBaseUrl() + `/${endUrl}?employer_id=` + employerId,
      url: getAdminBaseUrl() + `/${endUrl}?admin_id=${adminId}`,
      // url: getAdminBaseUrl() + `/newPostJob?employer_id=` + employerId,
      method: reqMethod,
      contentType: "application/json; charset=utf-8",
      processData: false,
      data: JSON.stringify(obj),
    };
    $.ajax(settings)
      .done(function (res) {
        successPopup("Job Published");
        let id = res.data.id;
        getJDUpload(id);
        // window.location.reload();
        console.log(res);
        $("#employerId").val("");
        $("#formFile").val("");
        $("#placementId").val("");
        $("#jobRoleCategory").val("");
        $("#NoOfOPening").val("");
        $("#gender_male").text("");
        $("#gender_female").text("");
        $("#minSalary").val("");
        $("#maxSalary").val("");
        $("#benefits_text_area").val("");
        $("#minExp").val("");
        $("#keySkill_input").html("");
        $(".eduQuality-custom-dropdown .eduQuality_input").text("");
        $("#department").val("");
        $("input[name='shiftType']:checked").prop("checked", false);
        $("input[name='otType']:checked").prop("checked", false);
        $("#workHours").val("");
        $("#contactPersonName").val("");
        $("#contactNum").val("");
        $("#alternateNum").val("");
        $("#whatAppNumber").val("");
        $("#emailID").val("");
        $("#locationUrl").val("");
        $("#JobDescription").val("");
        $("#CategoryOption").val("");
        updateUrlParams(null, null);
        console.log("published");
        $("#btn_publish").prop("disabled", false);
      })
      .fail(function (res) {
        alert("Sorry , somthing went wrong ");
        // console.log(res);
        // console.log("failed");
        $("#btn_publish").prop("disabled", false);
      });
  } else {
    // window.scrollBy(0, -document.body.scrollHeight);
    window.location.href = `#${errFieldsArr[0]}`;
    // console.log(errFieldsArr);
  }
}

// $("#btn_publish").click(function () {
//   draftJobValidationFN();
//   // console.log("noError");
//   // draftJobId = id;
//   // draftJobPrefillFn(id);
//   postJobApiFn("newPostJob", "POST", false);
//   // successPopup("Job Published");
// });

// function showFields(selectedOption) {
//   const fieldsContainer = document.getElementById('fieldsContainer');
//   const draftId = document.getElementById('draftId');
//   const draftLabel = document.getElementById('DraftLabel');

//   if (selectedOption === 'radioOption1' || selectedOption === 'radioOption2') {
//     fieldsContainer.style.display = 'block';

//     // Handle #draftId and #DraftLabel visibility based on the selectedOption
//     if (selectedOption === 'radioOption2') {
//       draftId.style.display = 'none';
//       draftLabel.style.display = 'none';
//     } else if (selectedOption === 'radioOption1') {
//       draftId.style.display = 'block';
//       draftLabel.style.display = 'block';
//     }
//   } else {
//     // In case neither radioOption1 nor radioOption2 is selected, hide the fields container, draftId, and draftLabel
//     fieldsContainer.style.display = 'none';
//     draftId.style.display = 'none';
//     draftLabel.style.display = 'none';
//   }
// }

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

// var form = new FormData();
// form.append("file", fileInput.files[0], "");

// var settings = {
//   url: `${getBaseUrl()}/admin/jobDescriptionUpload?id=${JobId}`,
//   method: "PUT",
//   timeout: 0,
//   processData: false,
//   mimeType: "multipart/form-data",
//   contentType: false,
//   data: form,
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// function getJDUpload() {
//   $(document).ready(function () {
//     getJobId(); // Call getJobId to initialize globalJobId
//     $("#formFile").change(function () {
//       var fileInput = document.getElementById("formFile");
//       var form = new FormData();
//       form.append("file", fileInput.files[0], "");

//       var settings = {
//         url: `${getBaseUrl()}/admin/jobDescriptionUpload?id=${globalJobId}`,
//         method: "PUT",
//         timeout: 0,
//         processData: false,
//         mimeType: "multipart/form-data",
//         contentType: false,
//         data: form,
//       };

//       $.ajax(settings)
//         .done(function (response) {
//           console.log(response);
//           // Handle response as needed
//         })
//         .fail(function (jqXHR, textStatus, errorThrown) {
//           console.error("Error:", textStatus, errorThrown);
//           // Handle error
//         });
//     });
//   });
// }

// function getJobId() {
//   let settings = {
//     url: getBaseUrl() + "/job/" + globalJobId,
//     method: "GET",
//     contentType: "application/json; charset=utf-8",
//   };
//   $.ajax(settings)
//     .done(function (res) {
//       // clear_all_field();
//       console.log(res);
//       let jobDetails = res.jobDetails;
//       globalJobId = jobDetails.id;
//     })
//     .fail(function () {
//       // console.log("failed")
//     });
// }

function getJDUpload(id) {
  // let fileInput = document.getElementById("formFile");
  // let form = new FormData();
  // form.append("file", fileInput.files[0], "");
  var form = new FormData();
  var file_data = $("#formFile").prop("files")[0];
  form.append("file", file_data);
  let settings = {
    url: `${getAdminBaseUrl()}/jobDescriptionUpload?id=${id}`,
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
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // Failure handling
      console.error("Error:", textStatus, errorThrown);
    });
}

function updateUrlParams(employerId, placementId) {
  var url = new URL(window.location.href);

  url.searchParams.set("employer_id", employerId);
  url.searchParams.set("placement_id", placementId);

  // Replace the current URL with the updated one
  window.history.replaceState(null, null, url.toString());
}

$("#btn_publish").click(function () {
  postJobValidationFN();
  if (noError === 0) {
    newJobApiFn("newPostJob", "POST", false);
    // getJDUpload();
    // successPopup("Job Published");
  }
});
