// $("#numValid").addClass("d-none");
let otpCode = "";
let mobileNum, registerFlow, mnVerified;
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//   const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let inpLen = $("#mobile_code").val().length;

// $("#mobile_code").keypress(function(e) {
//     if (e.which == 13) {
//         $(".callonclickEnter").click()
//             // $("#go").click();
//     }
// });

// $("#sign-in-button").click(function(){
//     onSignInSubmit();
//     $("section.cusmodal").removeClass("d-none");
//     $("#otpValid").hide();
//     $("#sendToNum").html("+91 " + $("#mobile_code").val());
//     setTimeout(() => { $("#otpInp1").focus(); }, 10);

// })

$("#sign-in-button").click(function () {
  let inpLen = $("#mobile_code").val().length;

  if (inpLen == 10) {
    $("section.cusmodal").removeClass("d-none");
    $("#otpValid").hide();
    $("#sendToNum").html("+91 " + $("#mobile_code").val());
    setTimeout(() => {
      $("#otpInp1").focus();
    }, 500);
    $("#numValid").addClass("d-none");
    setTimeout(() => {
      onSignInSubmit();
    }, 700);
  } else {
    $("#numValid").removeClass("d-none");
    setTimeout(() => {
      $("#mobile_code").focus();
    }, 100);
  }
});

$(document).on("input", "#mobile_code", function () {
  $("#numValid").addClass("d-none");
});

// to check the mobile num verification status function
$(".signInBtn").click(function () {
  mobileNum = $("#mobile_code").val();
  if (mobileNum.length == 10) {
    $("#otpInp1 , #otpInp2 , #otpInp3 , #otpInp4 , #otpInp5 , #otpInp6  ").val(
      ""
    );
    var settings = {
      async: true,
      crossDomain: true,
      url:
        getBaseUrl() +
        "/newRegister?mobile_number=" +
        mobileNum +
        "&country_code=91",
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization:
          "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
        "cache-control": "no-cache",
      },
    };
    $.ajax(settings)
      .done(function (res) {
        registerFlow = true;
        if (res.data.mnverified) {
          mnVerified = true;
        } else {
          mnVerified = false;
        }
        // console.log("regFlow=True");
      })
      .fail(function () {
        registerFlow = false;
        // console.log("regFlow=False");
      });
  } else {
  }
});
// to go to employer console company details
let toConsole = (mobileNumber) => {
  setTimeout(() => {
    // link to console
    window.open(
      getBaseRedirectUrl() + "company-details?mobilenumber=" + mobileNumber,
      "_self"
    );
    setTimeout(() => {
      $("section.cusmodal").addClass("d-none");
      $(".otpmodalitm.befverfy").removeClass("d-none");
      $(".otpmodalitm.aftverfy").addClass("d-none");
      $("#mobile_code").val("");
      $(".otpverbtn").html(`Verify`);
    }, 2000);
  }, 1000);
};
let tomanageJobs = (mobileNumber) => {
  // link to dashboard
  window.open(
    getBaseRedirectUrl() + "manage-jobs?mobilenumber=" + mobileNumber,
    "_self"
  );
  setTimeout(() => {
    $("section.cusmodal").addClass("d-none");
    $(".otpmodalitm.befverfy").removeClass("d-none");
    $(".otpmodalitm.aftverfy").addClass("d-none");
    $("#mobile_code").val("");
    $(".otpverbtn").html(`Verify`);
  }, 2000);
};
// mnVerified Api function (register flow )
function mnVerifiedApiFn() {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      getBaseUrl() +
      "/mnVerified?mobile_number=" +
      mobileNum +
      "&verified=true",
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization:
        "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
      "cache-control": "no-cache",
    },
  };
  $.ajax(settings).done(function (res) {
    // console.log(res);
    // console.log("registerFlow");
    setTimeout(toConsole(mobileNum), 1000);
  });
}

// employer MN verified api function (login flow)
function empMnVerifiedApiFn() {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      getBaseUrl() +
      "/empMNVerified?mobile_number=" +
      mobileNum +
      "&verified=true",
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization:
        "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
      "cache-control": "no-cache",
    },
  };
  $.ajax(settings)
    .done(function (response) {
      let companyDetails = response.data.companyDetailsFilled;
      let contactDetails = response.data.contactDetailsFilled;
      let kycStatus = response.data.kycStatus;
      let kycNumber = response.data.regProofNumber;
      let empEmailId = response.data.emailId;
      let employerId = response.data.id;
      let companyLogo = response.data.companyLogo;

      if (
        companyDetails == true &&
        contactDetails == true &&
        kycNumber != null
      ) {
        setTimeout(tomanageJobs(mobileNum), 500);
      } else {
        if (companyDetails != true) {
          setTimeout(toConsole(mobileNum), 1000);
        } else if (contactDetails != true) {
          setTimeout(toConsole(mobileNum), 1000);
        } else if (kycNumber == null) {
          setTimeout(toConsole(mobileNum), 1000);
        }
      }
      // console.log(response);
      // console.log("loginFlow");
    })
    .fail(function (res) {
      // console.log(res)
      $(".loginErrorTxt").text(res.responseJSON.message);
      $(".loginErrorWrp").removeClass("d-none");
      $(".otpmodalitm.befverfy").addClass("d-none");
      $(".otpmodalitm.aftverfy").addClass("d-none");
    });
}
// fire base otp functions
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "sign-in-button",
  {
    size: "invisible",
    callback: function (response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // onSignInSubmit();
      // $("section.cusmodal").removeClass("d-none");
      // $("#otpValid").hide();
      // $("#sendToNum").html("+91 " + $("#mobile_code").val());
      // setTimeout(() => { $("#otpInp1").focus(); }, 10);
    },
  }
);

recaptchaVerifier.render().then(function (widgetId) {
  window.recaptchaWidgetId = widgetId;
});

function onSignInSubmit() {
  var phoneNumber = "+91" + document.getElementById("mobile_code").value;
  var appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    })
    .catch(function (error) {
      // Error; SMS not sent
      console.error("Error during signInWithPhoneNumber", error);
      // window.alert('Error during signInWithPhoneNumber:\n\n' +
      //     error.code + '\n\n' + error.message);
    });
}

function onVerifyCodeSubmit() {
  otpCode =
    $("#otpInp1").val() +
    $("#otpInp2").val() +
    $("#otpInp3").val() +
    $("#otpInp4").val() +
    $("#otpInp5").val() +
    $("#otpInp6").val();

  confirmationResult
    .confirm(otpCode)
    .then(function (result) {
      // User signed in successfully.
      // var user = result.user;

      localStorage.setItem("mobileNum", mobileNum);

      if (registerFlow) {
        if (mnVerified) {
          setTimeout(toConsole(mobileNum), 500);
        } else {
          mnVerifiedApiFn();
        }
        // to show verification succses image
        $(".otpmodalitm.befverfy").addClass("d-none");
        $(".otpmodalitm.aftverfy").removeClass("d-none");
      } else {
        empMnVerifiedApiFn();
      }
    })
    .catch(function (error) {
      // User couldn't sign in (bad verification code?)
      $("#otpValid").show();
      console.error("Error while checking the verification code", error);
      $(".otpverbtn").html(`Verify`);
      // window.alert('Error while checking the verification code:\n\n' +
      //     error.code + '\n\n' + error.message);
    });
}
$(".otpverbtn").click(function () {
  // otp validation

  otpCode =
    $("#otpInp1").val() +
    $("#otpInp2").val() +
    $("#otpInp3").val() +
    $("#otpInp4").val() +
    $("#otpInp5").val() +
    $("#otpInp6").val();
  if (otpCode.length == 6) {
    onVerifyCodeSubmit();
    $("#otpValid").hide();
    $(this).html(` <i class="fas fa-cog fa-spin"></i> Verifing....`);
  } else {
    $("#otpValid").show();
  }
});
$("#verifyCloseBtn ,.verifyCloseBtn").click(function () {
  location.reload();
});
$("#resendOtp").click(function () {
  $("#otpInp1 , #otpInp2 , #otpInp3 , #otpInp4 , #otpInp5 , #otpInp6  ").val(
    ""
  );
  if (
    typeof grecaptcha !== "undefined" &&
    typeof window.recaptchaWidgetId !== "undefined"
  ) {
    grecaptcha.reset(window.recaptchaWidgetId);
  }
  onSignInSubmit();
});

// var verificationCode = [];
// $(".vrycdewrp input[type=text]").keyup(function(e) {
//     console.log('test');
//     // Get Input for Hidden Field
//     $(".vrycdewrp input[type=text]").each(function(i) {
//         verificationCode[i] = $(".vrycdewrp input[type=text]")[i].value;
//         $('#verificationCode').val(Number(verificationCode.join('')));
//         //console.log( $('#verificationCode').val() );
//     });

//     //console.log(event.key, event.which);

//     if ($(this).val() >= 0) {
//         if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9 || event.key == 0) {
//             $(this).next().focus();
//         } else {
//             if (event.key == 'Backspace') {
//                 $(this).prev().focus();
//             }
//         }
//     } else {
//         if (event.key == 'Backspace') {
//             $(this).prev().focus();
//         }
//     }

// }); // keyup
