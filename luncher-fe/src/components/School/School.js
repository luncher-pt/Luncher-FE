import React from "react";
import "./School.css";

function School(props) {
  return (
      props.school.admin_id ? 
      ( //For the school admin session
        <div className="School">
          <p className="SchoolName">{props.school.name}</p>
              <ul>
            <li><strong>Address: </strong>{props.school.address}</li>
            <li><strong>Funds Required: </strong>{props.school.funds_required}</li>
            <li><strong>Funds Donated: </strong>{props.school.funds_donated}</li>
            <li><strong>Admin user: </strong>{props.school.admin_id}</li>
          </ul>
          <div className="SchoolActions">
            <p title="Update" className="UpdateButton" onClick={() => props.editHandler(props.school)}>Update</p>
            <p title="Delete" className="DeleteButton" onClick={() => props.deleteHandler(props.school.id)}>Delete</p>  
          </div>
        </div>    
      ) : 
      ( //For the donor session
        <div className="School">
          <p className="SchoolName">{props.school.name}</p>
          <ul>
            <li><strong>Address: </strong>{props.school.address}</li>
            <li><strong>Funds Required: </strong>{props.school.funds_required}</li>
          </ul>
        </div>    
      )
  );
}

export default School;
