// INIT CAROUSEL
document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  const dotsContainer = carousel.querySelector(".dots");
  let index = 0;
  let interval;

  // criar dots
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      index = i;
      update();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function update() {
    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    images[index].classList.add("active");
    dots[index].classList.add("active");
  }

  // NAV
  carousel.querySelector(".next").onclick = () => {
    index = (index + 1) % images.length;
    update();
  };

  carousel.querySelector(".prev").onclick = () => {
    index = (index - 1 + images.length) % images.length;
    update();
  };

  // AUTOPLAY
  function startAuto() {
    interval = setInterval(() => {
      index = (index + 1) % images.length;
      update();
    }, 3000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);

  startAuto();

  // SWIPE MOBILE
  let startX = 0;

  carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      index = (index + 1) % images.length;
    } else if (endX - startX > 50) {
      index = (index - 1 + images.length) % images.length;
    }

    update();
  });

  // MODAL
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");

  images.forEach(img => {
    img.onclick = () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    };
  });

  document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
  };
});

// READ MORE
function toggleMore(element) {
  const more = element.parentElement.previousElementSibling;

  if (more.style.display === "block") {
    more.style.display = "none";
    element.innerText = "Read more";
  } else {
    more.style.display = "block";
    element.innerText = "Show less";
  }
}

// SCROLL ANIMATION
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();