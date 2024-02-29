import React, { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserGroup } from "../../service/userGroup.service";
import { ToastContainer, toast } from "react-toastify";

const Gamegroups = () => {
    const [groupData, setGroupData] = useState({
        name: "",
        league: "",
        isAdminName: ""
    });

    const navigate = useNavigate();

    //Handle the event when the user types in the input field
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setGroupData({
            ...groupData, [name]: value
        });
    };

    //Create the group btn
    const createGroup = async (e: FormEvent) => {
      e.preventDefault();
      await createUserGroup(groupData, toast, navigate);
    };

  return (
    <main>
      <ToastContainer />
      <header className="d-flex align-itmes-center gap-4">
        <h1 className="text-2xl font-bold"> Create Game Group</h1>
      </header>
      <section className="mt-4">
        <h2 className="text-xl fontsemibold">Group Detail</h2>
        <div className="mt-4">
            <div className="bg-light p-2 rounded">
                <p className="font-weight-medium fs-5">
                    1. Each group must have a unique name.
                </p>
            </div>
            <div className="bg-light p-2 rounded">
                <p className="font-weight-medium fs-5">
                    2. A group may have as many members as possible.
                </p>
            </div>
            <div className="bg-light p-2 rounded">
                <p className="font-weight-medium fs-5">
                    3. Each member must have a unique username.
                </p>
            </div>
            <div className="bg-light p-2 rounded">
                <p className="font-weight-medium fs-5">
                    4. A group must have a league assigned to it.
                </p>
            </div>
        </div>
      </section>
      <section className="mt-4">
         <h2 className="text-xl font-semibold">Create a new Group</h2>
         <form className="mt-4">
            <input 
              type="text"
              className="form-control mb-3"
              placeholder="Group Name" 
              name="name"
              value={groupData.name}
              onChange={handleInputChange}
              />
              <input 
              type="text"
              className="form-control mb-3"
              placeholder="Admin Name" 
              name="isAdminName"
              value={groupData.isAdminName}
              onChange={handleInputChange}
              />
              <input 
              type="text"
              className="form-control mb-3"
              placeholder="League Name" 
              name="league"
              value={groupData.league}
              onChange={handleInputChange}
              />
              <button
                onClick={createGroup}
                type="button"
                className="btn btn-primary"
              >
                Create Group
              </button>
         </form>
      </section>
      <NavLink to="/">
        <button type="button" className="btn btn-secondary mt-4">
            Back to Matches
        </button>
      </NavLink>
    </main>
  );
};

export default Gamegroups;
