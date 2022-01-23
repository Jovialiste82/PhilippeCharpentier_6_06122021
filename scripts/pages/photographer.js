/* eslint-disable no-undef */
import {
  displayMedia,
  displayPhotographerInfo,
  getData,
} from "../utils/display.js";
import { enableSortButton } from "../utils/sortButton.js";
import { enableContactForm } from "../utils/contactForm.js";

async function init() {
  const { portfolio, totalLikes, photographer } = getData();
  // console.log(photographer);
  // console.log(portfolio);
  // console.log(totalLikes);
  displayPhotographerInfo(photographer, totalLikes);
  displayMedia(portfolio, photographer);
  enableSortButton();
  enableContactForm();
}

init();
