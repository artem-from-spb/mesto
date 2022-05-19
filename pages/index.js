import { initialCards, profilePopup, profileEditButton, profilePopupCloseButton, profileForm, nameInput,
   jobInput, profileTitle, profileSubtitle, placeAddPopup, placeAddButton, placeAddPopupCloseButton, 
   placeAddPopupSaveButton, placeInput, pictureInput, placeAddForm, cardTemplate, elements, bigPicturePopup, 
   bigPicturePopupCloseButton, pictureXl, pictureCaption, config } from "../utils/constants.js";
import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//import './index.css';


//Попап 1
const userInfo = new UserInfo({ 
  name: '.profile__title',
  job: '.profile__subtitle' 
})

const popupWithFormProfile = new PopupWithForm('.popup_profile', (data) => {
  userInfo.setUserInfo(data);
})

popupWithFormProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const getData = userInfo.getUserInfo();
  nameInput.value = getData.name;
  jobInput.value = getData.job;

  popupWithFormProfile.open();
  validateProfilePopup.resetErrors();
})


//Попап 2
//Создание карточек
const newCard = (data) => {
  const card = new Card(data, ".card", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const createCard = new Section({
  items: initialCards,
  renderer: newCard
}, '.elements')

//Добавление в верстку
createCard.renderItems();

const popupWithFormPlaceAdd = new PopupWithForm('.popup_add', (data) => {
  createCard.setItem(newCard(data));
})

popupWithFormPlaceAdd.setEventListeners();

placeAddButton.addEventListener('click', () => {
  validatePlaceAddPopup.resetErrors();
  popupWithFormPlaceAdd.open();
})


//попап 3
const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_big-picture',
  text: '.popup__pic-caption',
  pic: '.popup__picture-xl'
})

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

popupWithImage.setEventListeners();


//Validation
const validateProfilePopup = new FormValidator(profilePopup, config);
const validatePlaceAddPopup = new FormValidator(placeAddForm, config);

validateProfilePopup.enableValidation();
validatePlaceAddPopup.enableValidation();

