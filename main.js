
document.addEventListener('DOMContentLoaded', () => {
    let startBtn = document.querySelector('#Start');
    let Player = document.querySelector('#User');
    let Dealer = document.querySelector('#Dealer');

    startBtn.addEventListener('Click', Game.startGame());
})

//blackjack functionality
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}



//player class
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.money = 0;
    }

    evaluateHand() {
        let currentScore = 0;
        this.hand.forEach((element) => {
            const currentValue = element[0];
            if (currentValue == 'J' || currentValue == 'Q' || currentValue == 'K') {
                currentScore += 10;


            }
            else if (currentValue == 'A') {
                currentScore += 11;
            }
            else if (currentValue != 'M') {
                if (currentValue == '1') {
                    currentScore += 10;
                }
                else {
                    currentScore += parseInt(currentValue);
                }
            }
            else {


                currentScore += 1;
            }

        })

        let hasAces = false
        let aceHasBeenAdded = false;
        this.hand.forEach((element) => {
            if (element == 'AH' || element == 'AC' || element == 'AS' || element == 'AD') hasAces = true;
        })
        if (currentScore > 21 && hasAces) {

            this.hand.forEach((element, index) => {
                if (!aceHasBeenAdded) {
                    if (element == 'AH' || element == 'AC' || element == 'AS' || element == 'AD') {
                        this.hand[index] = "M" + this.hand[index][1]
                        aceHasBeenAdded = true
                    }
                }
            })
            return this.evaluateHand();
        }
        else return currentScore;
    }

}



//game class
class Game {
    constructor(playerName) {
        this.deck = newDeck()
        this.user = new Player(playerName);
        this.userScore = 0;
        this.userMoney = 100;
        this.userBet = 0;
        this.dealer = new Player('Dealer')
        this.dealerScore = 0;
    }

    startGame() {
        this.user.hand = [];
        this.dealer.hand = [];
        this.HitDealer();
        this.HitDealer();
        let dealerHand = document.querySelector('dealerDeck');
        dealerHand = this.dealer.hand[0];
        this.Hit();
        this.Hit();
    }

    Hit() {
        this.user.hand.push(this.deck.pop());
        this.userScore = this.user.evaluateHand()
        if (this.userScore == 21) this.Blackjack();
        if (this.userScore > 21) this.Bust();
        let currentUserHand = document.querySelector('userDeck')
        currentUserHand.textContent = "User Hand:" + this.user.hand;

        let currentUserScore = document.querySelector('#currentScore')
        currentUserScore.textContent = this.userScore;

    }

    Blackjack() {
        console.log('blackjack!')
        this.userMoney += this.userBet;

    }

    HitDealer() {
        this.dealer.hand.push(this.deck.pop());
        this.dealerScore = this.dealer.evaluateHand()

    }

    Bust() {
        console.log('bust!')
        this.userMoney -= this.userBet;
        this.user.hand = [];
        this.dealer.hand = [];

    }

    Stand() {

        //dealer gameplay. very complex.
        while (this.dealerScore < 17) {
            this.HitDealer();
        }


        //compare scores, payouts
        if (this.userScore > this.dealerScore) {
            console.log("user win!")
            this.userMoney += this.userBet;
        }

    }


}


//deck
function newDeck() {





    const deckOrder = [
        '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
        '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
        '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
        '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS']
    const shuffledDeck = shuffle(deckOrder);
    return shuffledDeck;







}



const testGame = new Game('testUser');
testGame.startGame();
console.log(testGame.dealer.hand)
console.log(testGame.user.hand)








//cards

//new game

