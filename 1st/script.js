const heroImage = document.querySelector(".hero img");
const heroTextH1 = document.querySelector(".hero-text h1");
const heroTextH2 = document.querySelector(".hero-text h2");

// Image and corresponding text
const data = [
  {
     image: "img/1.jpg",
    h1: "Los Angeles",
    h2: "We had the best time playing at Venice Beach!"
  },
  {
    image: "img/3.jpg",
    h1: "Chicago",
    h2: "Thank you, Chicago - A night we won't forget."
   
  },
  {
    image: "img/2.jpg",
    h1: "New York",
    h2: "The atmosphere in New York is lorem ipsum."
  }
];

let index = 0;

setInterval(() => {
  index = (index + 1) % data.length;
  heroImage.src = data[index].image;
  heroTextH1.textContent = data[index].h1;
  heroTextH2.textContent = data[index].h2;
}, 2500);

const hamburger = document.getElementById('snipped');
const navLinks = document.getElementById('navLinks');


snipped.addEventListener('click', (event) => {
  event.stopPropagation(); 
  navLinks.classList.toggle('active');
});


document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


document.addEventListener('click', (event) => {
  const isClickInside = navLinks.contains(event.target) || snipped.contains(event.target);
  if (!isClickInside) {
    navLinks.classList.remove('active');
  }
});
