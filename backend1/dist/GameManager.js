"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(WebSocket) {
        this.users.push(WebSocket);
        this.addHandler(WebSocket);
    }
    removerUser(WebSocket) {
        this.users = this.users.filter(user => user !== WebSocket);
    }
    addHandler(WebSocket) {
        WebSocket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, WebSocket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = WebSocket;
                }
            }
            if (message.type === messages_1.MOVE) {
                console.log("inside  make   move");
                const game = this.games.find(game => game.player1 === WebSocket || game.player2 === WebSocket);
                if (game) {
                    console.log("make move");
                    game.makeMove(WebSocket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
