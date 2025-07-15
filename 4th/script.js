    function applyTheme() {
      const isChecked = document.getElementById("themeToggle").checked;

      if (isChecked) {
        document.getElementById("body").classList.add("white-theme");
         document.getElementById("empty_div").style.backgroundColor = "white";
      } else {
        document.getElementById("body").classList.remove("white-theme");
         document.getElementById("empty_div").style.backgroundColor = "black";
      }
    }
