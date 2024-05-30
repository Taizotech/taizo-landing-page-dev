// caution!!  set releaseEnvironmentProd to ture to move to production

let releaseEnvironmentProd = true; // prdoduction!!!!!!!!
// base url
function getBaseUrl() {
  if (releaseEnvironmentProd) {
    var base_url = "https://prod.taizo.in/webEmployer";
  } else {
    var base_url = "https://dev.taizo.in/webEmployer";
  }
  return base_url;
}

function getBaseRedirectUrl() {
  if (releaseEnvironmentProd) {
    var baseRedirectUrl = "http://web.taizo.in/console/";
  } else {
    var baseRedirectUrl = "https://console.taizo.in/";
    // var baseRedirectUrl =
    //   "http://localhost/taizo-website-project/taizoemployer-bootstrap/";
  }
  return baseRedirectUrl;
}

function getlandingUrl() {
  if (releaseEnvironmentProd) {
    var base_url = "https://prod.taizo.in/landing";
  } else {
    var base_url = "https://dev.taizo.in/landing";
  }
  return base_url;
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

// galla box

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
      brandColor: "#1cb260",
      messageText: "Hi Taizo👋",
      replyOptions: ["Continue"],
    },
  };
  var h = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.async = true;
  j.src = u + "/whatsapp-widget.min.js?_=" + Math.random();
  h.parentNode.insertBefore(j, h);
})(window, document, "script", "https://waw.gallabox.com");

$(document).ready(function () {
  let str = window.location.href;
  var url = str.substring(str.lastIndexOf("/") + 1, str.length);
  localStorage.setItem("path", url);
  $("ul.navSection li").each(function (i, v) {
    $(v).find(".nav-link").removeClass("active");
    let paths = localStorage.getItem("path");
    // console.log($(v).find("a").attr("href"));
    if ($(v).find("a").attr("href") == paths) {
      $(v).find(".nav-link").addClass("active");
    } else {
      $(v).find(".nav-link").removeClass("active");
    }
  });
});

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

$(document).ready(function () {
  let str = window.location.href;
  var url = str.substring(str.lastIndexOf("/") + 1, str.length);
  localStorage.setItem("path", url);
  $("ul.navFooterSection li").each(function (i, v) {
    $(v).find(".nav-link").removeClass("active");
    let paths = localStorage.getItem("path");
    // console.log($(v).find("a").attr("href"));
    if ($(v).find("a").attr("href") == paths) {
      $(v).find(".nav-link").addClass("active");
    } else {
      $(v).find(".nav-link").removeClass("active");
    }
  });
});

// successpopup

function successPopup(successText) {
  $("body").append(`<div class="successPopupWrp"></div>`);
  let successHtml = `<!-- succecc popup -->
    <style>

/* animate  */

#success_popup >div{

  width: auto;
  min-width:400px;
  height: 200px;

}

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

  setTimeout(() => {
    $(".successPopupWrp").remove();
  }, 8000);
}
// successpopup end here

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

// google signin
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  let userToken = profile.getId();
  // console.log("userID :" + userToken);

  let emailId = profile.getEmail();
  let PsjobID = localStorage.getItem("pstJbEmpID");

  // console.log(emailId + PsjobID);

  var settings = {
    async: true,
    crossDomain: true,
    url:
      getBaseUrl() +
      "/auth/google?email_id=" +
      emailId +
      "&token=" +
      userToken +
      "&name=" +
      profile.getName(),
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization:
        "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
      "cache-control": "no-cache",
    },
  };

  $.ajax(settings).done(function (response) {
    if (response.code == 200) {
      var jobApi = {
        async: true,
        crossDomain: true,
        url:
          getBaseUrl() +
          "/webEmpRegister?job_id=" +
          PsjobID +
          "&email_id=" +
          emailId,
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization:
            "Basic cnpwX3Rlc3RfRWhaSXE2dndMVnlEZXA6cTd0WVVhQ2hBTVM5RktTckRqUFZSN0ln",
          "cache-control": "no-cache",
        },
        processData: false,
        data: '{\r\n  "emailId": "' + emailId + '"\r\n}',
      };

      $.ajax(jobApi).done(function (response) {
        // //Localhost
        // var redUrl =
        //     "http://localhost/taizoemployer-bootstrap/post-a-job.html?redirect=true&emp_id=" +
        //     response.employerId +
        //     "&job_id=" +
        //     response.id;

        //Development
        var redUrl =
          "http://13.126.220.81/post-a-job.html?redirect=true&emp_id=" +
          response.employerId +
          "&job_id=" +
          response.id;

        //Production
        // var redUrl =
        // "http://13.126.220.81/post-a-job.html?redirect=true&emp_id=" +
        // response.employerId +
        // "&job_id=" +
        // response.id;
        $("#open_in_newTab").attr("href", redUrl);
        $("#open_in_newTab")[0].click();
      });
    }
  });
}
// end of google signin
