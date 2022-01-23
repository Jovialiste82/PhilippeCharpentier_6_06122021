import { mediaFactory } from "../factories/media.js";
import { enableLikeFeature } from "../utils/likeFeature.js";
import { enableLightboxListeners } from "../utils/lightbox.js";

export function getData() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("photographer"));
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  const photographer = data.photographers.find((p) => p.id === photographerId);
  const portfolio = data.media
    .filter((obj) => obj.photographerId === photographerId)
    .map((obj) => obj);
  const totalLikes = portfolio.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  return { photographer, portfolio, totalLikes };
}

export const displayMedia = (portfolioArray, photographer) => {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = parseInt(urlParams.get("photographer"));
  const { name } = photographer;
  const portfolioSection = document.querySelector(".portfolio-section");
  const lightboxSection = document.querySelector(".slider-media-container");
  portfolioArray
    .filter((item) => item.photographerId === photographerId)
    .forEach((portfolioItem) => {
      const mediaModel = mediaFactory(name, portfolioItem);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      const mediaSlidesDOM = mediaModel.getMediaSlidesDOM();
      portfolioSection.appendChild(mediaCardDOM);
      lightboxSection.appendChild(mediaSlidesDOM);
    });
  enableLikeFeature();
  enableLightboxListeners();
};

export const displayPhotographerInfo = async (photographer, totalLikes) => {
  const { name, portrait, city, country, price, tagline } = photographer;
  const picture = `assets/photos/Photographers/${portrait}`;
  const header = document.querySelector(".photograph-header");
  const aside = document.querySelector("aside");
  header.innerHTML = `
        <div class="card2-bio">
          <h1 class="photographer-name">${name}</h1>
          <p class="location">${city}, ${country}</p>
          <p class="tagline">${tagline}</p>
        </div>
        <button class="contact-button">
          Contactez-moi
        </button>
        <img src=${picture} alt="${name}">
`;
  aside.innerHTML = `
        <div class="aside-container">
            <div>${totalLikes} &hearts;</div>
            <div>${price}€ / jour</div>
        </div>
  `;
};

export const resetMediaSection = () => {
  console.log("test-reset");
  const portfolioSection = document.querySelector(".portfolio-section");
  const lightboxSection = document.querySelector(".slider-media-container");
  portfolioSection.innerHTML = "";
  lightboxSection.innerHTML = "";
  console.log(portfolioSection);
  console.log(lightboxSection);
};
