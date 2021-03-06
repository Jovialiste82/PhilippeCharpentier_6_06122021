/* eslint-disable no-unused-vars */
import { keyboard } from "./constants.js";

const sliderContainer = document.querySelector(".slider-modal");
const prevBtn = document.querySelector(".arrow-left");
const nextBtn = document.querySelector(".arrow-right");
const closeBtn = document.querySelector(".close-lightbox");

export const enableLightboxListeners = () => {
  // Create an array of all media cards
  const mediaCardsList = Array.from(document.querySelectorAll(".lb-target"));
  // Create an array of all slides elements
  const slides = Array.from(document.querySelectorAll(".slide"));
  // Create an array holding ids of all media for navigation purposes
  const slidesIds = slides.map((slide) => parseInt(slide.dataset.id));
  // Add click event listener to each media card
  mediaCardsList.forEach((mc) =>
    mc.addEventListener("click", (e) => {
      // Get current index of clicked media
      const currIndex = slidesIds.indexOf(
        parseInt(e.target.parentElement.dataset.id)
      );

      // display Lightbox
      sliderContainer.style.display = "block";

      // Enable close button
      closeBtn.addEventListener("click", () => {
        sliderContainer.style.display = "none";
      });

      // Display selected media inside lightbox
      showSlide(currIndex);

      // Add event listener to Display previous media
      prevBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.prev));
      });

      // Add event listener to Display next media
      nextBtn.addEventListener("click", (e) => {
        showSlide(parseInt(e.target.dataset.next));
      });

      // Add event listener for keyboard actions
      document.addEventListener("keydown", (e) => {
        const keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode === keyboard.ArrowLeft.keyCode) {
          prevBtn.click();
        } else if (keyCode === keyboard.ArrowRight.keyCode) {
          nextBtn.click();
        } else if (keyCode === keyboard.Escape.keyCode) {
          closeBtn.click();
        }
      });
    })
  );

  const showSlide = (index) => {
    // Display relevant media based on index
    slides.forEach((slide) => {
      parseInt(slide.dataset.id) === slidesIds[index]
        ? (slide.style.display = "block")
        : (slide.style.display = "none");
    });

    // Set next dataset value for Btn "previous"
    index - 1 < 0
      ? // If we reach first media index, go to last media index
        (prevBtn.dataset.prev = slidesIds.length - 1)
      : // Otherwise, simply go to previous index
        (prevBtn.dataset.prev = index - 1);

    // Set next dataset value for Btn "next"
    index + 1 > slidesIds.length - 1
      ? // If we reach last media index, go back to first media index
        (nextBtn.dataset.next = 0)
      : // Otherwise, simply go to next index
        (nextBtn.dataset.next = index + 1);
  };
};
