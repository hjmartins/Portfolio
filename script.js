// VER MAIS
function toggleMore(element) {
  const moreText = element.parentElement.previousElementSibling;

  if (moreText.style.display === "block") {
    moreText.style.display = "none";
    element.innerText = "Read more";
  } else {
    moreText.style.display = "block";
    element.innerText = "Show less";
  }
}

// ANIMAÇÃO AO SCROLL
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal');

  elements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 50) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();