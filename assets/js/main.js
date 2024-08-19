/**
 * 2C : Two of Clubs
 * 2D : Two of Diamonds
 * 2H : Two of Hearts
 * 2S : Two of spades
 */

let deck = [];
const typeCards = ['C','D','H','S'];
const specialCards = ['A','J','Q','K'];

let pointPlayer1 = 0,
    pointPlayer2 = 0

const btnNew = document.querySelector('#btnNew');
const btnStop = document.querySelector('#btnStop');
const btnAsk = document.querySelector('#btnAsk');

const divPlayer1Cards = document.querySelector('#divPlayer1Board');
const divPlayer2Cards = document.querySelector('#divPlayer2Board');

const points = document.querySelectorAll('small');

const createDeck = () => {
    for(let i=2; i<=10; i++){
        for(let typeCard of typeCards ){
            deck.push(i + typeCard);
        }
    }
    for(let typecard of typeCards){
        for(let specialCard of specialCards){
            deck.push(specialCard + typecard)
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();

const askCard = () => {
    if (deck.length === 0){
        throw("There are playing cards")
    }
    const card = deck.pop();
    return card;
}

const pointCard = (card) => {
    const point = card.substring(0, card.length - 1);
    return (isNaN(point))?
        (point === 'A') ? 11: 10
        : point * 1;
}

const turnPlayer2 = (pointMin) => {
    do {
        const card = askCard();
        pointPlayer2 = pointPlayer2 + pointCard(card);
        points[1].innerText = pointPlayer2;

        const imgCard = document.createElement('img');
        imgCard.src= `assets/cards/${ card}.png`;
        imgCard.classList.add('cards');
        divPlayer2Cards.append(imgCard);

        if (pointMin > 21){
            break;
        }
    }while((pointPlayer2 < pointMin) && (pointMin <= 21))

    setTimeout(() => {
        if (pointPlayer2 === pointMin){
            alert("Nobody wins the game")
        } else if (pointMin > 21 ){
            alert("Player2 win")
        } else if (pointPlayer2 > 21) {
            alert("Player1 win")
        }else {
            alert("Player2 win")
        }
    },100);    
}

btnAsk.addEventListener('click',() => {
    const card = askCard();

    pointPlayer1 = pointPlayer1 + pointCard(card);
    points[0].innerText = pointPlayer1;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${ card}.png`;
    imgCard.classList.add('cards');
    divPlayer1Cards.append(imgCard);

    if (pointPlayer1 > 21){
        console.warn("I'm sorry your lost!!");
        btnAsk.disabled = true;
        btnStop.disabled = true;
        turnPlayer2(pointPlayer1);         
    }else if (pointPlayer1 === 21){
        console.warn('21, great!!!');
        btnAsk.disabled = true;
        btnStop.disabled = true;
        turnPlayer2(pointPlayer1);
    }
});

btnStop.addEventListener('click',() => {
    btnAsk.disabled = true;
    btnStop.disabled = true;

    turnPlayer2(pointPlayer1);
});

btnNew.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = createDeck();

    pointPlayer1 = 0;
    pointPlayer2 = 0;

    points[0].innerText = 0;
    points[1].innerText = 0;

    divPlayer1Cards.innerHTML = '';
    divPlayer2Cards.innerHTML = '';

    btnAsk.disabled = false;
    btnStop.disabled = false;

})