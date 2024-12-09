import { WebSocket } from "ws";
import { INIT_GAME,MOVE } from "./messages";
import { Game } from "./Game";
export class GameManager{
    private games:Game[];
    private pendingUser:WebSocket | null;
    private users:WebSocket[];
    constructor(){
        this.games=[];
        this.pendingUser=null;
        this.users=[];
    }
    addUser(WebSocket:WebSocket){
        this.users.push(WebSocket);
        this.addHandler(WebSocket);
    }
    removerUser(WebSocket:WebSocket){
        this.users=this.users.filter(user=>user!==WebSocket);
    }
    private addHandler(WebSocket:WebSocket){
        WebSocket.on("message",(data)=>{
            const message=JSON.parse(data.toString());
            if(message.type===INIT_GAME){
               if(this.pendingUser){
                const game=new Game(this.pendingUser,WebSocket);
                this.games.push(game);
                this.pendingUser=null;
               }else{
                this.pendingUser=WebSocket;
               }
            }
            if(message.type===MOVE){
                console.log("inside  make   move");
                const game=this.games.find(game=>game.player1===WebSocket || game.player2===WebSocket);
                if(game){
                    console.log("make move");
                    game.makeMove(WebSocket,message.payload.move);
                }
            }
        })
    }
}