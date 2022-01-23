/* eslint-disable no-unused-vars */

export const photographerFactory = (data) => {
  const { name, portrait, city, country, price, tagline, id } = data;

  const picture = `assets/photos/Photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const baseURL = "photographer.html";
    const url = `${baseURL}?photographer=${id}`;
    article.innerHTML = `
      <a href=${url}>
        <img src=${picture} alt="">
        <h2 class="photographer-name">${name}</h2>
      </a>
      <div>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
        <p class="price">${price}€/jour</p>
      </div>
`;
    return article;
  }

  return { name, picture, getUserCardDOM };
};
