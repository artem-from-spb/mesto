import "./index.css";

import {
  initialCards,
  profilePopup,
  profileEditButton,
  nameInput,
  jobInput,
  placeAddButton,
  placeAddForm,
  config,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//Попап 1
const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__subtitle",
});

const popupWithFormProfile = new PopupWithForm(".popup_profile", (data) => {
  userInfo.setUserInfo(data);
});

popupWithFormProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;

  popupWithFormProfile.open();
  validateProfilePopup.resetErrors();
});

//Попап 2
//Создание карточек
const createNewCard = (data) => {
  const card = new Card(data, ".card", handleCardClick);
  return card.generateCard();
};

const createCard = new Section(
  {
    items: initialCards,
    renderer: (data) => createCard.setItem(createNewCard(data)),
  },
  ".elements"
);

//Добавление в верстку
createCard.renderItems();

const popupWithFormPlaceAdd = new PopupWithForm(".popup_add", (data) => {
  createCard.setItem(createNewCard(data));
});

popupWithFormPlaceAdd.setEventListeners();

placeAddButton.addEventListener("click", () => {
  validatePlaceAddPopup.resetErrors();
  validatePlaceAddPopup.disableButton();
  popupWithFormPlaceAdd.open();
});

//попап 3
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_big-picture",
  text: ".popup__pic-caption",
  pic: ".popup__picture-xl",
});

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

popupWithImage.setEventListeners();

//Validation
const validateProfilePopup = new FormValidator(profilePopup, config);
const validatePlaceAddPopup = new FormValidator(placeAddForm, config);

validateProfilePopup.enableValidation();
validatePlaceAddPopup.enableValidation();
