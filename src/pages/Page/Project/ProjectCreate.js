import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api";

function ProjectCreate() {
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      logo: "",
      year: "",
      projectName: "",
      technology: "",
      description: "",
      projectLink: "",
      date: "",
      clientName: "",
      descriptionImage: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.projectName) {
        errors.projectName = "Please enter Project Name";
      }

      if (!values.description) {
        errors.description = "Please enter description";
      }

      if (!values.clientName) {
        errors.clientName = "Please enter Client Name";
      }

      if (!values.technology) {
        errors.technology = "Please enter technology";
      }

      if (!values.year) {
        errors.year = "Please enter year ";
      } else if (!/^\d+$/.test(values.year)) {
        errors.year = "Year must be a valid number";
      }

      if (!values.descriptionImage) {
        errors.descriptionImage = "Please insert an image";
      }

      if (!values.logo) {
        errors.logo = "Please insert an logo image";
      }

      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i" // fragment locator
      );

      if (!values.projectLink) {
        errors.projectLink = "Please enter Website Link";
      } else if (!urlPattern.test(values.projectLink)) {
        errors.projectLink = "Please enter a valid Website Link";
      }

      if (!values.date) {
        errors.date = "Please enter a date";
      } else {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Example pattern for YYYY-MM-DD format
        if (!datePattern.test(values.date)) {
          errors.date = "Please enter a valid date in the format YYYY-MM-DD";
        } else {
          const date = new Date(values.date);
          const now = new Date();
          if (isNaN(date.getTime())) {
            errors.date = "Invalid date";
          } else if (date > now) {
            errors.date = "Date cannot be in the future";
          }
        }
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await api.post("/api/user/Project", values);
        navigate("/portal/project-list");
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
    myFormik.setFieldValue("logo", imageUrl);
    uploadImage(file, "logo"); // Set imageSrc to URL
  };

  const handleProjectFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedProjectImage(imageUrl);
    myFormik.setFieldValue("descriptionImage", imageUrl);
    uploadImage(file, "descriptionImage");
  };

  const uploadImage = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);

    let folderName = "";
    if (field === "logo") {
      folderName = "images/Project_logo_pic";
    } else if (field === "descriptionImage") {
      folderName = "images/Project_pic";
    }

    if (folderName === "") {
      console.error("Invalid filed provided");
    }

    formData.append("folderName", folderName);
    try {
      const response = await api.post("/api/uploadAndStore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      myFormik.setFieldValue(field, response.data.filePath);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Project Name</label>
            <input
              name="projectName"
              value={myFormik.values.projectName}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.projectName ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.projectName}</span>
          </div>
          <div className="col-lg-6">
            <label>Years Of Project Make</label>
            <input
              name="year"
              value={myFormik.values.year}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.year ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.year}</span>
          </div>

          <div className="col-lg-6">
            <label>Project Link</label>
            <input
              name="projectLink"
              value={myFormik.values.projectLink}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.projectLink ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.projectLink}</span>
          </div>

          <div className="col-lg-6">
            <label>Client Name</label>
            <input
              name="clientName"
              value={myFormik.values.clientName}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.clientName ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.clientName}</span>
          </div>

          <div className="col-lg-6">
            <label>Date</label>
            <input
              name="date"
              value={myFormik.values.date}
              onChange={(e) => {
                myFormik.handleChange(e);
              }}
              type="date"
              className={`form-control ${
                myFormik.errors.date ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.date}</span>
            {myFormik.values.date && !myFormik.errors.date && (
              <div>Selected Date: {myFormik.values.date}</div>
            )}
          </div>

          <div className="col-lg-6">
            <label>
              Technology(add title before : and than technology and , to next
              line )
            </label>
            <textarea
              name="technology"
              value={myFormik.values.technology}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.technology ? "is-invalid" : ""
              }`}
              rows="5"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.technology}</span>
          </div>

          <div className="col-lg-6">
            <label>Project Description</label>
            <textarea
              name="description"
              value={myFormik.values.description}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.description ? "is-invalid" : ""
              }`}
              rows="5"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.description}</span>
          </div>

          <div className="container">
            <form onSubmit={myFormik.handleSubmit}>
              <div className="col-lg-5 mt-3">
                <label>Description Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control ${
                    myFormik.errors.descriptionImage ? "is-invalid" : ""
                  }`}
                  onChange={handleProjectFileChange}
                />
                {selectedProjectImage && (
                  <img
                    src={selectedProjectImage}
                    alt="Selected"
                    style={{ maxWidth: "1000%", maxHeight: "100px" }}
                  />
                )}
              </div>

              <div className="col-lg-5 mt-3">
                <label>Choose Logo Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control ${
                    myFormik.errors.logo ? "is-invalid" : ""
                  }`}
                  onChange={handleFileChange}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: "1000%", maxHeight: "100px" }}
                  />
                )}
              </div>
            </form>
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
export default ProjectCreate;
