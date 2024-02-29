import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../service/match.service";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import AllMatches from "./AllMatches";
import LiveMatches from "./LiveMatches";

const Matches = ({btntext}: any) => {
   const [matches, setMatches] = useState([]);


    const [todayMatches, setTodayMatches] = useState(true);
    const [allMatches, setAllMatches] = useState(false);
    const [liveMatches, setLiveMatches] = useState(false);

    //Handle today's matches
    const handleTodayMatches = () => {
        setTodayMatches(true);
        setAllMatches(false);
        setLiveMatches(false);  
    };

    //Handle all matches
    const handleAllMatches = () => {
        setTodayMatches(false);
        setAllMatches(true);
        setLiveMatches(false);
    };

    const handleLiveMatches = () => {
        setTodayMatches(false);
        setAllMatches(false);
        setLiveMatches(true);
    };

    //Current date
    const CurrentDate = new Date();

    //Filter matches by date
    const filteredMatches = matches.filter((match: any) => {
        const matchDate = new Date(match.matchDate);
        const matches = matchDate.toDateString() === CurrentDate.toDateString();
        return matches;
    });

    useEffect(() => {
        getAllMatches().then((res) => {
          setMatches(res.data);  
        });
    }, []);

  return (
    <section>
      <NavLink onClick={handleTodayMatches} to={""} >
        <span className="text-xl font-bold"> Matches </span>
      </NavLink>

      <NavLink className="mx-2" to={""} onClick={handleLiveMatches}>
        <span className="text-xl font-bold"> Live Matches </span>
      </NavLink>

      
        {/*<NavLink className="mx-2" to={""} onClick={handleAllMatches}>
          <span className="text-xl font font-bold">Previous Matches</span>
        </NavLink>
  */}

        {todayMatches && (
            <>
              <h2 className="text-xl font-bold"> Today's Match</h2>
              <div className="row">
                {filteredMatches.length > 0 && 
                 filteredMatches.map((match: any) => (
                    <div className="col-md-6 mb-3" key={match._id}>
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-600">
                                {match.homeTeam} vs {match.awayTeam}
                            </p>
                        <div>
                          <p>
                            Date:
                            {format(new Date(match.matchVenue), "d MMM yyyy")}
                          </p>
                          <p>Venue: {match.matchVenue}</p>
                    </div>
                    <NavLink to={`/matches/prediction/${match._id}`}>
                      <button className="mt-4 btn btn-primary">
                        {btntext ? btntext : "Predict"}
                      </button>
                    </NavLink>
                    </div>
                    </div>
                 ))}
              </div>
            </>
        )}

        {allMatches && <AllMatches matches={matches} />}
        {liveMatches && <LiveMatches />}
    </section>
  );
};

export default Matches;