import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import {
    getFirestore,
    getDoc,
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
  
  async function updateCounter() {
    console.log("Function is called");
    let currentCounter = parseInt(localStorage.getItem('counter')) || 0;
    currentCounter++;
    // Update local storage
    localStorage.setItem('counter', currentCounter);

    // Update Firebase progress
    const progressRef = doc(db, 'cards', 'qi51WGjVEzS6ZuS8dKFV');

    try {
        await updateDoc(progressRef, { progress: currentCounter });
        console.log('Counter successfully updated in Firestore:', currentCounter);

        // Get the updated data after the update operation
        const docSnapshot = await getDoc(progressRef);
        console.log('Updated Data:', docSnapshot.data());
    } catch (error) {
        console.error('Error updating counter in Firestore:', error);
    }

    console.log('Counter:', currentCounter);
}

// Add an event listener to the button
document.getElementById('yourButtonId').addEventListener('click', updateCounter);