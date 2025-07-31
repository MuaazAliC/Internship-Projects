const container = document.getElementById("data-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("number");
const paginationNumbers = document.getElementById("pagination-numbers");

const per_page_con = "perPage=1";
let currentPageUrl = "https://simp-api.dev.crymzee.com/api/post/public?page=1&" + per_page_con;

let nextPageUrl = null;
let prevPageUrl = null;
let currentPage = 1;
let totalPages = 1;

async function fetchData(url = currentPageUrl) {
  try {
    const res = await fetch(url);
    const result = await res.json();

    const data = result.data;
    nextPageUrl = result.pagination.links.next;
    prevPageUrl = result.pagination.links.previous;
    currentPage = result.pagination.currentPage;
    totalPages = result.pagination.total;

    displayPage(data);
    createPaginationButtons(currentPage, totalPages);
  } catch (err) {
    container.innerHTML = "<p>Failed to fetch data.</p>";
    console.error("Fetch error:", err);
  }
}

function displayPage(data) {
  container.innerHTML = "";

  data.forEach(item => {
    const imageUrl = item.media;
    const caption = item.content || "No content";
    const user = `${item.created_by.first_name} ${item.created_by.last_name}`;
    const likes = item.total_likes;
    const comments = item.total_comments;
    const hashtag = item.hashtags || 0;
    const createdAt = new Date(item.created_at).toLocaleString();

    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
      <img src="${imageUrl}" alt="Post Image" />
      <div class="content">
        <h3>User: ${user}</h3>
        <p><strong>Caption:</strong> ${caption}</p>
        <p><strong>Likes:</strong> ${likes}</p>
        <p><strong>Comments:</strong> ${comments}</p>
        <p><strong>Posted:</strong> ${createdAt}</p>
        <p><strong>Hashtag:</strong> ${hashtag}</p>
      </div>
    `;
    container.appendChild(box);
  });

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = !prevPageUrl;
  nextBtn.disabled = !nextPageUrl;
}

function createPaginationButtons(currentPage, totalPages) {
  paginationNumbers.innerHTML = "";

//  const maxButtons = 3;
let startPage = Math.max(1, currentPage - 1);
let endPage = Math.min(totalPages, currentPage + 1);

if (currentPage === 1) {
  endPage = Math.min(totalPages, startPage + 2);
} else if (currentPage === totalPages) {
  startPage = Math.max(1, totalPages - 2);
}


if (startPage > 2) {
  const firstBtn = document.createElement("button");
  firstBtn.textContent = "1";
  firstBtn.addEventListener("click", () => {
    fetchData(`https://simp-api.dev.crymzee.com/api/post/public?page=1&${per_page_con}`);
  });
  paginationNumbers.appendChild(firstBtn);

  const dots = document.createElement("span");
  dots.textContent = "...";
  paginationNumbers.appendChild(dots);
} else if (startPage === 2) {

  const firstBtn = document.createElement("button");
  firstBtn.textContent = "1";
  firstBtn.addEventListener("click", () => {
    fetchData(`https://simp-api.dev.crymzee.com/api/post/public?page=1&${per_page_con}`);
  });
  paginationNumbers.appendChild(firstBtn);
}


for (let i = startPage; i <= endPage; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  if (i === currentPage) {
    btn.classList.add("active");
  }
  btn.addEventListener("click", () => {
    fetchData(`https://simp-api.dev.crymzee.com/api/post/public?page=${i}&${per_page_con}`);
  });
  paginationNumbers.appendChild(btn);
}


if (endPage < totalPages - 1) {
  const dots = document.createElement("span");
  dots.textContent = ".....";
  paginationNumbers.appendChild(dots);

  const lastBtn = document.createElement("button");
  lastBtn.textContent = totalPages;
  lastBtn.addEventListener("click", () => {
    fetchData(`https://simp-api.dev.crymzee.com/api/post/public?page=${totalPages}&${per_page_con}`);
  });
  paginationNumbers.appendChild(lastBtn);
} else if (endPage === totalPages - 1) {

  const lastBtn = document.createElement("button");
  lastBtn.textContent = totalPages;
  lastBtn.addEventListener("click", () => {
    fetchData(`https://simp-api.dev.crymzee.com/api/post/public?page=${totalPages}&${per_page_con}`);
  });
  paginationNumbers.appendChild(lastBtn);
}
}

prevBtn.addEventListener("click", () => {
  if (prevPageUrl) {
    fetchData(prevPageUrl);
  }
});

nextBtn.addEventListener("click", () => {
  if (nextPageUrl) {
    fetchData(nextPageUrl);
  }
});


fetchData();
