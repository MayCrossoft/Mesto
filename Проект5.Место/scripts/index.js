//ВАЖНОСТИ
//toggle - либо добавляет класс либо убирает. Если уже есть класс, то убирает, если класса нет, то добавляет
//доступ к тому, что написано в input поле - input.value

const cardTemplate = document.querySelector("#card-template"); //шаблон карточки
const placesList = document.querySelector(".places__list"); //место где будут карточки
////////////////  POPUP EDIT  //////////////////////////////
//попап реадактирования профиля
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");

const popupEditForm = popupEdit.querySelector(".popup__form");
const popupEditFormName = popupEditForm.querySelector(
  ".popup__input_type_name"
);
const popupEditFormJob = popupEditForm.querySelector(
  ".popup__input_type_description"
);
const popupEditSaveButton = popupEditForm.querySelector(".popup__button");

////////////////  POPUP NEW CARD  ///////////////////////////////////
//попап создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpenButton = document.querySelector(".profile__add-button");
const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close");

const popupNewCardForm = popupNewCard.querySelector(".popup__form");
const popupNewCardFormName = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupNewCardFormUrl = popupNewCard.querySelector(
  ".popup__input_type_url"
);
const popupNewCardSaveButton = popupNewCardForm.querySelector(".popup__button");

///////////////////////////////////////////////////////////////

const profileName = document.querySelector(".profile__title"); //имя профиля на сайте
const profileJob = document.querySelector(".profile__description"); //профессия на сайте

////////////////////////////////////////////////////////////////

//функция сборщик карточки
function createCard(name, link) {
  const card = cardTemplate.content.cloneNode(true); //клон скелета карточки
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  //обработка нажатия на мусорку
  deleteButton.addEventListener("click", function (event) {
    deleteCard(event);
  });

  //обработка нажатия на лайк
  likeButton.addEventListener("click", function (event) {
    likeCard(event);
  });

  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").src = link;
  return card;
}

//механика удаления карточки колбек
function deleteCard(event) {
  event.target.closest(".card").remove();
}

//механика лайка карточки колбек
function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

//показать открыть модальное окно
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

//закрыть модальное окно
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

//функция изменения данных на сайте editPopup
function sendEditForm(name, job) {
  profileName.textContent = name.value;
  profileJob.textContent = job.value;
}

//цикл выводящий стартовые карточки
for (let i = 0; i < initialCards.length; i++) {
  placesList.append(createCard(initialCards[i].name, initialCards[i].link));
}

//////////////ОБРАБОТЧИКИ СОБЫТИЙ///////////////////////

//обрабочтик отправки edit формы
popupEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  sendEditForm(popupEditFormName, popupEditFormJob);
  closePopup(popupEdit);
});

//обработчик отправки newCard формы
popupNewCardForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const card = createCard(
    popupNewCardFormName.value,
    popupNewCardFormUrl.value
  );
  placesList.prepend(card);
  closePopup(popupNewCard);
});
//обработка нажатия на крестики попапов их закрытие
popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupEdit);
});

popupNewCardCloseButton.addEventListener("click", function () {
  closePopup(popupNewCard);
});

//обработка нажатия на кнопку редактирования профиля
popupEditOpenButton.addEventListener("click", function () {
  openPopup(popupEdit);
});

popupNewCardOpenButton.addEventListener("click", function () {
  openPopup(popupNewCard);
});

//ДЗ Найти как обрабатыввать отправку форму!!
//ДЗ2 Как не перезагружать вкладку при отправке формы

// https://www.codewars.com/kata/57f222ce69e09c3630000212/train/javascript
// function well(x){
//   for (let i = 0; i < a.length; i++){
//     a[i]
//   }
// }

// a = ["good", "bad", "bad", "good", "good"]

// // тело - что искать?
// // флаги - настройки поиска
// // пример:
// // флаг g - ищет все повторения
// флаг i - не учитывает регистр
// спецсимволы - улучшение тела поиска
//   /тело/флаги

// const iceHockeyPrizes = `
//   1983. СССР, Чехословакия, Канада
//   1985. Чехословакия, Канада, СССР
//   1986. СССР, ШвССеция, Канада
//   1987. Швеция, СР, Чехословакия
//   1989. СССР, Канада, Чехословакия
//   1990. СССР, Швеция, Чехословакия
//   1991. Швеция, Канада, СССР
//   1992. Швеция, Финляндия, Чехословакия
//   1993. Россия, Швеция, Чехия
//   1994. Канада, Финляндия, Швеция
//   1995. Финляндия, Швеция, Канада
//   1996. Чехия, Канада, США
//   1997. Канада, Швеция, Чехия
//   1998. Швеция, Финляндия, Чехия
//   1999. Чехия, Финляндия, Швеция
//   2000. Чехия, Финляндия, Швеция
//   2002. Словакия, Россия, Швеция
//   2003. Канада, Швеция, Словакия
// `;

// const regex = /привет/;

// console.log(iceHockeyPrizes.match(regex));


///////////////////////////////////
//КВАНТИФИКАТОРЫ (повторения)
// + от одного до бесконечности повторений ищет любое количество символов, к которому применен (н+ нннннннннн)
// * от нуля до бесконечности потворений (астерикс)
// ? от нуля до одного
// x{n} - поиск количества копий символа x n раз привет{2} приветпривет
// {2,5} - искать диапазон повторений, то есть от 2 до 5
// {2,} - искать от 2 до бесконечности повторений
//  / - мы не найдем слеш,  а вот так \/ найдем  \?

/////////////////////////////////
