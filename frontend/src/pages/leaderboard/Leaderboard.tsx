import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../service/user.service";
import { NavLink } from "react-router-dom";

const Leaderboard = () => {
  const [user, setUsers] = useState([]);

  //Get all users
  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers();

      //Sort users by Points in descending order
      const sortedUsers = res.data.sort(
        (a: any, b: any) => b.points - a.points
      );
      setUsers(sortedUsers)
    };
    getUsers();
  }, []);
  return (
    <section className="w-full max-w-3xl p-4 space-y-6">
      <h2 className="text-2xl font-bold text-dark">Leaderboard</h2>

      <div className="row">
        {user.length === 0 && <div className="ml-3">awaiting data</div> }
        {user.length > 0 && 
        user.map((user: any, index) => (
            <NavLink 
               to={`/users/${user._id}`}
               className="col-md-6 mb-2 text-decoration-none text-dark"
               key={user._id}
               >
                <div className="bg-white p-4 rounded shadow d-flex align-items-center gap-4">
                  {index === 0 && (
                    <img 
                      className="w-6 h-6"
                      src="https://i0.wp.com/thevoicenewsmagazine.com/wp-content/uploads/2022/02/afcon-trophy.webp?fit=790%2C500&ssl=1" 
                      alt="cup" 
                      style={{
                        height: "50px",
                        width: "50px",
                        position: "absolute",
                        right: "10%",
                        borderRadius: "50%"
                      }}
                      />
                  )}
                  <img 
                    alt="@user1"
                    className="w-10 h-10 rounded-full"
                    style={{
                        height: "60px"
                    }}
                    src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man3-512.png"
                  />
                  <div
                     style={{
                        marginLeft: "10px"
                     }}
                  >
                    <h3
                      className="text-lg font-bold"
                      style={{
                        marginBottom: "-1px"
                      }}
                    >
                        {user.name}
                    </h3>
                    <p 
                    style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "green"
                    }}
                    >
                      Points Earned: {user.Points}
                    </p>

                  </div>
                </div>
               </NavLink>
        ))}
      </div>
    </section>
  );
};

export default Leaderboard;