import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api.js";
function HumanResourceEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get(`/api/user/humanresource/${params.id}`);
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

      if (!values.title) {
        errors.title = "Please enter a title";
      }

      if (!values.content) {
        errors.content = "Please enter a content";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/humanresource/${params.id}`, values);
        setLoading(false);
        navigate("/portal/humanresource-list");
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
              <label>Title</label>
              <input
                name="title"
                value={myFormik.values.title}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${
                  myFormik.errors.title ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.title}</span>
            </div>

            <div className="col-lg-4">
              <label>Content</label>
              <input
                name="content"
                value={myFormik.values.content}
                onChange={myFormik.handleChange}
                type="text"
                className={`form-control ${
                  myFormik.errors.content ? "is-invalid" : ""
                }`}
              />
              <span style={{ color: "red" }}>{myFormik.errors.content}</span>
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

export default HumanResourceEdit;