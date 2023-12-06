// Importeer Firestore-functionaliteit
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuratie voor je Firebase-project
const firebaseConfig = {
    apiKey: "AIzaSyDPCVnXdj3AdJoFxkIhNKyb767YppkfepA",
    authDomain: "joehoe-c355d.firebaseapp.com",
    projectId: "joehoe-c355d",
    storageBucket: "joehoe-c355d.appspot.com",
    messagingSenderId: "556689009363",
    appId: "1:556689009363:web:c0f30323c888c3f92b8226",
    measurementId: "G-DVE45FR3GW"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Functie om gegevens uit de "cards"-collectie op te halen
const getCardsData = async () => {
    const cardsCollection = collection(db, 'cards');
    const querySnapshot = await getDocs(cardsCollection);

    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
};

getCardsData();


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
  