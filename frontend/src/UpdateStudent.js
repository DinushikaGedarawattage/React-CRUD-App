import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        const student = res.data.find((s) => String(s.ID) === String(id));
        if (student) {
          setName(student.Name);
          setEmail(student.Email);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, {
        Name,
        Email,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              placeholder="Enter Name"
              className="form-control"
              value={Name}
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
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
