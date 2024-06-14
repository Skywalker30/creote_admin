import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api";

function ProjectEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const projectFileInputRef = useRef(null);
  const [initialData, setInitialData] = useState({
    logo: "",
    year: "",
    projectName: "",
    technology: "",
    description: "",
    projectLink: "",
    date: "",
    clientName: "",
    descriptionImage: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get(`/api/user/Project/${params.id}`);
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
        await api.put(`/api/user/Project/${params.id}`, values);
        setLoading(false);
        navigate("/portal/project-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "logo");
  };

  const handleProjectImageClick = () => {
    projectFileInputRef.current.click();
  };

  const handleProjectFileChange = (event) => {
    const file = event.target.files[0];
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
      return;
    }

    formData.append("folderName", folderName);

    try {
      const response = await api.post("/api/uploadAndStore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setInitialData((prevData) => ({
        ...prevData,
        [field]: response.data.filePath, // Update the correct field
      }));
      myFormik.setFieldValue(field, response.data.filePath); // Update the formik field
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <h3>DataEdit - Id : {params.id}</h3>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.projectName}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.projectLink}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.description}
              </span>
            </div>

            <div className="col-lg-12 mt-3">
              <label>Description Image</label>
              <br />
              <img
                src={initialData.descriptionImage}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleProjectImageClick("descriptionImage")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={projectFileInputRef} // For imageSrc input
                style={{ display: "none" }}
                onChange={(event) =>
                  handleProjectFileChange(event, "descriptionImage")
                } // Pass the field name
              />
            </div>

            <div className="col-lg-12 mt-3">
              <label>Choose Logo Picture</label>
              <br />
              <img
                src={initialData.logo}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleImageClick("profilePic")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleFileChange(event, "logo")} // Pass the field name
              />
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

export default ProjectEdit;
