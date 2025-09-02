import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudents() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/create/", { Name, Email })
      .then((res) => {
        console.log(res);
        setSuccess(true); // Show success message
        setTimeout(() => {
          navigate("/"); // Navigate after 2 seconds
        }, 2000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>
          {success && (
            <div className="alert alert-success">
              Student added successfully!
            </div>
          )}
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              id="Email"
              name="Email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-success"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudents;
