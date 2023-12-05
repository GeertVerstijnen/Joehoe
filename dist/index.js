// script.js
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const progressBar = document.getElementById("progressBar");
    const images = document.querySelectorAll("#carousel img");
    const interval = 5000;
    const animationDuration = 5000; // Duur van de animatie in milliseconden
    let currentIndex = 0;
  
    function showNextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
      resetProgressBar();
    }
  
    function updateCarousel() {
      const transformValue = -currentIndex * 100 + "%";
      carousel.style.transform = "translateX(" + transformValue + ")";
    }
  
    function resetProgressBar() {
      progressBar.style.transition = "none";
      progressBar.style.transform = "scaleX(1)"; // Reset naar volle breedte
      void progressBar.offsetWidth; // Force reflow
      progressBar.style.transition = `transform ${animationDuration}ms linear`;
      progressBar.style.transform = "scaleX(0)"; // Schaal naar nul breedte (links naar rechts)
    }
  
    setInterval(showNextImage, interval);
  });
  