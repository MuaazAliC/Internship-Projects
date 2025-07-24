const menu = document.getElementById("menu");
let menuVisible = false;


gsap.set(menu, {
  y: "-100%",
  autoAlpha: 0
});


function toggleMenu() {
  if (!menuVisible) {
    gsap.to(menu, {
      y: "0%",
      duration: 0.6,
      ease: "power4.out",
      autoAlpha: 1,
      onStart: () => {
        menu.style.visibility = "visible";
      }
    });
  } else {
    gsap.to(menu, {
      y: "-100%",
      duration: 0.6,
      ease: "power4.in",
      autoAlpha: 0,
      onComplete: () => {
        menu.style.visibility = "hidden";
      }
    });
  }
  menuVisible = !menuVisible;
}

document.getElementById("menu").addEventListener("click", toggleMenu);


const menuItems = document.querySelectorAll("#menu ul");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    if (menuVisible) toggleMenu();
  });
});




const btn = document.getElementById('btn');
const oneElements = document.getElementsByClassName('one');

let toggled = false;

btn.addEventListener('click', () => {
  toggled = !toggled;
  for (let i = 0; i < oneElements.length; i++) {
    oneElements[i].style.width = toggled ? '32%' : '33.33%';
    oneElements[i].style.gap = toggled ? '18px' : '0';

  }
});

const btn2 = document.getElementById('btn2');
const oneElements2 = document.getElementsByClassName('one');

let toggled2 = false;

btn2.addEventListener('click', () => {
  toggled2 = !toggled2;
  for (let i = 0; i < oneElements2.length; i++) {
    oneElements2[i].style.gap = toggled2 ? '18px' : '0';
  }
});


function media_query_bug_sol() {
  for (let i = 0; i < oneElements.length; i++) {
    if (window.innerWidth <= 786) {
      oneElements[i].style.width = '100%';

      const imgs = oneElements[i].getElementsByTagName('img');
      for (let j = 0; j < imgs.length; j++) {
        imgs[j].style.width = '100%';
      }

    } else {
      oneElements[i].style.width = toggled ? '32%' : '33.33%';

      const imgs = oneElements[i].getElementsByTagName('img');
      for (let j = 0; j < imgs.length; j++) {
        imgs[j].style.width = ''; 
      }
    }
  }
}

 media_query_bug_sol();
window.addEventListener("resize",  media_query_bug_sol);

