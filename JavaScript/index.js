let higher = document.getElementById("higher");
let lower = document.getElementById("lower");
higher.disabled = true;
lower.disabled = true;
let firstCard;
let secondCard;
let deck = {};
let rounds = 0;


let getCard = document.getElementById("getCard");
let message = document.getElementById("message");
let sum = 0;
let sumMessage = (sum) => {
  message.innerText = `Du har nu ${sum} rätt irad!`;
};

let loserMessage = (sum) => {
  message.innerText = `Tyvärr du gissade fel! Du fick ${sum} rätt i rad`;
};

let equalMessage = (sum) => {
  message.innerText = `Kortet du drog var varken högre eller lägre, dra ett nytt kort du har fortfarande ${sum} rätt irad!`;
};

async function getDeck() {
  const res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await res.json();
  deck = data;
  console.log(deck);
}
getDeck();

drawACard = document.getElementById("start");
drawACard.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
  );
  const data = await res.json();
  let playCard = data.cards[0];

  if (playCard.value < 10) {
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "10") {
    playCard.value = 10;
    console.log("HÄR ÄR JAG! 10! ");
    
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "jack".toUpperCase()) {
    playCard.value = 11;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "QUEEN".toUpperCase()) {
    playCard.value = 12;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "KING".toUpperCase()) {
    playCard.value = 13;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else {
    playCard.value = 14;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  }
  firstCard = playCard.value;
  console.log("Första numret var: " + firstCard);
  drawACard.disabled = true;
  higher.disabled = false;
  lower.disabled = false;
  rounds++;
});

higher.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
  );
  const data = await res.json();
  playCard = data.cards[0];

  if (playCard.value < 10) {
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } 
  else if (playCard.value === "10") {
    playCard.value = 10;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
    console.log("HÄR ÄR JAG! 10! ")
  }
  else if (playCard.value === "jack".toUpperCase()) {
    playCard.value = 11;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "QUEEN".toUpperCase()) {
    playCard.value = 12;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "KING".toUpperCase()) {
    playCard.value = 13;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else {
    playCard.value = 14;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  }
  secondCard = playCard.value;
  console.log("firsta numret är " + firstCard);
  console.log("Andra numret är: " + secondCard);

  if (secondCard > firstCard) {
    sum += 1;

    if (sum === 3) {
      message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    }
    
    else if (sum === 5) {
      message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    } else if (sum === 10) {
      message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    } else {
      sumMessage(sum);
    }
    firstCard = secondCard;
  } else if (firstCard === secondCard) {
    equalMessage(sum);
  } else {
    loserMessage(sum);
    sum = 0;
    drawACard.disabled = false;
    higher.disabled = true;
    lower.disabled = true;
    rounds = 0;
  }
  rounds +=1;
  console.log(rounds);
});


lower.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
  );
  const data = await res.json();
  playCard = data.cards[0];
    console.log("Detta är typen " + typeof playCard.value);
  if (playCard.value < 10) {
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  }
  else if (playCard.value === "10") {
    playCard.value = 10;
    console.log("HÄR ÄR JAG! 10! ")
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } 
  
  else if (playCard.value === "jack".toUpperCase()) {
    playCard.value = 11;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "QUEEN".toUpperCase()) {
    playCard.value = 12;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "KING".toUpperCase()) {
    playCard.value = 13;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else {
    playCard.value = 14;
    getCard.children[1].innerText = "Rundor: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  }
  secondCard = playCard.value;
  console.log("firsta numret är " + firstCard);
  console.log("Andra numret är " + secondCard);

  if (secondCard < firstCard) {
    sum += 1;

    if (sum === 3) {
      message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    } else if (sum === 5) {
      message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    } else if (sum === 10) {
      message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    } else {
      sumMessage(sum);
    }
    firstCard = secondCard;
  } else if (firstCard === secondCard) {
    equalMessage(sum);
  } else {
    loserMessage(sum);
    sum = 0;
    drawACard.disabled = false;
    higher.disabled = true;
    lower.disabled = true;
    rounds = 0;
  }
  rounds +=1;
  console.log(rounds);
});

