let cardNumber = [];
let cards = document.querySelectorAll('.card');
let cardsText = document.querySelectorAll('.number');
let turnReturn = false;
let choise = "";
let move = 0;

genNumber();

for(let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', () => {
    if (!turnReturn && !isCardRotated(cards[i])) {
      rotateCard(cards[i]);
      setTimeout(() => {
        move++;
        document.querySelector('.move').textContent = ": " + move;
      }, 300);

      if (choise === "") {
        choise = i;
      } else if (areCardsEqual(cards[choise], cards[i]) && choise !== i) {
        choise = "";
      } else {
        turnReturn = true;
        setTimeout(() => {
          resetCardRotation(cards[choise]);
          resetCardRotation(cards[i]);
          choise = "";
          turnReturn = false;
        }, 1000);
      }
    }
  });
}

function genNumber() {
  while (cardNumber.length < 16) {
    let rdm = Math.floor(1 + Math.random() * 8);
    if (cardNumber.includes(rdm)) {
      let counter = cardNumber.filter(num => num === rdm).length;
      if (counter === 1) {
        setCardText(cardsText[cardNumber.length], rdm);
        cardNumber.push(rdm);
      }
    } else {
      setCardText(cardsText[cardNumber.length], rdm);
      cardNumber.push(rdm);
    }
  }
}

function start() {
  let min = 0;
  let sec = 0;
  let inter = setInterval(() => {
    sec++;
    if (sec > 59) {
      min++;
      sec = 0;
    }
    document.querySelector('.timer').textContent = `: ${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);
}

function isCardRotated(card) {
  return card.style.transform === "rotateY(0.5turn)";
}

function rotateCard(card) {
  card.style.transform = "rotateY(0.5turn)";
}

function areCardsEqual(card1, card2) {
  return card1.textContent === card2.textContent;
}

function resetCardRotation(card) {
  card.style.transform = "none";
}

function setCardText(cardTextElement, text) {
  cardTextElement.textContent = text;
}

start();