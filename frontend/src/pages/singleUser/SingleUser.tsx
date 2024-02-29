import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../service/user.service";

const SingleUser = () => {
    const [user, setUser]: any = useState([]);

    //Get the id from the params
    const { id } = useParams() as any;
    
    //Fetch the user from the database
    useEffect(() => {
      const fetchUser = async () => {
        const res = await getUser(id);
        setUser(res.data);
        };
        fetchUser();
    }, [id]);

  return (
    <main className="container mt-4">
       <header className="d-flex align-items-center justify-content-center flex-column space-x-4">
        <img 
           src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man3-512.png" 
           alt="@shadcn" 
           className="w-16 h-16 border"
           style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
            objectPosition: "center"
           }}
           />
           <h1 className="text-2xl font-bold">@{user?.user?.name}</h1>
        </header> 
        <section className="w-full">
          <h2 className="text-xl font-semibold">Scores</h2>
          <table className="table mt-4">
            <thead>
                <tr>
                   <th>Match Date</th>
                   <th>Match</th>
                   <th>Score</th>
                   <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {user?.predictions ? (
                  user.predictions.map((prediction: any) => (
                    <tr key={prediction._id}>
                      <td>{prediction?.match?.matchDate}</td>
                      <td>
                        {prediction?.match?.homeTeam} vs{""}
                        {prediction?.match?.awayTeam}
                      </td>
                      <td>
                        {prediction?.match?.homeScore !== undefined &&
                        prediction?.match?.awayScore !== undefined 
                        ? `${prediction?.match?.homeScore} - ${prediction?.match?.awayScore}`
                        : "Not played yet"}
                      </td>
                      <td>{prediction?.pointesEarned}</td>
                      </tr>
                  ))
                ) : (
                    <tr>
                        <td colSpan={4}>No predictions available</td>
                    </tr>
                )}
            </tbody>
          </table>
        </section>
    </main>
  )
}

export default SingleUser;