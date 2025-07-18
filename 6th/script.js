document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const hamCon = document.querySelector(".ham_con");
  const message = document.querySelector(".message");
  const hamLinks = document.querySelectorAll(".ham_in_con");
  
  
  const groupElements = document.querySelectorAll(".group");
  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  const gallery = document.getElementById("gallery");

  const close = document.getElementById("close");

  
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); 
    hamCon.style.display = hamCon.style.display === "block" ? "none" : "block";
  });
  close.addEventListener("click", (e) => {
    e.stopPropagation(); 
    message.style.display = message.style.display === "block" ? "none" : "block";
  });

  hamLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamCon.style.display = "none";
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamCon.contains(e.target) && !hamburger.contains(e.target)) {
      hamCon.style.display = "none";
    }
  });

  
  groupElements.forEach((group, index) => {
    group.addEventListener("click", () => {
      if (index === 0) {
        input1.style.display = input1.style.display === "block" ? "none" : "block";
      } else if (index === 1) {
        input2.style.display = input2.style.display === "block" ? "none" : "block";
      } else if (index === 2) {
        gallery.style.display = gallery.style.display === "block" ? "none" : "block";
      }
    });
  });
});
