import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPredictionById, updatePrediction } from "../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";

const EditPredictions = () => {
    const [match, setMatch]: any = useState(null);
    const [predictionData, setPredictionData] = useState({
        homeScore: "",
        awayScore: ""
    });
    const [predictionTime, setPredictionTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
          const currentTime = new Date().toLocaleTimeString();
          setPredictionTime(currentTime);
        }, 1000);

        //Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    //Handle input limit
    const predictionTimeLimit = "12:00:00";

    //Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPredictionData({
        ...predictionData,
        [e.target.name]: e.target.value,
      });  
    };

    //Get the match id from the url
    const { matchid } = useParams();

    //Get the match from the api
    useEffect(() => {
      const getMatch = async () => {
        const matchFromServer = await getPredictionById(matchid as string)
        setMatch(matchFromServer);

        //Set the home and away team in the state
        setPredictionData({
            ...predictionData,
        });
      };
      
      getMatch();
    }, []);

    //Handle submit
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //Send the prediction data to the api
      const res = await updatePrediction(
        predictionData,
        toast,
        matchid as string
      );

      //If the prediction was successfully created
      if(res.message === "Prediction updated successfully") {
        setPredictionData({
            homeScore: "",
            awayScore: ""
        });
      }
    };

  return (
    <section className="max-w-3xl p-4 space-y-4 mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-dark">Edit Prediction</h2>

      <div className="card">
        <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label className="form-label text-dark" htmlFor="name">
                    Name
                </label>
                <input 
                  type="text"
                  className="form-control"
                  id="name"
                  name="user"
                  placeholder={match?.data?.user.name}
                  disabled
                />
              </div>
              {/* Match details */}
              <div className="mb-4 d-flex align-items-center">
                {/* Home team */}
                <div>
                    {match && (
                      <span className="btn btn-primary disabled">
                        {match?.data?.homeTeam}
                      </span>
                    )}
                    <input 
                       type="text"
                       className="form-control w-1/4 mt-2"
                       id="homeTeam"
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
                      <span className="btn btn-primary disabled">
                        {match?.data?.awayTeam}
                      </span>
                    )}
                    <input 
                       type="text"
                       className="form-control w-1/4 mt-2"
                       id="homeTeam"
                       value={predictionData.awayScore}
                       onChange={handleInputChange}
                       min={0}
                    />
                </div>
              </div>
              <p>current Time: {predictionTime}</p>
              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={predictionTime >= predictionTimeLimit}
              >
                Update Prediction
              </button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default EditPredictions;
