import React, { useEffect, useState } from 'react'
import { getSingleMatch } from '../../service/match.service';
import { useParams } from 'react-router-dom';
import { createPrediction } from '../../service/prediction.service';
import { ToastContainer, toast } from 'react-toastify';

const Prediction = () => {
    const [match, setMatch]: any = useState(null);
    const [predictionData, setPredictionData] = useState({
        homeTeam: "",
        awayTeam: "",
        homeScore: "",
        awayScore: "",
        user: ""
    });

    const [predictionTime, setPredictionTime] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        setPredictionTime(currentTime);
      }, 1000);

      //Cleanup the interval when the component is unmounted
      return () => clearInterval(interval)
    }, []);

    //Prediction time limit
    const predictionTimeLimit = "12:00:00";

    //Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPredictionData({
           ...predictionData,
           [e.target.name]: e.target.value, 
        });
    };

    //Get the match id from the url
    const {matchid} = useParams();

    //Get the match from the api
    useEffect(() => {
      const getMatch = async () => {
        const matchFromServer = await getSingleMatch(matchid as string)
        setMatch(matchFromServer);

        //Set the home and team in the state
        setPredictionData({
            ...predictionData,
            homeTeam: matchFromServer.homeTeam,
            awayTeam: matchFromServer.awayTeam
        });
      };

      getMatch();
    }, []);

    //Handle submit 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

        //Send the prediction data to the api
        const res = await createPrediction(
        predictionData,
        toast,
        matchid as string
    ); 

    //If the prediction's successfully created
    if (res.message === "Match created successfully") {
        setPredictionData({
            user: "",
            homeTeam: "",
            awayTeam: "",
            homeScore: "",
            awayScore: ""
        });
    }
};

  return (
    <section className="max-w-3xl p-4 space-y-4 mx-auto">
       <ToastContainer />
       <h2 className="text-2xl font-bold text-dark">Make a Prediction</h2>
       <div className="card">
         <div className="card-body">
            {match?._id === matchid && predictionTime >= predictionTimeLimit ? (
              <span 
              style={{
                position: "absolute",
                left: "80%",
                top: "-1rem",
                color: "white",
                padding: "0.5rem",
                backgroundColor: "red"
              }}
              className="text-xl font-bold"
              >
                Prediction Closed
              </span> 
            ) : ( 
              <span>
                <span
                   style={{
                     position: "absolute",
                     left: "80%",
                     top: "-1rem",
                     color: "white",
                     padding: "0.3rem",
                     backgroundColor: "green",
                     fontSize: "0.8rem",
                   }} 
                   className="text-xl font-bold"
                >
                  Prediction open
                </span>
              </span>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label className="form-label text-dark" htmlFor="name">
                    Name
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        marginLeft: "0.5rem"
                      }} 
                    >
                     * Name must be as on leadboard
                    </span>
                  </label>
                  <input 
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Please enter your name e.g. Eric"
                    name="user"
                    value={predictionData.user}
                    onChange={handleInputChange}
                   />
                </div>
                {/* Match Details */}
                <div className="mb-4 d-flex align-items-center">
                {/* Home team */}
                <div>
                  {match && (
                    <button className="btn btn-primary disabled">
                      {match?.homeTeam}
                    </button>
                  )}
                  <input 
                    type="number"
                    className="form-control w-1/4"
                    id="homeTeam"
                    placeholder="Enter your prediction"
                    name="homeScore"
                    value={predictionData.homeScore}
                    onChange={handleInputChange}
                    min={0} 
                    />  
                </div>
                {/* vs */}
                <div className="mx-4">
                   <span className="text-dark">vs</span> 
                </div>

                {/* Away team */}
                <div>
                    {match && (
                      <button className="btn btn-primary disabled">
                        {match?.awayTeam}
                      </button>
                    )}
                    <input 
                    type="number"
                    className="form-control w-1/4"
                    id="awayTeam"
                    placeholder="Enter your prediction"
                    name="awayScore"
                    value={predictionData.awayScore}
                    onChange={handleInputChange}
                    min={0} 
                    />
                </div>
                </div>
                <p>Current Time: {predictionTime}</p>
                {/* Submit button */}
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={predictionTime >= predictionTimeLimit}
                >
                  Submit Prediction
                </button>
            </form>
         </div>
       </div>
    </section>
  );
};

export default Prediction;