let images = [
  "img/1.png", "img/2.png", "img/3.png", "img/4.jpg", "img/5.jpg",
  "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg"
];

let container = document.querySelector(".to_show");
let numberContainer = document.querySelector(".change");

let totalBoxes = 20;
let showPerClick = 2;
let currentPage = 0; 

function showBoxes(pageNumber) {
  container.innerHTML = "";
  let start = pageNumber * showPerClick;

  for (let i = start; i < start + showPerClick && i < totalBoxes; i++) {
    let imgIndex = i % images.length;
    let box = document.createElement("div");
    box.className = "box";

    box.innerHTML = `
      <div class="image">
        <img src="${images[imgIndex]}" />
      </div>
      <div class="text">
        <div class="heading">
          <div><p>Casa <br> Samborondon</p></div>
          <div><i class="fa-regular fa-heart heart-icon" style="color: #000000; cursor: pointer;"></i></div>
        </div>
        <div>
          <p>
            <i class="fa-solid fa-box" style="color: #000000;"></i> 400 m<sup>2</sup>
            <i class="fa-solid fa-house" style="color: #000000;"></i> 320 m<sup>2</sup>
          </p>
        </div>
        <div>
          <p>
            <i class="fa-solid fa-bed" style="color: #000000;"></i> 4
            <i class="fa-solid fa-bath" style="color: #000000;"></i> 4.5
          </p>
        </div>
        <div class="line"></div>
        <div><p>Samborondon, Guayas</p></div>
        <div><p>$320,000</p></div>
      </div>
    `;

    container.appendChild(box);

    const heartIcon = box.querySelector(".heart-icon");
    heartIcon.addEventListener("click", function () {
      heartIcon.classList.toggle("fa-regular");
      heartIcon.classList.toggle("fa-solid");
    });
  }
}

function showButtons(currentPage) {
  numberContainer.innerHTML = "";
  const totalPages = Math.ceil(totalBoxes / showPerClick);

  function createButton(page) {
    const btn = document.createElement("button");
    btn.className = "num";
    btn.textContent = page + 1;

    if (page === currentPage) {
      btn.style.backgroundColor = "black";
      btn.style.color = "white";
    }

    btn.addEventListener("click", () => {
      currentPage = page;
      showBoxes(currentPage);
      showButtons(currentPage);
    });

    numberContainer.appendChild(btn);
  }

  function createDots() {
    const dots = document.createElement("span");
    dots.textContent = "...";
    dots.style.margin = "0 5px";
    numberContainer.appendChild(dots);
  }

  const pageRange = 1;
  const totalPagesToShow = Math.ceil(totalBoxes / showPerClick);
  const startRange = Math.max(1, currentPage - pageRange);
  const endRange = Math.min(totalPagesToShow - 2, currentPage + pageRange);

  createButton(0);
  if (startRange > 1) createDots();

  for (let i = startRange; i <= endRange; i++) {
    createButton(i);
  }

  if (endRange < totalPagesToShow - 2) createDots();

  if (totalPagesToShow > 1) createButton(totalPagesToShow - 1);

  
  if (currentPage < totalPagesToShow - 1) {
    const nextBtn = document.createElement("button");
    nextBtn.className = "next";
    nextBtn.textContent = "Next ->";
    nextBtn.style.marginLeft = "10px";

    nextBtn.addEventListener("click", () => {
      currentPage++;
      showBoxes(currentPage);
      showButtons(currentPage);
    });

    numberContainer.appendChild(nextBtn);
  }
}


showBoxes(currentPage);
showButtons(currentPage);
