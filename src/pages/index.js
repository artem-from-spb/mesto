import "./index.css";

import {
  profilePopup,
  profileEditButton,
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

///UserInfo
const handleUserInfo = (data) => {
  userInfo.setUserInfo(data);
};

///Promise.all (1.Загрузка информации о пользователе + 2.карточек с сервера)
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    handleUserInfo(userData);

    createCard.renderItems(cards);
  })
  .catch((err) => console.log(err));

///3. Редактирование профиля
const editPersonInfo = (data) => {
  popupWithFormProfile.renderLoading(true);
  api
    .editProfileData(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithFormProfile.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupWithFormProfile.renderLoading(false);
    });
};

const popupWithFormProfile = new PopupWithForm(
  ".popup_profile",
  editPersonInfo
);
popupWithFormProfile.setEventListeners();

//4. Добавление новой карточки
const popupWithFormPlaceAdd = new PopupWithForm(".popup_add", (data) => {
  popupWithFormPlaceAdd.renderLoading(true);
  api
    .addNewCard(data)
    .then((res) => {
      createCard.addItem(createNewCard(res));
      popupWithFormPlaceAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
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
        card.removeItem();
        popupConfirmDelete.close();
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
        about: res.about,
        avatar: res.avatar,
      });
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(false);
    });
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
  const { name, about } = userInfo.getUserInfo();
  popupWithFormProfile.setInputValues({ name, about });
  popupWithFormProfile.open();
  validateProfilePopup.resetErrors();
});

//Попап 2
//Создание карточек
const createNewCard = ({ name, link, likes, owner, _id }) => {
  const card = new Card(
    { name, link, likes, owner, _id, userId: userInfo.returnUserId() },
    "#card-template",
    ".card",
    handleCardClick,
    () => {
      popupConfirmDelete.setEventListeners();
      popupConfirmDelete.open(removeCardItem(card));
    },
    () => {
      api
        .setLike(card.returnCardId())
        .then((res) => {
          card.countLikes(res.likes.length);
          card.toggleLike();
        })
        .catch((err) => console.log(err));
    },
    () => {
      api
        .removeLike(card.returnCardId())
        .then((res) => {
          card.countLikes(res.likes.length);
          card.toggleLike();
        })
        .catch((err) => console.log(err));
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
const popupWithImage = new PopupWithImage(
  {
    popupSelector: ".popup_big-picture",
    text: ".popup__pic-caption",
    pic: ".popup__picture-xl",
  },
  ".popup__picture-xl",
  ".popup__pic-caption"
);

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
