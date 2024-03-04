import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../service/match.service";
import { NavLink } from "react-router-dom";

const MatchResults = () => {
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        //Date
        const interval = setInterval(() => {
          const currentDate = new Date();
          const formattedDate = format(new Date(currentDate), "yyyy-MM-dd");
          setCurrentDate(formattedDate)
        
    }, 1000);

    const fetchedMatches = async () => {
        const res = await getAllMatches();

        if (res) {
           //filter matches
           const matchesFiltered = res.data.filter((match: any) => 
        match.matchDate.includes(currentDate) 
    );
    setFilteredMatches(matchesFiltered);
    }

    if (res) {
        setMatches(res.data);
    }
    };
    fetchedMatches();

    return () => clearInterval(interval);
}, []);

  return (
    <section>
       <NavLink to="" style={{textDecoration: "none", color: "black"}}>
          <span className="text-xl font-bold"> All Match Results</span>
       </NavLink> 
       <div className="row">
        {matches.length > 0 && 
        matches.map((match: any) => (
            <div className="col-md-6 mb-3" key={match._id}>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">Match Day</h2>
                  <div className="homeTeam d-flex justify-content-between">
                    <div>{match.homeTeam}</div>
                    <div>{match.homeScore}</div>
                  </div>  
                  <span>vs</span>
                  <div className="awayTeam mb-5 d-flex justify-content-between">
                    <div>{match.awayTeam}</div>
                    <div>{match.awayScore}</div>
                  </div>
                  <div>
                    <p>
                        Date:
                        {format(new Date(match.matchDate), "d MMMM yyyy")}
                    </p>
                    <p>Venue: {match.matcVenue}</p>
                  </div>
                  <NavLink to={`/matches/update/${match._id}`}>
                    <button className="mt-4 btn btn-primary">
                        {"Update Results"}
                    </button>
                  </NavLink>
                </div>
            </div>
        ))}
       </div>
    </section>
  )
}

export default MatchResults