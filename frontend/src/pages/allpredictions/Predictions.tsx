import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { getAllPredictions } from "../../service/prediction.service";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import AllPredictionsMade from "./AllPredictionsMade";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);

  //Current date
  const currentDate = new Date();

  //Time to display the predictions
  const predictionTimeLimit = "12:00:00";

  //Current time to display
  const currentTime = new Date().toLocaleTimeString();

  //Filter and sort predictions based on today's date
  const sortedPredictions = predictions
    .filter((prediction: any) => {
        const matchDate = new Date(prediction.match.matchDate);
        return matchDate.toDateString() === currentDate.toDateString();
    })
    .sort((a: any, b: any) => b.pointsEarned - a.pointsEarned);

    //Function to format the updatedAt for each prediction
    const predictedAt = (updatedAt: string) => {
      const timeAgo = formatDistanceToNow(new Date(updatedAt), {
        addSuffix: true
      });

      return timeAgo;
    };

    //Fetch the predictions from the database
    useEffect(() => {
      const fetchPredictions = async () => {
        const res = await getAllPredictions(toast);
        setPredictions(res.data);
      };
      fetchPredictions();
    }, [])
    
    const [today, setToday] = useState(true);
    const [all, setAll] = useState(false)

    const handleToday = () => {
      setToday(true);
      setAll(false);
    };

    const handleAll = () => {
      setToday(false);
      setAll(true);
    };

  return (
    <section className="container-fluid">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-3">Predictions</h1>
      <div className="mb-3">
        <button onClick={handleToday} className="btn btn-primary mt-4">
          today's
        </button>
        <button onClick={handleAll} className="btn btn-primary mt-4 mx-3">
          all predictions
        </button>
      </div>
      {
        //If there are no predictions
        currentTime < predictionTimeLimit && (
            <div className="alert alert-warning">
              <h2 className="text-xl font-bold">All Predictions are protected</h2>
              <p className="text-gray-600">
                Predictions will be displayed here at/after 12:00:00
              </p>
            </div>
        )
      }

      {today && (
        <div className="row">
          {sortedPredictions.length > 0 && 
             currentTime >= predictionTimeLimit && 
             sortedPredictions.map((prediction: any) => (
               <div key={prediction._id} className="col-md-6 mb-3">
                 <NavLink 
                   to={`/predictions/edit/${prediction._id}`}
                   className="text-decoration-none text-dark"
                   style={{ position: "absolute", top: "10px", right: "25%" }}
                >
                  Edit prediction
                 </NavLink>

                 <NavLink 
                    to={`/users/${prediction?.user?._id}`}
                    className="text-decoration-none text-dark"
                 >
                    <div className="bg-white p-4 rounde shadow">
                      {prediction.pointsEarned === 3 && (
                        <span
                          style={{
                            position: "absolute",
                            right: "10%",
                            backgroundColor: "green",
                            fontSize: "12px",
                            fontWeight: "bold",
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            textAlign: "center"
                          }}
                        >
                          WIN
                        </span>
                      )}
                      <h2 className="text-xl font-bold">
                        @{prediction?.user?.name}
                      </h2>
                      <span>
                        <p className="text-gray-600">
                            Predicted{predictedAt(prediction?.updatedAt)}
                        </p>
                      </span>
                      <div>
                        <div className="homeTeam d-flex justify-content-between">
                          <div>{prediction.homeTeam}</div>
                          <div>{prediction.homeScore}</div>
                        </div>
                        <span>vs</span>
                        <div className="awayTeam d-flex justify-content-between">
                          <div>{prediction.awayTeam}</div>
                          <div>{prediction.awayScore}</div>
                        </div>
                        <div className="awayTeam mt-3 d-flex justify-content-between">
                            <div>Points Earned </div>
                            <div
                              style={{
                                color:
                                  prediction.pointsEarned > 0 ? "green" : "red"
                              }}
                            >
                                {prediction.pointsEarned
                                   ? prediction.pointsEarned 
                                : "--"}
                            </div>
                        </div>
                      </div>
                    </div>
                 </NavLink>
               </div>
             ))}
        </div>
      )}
      {all && (
        <>
           <AllPredictionsMade />
        </>
      )}
    </section>
  );
};

export default Predictions;
