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
    //create deck
    //split deck between players
    //have two arrays for each players hand
    let player1Hand = [];
    let player2Hand = [];

    //players graveyards
    let p1Grave = [];
    let p2Grave = [];

    //players play space -- USE THESE FOR WAR
    let p1Field = [];
    let p2Field = [];

    }

    initialSetup () {
        let deck = new Deck();
        p1Hand = deck.cards.slice(0,26)
        p2Hand = deck.cards.slice(26,deck.cards.length)
    }
    //have each player play a card
    fight(){
        //check the first card of each player agains eachother
        //play the two cards to the field
        p1Field.unshift(p1Hand.shift());
        p2Field.unshift(p2Hand.shift());
        //resolve the two cases
        
        if(p1Field[0].val > p2Field[0]){
            //then p1 takes both cards into their grave
            p1Grave.unshift(p1Field.shift());
            p1Grave.unshift(p2Field.shift());
        }
        else if(p2Field[0].val > p2Field[0].val){
            //then p2 takes both cards to their grave
            p2Grave.unshift(p1Field.shift());
            p2Grave.unshift(p2Field.shift());
        }
        //the two cards are equal
        else{
            this.war();
        }
       
    }
    //go to war
    war(){

    }
}

const cards = new Deck();
//console.log(cards)

console.log(cards.cards.slice(0,26));
console.log(cards.cards.slice(26,cards.cards.length));

let testArr1 = ['r','a','c','e','c','a','r'];
let testArr2 = [];

testArr2.unshift(testArr1.shift());
console.log(testArr1[0]);
console.log(testArr2[0]);