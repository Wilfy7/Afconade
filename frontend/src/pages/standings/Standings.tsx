import React from 'react'

const Standings = () => {
  return (
    <div className="mx-4">
      <h1>Standings</h1>

      {/* Table */}
      <table className="table mt-3 table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Correct Score Point</th>
            </tr>
        </thead>
      </table>
    </div>
  );
};

export default Standings;
