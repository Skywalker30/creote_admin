import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../API/api.js";

function TestimonialEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [initialData, setInitialData] = useState({
    imageSrc: "",
    name: "",
    position: "",
    content: "",
  });

  useEffect(() => {
    getTestimonial();
  }, []);

  const getTestimonial = async () => {
    try {
      const response = await api.get(
        `/api/user/testimonial/${params.id}`
      );
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

      if (!values.name) {
        errors.name = "Please enter a title";
      } else if (values.name.length < 3 || values.name.length > 20) {
        errors.name = "name should be between 3 and 20 characters";
      }

      if(!values.position) {
        errors.position = "Please enter position";
      }

      if (!values.content) {
        errors.content = "Please enter content";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/testimonial/${params.id}`, values);
        setLoading(false);
        navigate("/portal/testimonial-list");
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
    formData.append("folderName", "images/testimonial_section_pic"); // Set folderName to "service_section_pic"

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
      <h3>Testimonial - Id : {params.id} </h3>
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

            <div className="col-lg-6">
            <label>Position</label>
            <input
              name="position"
              value={myFormik.values.position}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.position ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.position}</span>
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

export default TestimonialEdit;
