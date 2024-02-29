import React from "react";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

const AllMatches = ({ matches }: any) => {
  return (
    <>
      <h2 className="text-xl font-bold"> All Matches </h2>
      <div className="row">
         {matches.length > 0 &&
           matches.map((match: any) => (
            <div className="col-md-6 mb-3" key={match._id}>
              <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-600">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
                <div> 
                  <p>
                    Date:
                    {format(new Date(match.matchDate), "d MMM yyy")}
                  </p>
                  <p>Venue: {match.matchVenue}</p>  
                </div>
                <NavLink to={`/matches/prediction/${match._id}`}>
                  <button className="mt-4 btn btn-primary">{"Predict"}</button>
                </NavLink>
              </div>  
            </div>
           ))}
      </div>
    </>
  );
};

export default AllMatches;