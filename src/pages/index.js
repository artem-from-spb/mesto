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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      job: res.about,
      avatar: res.avatar,
    });
    userInfo.setUserId(res._id);
  })
  .catch((err) => {
    console.log(err);
  });

///2. Загрузка карточек с сервера
api
  .getInitialCards()
  .then((res) => {
    createCard.renderItems(res);
  })
  .catch((err) => alert(err));

///3. Редактирование профиля
const editPersonInfo = () => {
  popupWithFormProfile.renderLoading(true);
  api
    .editProfileData({
      name: nameInput.value,
      about: jobInput.value,
    })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
      popupWithFormProfile.renderLoading(false);
    })
    .catch((err) => alert(err));
  popupWithFormAvatar.close();
};

const popupWithFormProfile = new PopupWithForm(
  ".popup_profile",
  editPersonInfo
);
popupWithFormProfile.setEventListeners();

//4. Добавление новой карточки
const popupWithFormPlaceAdd = new PopupWithForm(".popup_add", (data) => {
  popupWithFormPlaceAdd.renderLoading(true);
  api.addNewCard(data).then((res) => {
    createCard.addItem(createNewCard(res));
    popupWithFormPlaceAdd.renderLoading(false, "Создать");
  });
});

popupWithFormPlaceAdd.setEventListeners();

// 7. Удаление карточки
const popupConfirmDelete = new PopupWithConfirmation(".popup_confirm");
const removeCardItem = (card) => {
  return () => {
    api
      .removeCard(card.returnCardId())
      .then((res) => {
        popupConfirmDelete.close();
        card.removeItem();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

///9. Обновление аватара пользователя
const submitEditProfile = (data) => {
  popupWithFormAvatar.renderLoading(true);
  api
    .avatarPictureNew(data.avatar)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(false);
    });
  //popupWithFormAvatar.close();
};

const popupWithFormAvatar = new PopupWithForm(
  ".popup_avatar",
  submitEditProfile
);
popupWithFormAvatar.setEventListeners();
avatarEditButton.addEventListener("click", () => {
  popupWithFormAvatar.open();
  validateAvatarpopup.resetErrors();
});

//////////////////////////

//Попап 1
const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__subtitle",
  avatar: ".profile__avatar",
});

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;

  popupWithFormProfile.open();
  validateProfilePopup.resetErrors();
});

//Попап 2
//Создание карточек
const createNewCard = ({ name, link, likes, owner, _id }) => {
  const card = new Card(
    { name, link, likes, owner, _id, userId: userInfo.returnUserId() },
    ".card",
    handleCardClick,
    () => {
      popupConfirmDelete.setEventListeners(removeCardItem(card));
      popupConfirmDelete.open();
    },
    () => {
      api.setLike(card.returnCardId()).then((res) => {
        card.countLikes(res.likes.length);
      });
    },
    () => {
      api.removeLike(card.returnCardId()).then((res) => {
        card.countLikes(res.likes.length);
      });
    }
  );

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
