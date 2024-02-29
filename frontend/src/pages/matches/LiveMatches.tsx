import React, { useEffect, useState } from "react";
import { liveMatches } from "../../service/match.service";

const LiveMatches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        liveMatches().then((res: any) => {
            setMatches(res.data);
        });
        //Run the live matches functions for the every 10 minutes
        const interval = setInterval(() => {
            liveMatches().then((res: any) => {
                setMatches(res.data);
            })
         }, 600000);
    
    return () => clearInterval(interval);
   }, []);

  return (
    <section className="container">
      {matches.length > 0 ? (
        matches.map((match: any, index: any) => (
            <div 
            className="d-flex mt-3 mb-2 justify-content-between align-items-center"
            style={{
              backgroundColor: "#fff",
              width: "100%",
              padding: "10px"  
            }}
            key={index}
            >
                <div>
                  <h6>{match.teams.home.name}</h6>
                  <img 
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain"
                    }}
                    src={match.teams.home.logo}
                    alt=""
                  />
                </div>
                <div className="d-flex flex-column">
                  <span className="mx-3">
                    {match.goals.home} - {match.goals.away}
                  </span>
                  <span className="mx-4">
                    {match.fixtures.status.short ? (
                    <span>{match.fixture.status.elapsed}'</span>
                    ) : (
                      <span>{match.fixtures.status.long}</span>  
                    )}
                  </span>
                </div>
                <div>
                    <h6>{match.teams.away.name}</h6>
                    <img 
                    style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain"
                    }}
                    src={match.teams.away.logo}
                    alt="" 
                    />
                </div>
            </div>
        ))
      ) : (
        <p>No Live Matches</p>
      )}
    </section>

  );
};

export default LiveMatches