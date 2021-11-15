let higher = document.getElementById("higher");
let lower = document.getElementById("lower");
let image = document.getElementById("image");
image.style.display = "none"
image.children[0].style.width = "10rem";
image.children[0].style.height = "6rem";
higher.disabled = true; //Sätt knappen inaktiv
lower.disabled = true;
let getCard = document.getElementById("getCard");
let message = document.getElementById("message");
let firstCard; //Deklarera första kortet
let secondCard; //Deklarera andra kortet
let deck = {}; //Skapa en tom objektlista
let rounds = 0; //Räkna antalet rundor
let sum = 0; //Räknar antalet rätt

let inRowMessage = (sum) => {
  //Funktion för att skriva ut ett meddelande
  message.innerText = `Du har nu ${sum} rätt irad!`;
  message.style.color = "lightblue";
};

let loserMessage = (sum) => {
  //Annat meddelande
  message.innerText = `Tyvärr du gissade fel! Du fick ${sum} rätt i rad`;
  message.style.color = "red";
};

let equalMessage = (sum) => {
  //Annat meddelande
  message.innerText = `Kortet du drog var varken högre eller lägre, dra ett nytt kort du har fortfarande ${sum} rätt irad!`;
};

async function getDeck() {
  const res = await fetch(
    //hämtar API
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await res.json(); //för över ett json-objekt till data
  deck = data;
}
getDeck();

drawACard = document.getElementById("start"); //Hämtar start-id
drawACard.addEventListener("click", async () => {
  //Lägger till en lyssnare där något händer när denna knapp klickas på
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
  );
  const data = await res.json();
  let playCard = data.cards[0]; //Hämtar en kortlek

  getValue(playCard); //Funktion som hämtar värdet från API:n, tittar värdet mot en statement & skriver ut värdena @rad 133

  firstCard = playCard.value; //Sätter värdet från ovanstående funktion till första spelkortet
  drawACard.disabled = true; //Knappen "draw a card" blir inaktiv
  higher.disabled = false; //Högre & Lägre knapparna blir aktiva
  lower.disabled = false;
  rounds++; //räknar antalet rundor
  image.style.display = "inline-block";
  image.children[0].setAttribute("src", "../image/smiley_neutral.png");
});

higher.addEventListener("click", async () => {
  //Nedanstående händer när användaren klickar på högre
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
  );
  const data = await res.json();
  playCard = data.cards[0]; //hämtar ett nytt kort

  getValue(playCard); // Funktion som hämtar värdet från API:n, tittar värdet mot en statement & skriver ut värdena @rad 133
  secondCard = playCard.value; //Skriver över värdet från ovan till ett andra spelkort
  
  /*Första spelkortet jämförs med andra spelkortet */
  if (secondCard > firstCard) {
    sum += 1; //Om andra kortet är högre än första, plussa en på sum;
    winsInRowMessage(sum); //Titta på hur många gånger spelaren har i rad och addera ett speciellt meddelande till det.

    firstCard = secondCard; //Om vilkoret var sant att andra kortet var större än första, skriv över andra värdet till första variabeln.
  } else if (firstCard === secondCard) {
    /*Varken högre eller lägre */
    //Check om kortens värde är lika
    equalMessage(sum);

    /*Fel alternativ*/
  } else {
    loserMessage(sum);
    sum = 0;
    drawACard.disabled = false; //Knappen "starta spelet" blir aktiv då spelaren förlorat
    higher.disabled = true; //knapparna higher/Lower blir inaktiva p.g.a ovanstående
    lower.disabled = true;
    rounds = 0; //Sätter rundor till 0
    image.children[0].setAttribute("src", "../image/sad_smiley.jpg");
  }
  rounds += 1; //Om spelaren klarade sig öka runda med 1
});

/*SAMMA SOM OVANSTÅENDE FAST MED LÄGRE KNAPP, SE OVAN FÖR MER BESKRIVANDE INFO */
lower.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
  );
  const data = await res.json();
  playCard = data.cards[0];
  getValue(playCard);

  secondCard = playCard.value;

  if (secondCard < firstCard) {
    sum += 1;
    winsInRowMessage(sum); //Titta på hur många gånger spelaren har i rad och addera ett speciellt meddelande till det.
    
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
    image.children[0].setAttribute("src", "../image/sad_smiley.jpg");
  }
  rounds += 1;
});

function getValue(playCard) {
  if (playCard.value < 10) {
    //Om kortet är under 10
    getCard.children[1].innerText = "Runda: " + rounds; //Skriv ut
    getCard.children[2].setAttribute("src", playCard.image); //skriv ut bildens värde
  } else if (playCard.value === "10") {
    //Om kortet är 10 sätt värdet till siffran 10
    playCard.value = 10;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "jack".toUpperCase()) {
    //Sätt knäckt till värdet 11
    playCard.value = 11;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "QUEEN".toUpperCase()) {
    //Sätt dam till värdet 12
    playCard.value = 12;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else if (playCard.value === "KING".toUpperCase()) {
    //Sätt kung till värdet 13
    playCard.value = 13;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  } else {
    //Sätt värdet till det kvarstående värdet "ESS" till 14
    playCard.value = 14;
    getCard.children[1].innerText = "Runda: " + rounds;
    getCard.children[2].setAttribute("src", playCard.image);
  }
}

function winsInRowMessage (sum) {
  if (sum === 3) { //Meddelande vid tre rätt i rad
    message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    image.children[0].setAttribute("src", "../image/happy_smiley.png");
  } else if (sum === 5) { //Meddelande vid fem rätt i rad
    message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    image.children[0].setAttribute("src", "../image/test_smiley.jpg");
  } else if (sum === 10) { //Meddelande vid 10 rätt i rad
    message.innerText = `Wow du är ju bra på det här, du har nu ${sum} rätt i rad`;
    image.children[0].setAttribute("src", "../image/chocked_smiley.png");
    
  } else {
    inRowMessage(sum); //Standard meddelande
  }
}