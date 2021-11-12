
const higher = document.getElementById("higher");
const lower = document.getElementById("lower");
const getCard = document.getElementById("getCard");



let deck = {};

async function getDeck() {
        const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const data = await res.json();
        deck = data;
        console.log(deck);  
}
getDeck();

const drawACard = document.getElementById("start");

drawACard.addEventListener("click", async() => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`);
    const data = await res.json();
    let playcard = data.cards[0];

    if(playcard.value > 1 && playcard.value <= 10 ) {
    getCard.children[1].innerText = playcard.value
    getCard.children[2].setAttribute("src", playcard.image);
    
    }

    else if (playcard.value === "jack".toUpperCase()) {
        playcard.value = 11;
        getCard.children[1].innerText = playcard.value
        getCard.children[2].setAttribute("src", playcard.image);

    }

    else if (playcard.value === "QUEEN".toUpperCase()) {
        playcard.value = 12;
        getCard.children[1].innerText = playcard.value
        getCard.children[2].setAttribute("src", playcard.image);
    }

    else if (playcard.value === "KING".toUpperCase()) {
        playcard.value = 13;
        getCard.children[1].innerText = playcard.value
        getCard.children[2].setAttribute("src", playcard.image);
    }

    else {
        playcard.value = 14;
        getCard.children[1].innerText = playcard.value
        getCard.children[2].setAttribute("src", playcard.image);
        
    }
})


higher.addEventListener("click", tryHigherOrLower());

lower.addEventListener("click", tryHigherOrLower => {
    console.log(event.target);
})

function tryHigherOrLower() {
    console.log( getCard.children[1].innerText = playcard.value);
    console.log("TEEEEST");
    
}

 /* function higherOrLower() {
    
    let ison = true;
    let sum = 0;
  
    while (ison) {
      if (sum === 3) {
        window.alert(`Fan du är bra på det här, du har nu ${sum} rätt i rad`);
      }
  
      if (sum === 5) {
        window.alert(`Nu är du halvägs ${sum} rätt i rad`);
      }
  
      if (sum === 10) {
        window.alert(
          `Du är mästare på det här spelet, grattis! du vann hela skitet med ${sum} rätt i rad!`
        );
        ison = false;
      }
      window.alert(
        `Gissa om nästa nummer kommer vara högre eller lägre än ${number}`
      );
  
      if (number2 > number) {
        window.alert(
          `Du vann \n Numret var: ${number} & Du gissade på att ${number2} var högre`
        );
        sum += 1;
      } else if (number2 < number && answer === "lower") {
        window.alert(
          `Du vann \n Numret var: ${number} & Du gissade på att ${number2} var lägre`
        );
        sum += 1;
      } else if (number === number2) {
        window.alert(
          `Tyvärr du förlorade! Talen var identiska men du gissade rätt ${sum} gånger`
        );
        ison = false;
      } else {
        if (sum === 0) {
          window.alert(
            `Tyvärr du förlorade! Du gissade fel!, Du är kass, du hade ${sum} rätt`
          );
        } else {
          window.alert(
            `Tyvärr du förlorade! Du gissade fel!, men du hade iallafall ${sum} rätt`
          );
        }
        ison = false;
      }
  
      number = number2;
    }
  }
*/


