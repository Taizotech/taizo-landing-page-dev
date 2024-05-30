// to prevent alpebets in input field
$(".only_number").on("input", function () {
  var regex = /[^0-9]/gi;
  if ($(this).val().match(regex)) {
    $(this).val($(this).val().replace(regex, ""));
  }
});

// to prevent numbers in input field
$(".only_text").on("input", function () {
  var regex = /[^a-z ]/gi;
  if ($(this).val().match(regex)) {
    $(this).val($(this).val().replace(regex, ""));
  }
});

function isOnlyAlphabet(string) {
  let isNotInteger = 0;
  for (var char of string) {
    var regex = /[^a-z ]/gi;
    if (char.match(regex)) {
      isNotInteger++;
    } else {
    }
  }
  if (isNotInteger == 0) {
    return true;
  } else {
    return false;
  }
}

//   to capitalize text
const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

// to add and remove error text
function addError(idName) {
  let id = "#" + idName;
  $(id).parents(".form-group").addClass("error");
}

function removeError(idName) {
  let id = "#" + idName;
  $(id).parents(".form-group").removeClass("error");
}

//  to remove error text after input
$(document).ready(function () {
  //  to remove error text after input
  $(document).on("input", "input , textarea", function () {
    let id = $(this).prop("id");
    removeError(id);
  });
  $("select").on("change", function () {
    let id = $(this).prop("id");
    removeError(id);
  });
});

function showLoader(classname) {
  // to show loader before
  $(`.${classname}`).html(` <div class="d-grid justify-content-center">
        <div class=" mx-auto ">
          <div class="load_spinner"></div>
        </div>
      </div>`);
}
