let app = document.querySelector('#app')

home()

function home(){
  app.innerHTML = `
  <h1>New Game ?</h1>
  <div class="button"><button class="choise start-btn">Yes</button><button style="cursor: not-allowed" class="choise">No</button></div>`
  document.querySelector('.start-btn').addEventListener('click',()=>{
    app.innerHTML = `
      <div class="right">
                <p>Moves<span class="move">: 0</span></p>
                <p>Time<span class="timer">: 00:00</span></p>
            </div>
            <div class="board">
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
                <div class="card">
                    <div class="back"><span class="number"></span></div>
                    <div class="front"></div>
                </div>
            </div>
            <div class="bot">
                <p class="remaining">8 Pairs remaining</p>
                <button class="stop">Stop Game</button>
            </div>`
    start()
  })
}

function start() {
  let cardNumber = [];
  let cards = document.querySelectorAll('.card');
  let cardsText = document.querySelectorAll('.number');
  let remainingP = document.querySelector('.remaining')
  let turnReturn = false;
  let choise = "";
  let move = 0;
  let inter;
  let remaining = 8;
  let min = 0;
  let sec = 0;

  inter = setInterval(() => {
    sec++;
    if (sec > 59) {
      min++;
      sec = 0;
    }
    document.querySelector('.timer').textContent = `: ${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);

  for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      if (!turnReturn && !isCardRotated(cards[i])) {
        rotateCard(cards[i]);
          move++;
          document.querySelector('.move').textContent = ": " + move;
        if (choise === "") {
          choise = i;
        } else if (areCardsEqual(cards[choise], cards[i])) {
          remaining -= 1;
          remainingP.textContent = remaining + " Pairs remaining"
          if(remaining <= 0) {
            end()
          }
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
  
  function end(){
    clearInterval(inter)
    const existingGameData = JSON.parse(localStorage.getItem("gameData")) || [];
    const newScore = {
      score: move,
      timer: [min, sec],
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    };
    existingGameData.push(newScore);
    console.log(existingGameData.length);
    existingGameData.sort((a, b) => {
      if (a.timer[0] !== b.timer[0]) {
        return a.timer[0] - b.timer[0];
      } else {
        return a.timer[1] - b.timer[1];
      }
    });
    localStorage.setItem("gameData", JSON.stringify(existingGameData));
    console.log(existingGameData);
    if(existingGameData.length > 3) {
      app.innerHTML = `
      <h1 class="congrat">Congratulation !</h1>
          <div class="stat">
              <p>Moves : <span class="moveScore">${move}</span></p>
              <p>Timer : <span class="timerScore">${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}</span></p>
          </div>
          <div class="scoreboard">
              <h2>Your best score :</h2>
              <article>
                  <iconify-icon icon="ph:trophy-bold" width="40" height="40"></iconify-icon>
                  <h3>1st</h3>
                  <h4>Timer : ${existingGameData[0].timer[0] < 10 ? "0" + existingGameData[0].timer[0] : existingGameData[0].timer[0]}:${existingGameData[0].timer[1] < 10 ? "0" + existingGameData[0].timer[1] : existingGameData[0].timer[1]}</h4>
                  <h4>Moves : ${existingGameData[0].score}</h4>
                  <h5>${existingGameData[0].date}</h5>
              </article>
              <div class="podium">
                  <article>
                      <iconify-icon icon="fluent-mdl2:medal" width="30" height="30"></iconify-icon>
                      <h3>2nd</h3>
                      <h4>Timer : ${existingGameData[1].timer[0] < 10 ? "0" + existingGameData[1].timer[0] : existingGameData[1].timer[0]}:${existingGameData[1].timer[1] < 10 ? "0" + existingGameData[1].timer[1] : existingGameData[1].timer[1]}</h4>
                      <h4>Moves : ${existingGameData[1].score}</h4>
                      <h5>${existingGameData[1].date}</h5>
                  </article>
                  <article>
                      <iconify-icon icon="ph:medal" width="30" height="30"></iconify-icon>
                      <h3>3rd</h3>
                      <h4>Timer : ${existingGameData[2].timer[0] < 10 ? "0" + existingGameData[2].timer[0] : existingGameData[2].timer[0]}:${existingGameData[2].timer[1] < 10 ? "0" + existingGameData[2].timer[1] : existingGameData[2].timer[1]}</h4>
                      <h4>Moves : ${existingGameData[2].score}</h4>
                      <h5>${existingGameData[2].date}</h5>
                  </article>
              </div>
          </div>
          <div class="bot">
              <button class="newGame">Return to home ?</button>
          </div>`
    } else {
      app.innerHTML = `
      <h1 class="congrat">Congratulation !</h1>
          <div class="stat">
              <p>Moves : <span class="moveScore">${move}</span></p>
              <p>Timer : <span class="timerScore">${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}</span></p>
          </div>
          <div class="scoreboard">
              <h2>Your best score : </h2>
                <article>Missing ${3 - existingGameData.length} games to display</article
              </div>
          </div>
          <div class="bot">
              <button class="newGame">Return to home ?</button>
          </div>`
    }
    document.querySelector('.newGame').addEventListener('click', ()=>{
      home()
    })
  }

  document.querySelector('.stop').addEventListener('click', ()=>{
    clearInterval(inter)
    home()
  })

  document.addEventListener("keypress", function(e) {
    if(e.key == " ") {
      end(move, `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`)
    }
  });
}
