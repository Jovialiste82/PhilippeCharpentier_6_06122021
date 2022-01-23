const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
};

const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
};

export const enableContactForm = () => {
  const contactButton = document.querySelector(".contact-button");
  const closeModalButton = document.querySelector(".close-modal-button");
  contactButton.addEventListener("click", displayModal);
  closeModalButton.addEventListener("click", closeModal);
};
