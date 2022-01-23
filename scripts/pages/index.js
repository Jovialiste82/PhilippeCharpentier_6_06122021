import { photographerFactory } from "../factories/photographer.js";

/* eslint-disable no-undef */
async function getPhotographers() {
  // Fecth data located in JSON
  const res = await fetch("data/photographers.json", {
    headers: {
      Accept: "application/json",
    },
  });
  let data = await res.json();
  const newDataMediaArr = data.media.sort((a, b) => b.likes - a.likes);
  data = { ...data, media: newDataMediaArr, sort: "Popularité" };

  // Store data in Local Storage (like feature and other evolutions)
  if (localStorage.getItem("data") == null) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  // return object with array of photographers
  return {
    photographers: JSON.parse(localStorage.getItem("data")).photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Fetch photographers data
  const { photographers } = await getPhotographers();
  // Display data fetched
  displayData(photographers);
}

init();
