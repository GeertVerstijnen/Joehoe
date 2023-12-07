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

  // Beperk het aantal kaarten tot maximaal 4
  let cardCount = 0;

  // Loop door de gegevens en maak voor elke kaart een nieuw element
  querySnapshot.forEach((doc) => {
    if (cardCount < 4) {
      const newCard = document.createElement("div");
      newCard.classList.add(
        "mx-4",
        "bg-dark-blue",
        "flex",
        "rounded-xl",
        "shadow-lg",
        "h-32",
        "relative",
        "card-container"
      );

      newCard.innerHTML = `
        <img class="rounded-xl rounded-r-none w-32 h-full object-cover" src="${doc.data().imageUrl}" />
        <div class="flex flex-col text-white justify-between mx-4 my-2">
          <div>
            <div class="uppercase font-bold text-xl card-title">${doc.data().title}</div>
            <div class="card-description">${doc.data().description}</div>
          </div>
          <div class="flex justify-start pb-2 gap-2">
          <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
            <div class="font-light italic card-progress">${doc.data().progress} / ${doc.data().total}</div>
          </div>
        </div>
        <div>
          <img class="p-4 w-20 h-20 object-cover absolute bottom-0 right-0" src="${doc.data().imageQR}" alt="" />
        </div>
      `;

      // Voeg de gemaakte kaart toe aan de container
      cardsContainer.appendChild(newCard);

      // Verhoog de kaartteller
      cardCount++;
    } else {
      // Onderbreek de loop zodra het maximale aantal kaarten is bereikt
      return;
    }
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
