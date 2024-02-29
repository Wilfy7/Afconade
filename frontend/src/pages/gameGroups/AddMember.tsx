import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { addUserGroupMember } from "../../service/userGroup.service";
import { ToastContainer, toast } from "react-toastify";

const AddMember  = () => {
    const location = useLocation ();
    const groupStateData = location?.state.group;

    //Group id from the state
    const groupId = groupStateData?._id;

    const [groupData, setGroupData]: any = useState({
        name: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement
        setGroupData({ ...groupData, [name]: value });
    };

    const handleSubmit = async () => {
      //Add a user to the group
      const res = await addUserGroupMember(groupId, groupData, toast)
      console.log(res)
    }
  return (
    <div className="container">
      <ToastContainer />
      <section className="mt-4">
        <h2 className="text-xl font-semibold">
            Add Member |{" "}
            <span
            style={{
                fontSize: "1rem"
            }}
            >
              {groupData?.name}
            </span>
        </h2>
        <form className="mt-4">
            <input 
               type="text"
               className="form-control mb-3"
               placeholder="Member Name"
               name="name"
               value={groupData.name}
               onChange={handleInputChange} 
               />
               <button 
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-primary"
                  >
                    Add Member
                  </button>
        </form>
      </section>
    </div>
  );
};

export default AddMember; 
