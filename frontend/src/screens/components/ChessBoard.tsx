import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../Game";

export const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);
  return (
    <div className="w-full ">
      {board.map((row, i) => {
        return (
          <div key={i} className=" flex justify-center">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      console.log(square);
                      setTo(squareRepresentation);
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      setFrom(null);
                      chess.move({
                        from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());
                      console.log(from, " ", to);
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 == 0 ? "bg-amber-900" : "bg-amber-300"
                  }`}
                >
                  <div className="flex justify-center h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? (
                        <img
                          className="w-4"
                          src={`/${square?.color === "b"? square?.type
                              : `${square?.type?.toUpperCase()}copy`
                          }.png`}
                         
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
