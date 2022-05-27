import "./index.css";

import {
  profilePopup,
  profileEditButton,
  nameInput,
  jobInput,
  placeAddButton,
  placeAddForm,
  avatarChangeForm,
  avatarEditButton,
  config,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

///////////////////////////////API
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "d9187298-bc53-4629-9e17-1bb6bde52016",
    "content-type": "application/json",
  },
});


///new Section
const createCard = new Section((item) => {
  createCard.addItem(createNewCard(item));
}, ".elements");



///1. Загрузка информации о пользователе с сервера
api.getUserInfo();


///2. Загрузка карточек с сервера
api
  .getInitialCards()
  .then((res) => {
    createCard.renderItems(res);
  })
  .catch((err) => alert(err));

  
///3. Редактирование профиля
api
  .editProfileData({
    name: "Marie Skłodowska Curie",
    about: "Physicist and Chemist",
  })
  .then((data) => {
    userInfo.setUserInfo({ name: data.name, job: data.about });
  })
  .catch((err) => alert(err));


//4. Добавление новой карточки
const popupWithFormPlaceAdd = new PopupWithForm(".popup_add", (data) => {
  api.addNewCard(data).then((res) => {
    createCard.addItem(createNewCard(res));
  });
});

popupWithFormPlaceAdd.setEventListeners();


// 5. Отображение количества лайков карточки

// 7. Удаление карточки
  const popupConfirmDelete = new PopupWithSubmit('.popup__button-save_confirm')
  const removeCardItem = (card) => {
    return () => {
      api.removeCard(card.returnCardId())
      .then((res) => {
        popupConfirmDelete.close();
        card.removeItem();
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }


///8. Постановка и снятие лайка

///9. Обновление аватара пользователя
const popupWithFormAvatar = new PopupWithForm('.popup_avatar', (data) => {});
popupWithFormAvatar.setEventListeners();
avatarEditButton.addEventListener('click', () => {
  popupWithFormAvatar.open();
  validateAvatarpopup.resetErrors();
})

//////////////////////////

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
const createNewCard = ({ name, link, myId, cardId, userId }) => {
  const card = new Card({ name, link, myId, cardId, userId }, ".card", handleCardClick, () => {
    popupConfirmDelete.setEventListeners(removeCardItem(card));
    popupConfirmDelete.open()
  });
  return card.generateCard();
};

//Добавление в верстку



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
const validateAvatarpopup = new FormValidator(avatarChangeForm, config);

validateProfilePopup.enableValidation();
validatePlaceAddPopup.enableValidation();
validateAvatarpopup.enableValidation();