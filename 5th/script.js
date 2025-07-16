const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');


hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});


document.querySelectorAll('#sidebar .menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
    }
  });
});


document.addEventListener('click', (e) => {
  if (
    window.innerWidth <= 768 &&
    !sidebar.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    sidebar.classList.remove('active');
  }
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#sidebar .menu a");
const btn = document.getElementById("btn_def"); 

let clicked = false; 


function hideAllSections() {
  sections.forEach(section => {
    section.style.display = "none";

  });
}


function showSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.style.display = "block";
    btn.style.display="block"
  }
}


navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    clicked = true; 

    const sectionId = link.getAttribute("href").substring(1);

    
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    
    hideAllSections();
    showSection(sectionId);
  });
});


window.addEventListener("scroll", () => {
  if (!clicked) {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }
});


btn.addEventListener("click", () => {
  clicked = false; 

  
  sections.forEach(section => {
    section.style.display = "block";
    btn.style.display="none";
  });

  
  navLinks.forEach(link => {
    link.classList.remove("active");
  });
});
