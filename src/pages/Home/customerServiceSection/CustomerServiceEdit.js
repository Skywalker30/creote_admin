import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api.js";

function CustomerEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [initialCustomerData, setInitialCustomerData] = useState({
    title: "",
    content: "",
    imageSrc: "",
  });

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = async () => {
    try {
      const response = await api.get(
        `/api/user/customerServiceSection/${params.id}`
      );
      setInitialCustomerData(response.data);
      setLoading(false);
      myFormik.setValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const myFormik = useFormik({
    initialValues: initialCustomerData,
    validate: (values) => {
      let errors = {};

      if (!values.title) {
        errors.title = "Please enter a title";
      } else if (values.title.length < 3 || values.title.length > 20) {
        errors.title = "Title should be between 3 and 20 characters";
      }

      if (!values.content) {
        errors.content = "Please Enter a content";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/customerServiceSection/${params.id}`, values);
        setLoading(false);
        navigate("/portal/customerservice-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file);
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", "images/service_section_pic"); // Set folderName to "service_section_pic"

    try {
      const response = await api.post("/api/uploadAndStore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setInitialCustomerData((prevCustomerData) => ({
        ...prevCustomerData,
        imageSrc: response.data.filePath,
      }));
      myFormik.setFieldValue("imageSrc", response.data.filePath);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <>
      <h3>CustomerService - Id : {params.id} </h3>
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

            <div className="col-lg-6">
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
              <br />
              <img
                src={initialCustomerData.imageSrc}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <div className="col-lg-12 mt-3">
              <input
                disabled={isLoading}
                type="submit"
                value={isLoading ? "Updating..." : "Update"}
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CustomerEdit;
