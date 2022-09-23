const { moveMessagePortToContext } = require("worker_threads");

class Bot {
   
    constructor() {
        this.instance =  "L:";
        console.log("creating ", this.instance);
        this.myDynaCount = 100;
        this.oppDynaCount = 100;
        this.validMoves = ['W', 'R', 'P', 'S', 'D'];
    }
    log(...dataToLog){
         console.log(this.instance, ...dataToLog);
    }

    makeMove(gamestate) {
        let rounds = gamestate.rounds;
     
        if ( rounds.length > 0 ){
            let lastMove = rounds[rounds.length - 1];
          
            if (this.oppDynaCount > 0 && lastMove.p2 === 'D') {
                this.oppDynaCount--;
                //this.log("opponent oppDynaCount", this.oppDynaCount);
                
                if (this.oppDynaCount <= 0) {
                    this.validMoves.shift();
                    this.log("opponent dynamite gone, ", this.validMoves);
                }
            } else {
                if ( lastMove.p2 !== 'W') {
                    this.validMoves.splice(2, 0, lastMove.p2);
                }
            }
        }

        const index = Math.floor(Math.random() * this.validMoves.length);
      
        const move = this.validMoves[index]
        if (move === 'D') {
            this.myDynaCount--;
            if (this.myDynaCount == 0) {
                this.log("dynagone");
                this.validMoves.pop();
            }
        }
        //this.log("playing", move);
        return move;
    }
}

module.exports = new Bot();