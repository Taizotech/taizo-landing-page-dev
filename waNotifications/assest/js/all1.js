// caution!!  set releaseEnvironmentProd to ture to move to production

let releaseEnvironmentProd = true; //production !!!!!!!
// // Disable inspect element
// $(document).bind("contextmenu", function (e) {
//   e.preventDefault();
// });
// $(document).keydown(function (e) {
//   if (e.which === 123) {
//     return false;
//   }
// });

// base url
function getBaseUrl() {
  if (releaseEnvironmentProd) {
    var base_url = "https://prod.taizo.in/webEmployer";
  } else {
    var base_url = "https://dev.taizo.in/webEmployer";
    // var base_url =
    //   "http://taizodev-env.eba-5vmwajix.ap-south-1.elasticbeanstalk.com/webEmployer";
  }
  return base_url;
}

function getAdminBaseUrl() {
  if (releaseEnvironmentProd) {
    var base_url = "https://prod.taizo.in/admin";
  } else {
    var base_url = "https://dev.taizo.in/admin";
    // var base_url =
    //   "http://taizodev-env.eba-5vmwajix.ap-south-1.elasticbeanstalk.com/webEmployer";
  }
  return base_url;
}

function getCommonBaseUrl() {
  let baseUrl;
  if (releaseEnvironmentProd) {
    baseUrl = "https://prod.taizo.in";
  } else {
    baseUrl = "https://dev.taizo.in";
  }
  return baseUrl;
}

// amazon pool Id

function getPoolId() {
  let poolId;
  if (releaseEnvironmentProd) {
    poolId = "ap-south-1_qd3H5PZs7";
  } else {
    poolId = "ap-south-1_P6Yo7kBkG";
  }
  return poolId;
}

// amazon app Id
function getAppId() {
  let appId;
  if (releaseEnvironmentProd) {
    appId = "2jheqsco3mv87995j7no3bojbl";
  } else {
    appId = "6hmgk2fvlougmqdu7dp9epmba4";
  }
  return appId;
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = getFireBaseConfig();

function getFireBaseConfig() {
  let configObj;
  if (releaseEnvironmentProd) {
    configObj = {
      apiKey: "AIzaSyArfUCqhFHexXmNObtBcu4T3N0h5VVZayI",
      authDomain: "taizo-employer.firebaseapp.com",
      projectId: "taizo-employer",
      storageBucket: "taizo-employer.appspot.com",
      messagingSenderId: "1051314195440",
      appId: "1:1051314195440:web:b7bb938647a595c1d2ab35",
      measurementId: "G-Q0EXWY2J0E",
    };
  } else {
    configObj = {
      apiKey: "AIzaSyA7xUIdcYHthyy4nBeU9wPGyX7EDmoEL7M",
      authDomain: "taizotestct-1.firebaseapp.com",
      projectId: "taizotestct-1",
      storageBucket: "taizotestct-1.appspot.com",
      messagingSenderId: "280080699846",
      appId: "1:280080699846:web:9343c6e80c8927f62022c7",
      measurementId: "G-9YV6FCTP81",
    };
  }
  return configObj;
}

// Galla box chat box
function getCleverTap_id() {
  let cleverTapId;
  if (releaseEnvironmentProd) {
    cleverTapId = "WR7-66K-466Z";
  } else {
    cleverTapId = "TEST-ZR7-66K-466Z";
  }
  return cleverTapId;
}

(function (w, d, s, u) {
  w.gbwawc = {
    url: u,
    options: {
      waId: "+91 7806805808",
      siteName: "Taizo.in",
      siteTag: "available",
      siteLogo:
        "https://taizo-common.s3.ap-south-1.amazonaws.com/Public/images/whatsapp-taizo-logo.png",
      widgetPosition: "RIGHT",
      triggerMessage: "Hello there! Need help?",
      welcomeMessage: "Welcome to Taizo 🙂",
      brandColor: "#25D366",
      messageText: "We help jobseekers find jobs in manufacturing companies. ",
      replyOptions: ["Continue"],
    },
  };
  var h = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.async = true;
  j.src = u + "/whatsapp-widget.min.js?_=" + Math.random();
  h.parentNode.insertBefore(j, h);
})(window, document, "script", "https://waw.gallabox.com");

// to get employer details

function getEmpDetails() {
  let empDetails;
  let settings = {
    async: false,
    method: "GET",
    url: getBaseUrl() + "/empDetails?emp_id=" + localStorage.getItem("userID"),
  };
  $.ajax(settings)
    .done(function (res) {
      empDetails = res;
      console.log(empDetails);
    })
    .fail(function (res) {
      // console.log(res)
    });
  return empDetails;
}


// function getEmpDetails() {
//   let empDetails;
//   let urlParams = new URLSearchParams(window.location.search);
//   let empId = urlParams.get("empId");

//   if (!empId) {
//     // Handle the case where empId is not present in the URL
//     console.error("empId not found in URL");
//     return null;
//   }

//   let settings = {
//     async: false,
//     method: "GET",
//     url: getBaseUrl() + "/empDetails?emp_id=" + empId,
//   };

//   $.ajax(settings)
//     .done(function (res) {
//       empDetails = res;
//       console.log(empDetails);
//     })
//     .fail(function (res) {
//       // Handle AJAX failure if needed
//       console.error("Failed to fetch employee details:", res);
//     });

//   return empDetails;
// }


// to get employer details  array
let employerData = getEmpDetails();
// console.log(employerData);

// // country code
// $("#mobile_code").intlTelInput({
//     allowDropdown: false,
//     initialCountry: "in",
//     separateDialCode: true,
// });

$(document).ready(function () {
  //  to remove error text after input
  $("input , textarea").keydown(function () {
    // alert("hii");
    let id = $(this).prop("id");
    removeError(id);
  });
  $("select").on("change", function () {
    let id = $(this).prop("id");
    removeError(id);
  });
  $("input").change(function () {
    let id = $(this).prop("id");
    removeError(id);
  });
});

function addError(idName) {
  let id = "#" + idName;
  $(id).parents(".form-group").addClass("error");
}

function removeError(idName) {
  let id = "#" + idName;
  $(id).parents(".form-group").removeClass("error");
}

// const toTitleCase = (phrase) => {
//   return phrase
//     .toLowerCase()
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ")
//     .trim();
// };

// otp verify input field change function
$(".vrycdewrp input[type=text]").keyup(function (e) {
  let keyVal = $(this).val();
  if (keyVal == "") {
    if (event.key == "Backspace") {
      $(this).prev().focus();
    }
  } else if (keyVal != "") {
    if (event.key != "Backspace") {
      $(this).next().focus();
    }
  }

  if (event.key == "Enter") {
    $(".otpverbtn").click();
  }
});

$(".vrycdewrp input[type=text]").on("input", function (e) {
  let keyVal = $(this).val();
  if (0 <= keyVal && keyVal <= 9 && keyVal != "") {
    $(this).next().focus();
  } else if (keyVal == "") {
    $(this).prev().focus();
  } else {
    $(this).val("");
  }
});

// to prevent numbers in input field
$(function () {
  $("#contactPersonName").keydown(function (e) {
    if (e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;

      if (
        !(
          key == 8 ||
          key == 32 ||
          key == 13 ||
          key == 46 ||
          key == 9 ||
          (key >= 35 && key <= 40) ||
          (key >= 65 && key <= 90)
        )
      ) {
        e.preventDefault();
      }
    }
  });
});

// to prevent numbers in input field
$(function () {
  $(".contactName").keydown(function (e) {
    if (e.ctrlKey || e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;

      if (
        !(
          key == 8 ||
          key == 32 ||
          key == 13 ||
          key == 46 ||
          key == 9 ||
          (key >= 35 && key <= 40) ||
          (key >= 65 && key <= 90)
        )
      ) {
        e.preventDefault();
      }
    }
  });
});

// success pop up

function successPopup(successText) {
  $("body").append(`<div class="successPopupWrp"></div>`);
  let successHtml = `<!-- succecc popup -->
    <style>

/* animate  */

#success_popup svg {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 35px;
    left: 50%;
    margin-left: -50px;
}

svg.animate path {
    animation: dash 0.75s linear both;
    animation-delay: 0.5s;
}

@keyframes dash {
    0% {
        stroke-dashoffset: 210;
    }
    75% {
        stroke-dashoffset: -220;
    }
    100% {
        stroke-dashoffset: -205;
    }
}
    </style>
    <div class="modal" id="success_popup" style="background: #42484d45 !important; ">
        <div class="modal-dialog modal-dialog-centered " style="max-width: 230px;  margin-left: auto;
        margin-right: auto;">
            <div class="modal-content" style="border-radius: 15px;height: 230px;  ">
                <svg viewBox="0 0 100 100" class="animate">
    <filter id="dropshadow" height="100%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
      <feFlood flood-color="rgba(76, 175, 80, 1)" flood-opacity="0.5" result="color"/>
      <feComposite in="color" in2="blur" operator="in" result="blur"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(76, 175, 80, 0.5)" stroke-width="5"/>

    <path d="M67,93 A46.5,46.5 0,1,0 7,32 L43,67 L88,19" fill="none" stroke="rgba(76, 175, 80, 1)" stroke-width="5" stroke-linecap="round" stroke-dasharray="80 1000" stroke-dashoffset="-220"  style="filter:url(#dropshadow)"/>
    </svg>
                <p id="successText" style="position: absolute;text-align: center;width: 100%;top: 70%;color: #4baf4f;font-weight: 500;font-size:23px;font-family: 'DM Sans';">Success</p>
            </div>
        </div>
    </div>`;

  $(".successPopupWrp").html(successHtml);
  $("#success_popup").show();
  $(".animate").show();
  $("#successText").text(successText);
  document.querySelector("svg").classList.remove("d-none");
  document.querySelector("svg").classList.add("animate");
  setTimeout(function () {
    $(".successPopupWrp").html("");
  }, 2000);

  setTimeout(() => {
    $(".successPopupWrp").remove();
  }, 5000);
}

function response_popup(obj) {
  let response_html = "";
  $("body").append(`<div class="response_popup_wrp"></div>`);
  $.ajax({
    url: "responsePopup.html",
    async: false,
  }).done((res) => {
    response_html = res;
    // console.log(res);
  });
  $(".response_popup_wrp").html(response_html);
  // $("body").append(response_html);

  $(".response_popup_image").attr("src", obj.responseImg);
  $(".response_description").html(obj.response_description);
  $(".response_title").html(obj.responeTitle);
  $(".response_ok_btn").text(obj.ok_btn_text);

  $(document).on("click", ".response_ok_btn", function () {
    obj.response_ok_btn();
  });
  $(document).on("click", ".reponse_popup_cancel", function () {
    $(".response_popup_wrp").remove();
  });
}

// {
//   let reponse_obj = {
//     responseImg: "images/jobClosed.png",
//     response_description: "Candidate is rejected successfully",
//     responeTitle: "Candidate Rejected",
//   };
//   response_popup(reponse_obj);
// }

// keyup

//page validation

// if (
//   localStorage.getItem("userID") == null ||
//   localStorage.getItem("userID") == ""
// ) {
//   // to logout if not valid user
//   let isIndex = window.location.href.indexOf("index") == -1;
//   let isPricing = window.location.href.indexOf("pricing") == -1;
//   let iscompanyDetails = window.location.href.indexOf("company-details") == -1;
//   let ismanageJobs = window.location.href.indexOf("manage-jobs") == -1;

//   if (isIndex && isPricing && iscompanyDetails && ismanageJobs) {
//     localStorage.clear();
//     window.location.href = "index";
//   }
// } else {
//   // to logout deactivated account
//   if (employerData.data.deactivated) {
//     localStorage.clear();
//     window.location.href = "index";
//   }

//   // to go to manage jobs if already logged in
//   let isIndex = window.location.href.indexOf("index") != -1;
//   if (isIndex && !employerData.data.deactivated) {
//     window.location.href = "manage-jobs";
//   }
// }
// console.log(getEmpDetails());

function showLoader(classname) {
  // to show loader before
  $(`.${classname}`).html(` <div class="d-grid justify-content-center">
        <div class=" mx-auto ">
          <div class="load_spinner"></div>
        </div>
      </div>`);
}
