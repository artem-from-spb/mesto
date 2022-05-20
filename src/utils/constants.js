export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

 // Попап 1
export const profilePopup = document.querySelector(".popup_profile");
export const profileEditButton = document.querySelector(".profile__edit");
export const profilePopupCloseButton = document.querySelector(".popup__close-img");

export const profileForm = profilePopup.querySelector(".popup__form_edit");
export const nameInput = profilePopup.querySelector(".popup__input_type_name");
export const jobInput = profilePopup.querySelector(".popup__input_type_about");

export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

// Попап 2
export const placeAddPopup = document.querySelector(".popup_add");
export const placeAddButton = document.querySelector(".profile__add-button");
export const placeAddPopupCloseButton =
  placeAddPopup.querySelector(".popup__close-img");
export const placeAddPopupSaveButton = placeAddPopup.querySelector(
  ".popup__button-save"
);

export const placeInput = placeAddPopup.querySelector(".popup__input_type_name");
export const pictureInput = placeAddPopup.querySelector(".popup__input_type_about");
export const placeAddForm = placeAddPopup.querySelector(".popup__form_add");

export const cardTemplate = document.querySelector("#card-template").content;
export const elements = document.querySelector(".elements");

// Попап 3
export const bigPicturePopup = document.querySelector(".popup_big-picture");
export const bigPicturePopupCloseButton =
  bigPicturePopup.querySelector(".popup__close-img");

export const pictureXl = bigPicturePopup.querySelector(".popup__picture-xl");
export const pictureCaption = bigPicturePopup.querySelector(".popup__pic-caption");

///config
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};