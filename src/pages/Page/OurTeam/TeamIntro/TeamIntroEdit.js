import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../API/api";

function TeamMemberIntroEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [initialData, setInitialData] = useState({
    imageSrc: "",
    heading: "",
    title: "",
    content: "",
    yrOfExp: 0,
    name: "",
    role: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get(`/api/user/teamintro/${params.id}`);
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
      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/teamintro/${params.id}`, values);
        setLoading(false);
        navigate("/portal/team-intro-list");
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
    formData.append("folderName", "images/OurTeam_TeamIntro_pic"); // Set folderName to "service_section_pic"

    try {
      const response = await api.post("/api/uploadAndStore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setInitialData((prevData) => ({
        ...prevData,
        imageSrc: response.data.filePath,
      }));
      myFormik.setFieldValue("imageSrc", response.data.filePath);
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
              <br />
              <img
                src={initialData.imageSrc}
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

export default TeamMemberIntroEdit;
