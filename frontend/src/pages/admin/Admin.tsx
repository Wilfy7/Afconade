import React, { useState } from "react";
import { createUser } from "../../service/user.service";
import { ToastContainer, toast } from "react-toastify";
import MatchResults from "../matchResults/MatchResults";
import CreateMatch from "../createMatch/CreateMatch";

const Admin = () => {
    const [user, setUser] = useState({
        name:"",
        email: ""
    });

    const [selected, setSelected] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(false);
    const [matchResult, setMatchResult] = useState(false);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;

       setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const res = await createUser(user, toast);
        if (res.message === "User created successfully") {
            setUser({ name: "", email: "" });
        }
    };

    //Handle create user button 
    const handleCreateUserBtn = () => {
        setSelected(true);
        setSelectedMatch(false);
        setMatchResult(false);
    };

    //Handle create match button
    const handleCreateMatchBtn = () => {
        setSelected(false);
        setSelectedMatch(true);
        setMatchResult(false);
    };

    //Handle match result button
    const handleMatchResultBtn = () => {
        setSelected(false);
        setSelectedMatch(false);
        setMatchResult(true);
    };
    
  return (
    <section className="max-w-3xl p-4 space-y-6">
      <ToastContainer />
      <div className="d-flex align-items-center mb-4">
        <div className="">
          <button 
             onClick={handleCreateUserBtn}
             className="btn btn-primary mt-4 mx-3"
          >
            Create User
          </button>
        </div>
        <div>
            <button
              onClick={handleCreateMatchBtn}
              className="btn btn-primary mt-4"
            >
             Create Match
            </button>
        </div>
        <div>
            <button
              onClick={handleMatchResultBtn}
              className="btn btn-primary mt-4 mx-3"
            >
              Match Result
            </button>
        </div>
      </div>
      {selected && (
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="d-flex flex-column">
               <label className="text-dark" htmlFor="name">
                 Name
               </label>
               <input 
                  id="name"
                  className="form-control"
                  type="text" 
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
               />
               <button type="submit" className="btn btn-primary mt-4">
                  Create User
               </button>
              </div>
            </form>
          </div>
        </div>
      )}

       {selectedMatch && <CreateMatch />}
       {matchResult && <MatchResults />}
    </section>
  );
};

 

export default Admin;
