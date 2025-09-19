 var swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto", 
      centeredSlides: true,  
      spaceBetween: 30,      
      grabCursor: true,
      loop: false,
    });

    
    const links = document.querySelectorAll(".custom-links a");

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const slideIndex = parseInt(this.dataset.slide);

        swiper.slideTo(slideIndex); 

       
        links.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
      });
    });

   
    swiper.on("slideChange", function () {
      links.forEach(l => l.classList.remove("active"));
      const currentIndex = swiper.realIndex;
      if (links[currentIndex]) {
        links[currentIndex].classList.add("active");
      }
    });

 const options = document.querySelectorAll(".toggle-option");
    const highlight = document.querySelector(".toggle-highlight");

    options.forEach((option, index) => {
      option.addEventListener("click", () => {
        document.querySelector(".toggle-option.active").classList.remove("active");
        option.classList.add("active");

       
        highlight.style.transform = `translateX(${index * 100}%)`;
      });
    });

const slider = document.getElementById("rangeSlider");
    const amount = document.getElementById("amount");
    const scale = document.getElementById("scale");

    
    const min = parseInt(slider.min);
    const max = parseInt(slider.max);
    const step = parseInt(slider.step);

    for (let i = min; i <= max; i += step) {
      const tick = document.createElement("div");
      tick.classList.add("tick");

      if (i % 1000 === 0) {
        tick.classList.add("major");
        tick.innerHTML = `<div class="line"></div><span>${i}</span>`;
      } else {
        tick.classList.add("minor");
        tick.innerHTML = `<div class="line"></div>`;
      }

      const percent = ((i - min) / (max - min)) * 100;
      tick.style.left = percent + "%";
      scale.appendChild(tick);
    }

   
    function calculatePrice(value) {
      return (value * 0.1498).toFixed(2);
    }

    slider.addEventListener("input", () => {
      amount.textContent = calculatePrice(slider.value) + " €";
    });
