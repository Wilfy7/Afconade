import React from "react";
import { useNavigate } from "react-router-dom";

const GameRules = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

  return (
    <main  className="container mt-4">
      <header className="d-flex align-items-center gap-4">
        <h1 className="text-2xl font-bold">Game Rules</h1>
      </header>
      <section className="w-100 mt-4">
        <div className="w-100 mt-4">
         <div className="bg-light p-4 rounded mb-4">
            <h5 className="font-weight-medium h5">1. Betting Deadline</h5>
            <span>
                Bets must be placed on or before 12:00 pm GMT to be considered
                valid.
            </span>
         </div>

           <div className="bg-light p-4 rounded mb-4">
             <h5 className="font-weight-medium h5">2. Scoring System:</h5>
             <span>
               Correct Score: 3 points will be rewarded for accurately predicting
               the final score of the game. 
             </span>
           </div>

           <div className="bg-light p-4 rounded mb-4">
             <h5 className="font-weight-medium h5">3. Close Call Bonus:</h5>
             <span>
               Near miss: 1 point will be awarded if the predicted score is 
               incorrect, but the actual result exceeds the predicted score.
             </span>
           </div>

           <div className="bg-light p-4 rounded mb-4">
             <h5 className="font-weight-medium h5">4. Result Updates:</h5>
             <span>
              Game administrators have the authority to update game results
              as necessary.
             </span>
           </div>

           <div className="bg-light p-4 rounded mb-4">
             <h5 className="font-weight-medium h5">5. Reward Distribution:</h5>
             <span>
               Users are required to provide their amonut to the admin for prize
               distribution to the winners of the game.
             </span>
           </div>
        </div>
      </section>

      <button onClick={handleClick} className="btn btn-primary w-100 mt-4">
        Back to the Matches
      </button>
    </main>
  );
};

export default GameRules;
