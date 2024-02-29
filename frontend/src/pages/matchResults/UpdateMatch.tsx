import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMatch, upDateMatch } from "../../service/match.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMatch = () => {
    const [match, setMatch]: any = useState([]);
    const [matchData, setMatchData]: any = useState({
        homeTeam: "",
        awayTeam: "",
        homeScore: "",
        awayScore: ""
    });
   
    //Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatchData({
            ...matchData,
            [e.target.name]: e.target.value,
        });
    };

    //Get the match id from the url
    const {matchid} = useParams();

    //Get the match from the api
    useEffect(() => {
        const getMatch = async () => {
            const matchFromServer = await getSingleMatch(matchid as string);
            setMatch(matchFromServer);

            //Set the home and away teams in the state
            setMatchData({
                ...matchData,
                homeTeam: matchFromServer.homeTeam,
                awayTeam: matchFromServer.awayTeam
            });
        };

        getMatch();
    },[matchid]);

    //Handle Submit 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    //Send the prediction data to api
    const res = await upDateMatch(matchid as string, matchData, toast);

    //If prediction's successfully created
    if (res.message === "Match created successfully") {
      setMatchData({
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
        <h2 className="text-2xl font-bold text-dark">Updating Match Scores</h2>
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Match details */}
                    <div className="mb-4 d-flex align-items-center">
                      {/*Home Team */}
                      <div>
                        {match && (
                            <span className="btn btn-primary disabled">
                                {match?.homeTeam}
                            </span>
                        )}
                        <input 
                        type="number"
                        className="form-control w-1/4"
                        id="homeTeam"
                        placeholder="Enter corrrect score"
                        name="homeScore"
                        value={matchData.homeScore}
                        onChange={handleInputChange}
                        min={0} 
                        />
                      </div>
                       {/* vs */}
                       <div className="mx-4">
                        <span className="text-dark">vs</span>
                       </div>

                       {/*Awa Team*/}
                       <div>
                        {match && (
                            <span className="btn btn-primary disabled">
                            {match.awayTeam}
                        </span>
                        )}
                        <input 
                          type="text" 
                          className="form-control w-1/4"
                          id="awaTeam"
                          placeholder="Enter correct score"
                          name="awayScore"
                          value={matchData.awayScore}
                          onChange={handleInputChange}
                          min={0}
                          />
                       </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary">
                        Udate Match
                    </button>
                </form>
            </div>
        </div>

    </section>
  )
}

export default UpdateMatch;