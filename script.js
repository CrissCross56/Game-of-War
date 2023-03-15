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
        this.player1Hand = deck.cards.slice(0,26)
        this.player2Hand = deck.cards.slice(26,deck.cards.length)
    }
    //have each player play a card
    fight(){
        //players 'play space' -- USE THESE FOR FIGHTING AND FOR WAR
        let p1Field = [];
        let p2Field = [];
        
        //players play their cards to the field
       p1Field.unshift(this.player1Hand.shift());
       p2Field.unshift(this.player2Hand.shift());
        
       //check the cards on the field against of eachother
        //the two cards are equal
        if(p1Field[0].val === p2Field[0].val){
            console.log(`Player one plays the ${p1Field[0].rank} of ${p1Field[0].suit} and Player two plays the ${p2Field[0].rank} of ${p2Field[0].suit}`);
            //console.log(`the type of the value of the first card is ${typeof p1Field[0].val}`);
            //console.log(`the type of the value of the second card is ${typeof p2Field[0].val}`);
            this.war(p1Field,p2Field);
        }
        else{
            //resolve normally
            this.spoils(p1Field,p2Field);
        }
       
    }
    //go to war
    war(p1Field,p2Field){
        //add 3 cards from each players hand to their respective playing field
        //if the first cards on their playing fields are of the same value again, then call this method again pasing in the newly changed arrays
        //once a side wins, distribute
        // If player has enough cards
        if (this.player1Hand.length <= 3){
            console.log("Player 1 doen't have enough cards")
            console.log(`Field 1 has ${p1Field.length} cards left`);
            console.log(`Field 2 has ${p2Field.length} cards left`);

             //push whats left on the field in this event into player2's hand
             this.p2Grave.unshift(...p1Field.splice(0,p1Field.length));
             this.p2Grave.unshift(...p2Field.splice(0,p2Field.length));
             this.player2Hand.push(...this.reArm(this.p2Grave));
        } else if (this.player2Hand.length <= 3) {
            console.log("Player 2 doen't have enough cards")
            console.log(`Field 1 has ${p1Field.length} cards left`);
            console.log(`Field 2 has ${p2Field.length} cards left`);
            //push whats left on the field in this event into player1's hand
            this.p1Grave.unshift(...p2Field.splice(0,p2Field.length));
            this.p1Grave.unshift(...p1Field.splice(0,p1Field.length));
            this.player1Hand.push(...this.reArm(this.p1Grave));
            

        } else {
            console.log(`Both players go to war and play 3 cards face down, and a fourth card face up`);
            for(let i = 0; i < 4; i++){
                p1Field.unshift(this.player1Hand.shift());
                p2Field.unshift(this.player2Hand.shift());
            }
           
    
            console.log(`Player one plays their fourth card the ${p1Field[0].rank} of ${p1Field[0].suit}`);
            console.log(`Player two plays their fourth card the ${p2Field[0].rank} of ${p2Field[0].suit}`);
            //if the fourth cards are not equal to each other then call spoils
            if(p1Field[0].val !== p2Field[0].val){
                this.spoils(p1Field,p2Field);
                //console.log("---- Calling spoils after war ----")
                //console.log(p1Field,p2Field);
            }
            //other wise we go to war again
            else{
                this.war(p1Field,p2Field);
            }
        }

    }

    //have a function for checking for the winner
    surrender(){
        //return true if a player an no longer fight a war (they have less then 4 cards)
        if(this.player1Hand.length < 4 || this.player2Hand.length < 4){
            if(this.player1Hand.length < 4){
                console.log("Player 1 loses, the do not have enough cards to go to war.");
                console.log('player 2 has ' + this.player2Hand.length + " cards");
                console.log('player 1 has ' + this.player1Hand.length + " cards");

            }
            else if(this.player2Hand.length < 4){
                console.log("Player 2 loses, the do not have enough cards to go to war.");
                console.log('player 1 has ' + this.player1Hand.length + " cards");
                console.log("player 2 has " + this.player2Hand.length + " cards");

            }
            else{
                console.log('some shit is goin down AAAAAAAHHHH');
            }
        }
        else{
            return true;
        }
    }



    //shuffle and return an array
    reArm(arr){
        return arr = arr.sort((a,b) => 0.5 - Math.random());
    }

    //winner takes all
    spoils(p1Field,p2Field){
       // console.log("This p1Field is: ", p1Field)
     

        if(p1Field[0].val > p2Field[0].val){

            console.log(`player one plays ${p1Field[0].rank} of ${p1Field[0].suit}`);
            console.log(`player two plays  ${p2Field[0].rank} of ${p2Field[0].suit}`);

            //then p1 takes all 

            this.p1Grave.unshift(...p2Field.splice(0,p2Field.length));
            this.p1Grave.unshift(...p1Field.splice(0,p1Field.length));

            console.log(`P1 wins this bout. They took ${this.p1Grave.length} cards`);

            //shuffle the grave and move it all into the bottom of the players hand
            this.player1Hand.push(...this.reArm(this.p1Grave));
            
            //PUSH DOES NOT DELETE THE ITEMS FRMO AN ARRAY THAT ARE BEING PUSHED
            this.p1Grave.length = 0;

        }
        else if(p2Field[0].val > p1Field[0].val){

            console.log(`player one plays ${p1Field[0].rank} of ${p1Field[0].suit}`);
            console.log(`player two plays  ${p2Field[0].rank} of ${p2Field[0].suit}`);

            //p2 takes all
            
            this.p2Grave.unshift(...p1Field.splice(0,p1Field.length));
            this.p2Grave.unshift(...p2Field.splice(0,p2Field.length));

            console.log(`P2 wins this bout. They took ${this.p2Grave.length} cards`);

            //move the graveyard into the hand after shuffling them
            this.player2Hand.push(...this.reArm(this.p2Grave))
            //PUSH DOES NOT DELETE THE ITEMS FRMO AN ARRAY THAT ARE BEING PUSHED
            this.p2Grave.length = 0;

        }
        
    }
}

//const cards = new Deck();
//console.log(cards)
/*
console.log(cards.cards.slice(0,26));
console.log(cards.cards.slice(26,cards.cards.length));

let testArr1 = ['r','a','c','e','c','a','r'];
let testArr2 = [];

testArr2.unshift(testArr1.shift());
console.log(testArr1[0]);
console.log(testArr2[0]);
*/

//test the game so far 
let war = new GameOfWar();
//console.log(war.p1Grave);
//console.log(war.p2Grave);


//create a game loop that only breaks when conditions are satisfied

    while(true){
        war.fight();
        if(war.player1Hand.length < 4 || war.player2Hand.length < 4){
            
            break;
        }
    }




war.surrender();