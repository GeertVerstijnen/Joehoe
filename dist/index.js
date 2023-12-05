document.addEventListener("DOMContentLoaded", function () {
    const carouselElement = document.getElementById("carousel-example");
  
    const items = [
      {
        position: 0,
        el: document.getElementById("carousel-item-1"),
      },
      {
        position: 1,
        el: document.getElementById("carousel-item-2"),
      },
      {
        position: 2,
        el: document.getElementById("carousel-item-3"),
      },
    ];
  
    // options with default values
    const options = {
      defaultPosition: 0, // Stel de standaardpositie in op de eerste afbeelding
      interval: 3000, // Interval van 3 seconden tussen elke dia
  
      // callback functions
      onNext: () => {
        console.log("next slider item is shown");
      },
      onPrev: () => {
        console.log("previous slider item is shown");
      },
      onChange: () => {
        console.log("new slider item has been shown");
      },
    };
  
    // instance options object
    const instanceOptions = {
      id: "carousel-example",
      override: true,
    };
  
    // Maak een nieuw Carousel-instantie aan met de bovenstaande opties
    const myCarousel = new Flowbite.Carousel(options, instanceOptions);
  
    // Start de automatische rotatie van de carousel
    setInterval(() => {
      myCarousel.next();
    }, options.interval);
  });
  