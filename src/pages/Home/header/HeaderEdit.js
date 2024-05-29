import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api.js";

function HeaderEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({
    location: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get(`/api/user/header/${params.id}`);
      setInitialData(response.data);
      setLoading(false);
      myFormik.setValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const myFormik = useFormik({
    initialValues: initialData,
    validate: (values) => {
      let errors = {};

      if(!values.location) {
        errors.location = "Please enter a location";
    }else if (values.location.length < 3 || values.location.length > 20) {
    errors.location = "location should be between 3 and 20 characters";
    }

    if (!values.email) {
        errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email address";
    }
    
    if (!values.phone) {
        errors.phone = "Phone number is required";
    } else if (!/^\+\d{10}$/.test(values.phone)) {
        errors.phone = "Phone number must start with '+' and be exactly 10 digits long after that";
    }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/header/${params.id}`, values);
        setLoading(false);
        navigate("/portal/header-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <h3>DataEdit - Id : {params.id}</h3>
      <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Location</label>
              <input
                name="location"
                value={myFormik.values.location}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${
                  myFormik.errors.location ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.location}</span>
            </div>

            <div className="col-lg-4">
              <label>Email</label>
              <input
                name="email"
                value={myFormik.values.email}
                onChange={myFormik.handleChange}
                type="email"
                className={`form-control ${
                  myFormik.errors.email ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.content}</span>
            </div>

            <div className="col-lg-4">
              <label>Phone No.</label>
              <input
                name="phone"
                value={myFormik.values.phone}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${
                  myFormik.errors.phone ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.phone}</span>
            </div>

            <div className="col-lg-12 mt-3">
              <input
                disabled={isLoading}
                type="submit"
                style={{ margin: "30px" }}
                value={isLoading ? "Submitting..." : "Create"}
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default HeaderEdit;