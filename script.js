class Card{
    constructor(suit, rank, value){
        this.suit = suite;
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
            for(let j = 0; i < ranks.length; j++){
                this.cards.push(new Card(suits[i], ranks[j], j + 1))
            }
        }

        this.shuffle
    }

    //look up how to shuffle an array
    shuffle(){
        this.cards = this.cards.sort((a,b) => 0.5 - Math.random());
    }
}


class GameOfWar{
    constructor(){
    //create deck
    //split deck between players
    //
    }
}

const cards = new Deck();

console.log(cards);