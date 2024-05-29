import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api";

function CustomerCreate() {
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imageSrc: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.title) {
        errors.title = "Please enter a title";
      } else if (values.title.length < 3 || values.title.length > 20) {
        errors.title = "title should be between 3 and 20 characters";
      }

      if (!values.content) {
        errors.content = "Please enter content";
      }

      if (!values.imageSrc) {
        errors.imageSrc = "Please insert an image";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await api.post(
          "/api/user/customerServiceSection",
          values
        );
        navigate("/portal/customerservice-list");
      } catch (error) {
        console.error("Error creating data:", error);
        alert("Failed to create data. Please try again.");
        setLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Create URL from file
    setSelectedImage(imageUrl); // Set selectedImage to URL
    myFormik.setFieldValue("imageSrc", imageUrl);
    uploadImage(file); // Set imageSrc to URL
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
      myFormik.setFieldValue("imageSrc", response.data.filePath);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
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

          <div className="col-lg-5 mt-3">
            <label>Choose Image</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${
                myFormik.errors.imageSrc ? "is-invalid" : ""
              }`}
              onChange={handleFileChange}
            />
            <span style={{ color: "red" }}>{myFormik.errors.imageSrc}</span>
            <br />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "1000%", maxHeight: "100px" }}
              />
            )}
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
  );
}
export default CustomerCreate;
