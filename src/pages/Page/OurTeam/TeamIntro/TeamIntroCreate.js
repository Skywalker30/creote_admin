import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../API/api";

function TeamMemberIntroCreate() {
  const [isLoading, setLoading] = useState(false);
  //   const [selectedImage, setSelectedImage] = useState(null);
  //   const [selectedSliderImage, setSelectedSliderImage] = useState(null);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      heading: "",
      title: "",
      content: "",
      yrOfExp: 0,
      name: "",
      role: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.heading) {
        errors.heading = "Please enter a heading";
      } else if (values.heading.length < 3) {
        errors.heading = "heading should be greater than 3 ";
      }

      if (!values.title) {
        errors.title = "please enter a title ";
      } else if (values.title.length < 3) {
        errors.title = "Invalid title address";
      }
      if (!values.content) {
        errors.content = "please enter a content  ";
      } else if (values.content.length < 3) {
        errors.content = "Invalid title address";
      }
      if (!values.name) {
        errors.name = "please enter a content  ";
      } else if (values.name.length < 3) {
        errors.name = "Invalid title address";
      }
      if (!values.role) {
        errors.role = "please enter a title ";
      } else if (values.role.length < 3) {
        errors.role = "Invalid title address";
      }

      //   if (!values.imageSrc) {
      //     errors.imageSrc = "Please insert an image";
      //   }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Post the form data to teamMembers endpoint
        const response = await api.post(
          "/api/user/teamintro",
          values // Pass form data as request body
        );
        console.log(response.data); // Handle response as needed
        navigate("/portal/team-intro-list");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Failed to create user. Please try again.");
        setLoading(false);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={myFormik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Heading</label>
            <input
              name="heading"
              value={myFormik.values.heading}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.heading ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.heading}</span>
          </div>

          <div className="col-lg-4">
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
          <div className="col-lg-4">
            <label>Year Of Experience</label>
            <input
              name="yrOfExp"
              value={myFormik.values.yrOfExp}
              onChange={myFormik.handleChange}
              type="number"
              className={`form-control ${
                myFormik.errors.yrOfExp ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.yrOfExp}</span>
          </div>
          <div className="col-lg-4">
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
            <input
              name="role"
              value={myFormik.values.role}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.role ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.role}</span>
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

export default TeamMemberIntroCreate;