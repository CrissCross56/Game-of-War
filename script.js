class Card {
    constructor(suit, rank, value){
        this.suit = suit;
        this.rank = rank;
        this.val = value;
    }
}




class Deck{
    constructor(){
        this.cards = [];
        this.createDeck();
    }
    
    createDeck(){
        let suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
        let ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

        //loop thru suits
        //then loop thru the ranks
        for(let i = 0; i < suits.length; i++){
            for(let j = 0; j < ranks.length; j++){
                this.cards.push(new Card(suits[i], ranks[j], j + 1))
            }
        }

        this.shuffle();
    }

    //look up how to shuffle an array here: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    shuffle(){
        this.cards = this.cards.sort((a,b) => 0.5 - Math.random());
    }
}


class GameOfWar{
    constructor(){
   
    //have two arrays for each players hand
    this.player1Hand = [];
    this.player2Hand = [];

    //players graveyards
    this.p1Grave = [];
    this.p2Grave = [];

    //initialize
    this.initialSetup();
    
    }

    initialSetup () {
         //create deck
        //split deck between players
        let deck = new Deck();
        this.p1Hand = deck.cards.slice(0,26)
        this.p2Hand = deck.cards.slice(26,deck.cards.length)
    }
    //have each player play a card
    fight(){

        //players 'play space' -- USE THESE FOR FIGHTING AND FOR WAR
        let p1Field = [];
        let p2Field = [];

        
        //players play their cards to the field
       p1Field.unshift(this.p1Hand.shift());
       p2Field.unshift(this.p2Hand.shift());
        
        //console.log(p1Field[0].val)

       //check the cards on the field against of eachother
       //resolve the two cases
        if(p1Field[0].val > p2Field[0].val){
            //then p1 takes both cards into their grave
            this.p1Grave.unshift(p1Field.shift());
            this.p1Grave.unshift(p2Field.shift());
        }
        else if(p2Field[0].val > p1Field[0].val){
            //then p2 takes both cards to their grave
            this.p2Grave.unshift(p1Field.shift());
            this.p2Grave.unshift(p2Field.shift());
        }
        //the two cards are equal
        else{
            console.log(`the 2 cards ${p1Field[0].val} and ${p2Field[0].val}`);
            console.log(`the type of the value of the first card is ${typeof p1Field[0].val}`);
            console.log(`the type of the value of the second card is ${typeof p2Field[0].val}`);
            //this.war();
        }
       
    }
    //go to war
    war(p1Side,p2Side){
        //add another card frome ach players hand to their respective playing field
        //if the first cards on their playing fields are of the same value again, then call this method again pasing in the newly changed arrays
        //once a side wins, distribute
    }

    //winner takes all
    spoils(p1Side,p2Side){

    }
}

//const cards = new Deck();
//console.log(cards)
/*
console.log(cards.cards.slice(0,26));
console.log(cards.cards.slice(26,cards.cards.length));
*/
let testArr1 = ['r','a','c','e','c','a','r'];
let testArr2 = [];
/*
testArr2.unshift(testArr1.shift());
console.log(testArr1[0]);
console.log(testArr2[0]);
*/

//test the game so far 
let war = new GameOfWar();
war.fight() ;
console.log(war.p1Grave);
console.log(war.p2Grave);