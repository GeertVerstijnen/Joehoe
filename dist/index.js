import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
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

// Voeg hier eventuele extra Firebase-functionaliteit toe indien nodig

export { app, analytics, db };

// Functie om kaarten dynamisch te genereren op basis van gegevens uit de database
const generateCards = async () => {
  document.addEventListener("DOMContentLoaded", async function () {
    const cardsContainer = document.getElementById("cardsContainer");

    const cardsCollection = collection(db, "cards");
    const querySnapshot = await getDocs(cardsCollection);

    // Sorteer de querySnapshot array op basis van het percentage (laagste eerst)
    const sortedCards = querySnapshot.docs.sort((a, b) => {
      const percentageA = (a.data().progress / a.data().total) * 100;
      const percentageB = (b.data().progress / b.data().total) * 100;
      return percentageA - percentageB;
    });

    sortedCards.forEach((doc) => {
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

      const percentage = (doc.data().progress / doc.data().total) * 100;

      newCard.innerHTML = `
        <img class="rounded-xl rounded-r-none w-32 h-full object-cover" src="${doc.data().imageUrl}" />
        <div class="flex flex-col text-white justify-between mx-4 my-2">
          <div>
            <div class="uppercase font-bold text-xl card-title">${doc.data().title}</div>
            <div class="card-description">${doc.data().description}</div>
          </div>
          <div class="flex justify-start pb-2 gap-2">

            <div class="flex justify-normal gap-2">
            </div>
            </div>
        </div>
        <div>
          <a href="/joehoe/dist/mobile.html">
            <img class="p-4 w-20 h-20 object-cover absolute bottom-0 right-0" src="${doc.data().imageQR}" alt="" />
          </a>
        </div>
      `;

      cardsContainer.appendChild(newCard);
    });
  });
};

generateCards();


// document.addEventListener("DOMContentLoaded", function () {
//   const carousel = document.getElementById("carousel");
//   const progressBar = document.getElementById("progressBar");
//   const images = document.querySelectorAll("#carousel img");
//   const interval = 5000;
//   let currentIndex = 0;

//   function showNextImage() {
//     currentIndex = (currentIndex + 1) % images.length;
//     updateCarousel();
//     resetProgressBar();
//   }

//   function updateCarousel() {
//     const transformValue = -currentIndex * 100 + "%";
//     carousel.style.transform = "translateX(" + transformValue + ")";
//   }

//   function resetProgressBar() {
//     progressBar.style.transition = "none";
//     progressBar.style.transform = "scaleX(1)"; // Reset naar volle breedte
//     void progressBar.offsetWidth; // Force reflow
//     progressBar.style.transition = `transform ${interval}ms linear`;
//     progressBar.style.transform = "scaleX(0)"; // Schaal naar nul breedte (links naar rechts)
//   }

//   setInterval(showNextImage, interval);
// });

let savedName = localStorage.getItem('savedName') || '';

function saveName() {
  savedName = document.getElementById('name').value;
  localStorage.setItem('savedName', savedName);
  window.location.href = 'mobile.html';
}

function displaySavedName() {  
  if (savedName) {
    document.getElementById('displaySavedName').innerText = savedName;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  displaySavedName();
});

window.onload = function() {
  displaySavedName();
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    saveName();
  });
});



