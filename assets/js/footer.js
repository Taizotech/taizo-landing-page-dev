var facebookIcon = document.getElementById("facebookIcon");
      if (facebookIcon) {
        facebookIcon.addEventListener("click", function () {
          window.open("https://www.facebook.com/TaizoIndia");
        });
      }

      var youTubeIcon = document.getElementById("youTubeIcon");
      if (youTubeIcon) {
        youTubeIcon.addEventListener("click", function () {
          window.open(
            "https://www.youtube.com/channel/UCtXH7feV_GwI-gwTnD6b2Vg"
          );
        });
      }

      var linkedInCircledIcon = document.getElementById("linkedInCircledIcon");
      if (linkedInCircledIcon) {
        linkedInCircledIcon.addEventListener("click", function () {
          window.open("https://www.linkedin.com/company/taizo-in");
        });
      }

      var instagramIcon = document.getElementById("instagramIcon");
      if (instagramIcon) {
        instagramIcon.addEventListener("click", function () {
          window.open("https://instagram.com/taizo.in_jobs?igshid=MzRlODBiNWFlZA==");
        });
      }

      var privacyPolicy = document.getElementById("privacyPolicy");
      if (privacyPolicy) {
        privacyPolicy.addEventListener("click", function () {
          window.open("https://www.taizo.in/privacy-policy");
        });
      }

      var termsCondition = document.getElementById("termsCondition");
      if (termsCondition) {
        termsCondition.addEventListener("click", function () {
          window.open("https://www.taizo.in/terms-service");
        });
      }
      var scrollAnimElements = document.querySelectorAll(
        "[data-animate-on-scroll]"
      );
      var observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              const targetElement = entry.target;
              targetElement.classList.add("animate");
              observer.unobserve(targetElement);
            }
          }
        },
        {
          threshold: 0.15,
        }
      );

      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.observe(scrollAnimElements[i]);
      }