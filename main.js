let board = document.getElementById('board');
let card = []
let boardSize;
let btnSize = document.getElementsByClassName('boardsize')

for(let i = 0; i<btnSize.length; i++) {
  btnSize[i].addEventListener('click', ()=>{
    if(i == 0) {
      boardSize = 4 * 4;
      board.style.gridTemplateColumns = '80px 80px 80px 80px'
      board.style.gridTemplateRows = '80px 80px 80px 80px'
    } else {
      boardSize = 6 * 6;
      board.style.gridTemplateColumns = '80px 80px 80px 80px 80px 80px'
      board.style.gridTemplateRows = '80px 80px 80px 80px 80px 80px'
    }
    start()
    document.getElementById('config').hidden = true;
  })
}

function start() {
  while (card.length < boardSize) {
    let rdm = Math.floor(1 + Math.random() * ((boardSize / 2)));
    if (card.includes(rdm)) {
      let counter = 0;
      for(let i = 0; i < card.length; i++) {
        if(card[i] === rdm) {
          counter++;
        }
      }
      if (counter == 1) {
        card.push(rdm);
      }
    } else {
      card.push(rdm);
    }
  }
  
  for(let i = 0; i < card.length; i++) {
    let btnCard = document.createElement('button');
    btnCard.className = card[i] + " card";
    board.appendChild(btnCard);
  }
  
  let cards = document.querySelectorAll('.card');
  let choise1 = "";
  let choise2 = "";
  
  
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', ()=> {
      if(choise1 == "") {
        choise1 = cards[i];
        choise1.disabled = true;
        choise1.textContent = choise1.className;
      } else if(choise2 == "") {
        choise2 = cards[i];
        choise2.disabled = true;
        choise2.textContent = choise2.className;
        if(choise1.className == choise2.className) {
          choise1.textContent = choise1.className;
          choise2.textContent = choise2.className;
          choise1 = "";
          choise2 = "";
          card.splice(choise1, 1)
          card.splice(choise2, 1)
          if(card.length == 0) {
            alert('WIN !')
            board.innerHTML = '';
            document.getElementById('config').hidden = false;
          }
        } else {
          setTimeout(() => {
            choise1.textContent = "";
            choise2.textContent = "";
            choise1.disabled = false;
            choise2.disabled = false;
            choise1 = "";
            choise2 = "";
          }, 1000);
        }
      } 
    });
  }
}