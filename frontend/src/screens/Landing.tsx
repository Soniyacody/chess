import { useNavigate } from "react-router-dom";
import { Button } from "./components/Button";
export const Landing = () => {
    const navigate=useNavigate();
  return(
     <div className="pt-8 max-screen-lg  flex justify-center">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2" >
            <div className="flex justify-center">
                <img src={"/chessboard.jpeg"} alt="img" className="max-w-96" />
            </div>
            <div className="pt-16 text-white">
                <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to Chess</h1>
                <h6 className="text">Play with your friends</h6>

                </div>
                <div className="mt-4 flex justify-center">
                    <Button onClick={()=>{
                        navigate('/game')
                    }}>
                        Play Online
                    </Button>
                </div>
            </div>
        </div>

     </div>
  );
};
