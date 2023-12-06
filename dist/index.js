import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPCVnXdj3AdJoFxkIhNKyb767YppkfepA",
  authDomain: "joehoe-c355d.firebaseapp.com",
  projectId: "joehoe-c355d",
  storageBucket: "joehoe-c355d.appspot.com",
  messagingSenderId: "556689009363",
  appId: "1:556689009363:web:c0f30323c888c3f92b8226",
  measurementId: "G-DVE45FR3GW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Functie om kaarten dynamisch te genereren op basis van gegevens uit de database
const generateCards = async () => {
  const cardsContainer = document.getElementById("cardsContainer");

  // Haal gegevens op uit de "cards"-collectie
  const cardsCollection = collection(db, "cards");
  const querySnapshot = await getDocs(cardsCollection);

  // Loop door de gegevens en maak voor elke kaart een nieuw element
  querySnapshot.forEach((doc) => {
    const newCard = document.createElement("div");
    newCard.classList.add(
      "mx-4",
      "bg-dark-blue",
      "flex",
      "rounded-xl",
      "shadow-lg",
      "h-36",
      "relative",
      "card-container"
    );

    newCard.innerHTML = `
      <img class="rounded-xl rounded-r-none w-36 h-36 object-cover" src="${
        doc.data().imageUrl
      }" />
      <div class="flex flex-col text-white justify-between mx-4 my-2">
        <div>
          <div class="uppercase font-bold text-xl card-title">${
            doc.data().title
          }</div>
          <div class="card-description">${doc.data().description}</div>
        </div>
        <div class="flex justify-start pb-2 gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG-path hier -->
          </svg>
          <div class="font-light italic card-progress">${
            doc.data().progress
          } / ${doc.data().total}</div>
        </div>
      </div>
      <div>
        <img class="p-4 w-20 h-20 object-contain absolute bottom-0 right-0" src="${
          doc.data().imageSrc
        }" alt="" />
      </div>
    `;

    // Voeg de gemaakte kaart toe aan de container
    cardsContainer.appendChild(newCard);
  });
};

// Roep de generateCards-functie aan om de kaarten dynamisch te genereren
generateCards();

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const progressBar = document.getElementById("progressBar");
  const images = document.querySelectorAll("#carousel img");
  const interval = 5000;
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
    progressBar.style.transition = `transform ${interval}ms linear`;
    progressBar.style.transform = "scaleX(0)"; // Schaal naar nul breedte (links naar rechts)
  }

  setInterval(showNextImage, interval);
});
