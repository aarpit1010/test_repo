import React, { useState } from "react";
import studentImg from "../images/student.png";
import "./profile.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [data, setData] = useState({});

  axios
    .get("/student/profile", {
      headers: {
        "auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => console.log(error));

  return (
    <div className="profile">
      <div className="card w-50 mx-auto profile-card">
        <div className="card-body mx-auto">
          <h5 className="card-title">Name: {data.name}</h5>
          <p className="card-text">
            Email: {data.email}
            <br />
            Enrollment No.: {data.username}
            <br />
            Contact: {data.contact}
            <br />
            Semester: {data.semester}
            <br />
            Section: {data.section}
            <br />
            Branch: {data.branch}
            <br />
            <Link to="/student/email">
              <button type="button" className="btn btn-primary mt-3">
                Request for Changes
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
