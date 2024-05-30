let noError;
let errFieldsArr = [];
let language_id = [];
// let knownLanguages = language_id.join(",");
let doc_Loction = window.location.href;
    let urlStatus = new URL(doc_Loction);
    let canId =
    urlStatus.searchParams.get("id")
    let adminId =
    urlStatus.searchParams.get("adminId")
{
    let show_hide_details = {
      show_department: false,
      show_isStudent: false,
      show_additional_questions: false,
      show_job_role_questions: false,
    };
    let departments_array = [];
    let language_text = [];
    let courses_text = [];
    let keySkill_text = [];
    let preffered_location_text = [];
    // let language_id = [];
    let location_details = { state: "", city: "", state_id: "", city_id: "" };
    let job_role_details = {
      industry: {
        industry_val: "",
        industry_id: "",
      },
      job_role: {
        job_role_val: "",
        job_role_id: "",
      },
    };
  
     
  
    // let noError;
    // // let mobile_num;
    // let errFieldsArr = [];
  
    // $(function () {
    //   $("#completion_year").datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     maxDate: "-18Y ",
    //     showButtonPanel: true,
    //     dateFormat: "yy",
    //   });
    // });
  
    // to calculate age
    function calcAge(dateString) {
      let birthDate = new Date(dateString); // example birth date
      let today = new Date(); // current date
  
      let age = today.getFullYear() - birthDate.getFullYear();
      let monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    }
  
    // console.log(calcAge("2005-03-14"));
  
    const getYearsBack = (years) => {
      let date = new Date();
      date.setFullYear(date.getFullYear() - years);
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      let dateString = year + "-" + month + "-" + day;
  
      return dateString;
    };
  
    $("#can_dob").attr("max", getYearsBack(18));
    $("#can_dob").attr("min", getYearsBack(60));
  
    $(document).on("click", ".confirm_keySkills", function () {
      $("#key_skills").val("");
      if (keySkill_text.length != 0) {
        $("#key_skills").val(keySkill_text.join(", "));
        textAreaResize("key_skills");
        removeError("key_skills");
      } else {
      }
    });
  
    $(document).on("click", ".confirm_preferred_location", function () {
      // alert("hii");
      $("#preferred_location_input").val("");
      if (preffered_location_text.length != 0) {
        $("#preferred_location_input").val(preffered_location_text.join(", "));
        // textAreaResize("preferred_location_input");
        removeError("preferred_location_input");
      } else {
      }
    });
  
    $(document).on("click", ".confirm_courses", function () {
      $("#certification_courses").val("");
      if (courses_text.length != 0) {
        $("#certification_courses").val(courses_text.join(", "));
        textAreaResize("certification_courses");
        removeError("certification_courses");
      } else {
      }
    });
  
    $(document).on("click", ".confirm_language", function () {
      $("#languages_known").val("");
      if (language_text.length != 0) {
        $("#languages_known").val(language_text.join(", "));
        textAreaResize("languages_known");
        removeError("languages_known");
      } else {
      }
    });
  
    $(document).on("click", ".confirm_location", function () {
      if (location_details.state != "" && location_details.city != "") {
        $("#current_location").val(
          location_details.city + ", " + location_details.state
        );
      } else {
        $("#current_location").val("");
      }
      removeError("current_location");
    });
  
    $(document).on("click", ".confirm_job_role", function () {
      if (
        job_role_details.industry.industry_val != "" &&
        job_role_details.job_role.job_role_val != ""
      ) {
        $("#can_job_role").val(job_role_details.job_role.job_role_val);
        $("#can_industry").val(job_role_details.industry.industry_val);
        $(".experience_wrp").removeClass("d-none");
        $(".experience_wrp .label_text .job_role_value").text(
          job_role_details.job_role.job_role_val
        );
      } else {
        $("#can_job_role").val("");
        $("#can_industry").val("");
      }
      removeError("can_job_role");
    });
  
    // to change text area height automaticaly
    $(document).on(
      "change",
      "#languages_known ,#certification_courses ,#key_skills",
      function () {
        this.style.height = "35px";
        this.style.height = this.scrollHeight + "px";
      }
    );
  
    // to resize th text area
    function textAreaResize(id) {
      $("#" + id).css("height", "35px");
      $("#" + id).css("height", $("#" + id).prop("scrollHeight") + "px");
    }
  
    $(document).on("input", "#completion_year", function () {
      // console.log($(this).val());
      let thisValue = $(this).val();
      let currentDate = new Date();
      let userDate = new Date();
      userDate.setFullYear(thisValue);
      let x = 3;
      let XyearsBefore = new Date();
      XyearsBefore.setFullYear(currentDate.getFullYear() - x);
  
      // to ask is he student if completion is above current year
      if (currentDate > userDate) {
        $(".isStudent_wrp").addClass("d-none");
        show_hide_details.show_isStudent = false;
      } else {
        $(".isStudent_wrp").removeClass("d-none");
        show_hide_details.show_isStudent = true;
      }
  
      // to ask additional question if he completed with 5 years before
      if (XyearsBefore <= userDate) {
        $(".additional_details_wrp").removeClass("d-none");
        show_hide_details.show_additional_questions = true;
      } else {
        $(".additional_details_wrp").addClass("d-none");
        show_hide_details.show_additional_questions = false;
      }
    });
  
    // photo
    let loadImg = function (event) {
      var output = document.getElementById("can_photo_img");
      output.src = URL.createObjectURL(event.target.files[0]);
      // $("button.upload_photo").text(translate.change[lang]);
      removeError("can_photo_img");
      // console.log(output.src);
      output.onload = function () {
        URL.revokeObjectURL(output.src);
        // free memory
      };
    };
    $(document).on("click", ".upload_photo", function () {
      $("#can_photo").click();
    });
    $(document).on("change", "#can_photo", function (e) {
      loadImg(e);
    });
    // end of photo
  
    // location
  
    $(document).on("click", ".location_input_wrp ,.state_cancel", function () {
      $(".cities_wrp").addClass("d-none");
      $(".states_container").removeClass("d-none");
      $(".seleted_state_wrp").addClass("d-none");
      location_details.state = "";
      location_details.city = "";
      get_state_list_api();
    });
  
    function get_state_list_api() {
      showLoader("state_list_wrp");
      let settings = {
        url: `${getCommonBaseUrl()}/indiaStates`,
        method: "GET",
      };
      $.ajax(settings).done((res) => {
        // console.log(res);
        let state_list_arr = res.results;
        let state_list_html = "";
        state_list_arr.map((el) => {
          state_list_html += ` <input type="radio" data-id="${el.id}" value="${el.state}" name="states" id="${el.id}state" />
          <label for="${el.id}state" " >${el.state} </label>`;
          $(".state_list_wrp").html(state_list_html);
        });
      });
    }
  
    $(document).on("click", ".state_list_wrp input[name=states]", function (e) {
      let state_id = e.target.attributes["data-id"].value;
      location_details.state = $(this).val();
      location_details.state_id = state_id;
  
      $(
        ".seleted_state_wrp"
      ).html(`<input type="radio" checked id="selected_state">
      <label for="selected_state">
       ${location_details.state}
       <button class="btn-close state_cancel" data-id="${location_details.state_id}" ></button>
      </label>`);
  
      showLoader("city_list_wrp");
      let settings = {
        url: `${getCommonBaseUrl()}/indiaStateCities?state_id=${state_id}`,
        method: "GET",
      };
      $.ajax(settings).done((res) => {
        $(".cities_wrp").removeClass("d-none");
        $(".states_container").addClass("d-none");
        $(".seleted_state_wrp").removeClass("d-none");
  
        // console.log(res);
  
        let city_list_arr = res.results;
        let city_list_html = "";
        city_list_arr.map((el) => {
          city_list_html += ` <input type="radio" data-id="${el.id}" value="${el.city}" name="cities" id="${el.id}city" />
          <label for="${el.id}city" " >${el.city} </label>`;
          $(".city_list_wrp").html(city_list_html);
        });
      });
    });
  
    $(document).on("click", ".city_list_wrp input[name=cities]", function (e) {
      location_details.city = $(this).val();
    });
    // end of location
  
    // languages known
    $(document).on("click", ".lan_known_input_wrp", function () {
      // language_text = [];
      prefill_selected_values(
        ".language_list_wrp input[name=lang]",
        language_text
      );
      showLoader("language_list_wrp");
      let settings = {
        url: `${getCommonBaseUrl()}/languages`,
        method: "GET",
      };
      $.ajax(settings).done((res) => {
        // console.log(res);
        let language_list_arr = res.results;
        let language_list_html = "";
        language_list_arr.map((el) => {
          language_list_html += ` <input type="checkbox" data-id="${el.id}" value="${el.languages}" name="lang" id="${el.id}lang" />
          <label for="${el.id}lang" " >${el.languages} </label>`;
          $(".language_list_wrp").html(language_list_html);
        });
      });
    });
  
    $(document).on("click", ".language_list_wrp input[name=lang]", function (e) {
      let checked_length = $(
        ".language_list_wrp input[name=lang]:checked"
      ).length;
      let this_value = e.target.value;
      let this_id = $(this).attr("data-id");
      if (checked_length <= 5) {
        if (this.checked) {
          language_text.push(this_value);
          language_id.push(this_id);
        } else {
          language_text.splice(language_text.indexOf(this_value), 1);
          language_id.splice(language_id.indexOf(this_id), 1);
        }
        $(".max_wrp").removeClass("text-danger");
      } else {
        this.checked = false;
        $(".max_wrp").addClass("text-danger");
      }
      // console.log(language_text);
      // console.log(language_id);
    });
    // end of langiages known
  
    // coureses
    $(document).on("click", ".courses_input_wrp", function () {
      // courses_text = [];
      prefill_selected_values(
        ".courses_list_wrp input[name=courses]",
        courses_text
      );
      showLoader("courses_list_wrp");
      let settings = {
        url: `${getBaseUrl()}/certificateCourses`,
        method: "GET",
      };
      $.ajax(settings).done((res) => {
        // console.log(res);
        let courses_list_arr = res.results;
        let courses_list_html = "";
        courses_list_arr.map((el) => {
          courses_list_html += ` <input type="checkbox" data-id="${el.id}" value="${el.courses}" name="courses" id="${el.id}courses" />
          <label for="${el.id}courses" " >${el.courses} </label>`;
          $(".courses_list_wrp").html(courses_list_html);
        });
      });
    });
  
    $(document).on(
      "click",
      ".courses_list_wrp input[name=courses]",
      function (e) {
        let checked_length = $(
          ".courses_list_wrp input[name=courses]:checked"
        ).length;
        let this_value = e.target.value;
        if (checked_length <= 3) {
          if (this.checked) {
            courses_text.push(this_value);
          } else {
            courses_text.splice(courses_text.indexOf(this_value), 1);
          }
          $(".max_wrp").removeClass("text-danger");
        } else {
          this.checked = false;
          $(".max_wrp").addClass("text-danger");
        }
        // console.log(courses_text);
      }
    );
    // end of courses
  
    //To prefill selected values
  
    function prefill_selected_values(selector, array) {
      $(`${selector}`).each(function () {
        let this_val = $(this).val();
        let condition = array.indexOf(this_val) != -1;
        if (condition) {
          // console.log($(this).attr("id"));
          document.getElementById(`"${$(this).attr("id")}"`).checked = true;
        } else {
          document.getElementById(`"${$(this).attr("id")}"`).checked = false;
        }
      });
    }
  
    // key skills
    $(document).on("click", ".keySkills_input_wrp", function () {
      // keySkill_text = [];
  
      prefill_selected_values(
        ".keySkills_list_wrp input[name=keySkill]",
        keySkill_text
      );
  
      showLoader("keySkills_list_wrp");
  
      let settings = {
        async: false,
        url: `${getCommonBaseUrl()}/keySkills`,
        method: "GET",
      };
      $.ajax(settings).done((res) => {
        // console.log(res);
        let keyskills_list_arr = res.results;
        let keySkills_list_html = "";
        keyskills_list_arr.map((el) => {
          keySkills_list_html += ` <input type="checkbox" data-id="${el.id}" value="${el.skill}" name="keySkill" id="${el.id}keySkill" />
          <label for="${el.id}keySkill" " >${el.skill} </label>`;
          $(".keySkills_list_wrp").html(keySkills_list_html);
        });
      });
    });
  
    $(document).on(
      "click",
      ".keySkills_list_wrp input[name=keySkill]",
      function (e) {
        let checked_length = $(
          ".keySkills_list_wrp input[name=keySkill]:checked"
        ).length;
        let this_value = e.target.value;
        if (checked_length <= 5) {
          if (this.checked) {
            keySkill_text.push(this_value);
          } else {
            keySkill_text.splice(keySkill_text.indexOf(this_value), 1);
          }
          $(".max_wrp").removeClass("text-danger");
        } else {
          this.checked = false;
          $(".max_wrp").addClass("text-danger");
        }
        // console.log(keySkill_text);
      }
    );
    // end of key skills
  
    // preferred location
  
    $(document).on("click", ".preferred_location_input_wrp", function () {
      // preffered_location_text = [];
  
      prefill_selected_values(
        ".location_list_wrp input[name=preferred_location]",
        preffered_location_text
      );
  
      showLoader("location_list_wrp");
    });
  
    $(document).on(
      "click",
      ".location_list_wrp input[name=preferred_location]",
      function (e) {
        let checked_length = $(
          ".location_list_wrp input[name=preferred_location]:checked"
        ).length;
        let this_value = e.target.value;
        if (checked_length <= 5) {
          if (this.checked) {
            preffered_location_text.push(this_value);
          } else {
            preffered_location_text.splice(
              preffered_location_text.indexOf(this_value),
              1
            );
          }
          $(".max_wrp").removeClass("text-danger");
        } else {
          this.checked = false;
          $(".max_wrp").addClass("text-danger");
        }
        // console.log(preffered_location_text);
      }
    );
  
    // end of preferred location
  
    // jobRole functions
    $(document).on("click", "#can_job_role ,.industry_cancel", function () {
      $(".job_role_wrp").addClass("d-none");
      $(".industry_container").removeClass("d-none");
      $(".seleted_industry_wrp").addClass("d-none");
      job_role_details.industry.industry_val = "";
      job_role_details.job_role.job_role_val = "";
  
      get_industry_list_api();
    });
  
    function get_industry_list_api() {
      showLoader("industry_list_wrp");
      let settings = {
        url: `${getCommonBaseUrl()}/jobIndustries`,
        method: "GET",
      };
      $.ajax(settings).done((res) => {
        // console.log(res);
        let industry_list_arr = res.results;
        let industry_list_html = "";
        industry_list_arr.map((el) => {
          industry_list_html += ` <input type="radio" data-id="${el.id}" value="${el.industry}" name="industries" id="${el.id}industry" />
          <label for="${el.id}industry" " >${el.industry} </label>`;
          $(".industry_list_wrp").html(industry_list_html);
        });
      });
    }
  
    $(document).on(
      "click",
      ".industry_list_wrp input[name=industries]",
      function (e) {
        let industry_id = e.target.attributes["data-id"].value;
        job_role_details.industry.industry_val = $(this).val();
  
        $(".seleted_industry_wrp")
          .html(`<input type="radio" checked id="selected_state">
      <label for="selected_state">
       ${$(this).val()}
       <button class="btn-close industry_cancel" data-id="${industry_id}" ></button>
      </label>`);
  
        showLoader("job_role_list_wrp");
        let settings = {
          url: `${getCommonBaseUrl()}/fullTimeJobRoless?industry_id=${industry_id}`,
          method: "GET",
        };
        $.ajax(settings).done((res) => {
          $(".job_role_wrp").removeClass("d-none");
          $(".industry_container").addClass("d-none");
          $(".seleted_industry_wrp").removeClass("d-none");
          // console.log(res);
          let job_role_list_arr = res.results;
          let job_role_list_html = "";
          job_role_list_arr.map((el) => {
            job_role_list_html += ` <input type="radio" data-id="${el.id}" value="${el.jobRoles}" name="jobRole" id="${el.id}job_role" />
          <label for="${el.id}job_role"  >${el.jobRoles} </label>`;
            $(".job_role_list_wrp").html(job_role_list_html);
          });
        });
      }
    );
  
    $(document).on(
      "click",
      ".job_role_list_wrp input[name=jobRole]",
      function (e) {
        job_role_details.job_role.job_role_val = $(this).val();
      }
    );
  
    // $(document).on("change", "input[name=isHavingExperience]", function () {
    //   if ($(this).val() == "Yes") {
    //     $(".job_role_deetails_wrp").removeClass("d-none");
    //     show_hide_details.show_job_role_questions = true;
    //   } else {
    //     $(".job_role_deetails_wrp").addClass("d-none");
    //     show_hide_details.show_job_role_questions = false;
    //   }
    // });
    // end of jobRole functions
  
    $(document).on("change", "#educationDetails", function (e) {
      // console.log($(this).val());
      departments_array = [];
      $("#candidate_degree").val("");
      let end_url;
      switch ($(this).val()) {
        case "Diploma":
          end_url = "diplomaCourses";
  
          $("#candidate_degree").attr(
            "placeholder",
            "E.g. Diploma in Mechanical Engineering"
          );
  
          break;
        case "ITI":
          end_url = "ITICourses";
          $("#candidate_degree").attr("placeholder", "E.g. ITI Fitter");
          break;
        case "UG":
          end_url = "UGCourses";
          $("#candidate_degree").attr(
            "placeholder",
            "E.g. BE Mechanical Engineering"
          );
          break;
        case "PG":
          end_url = "PGCourses";
          $("#candidate_degree").attr(
            "placeholder",
            "E.g. ME Mechanical Engineering"
          );
          break;
        default:
          end_url = null;
          break;
      }
  
      if (end_url != null) {
        // console.log(end_url);
        let settings = {
          async: false,
          url: `${getBaseUrl()}/${end_url}`,
          method: "GET",
        };
        $.ajax(settings).done((res) => {
          // console.log(res);
  
          let department_list_arr = res.results;
  
          department_list_arr.map((el) => {
            departments_array.push(el.courses);
          });
          console.log(departments_array);
          // console.log(department_list_html);
  
          $(".course_completion_wrp").removeClass("d-none");
          $(".department_wrp").removeClass("d-none");
  
          $("#candidate_degree").focus();
  
          show_hide_details.show_department = true;
  
          // to set auto complete
          $("#candidate_degree").autocomplete({
            source: departments_array,
            response: function (event, ui) {
              if (ui.content.length === 0) {
                ui.content.push({ label: translate.notFound[lang] });
              }
            },
          });
        });
      } else {
        $(".course_completion_wrp").addClass("d-none");
        $(".department_wrp").addClass("d-none");
        $(".additional_details_wrp").addClass("d-none");
        show_hide_details.show_department = false;
        show_hide_details.show_isStudent = false;
        show_hide_details.show_additional_questions = false;
      }
  
      // console.log(show_hide_details.show_department);
    });
  
    // validation function
    function profile_form_validation() {
      noError = 0;
      errFieldsArr = [];
      if ($("#can_name").val() == "") {
        addError("can_name");
        errFieldsArr.push("Name_label");
        noError++;
      } else {
        if (!isOnlyAlphabet($("#can_name").val())) {
          addError("can_name");
          noError++;
        } else {
          removeError("can_name");
        }
      }

      if ($("#can_initial").val() == "") {
        addError("can_initial");
        errFieldsArr.push("Name_initial");
        noError++;
      } else {
        if (!isOnlyAlphabet($("#can_initial").val())) {
          addError("can_initial");
          noError++;
        } else {
          removeError("can_initial");
        }
      }
  
      if ($("#can_dob").val() == "") {
        addError("can_dob");
        errFieldsArr.push("date_label");
        noError++;
      } else {
        removeError("can_dob");
      }
  
      if ($("#current_location").val() == "") {
        addError("current_location");
        errFieldsArr.push("Current_LocationLabel");
        noError++;
      } else {
        removeError("current_location");
      }
      if ($("input[name=gender]:checked").length == 0) {
        addError("gender_male");
        errFieldsArr.push("gender_label");
        noError++;
      } else {
        removeError("gender_male");
      }
      if ($("#educationDetails").val() == "") {
        addError("educationDetails");
        errFieldsArr.push("qualification_label");
        noError++;
      } else {
        removeError("educationDetails");
      }
      if ($("input[name=isHavingExperience]:checked").length == 0) {
        addError("yes_having_experience");
        errFieldsArr.push("experience_label");
        noError++;
      } else {
        removeError("yes_having_experience");
      }
  
      if ($("#reference").val() == "") {
        addError("reference");
        errFieldsArr.push("reference_label");
        noError++;
      } else {
        removeError("reference");
      }
  
      if (show_hide_details.show_department) {
        if ($("#candidate_degree").val() == "") {
          addError("candidate_degree");
          $(".PleaseSelectFromList").text(translate.PleaseFillThisField[lang]);
          errFieldsArr.push("candidate_label");
          noError++;
        } else {
          if (departments_array.indexOf($("#candidate_degree").val()) == -1) {
            addError("candidate_degree");
            $("#candidate_degree").val("");
            $(".PleaseSelectFromList").text(translate.PleaseSelectFromList[lang]);
            noError++;
          } else {
            removeError("candidate_degree");
          }
        }
      }
  
      if (show_hide_details.show_department) {
        if (
          $("#completion_year").val() == "" ||
          $("#completion_year").val().length < 4
        ) {
          addError("completion_year");
          errFieldsArr.push("completion_label");
          noError++;
        } else {
          removeError("completion_year");
        }
      }
  
      if (show_hide_details.show_isStudent) {
        if ($("input[name=isStudent]:checked").length == 0) {
          addError("yes_student");
          errFieldsArr.push("student_label");
          noError++;
        } else {
          removeError("yes_student");
        }
      }
  
      if (show_hide_details.show_additional_questions) {
        if ($("input[name=isHavingArrear]:checked").length == 0) {
          addError("yes_arrear");
          errFieldsArr.push("arrear_label");
          noError++;
        } else {
          removeError("yes_arrear");
        }
  
        if ($("input[name=isHavingPF]:checked").length == 0) {
          addError("yes_pf_account");
          errFieldsArr.push("pf_label");
          noError++;
        } else {
          removeError("yes_pf_account");
        }
      }
  
      if (show_hide_details.show_job_role_questions) {
        if ($("#can_job_role").val() == "") {
          addError("can_job_role");
          errFieldsArr.push("interested_label");
          noError++;
        } else {
          removeError("can_job_role");
        }
  
        if ($("#can_industry").val() == "") {
          addError("can_industry");
          noError++;
        } else {
          removeError("can_industry");
        }
        if ($("#exp_in_years").val() == "") {
          addError("exp_in_years");
          errFieldsArr.push("experience_label1");
          noError++;
        } else {
          removeError("exp_in_years");
        }
        if ($("#exp_in_months").val() == "") {
          addError("exp_in_months");
          errFieldsArr.push("month_label");
          noError++;
        } else {
          removeError("exp_in_months");
        }
      }
  
      if ($("#languages_known").val() == "") {
        addError("languages_known");
        errFieldsArr.push("languages_label");
        noError++;
      } else {
        removeError("languages_known");
      }
      // if ($("#certification_courses").val() == "") {
      //   addError("certification_courses");
      //   noError++;
      // } else {
      //   removeError("certification_courses");
      // }
      if ($("#key_skills").val() == "") {
        addError("key_skills");
        errFieldsArr.push("key_label");
        noError++;
      } else {
        removeError("key_skills");
      }
      if ($("#preferred_location_input").val() == "") {
        addError("preferred_location_input");
        errFieldsArr.push("location_label");
        noError++;
      } else {
        removeError("preferred_location_input");
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
      //   addError("contactNum");
      //   noError++;
      // } else if (
      //   $("#contactNum").val().length > 0 &&
      //   $("#contactNum").val().length < 10
      // ) {
      //   addError("contactNum");
      //   noError++;
      // } else {
      //   removeError("contactNum");
      // }
    }
    // end of validation function
  
    // $(document).on("click", ".profile_submit", function (e) {
    //   // form validation
    //   e.preventDefault();
    //   profile_form_validation();
    //   console.log(noError);
    //   // $("#submit_confirm_modal").modal("show");
    //   if (noError == 0) {
    //     $("#submit_confirm_modal").modal("show");
    //   } else {
    //     // $("html, body").animate({ scrollTop: 0 }, "slow");
    //     window.location.href = `#${errFieldsArr[0]}`;
    //     // window.location.href = `#Name_label`;
    //   }
    // });
  
    $(document).on("click", ".confirm_profile_submit", function () {
      profile_submit_api();
    });
     $(document).on("click", ".profile_submit", function (e) {
        // form validation
      e.preventDefault();
       profile_form_validation();
       handleFormSubmit();
     });
  
    // function profile_submit_api() {
    //   $("#submit_confirm_modal").modal("hide");
  
    //   let isStudent = show_hide_details.show_isStudent
    //     ? $("input[name=isStudent]:checked").val()
    //     : "No";
    //   let specification = show_hide_details.show_department
    //     ? $("#candidate_degree").val()
    //     : null;
    //   // let course_month = show_hide_details.show_department
    //   //   ? parseInt($("#completion_year").val().split("-")[1])
    //   //   : 0;
    //   let course_year = show_hide_details.show_department
    //     ? parseInt($("#completion_year").val())
    //     : 0;
    //   let pfEsiAccount = show_hide_details.show_additional_questions
    //     ? $("input[name=isHavingPF]:checked").val()
    //     : null;
    //   let isHavingArrear = show_hide_details.show_additional_questions
    //     ? $("input[name=isHavingArrear]:checked").val()
    //     : null;
    //   let industry = show_hide_details.show_job_role_questions
    //     ? $("#can_industry").val()
    //     : null;
    //   let jobCategory = show_hide_details.show_job_role_questions
    //     ? $("#can_job_role").val()
    //     : null;
    //   let expMonths = show_hide_details.show_job_role_questions
    //     ? $("#exp_in_months").val()
    //     : null;
    //   let expYears = show_hide_details.show_job_role_questions
    //     ? $("#exp_in_years").val()
    //     : null;
  
    //   let courses =
    //     $("#certification_courses").val() != ""
    //       ? $("#certification_courses").val()
    //       : null;
  
    //   let formatedDate = $("#can_dob").val().split("-").reverse().join("/");
  
    //   let data = {
    //     firstName: toTitleCase($("#can_name").val()),
    //     dateOfBirth: formatedDate,
    //     age: calcAge($("#can_dob").val()),
    //     gender: $("input[name=gender]:checked").val(),
    //     state: location_details.state,
    //     city: location_details.city,
    //     qualification: $("#educationDetails").val(),
    //     specification: specification,
    //     certificationSpecialization: courses,
    //     passed_out_year: course_year,
    //     passed_out_month: 0,
    //     student: isStudent,
    //     pfEsiAccount: pfEsiAccount,
    //     isHavingArrear: isHavingArrear,
    //     knownLanguages: language_id.join(","),
    //     keySkill: $("#key_skills").val(),
    //     // mobileNumber: can_mobile_number,
    //     mobileNumber: $("#mobileNum").val(),
    //     contactNumber: $("#mobileNum").val(),
    //     whatsappNumber: $("#whatapp_number").val(),
    //     jobCategory: jobCategory,
    //     industry: industry,
    //     expMonths: parseInt(expMonths),
    //     experience: parseInt(expYears),
    //     reference: $("#reference").val() != "" ? $("#reference").val() : null,
    //     prefLocation: $("#preferred_location_input").val(),
    //     languageKey: "en",
    //   };
  
    //   let settings = {
    //     async: false,
    //     // url: `${getBaseUrl()}/chatbot/updateProfileDetails`,
    //     url: `${getAdminBaseUrl()}/candidateRegister?adminId=` + adminId,
    //     method: "POST",
    //     timeout: 0,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: JSON.stringify(data),
    //   };
  
    //   // formData.forEach((value, key) => {
    //   //   console.log(key + value);
    //   // });
  
    //   if (noError == 0) {
    //     $("#loader_modal").modal("show");
  
    //     $.ajax(settings)
    //       .done(function (res) {
    //         if ($("#can_photo")[0].files.length != 0) {
    //           // to upload profile pic
    //           UpdateProfile($("#mobileNum").val());
    //         }
    //         $("#loader_modal").modal("hide");
    //         $("#success_msg_modal").modal("show");
    //         // console.log(res);
    //         // console.log(settings.data);
    //       })
    //       .fail(function (err) {
    //         console.log(err);
    //         alert("Sorry, somthing went wrong please try later");
    //         // window.location.reload();
    //       });
    //   }
    // }
    // function UpdateProfile(mobile_num) {
    //   let formData = new FormData();
    //   // formData.append("file", file);
    //   // form.append("mobileNum",mobile_num);
    //   // Add file to the FormData object
  
    //   let photofile =
    //     $("#can_photo")[0].files.length != 0 ? $("#can_photo")[0].files[0] : null;
  
    //   formData.append("file", photofile);
    //   // formData.append("mobileNum",mobile_num);
  
    //   var settings = {
    //     async: false,
    //     // url: `${getBaseUrl()}/chatbot/updateProfilePic?phone_number=${can_mobile_number}`,
    //     url: `${getBaseUrl()}/chatbot/updateUserProfilePic?mobileNumber=${mobile_num}`,
    //     method: "PUT",
    //     timeout: 0,
    //     processData: false,
    //     mimeType: "multipart/form-data",
    //     contentType: false,
    //     data: formData,
    //   };
  
    //   $.ajax(settings).done(function (response) {
    //     // console.log(response);
    //     console.log("profile uploaded");
    //   });
    // }


    function PrefillCandidateDetails(canId) {
      var settings = {
          "url": getAdminBaseUrl() + "/candidate/" + encodeURIComponent(canId),
          "method": "GET",
          "timeout": 0,
      };
  
      $.ajax(settings).done(function (data) {
          console.log(data);
          let res=data.response
          // let res1=data.response1
  
          if (res) {
              let name = res.firstName;
              let lastName =res.lastName;
              // let gender = res.gender;
              let gender = res.gender;
              let dateOfBirth = res.dateOfBirth;
              let keySkill = res.keySkill;
              let city = res.city;
              location_details.city = city;
              let state = res.state;
              location_details.state = state;
              let industry = res.industry;
              let jobCategory = res.jobCategory;
              let student=res.student;
              let isHavingArrear=res.isHavingArrear;
              // combine city and state
              let locationString = city + ', ' + state;
              let qualification = res.qualification;
              let specification= res.specification;
              let certificationSpecialization = res.certificationSpecialization;
              let expInManufacturing = res.expInManufacturing;
              let reference = res.reference;
              // let prefCountry = res.prefLocation;
              let prefCountry = res.city;
              let expMonths = res.expMonths;
              console.log(expMonths);
              let experience = res.experience;
              let pfEsiAccount = res.pfEsiAccount;
              let passed_out_year = res.passed_out_year;
              let mobileNumber = res.mobileNumber;
              let whatsappNumber =res.whatsappNumber;
              let KnownLanguages =data.response1.map(item => item.languages);
              // let languagesArray = KnownLanguages;
              let allLanguages = KnownLanguages.join(',');

              console.log(locationString,"location string")
              console.log(allLanguages, "all languages");
  
              $("#can_name").val(name);
              $("#can_initial").val(lastName);
              $("input[name=gender][value=" + gender + "]").prop("checked", true);
              $("#can_dob").val(dateOfBirth);
              $("#key_skills").val(keySkill);
              $("#current_location").val(locationString);
              $('#educationDetails').val(qualification);
              $("#certification_courses").val(certificationSpecialization);
              // $("input[name=isHavingExperience][value='" + expInManufacturing + "']").prop("checked", true);
              // console.log(expInManufacturing)
              $("#reference").val(reference);
              $("#mobileNum").val(mobileNumber);
              $("#whatapp_number").val(whatsappNumber);
              $("#completion_year").val(passed_out_year)
              $("#preferred_location_input").val(prefCountry);
              $("#can_job_role").val(jobCategory);
              $("#can_industry").val(industry);
              $("#languages_known").val(allLanguages);
              $("#candidate_degree").val(specification);
              console.log(specification);
              $("#exp_in_months").val(expMonths);
              console.log(expMonths);
              $("#exp_in_years").val(experience);
              if (pfEsiAccount === 'Yes') {
                $('#yes_pf_account').prop('checked', true);
                console.log(pfEsiAccount);
            } else if (pfEsiAccount === 'No') {
                $('#no_pf_account').prop('checked', true);
            }
            if (expInManufacturing === 'Yes') {
              $('#yes_having_experience').prop('checked', true);
              console.log(expInManufacturing);
          } else if (expInManufacturing === 'No') {
              $('#no_experience').prop('checked', true);
          }
            if (student=== 'Yes') {
              $('#yes_student').prop('checked', true);
              console.log(pfEsiAccount);
          } else if (student=== 'No') {
              $('#no_student').prop('checked', true);
          }
          if (isHavingArrear=== 'Yes') {
            $('#yes_arrear').prop('checked', true);
            console.log(pfEsiAccount);
        } else if (isHavingArrear=== 'No') {
            $('#no_arrear').prop('checked', true);
        }
          }
      });
  }
  
  // Call the function with the desired canId
  PrefillCandidateDetails(canId);
  
  }

  
  // function Language(canId) {
  //   var settings = {
  //     "url": getAdminBaseUrl() + "/Languages?candidateId=" + canId,
  //     "method": "GET",
  //     "timeout": 0,
  //   };
  
  //   $.ajax(settings).done(function (response) {
  //     console.log(response);
  //     var response = [
  //       { id: 1513, languageId: 10 },
  //       { id: 1514, languageId: 11 }
  //     ];
  
  //     if (response && response.length > 0) {
  //       let languages = response.map(item => item.languageId);
  //       let languagesString = languages.join(', ');
  //       $("#languages_known").val(languagesString);
  //       console.log(languages);
  //     }
  //   });
  // }
  

  // Language(canId);
  function mapGender(genderValue) {
    // Create a mapping object to map values
    const genderMap = {
        "gender_male": "Male",
        "gender_female":"Female",
        "gender_not_to_say":"Prefer not to say",
        // Add more mappings if needed
    };

    // Use the mapping object to transform the value
    return genderMap[genderValue] || "";
}

  function handleFormSubmit() {
    if (noError == 0) {
      let firstName = $("#can_name").val();
      let lastName = $("#can_initial").val();
      let mobileNumber = $("#mobileNum").val();
      let whatsappNumber =$("#whatapp_number").val();
      let dateOfBirth = $("#can_dob").val();
      // let gender = $("input[name='gender']:checked").attr('id');
      let gender = mapGender($("input[name='gender']:checked").attr('id'));

      let city = $("#current_location").val().split(", ")[0];
      let state = $("#current_location").val().split(", ")[1];
      // let prefLocation =$("#preferred_location_input").val();
      let prefLocation = $("#preferred_location_input").val();
      // Check if prefLocation is null
      if (prefLocation === null) {
        prefLocation = ""; // Set to empty string
      }
      let qualification =$("#educationDetails").val();
      let specification= $("#candidate_degree").val();
      if (specification === null) {
        specification = ""; // Set to empty string
      }
      // let knownLanguages= $("#languages_known").val();
      let knownLanguages= $("#languages_known").val();
      // let knownLanguagesArray = knownLanguages.length > 0 ? language_id.join(",") : "";
      // let knownLanguagesArray = knownLanguages.length > 0 ? knownLanguages.split(",") : "";
      let knownLanguagesArray = knownLanguages.length > 0 ? knownLanguages.split(",") : [];
let commaSeparatedLanguages = knownLanguagesArray.join(",");

// Now you can use commaSeparatedLanguages where you need it, it will be a comma-separated string

      let student = $("input[name='isStudent']:checked").val();
      if (student === 'Yes') {
         $('#yes_student').prop('checked', true);
        } else if (student === 'No') {
          $('#no_student').prop('checked', true);
        }
      let passed_out_year = $("#completion_year").val();
      let isHavingArrear = $("input[name='isHavingArrear']:checked").val();
      if (isHavingArrear === 'Yes') {
        $('#yes_arrear').prop('checked', true);
       } else if (isHavingArrear === 'No') {
         $('#no_arrear').prop('checked', true);
       }
      let industry = $("#can_industry").val();
      let jobCategory = $("#can_job_role").val();
      let experience = $("#exp_in_years").val();
      let expMonths = $("#exp_in_months").val();
      let pfEsiAccount =$("input[name='isHavingPF']:checked").val();
      if (pfEsiAccount === 'Yes') {
        $('#yes_pf_account').prop('checked', true);
       } else if (pfEsiAccount === 'No') {
         $('#no_pf_account').prop('checked', true);
       }
      let certificationCourses =$("#certification_courses").val();
      let keySkill =$("#key_skills").val();
      if (keySkill === null) {
        keySkill = ""; // Set to empty string
      }
      let reference = $("#reference").val();
      //  let expInManufacturing = $("#").val();
      let obj ={
      firstName: firstName,
      lastName: lastName,
      whatsappNumber:whatsappNumber,
      mobileNumber: mobileNumber,
      dateOfBirth: dateOfBirth,
      gender: gender,
      state: state,
      knownLanguages: commaSeparatedLanguages,
      // knownLanguages:language_id.join(","),
      prefLocation: prefLocation,
      city: city,
      qualification: qualification,
      specification: specification,
      // knownLanguages: knownLanguages,
      student: student,
      passed_out_year: passed_out_year,
      isHavingArrear: isHavingArrear,
      // "expInManufacturing": false,
      // "experienced": true,
      industry: industry,
      jobCategory: jobCategory,
      experience: experience,
      expMonths: expMonths,
      pfEsiAccount: pfEsiAccount,
      // "knownLanguages": "1,2,3", 
      certificationCourses: certificationCourses,
      keySkill: keySkill,
      reference: reference,
    };
    var settings = {
      // "url": getAdminBaseUrl() + "/updateCandidateRegister?canId=56&adminId=4",
      "url": getAdminBaseUrl() + "/updateCandidateRegister?canId=" + canId + "&adminId=" + adminId,

      "method": "PUT",
      "timeout": 0,
      "contentType": "application/json",
      "data": JSON.stringify(obj)
    };
    $.ajax(settings).done(function (response) {
      // alert("gugi");
      console.log(response ,"uiytiytii");
      // if ($("#can_photo")[0].files.length != 0) {
      //   // to upload profile pic
      //   UpdateProfile($("#mobileNum").val());
      // }
      if (noError == 0) {
        $("#loader_modal").modal("show");
  
        $.ajax(settings)
          .done(function (res) {
            if ($("#can_photo")[0].files.length != 0) {
              // to upload profile pic
              UpdateProfile($("#mobileNum").val());
            }
            $("#loader_modal").modal("hide");
            $("#success_msg_modal").modal("show");
            // console.log(res);
            // console.log(settings.data);
          })
          .fail(function (err) {
            console.log(err);
            alert("Sorry, somthing went wrong please try later");
            // window.location.reload();
          });
      }
      $("#loader_modal").modal("hide");
      $("#success_msg_modal").modal("show");
      // console.log(res);
      // console.log(settings.data);
    })
    // .fail(function (err) {
    //   console.log(err);
    //   alert("Sorry, somthing went wrong please try later");
    //   // window.location.reload();
    // });
    function UpdateProfile(mobile_num) {
      let formData = new FormData();
      // formData.append("file", file);
      // form.append("mobileNum",mobile_num);
      // Add file to the FormData object
  
      let photofile =
        $("#can_photo")[0].files.length != 0 ? $("#can_photo")[0].files[0] : null;
  
      formData.append("file", photofile);
      // formData.append("mobileNum",mobile_num);
  
      var settings = {
        async: false,
        // url: `${getBaseUrl()}/chatbot/updateProfilePic?phone_number=${can_mobile_number}`,
        url: `${getAdminBaseUrl()}/updateUserProfilePic?mobileNumber=${mobile_num}`,
        method: "PUT",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
      };
  
      $.ajax(settings).done(function (response) {
        // console.log(response);
        console.log("profile uploaded");
      });
    }
  }
  }