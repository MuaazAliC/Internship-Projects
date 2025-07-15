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
