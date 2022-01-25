/* eslint-disable no-unused-vars */

class VideoMediaSubFactory {
  static render(folder, video, w, h, type) {
    return `<video class="media-${type}-video lb-target" tabindex="0" width=${w} height=${h} preload="metadata" ${
      type === "slide" ? "autoplay muted" : ""
    }>
                <source src="assets/photos/${folder}/${video}" type="video/mp4">
              </video>`;
  }
}

class ImageMediaSubFactory {
  static render(folder, image, alt, type) {
    return `<img class="media-${type}-img lb-target" tabindex="0" src="assets/photos/${folder}/${image}" alt="${alt}">`;
  }
}

export const mediaFactory = (photographerName, portfolioItem) => {
  const { id, alt, date, image, likes, title, video } = portfolioItem;
  const folder = photographerName.split(" ")[0];

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
      <div class="media-card" data-id="${id}" data-title="${title}"  data-date="${date}">
      ${
        image
          ? ImageMediaSubFactory.render(folder, image, alt, "card")
          : VideoMediaSubFactory.render(folder, video, "350", "300", "card")
      }
        
        <div class="media-card-text">
          <span class="media-card-title">${title}</span>
          <span class="media-card-likes" aria-label="likes" tabindex="0" >${likes} &hearts;</span>
        </div>
      </div>
`;
    return article;
  }

  function getMediaSlidesDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-hidden", "true");
    article.innerHTML = `
      <div class="slide hide-slide" data-id="${id}" data-title="${title}" data-date="${date}">
        <div class="slide-media-container">
      ${
        image
          ? ImageMediaSubFactory.render(folder, image, alt, "slide")
          : VideoMediaSubFactory.render(folder, video, "100%", "80%", "slide")
      }        
        </div>
        <p>${title}</p>
      </div>
`;
    return article;
  }

  return { getMediaCardDOM, getMediaSlidesDOM };
};
