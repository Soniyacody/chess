import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { Button } from "./components/Button";
import { Chess } from "chess.js";
import { ChessBoard } from "./components/ChessBoard";
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started,setStarted]=useState(false);
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          // setChess(new Chess());
          setBoard(chess.board());
          setStarted(true);
          console.log("Intiate");
          break;
        case MOVE:
          // const move = message.payload;
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move");
          break;
        case GAME_OVER:
          console.log("over");
          break;
      }
    };
  }, [socket]);
  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full ">
          <div className="col-span-4  w-full flex justify-center">
            <ChessBoard board={board} socket={socket} setBoard={setBoard} chess={chess} />
          </div>
          <div className="col-span-2 bg-slate-900 w-full flex justify-center">
            <div className="pt-8">
              {!started &&<Button
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  );
                }}>
                Play Online
              </Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
