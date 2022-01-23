import { resetMediaSection, displayMedia, getData } from "../utils/display.js";
import { sortMediaItems } from "./sortAlgo.js";

const sortByMenu = document.querySelector("#sortByMenu");
const option1 = document.querySelector("#button1");
const option2 = document.querySelector("#button2");
const option3 = document.querySelector("#button3");
const values = [
  ["Popularité", "likes"],
  ["Date", "date"],
  ["Titre", "title"],
];

export const enableSortButton = () => {
  sortByMenu.addEventListener("mouseover", () => {
    option2.setAttribute("style", "display: block");
    option3.setAttribute("style", "display: block");
  });

  sortByMenu.addEventListener("mouseout", () => {
    option2.removeAttribute("style");
    option3.removeAttribute("style");
  });

  sortByMenu.addEventListener("click", (e) => {
    resetMediaSection();
    console.log(e.target.textContent);
    const value = e.target.textContent;
    option1.textContent = value;
    option2.removeAttribute("style");
    option3.removeAttribute("style");
    option2.textContent = values.filter((v) => v[0] !== value)[0][0];
    option3.textContent = values.filter((v) => v[0] !== value)[1][0];
    sortMediaItems(values.find((v) => v[0] == value)[1]);
    const { photographer, portfolio } = getData();
    displayMedia(portfolio, photographer);
  });
};
