import React, { useState } from "react";
import { createMatch } from "../../service/match.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateMatch = () => {
    const [match, setMatch] = useState({
        homeTeam: "",
        awayTeam: "",
        matchDate: "",
        matchTime: "",
        matchVenue: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setMatch({ ...match, [name]: value });
    };

    //Handle submit function
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await createMatch(match, toast);
        if (res.message === "Match created successfully") {
            setMatch({
                homeTeam: "",
                awayTeam: "",
                matchDate: "",
                matchTime: "",
                matchVenue: ""
            });
        }
    };

  return (
    <section className="w-full max-w-3xl p-4 space-y-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Create a Match
      </h2>
      <div className="card">
        <div className="card-body">
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="mb-3">
            <label 
              htmlFor="team1"
              className="form-label text-gray-900 dark:text-gray-100"
            >
               Home Team
              </label>
              <input 
                 type="text"
                 className="form-control"
                 id="team1"
                 name="homeTeam"
                 value={match.homeTeam}
                 onChange={handleInputChange} 
              />
           </div>
           <div className="mb-3">
           <label 
              htmlFor="team2"
              className="form-label text-gray-900 dark:text-gray-100"
            >
               Away Team
              </label>
              <input 
                 type="text"
                 className="form-control"
                 id="team2"
                 name="awayTeam"
                 value={match.awayTeam}
                 onChange={handleInputChange} 
              />
           </div>
           <div className="mb-3">
           <label 
              htmlFor="date"
              className="form-label text-gray-900 dark:text-gray-100"
            >
               Match Date
              </label>
              <input 
                 type="date"
                 className="form-control"
                 id="date"
                 name="matchDate"
                 value={match.matchDate}
                 onChange={handleInputChange} 
              />
           </div>
           <div className="mb-3">
           <label 
              htmlFor="time"
              className="form-label text-gray-900 dark:text-gray-100"
            >
               Match Time
              </label>
              <input 
                 type="time"
                 className="form-control"
                 id="time"
                 name="matchTime"
                 value={match.matchTime}
                 onChange={handleInputChange} 
              />
           </div>
           <div className="mb-3">
           <label 
              htmlFor="venue"
              className="form-label text-gray-900 dark:text-gray-100"
            >
               Venue
              </label>
              <input 
                 type="text"
                 className="form-control"
                 id="venue"
                 name="matchVenue"
                 value={match.matchVenue}
                 onChange={handleInputChange} 
              />
           </div>
           <button type="submit" className="btn btn-primary">
            Create Match
           </button>
         </form>
        </div>
      </div>
    </section>
  )
}

export default CreateMatch;
