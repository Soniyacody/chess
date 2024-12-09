"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(WebSocket, move) {
        console.log(move);
        // if(WebSocket===this.player1 || WebSocket===this.player2){
        //     this.board.move(move);
        //     this.moves.push(move);
        //     this.checkWinner();
        // }
        console.log(this.board.moves().length);
        //validation
        if (this.moveCount % 2 === 0 && WebSocket !== this.player1) {
            console.log("Early return 1");
            return;
        }
        if (this.moveCount % 2 === 1 && WebSocket !== this.player2) {
            console.log("Early return 2");
            return;
        }
        console.log("not early return");
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        console.log("Suces   !!No error found");
        //Is it this user move
        //Is it valid move
        //update the board
        //push the move
        //check if the game is over
        if (this.board.isGameOver()) {
            //Send to both player
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            return;
        }
        if (this.moveCount % 2 === 0) {
            console.log("Sent1");
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            console.log("Sent2");
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        this.moveCount++;
        //Send the updated board to both players
    }
}
exports.Game = Game;
