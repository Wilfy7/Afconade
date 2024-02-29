import React, { useEffect, useState } from "react";
import { getUserGroups } from "../../service/userGroup.service";
import { NavLink } from "react-router-dom";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  console.log(groups);

  const fetchGroups = async () => {
    const res = await getUserGroups();
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  
  return (
    <main className="container mt-4">
      <header className="d-flex align-items-center gap-4">
        <h1 className="text-2xl font-bold">Game Groups</h1>
      </header>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">All Groups</h2>
        <div className="mt-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {groups &&
            groups.map((group: any) =>(
                <div key={group._id} className="col">
                    <div className="card bg-gray-100 p-4 rounded-md">
                    <NavLink to="/group/add-member" state={{group: group}}>
                       Add a Member
                    </NavLink>
                    <div className="card-header font-medium text-lg">
                        {group?.name}
                        <br />
                        <span>
                            <strong>League:</strong> {group?.league}
                        </span>
                    </div>
                    <div className="card-body">
                        {group?.members?.map((member: any, index: any) =>(
                        <div key={index} className="mb-2">
                            {member}
                        </div>
                        ))}
                    </div>
                  </div>
                </div>
            ))}
        </div>
      </section>
      <NavLink to="/">
        <button type="button" className="btn btn-secondary mt-4">
          Back to Matches
        </button>
      </NavLink>
    </main>
  );
};

export default Groups;
