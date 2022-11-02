// seleccionar todos los slides
const slides = document.querySelectorAll(".landing_img");

// recorrer las diapositivas y establecer la propiedad translateX de cada diapositiva en index * 100%
slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

// contador slide
let curSlide = 0;

// sgte boton slide
const nextSlide = document.querySelector(".btn-next");

// add event listener and next slide functionality
nextSlide.addEventListener("click", function () {
     curSlide++;

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

// boton selecionar slide anterior
const prevSlide = document.querySelector(".btn-prev");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
  // check if current slide is the first and reset current slide to last
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  //   move slide by 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});