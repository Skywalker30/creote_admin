import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../API/api";

function TeamMembersCreate() {
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      name: "",
      role: "",
      imageSrc: "",
      displayOnPage: false,
      order: 0,
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Please enter a name";
      } else if (values.name.length < 3 || values.name.length > 20) {
        errors.name = "name should be between 3 and 20 characters";
      }

      if (!values.role) {
        errors.role = "Please select a role";
      }

      if (!values.imageSrc) {
        errors.imageSrc = "Please insert an image";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Post the form data to teamMembers endpoint
        const response = await api.post(
          "/api/creote/teamMembers",
          values // Pass form data as request body
        );
        console.log(response.data); // Handle response as needed
        navigate("/portal/teammembers-list");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Failed to create user. Please try again.");
        setLoading(false);
      }
    },
  });

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(URL.createObjectURL(file));
  //   myFormik.setFieldValue("imageSrc", file);
  // };

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
    formData.append("folderName", "images/profile_pic");

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
            <label>Name</label>
            <input
              name="name"
              value={myFormik.values.name}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.name ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.name}</span>
          </div>

          <div className="col-lg-4">
            <label>Role</label>
            <select
              name="role"
              value={myFormik.values.role}
              onChange={myFormik.handleChange}
              className={`form-control ${
                myFormik.errors.role ? "is-invalid" : ""
              }`}
            >
              <option value="">----Select----</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Hiring Resource Manage">
                Hiring Resource Manager
              </option>
              <option value="Team Lead">Team Lead</option>
              <option value="Android Developer">Android Developer</option>
            </select>
            <span style={{ color: "red" }}>{myFormik.errors.role}</span>
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

          <button
            className="btn btn-secondary"
            style={{
              position: "fixed",
              bottom: "10px",
              left: "10px",
              zIndex: "9999",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TeamMembersCreate;
