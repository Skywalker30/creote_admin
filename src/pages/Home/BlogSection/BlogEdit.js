import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api.js";

function BlogEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const proFileInputRef = useRef(null);
  const [initialData, setInitialData] = useState({
    imageSrc: "",
    name: "",
    date: "",
    imageTitle: "",
    heading: "",
    profilePic: "",
    content: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(`/api/user/blog/${params.id}`);
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

      if (!values.name) {
        errors.name = "please enter a name ";
      } else if (values.name.length < 3) {
        errors.name = "Invalid name address";
      }

      if (!values.content) {
        errors.content = "please enter a content ";
      } else if (values.content.length < 3) {
        errors.content = "Invalid content";
      }

      if (!values.imageTitle) {
        errors.imageTitle = "please enter a ImageTitle ";
      } else if (values.imageTitle.length < 3) {
        errors.imageTitle = "Invalid ImageTitle address";
      }

      if (!values.imageSrc) {
        errors.imageSrc = "Please insert an image";
      }

      if (!values.profilePic) {
        errors.profilePic = "Please insert an image";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/blog/${params.id}`, values);
        setLoading(false);
        navigate("/portal/blog-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "imageSrc");
  };

  const handleProfileImageClick = () => {
    proFileInputRef.current.click();
  };

  const handleProFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "profilePic");
  };

  const uploadImage = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);

    // Determine the folder name based on the field
    let folderName = "";
    if (field === "imageSrc") {
        folderName = "images/blog_section_pic";
      } else if (field === "profilePic") {
        folderName = "images/blog_profile_pic";
      }

    if (folderName === "") {
      console.error("Invalid field provided");
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
            <label>Date</label>
            <input
              name="date"
              value={myFormik.values.date}
              onChange={(e) => {
                myFormik.handleChange(e);
                myFormik.setFieldValue(
                  "formattedDate",
                  formatDate(e.target.value)
                );
              }}
              type="date"
              className={`form-control ${
                myFormik.errors.date ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.date}</span>
            {myFormik.values.date && !myFormik.errors.date && (
              <div>Selected Date: {formatDate(myFormik.values.date)}</div>
            )}
          </div>

          <div className="col-lg-4">
            <label>Image Title</label>
            <input
              name="imageTitle"
              value={myFormik.values.imageTitle}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.imageTitle ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.imageTitle}</span>
          </div>

          <div className="col-lg-4">
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
                onClick={() => handleImageClick("imageSrc")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef} // For imageSrc input
                style={{ display: "none" }}
                onChange={(event) => handleFileChange(event, "imageSrc")} // Pass the field name
              />
            </div>

            <div className="col-lg-12 mt-3">
              <br />
              <img
                src={initialData.profilePic}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleProfileImageClick("profilePic")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={proFileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleProFileChange(event, "profilePic")} // Pass the field name
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

export default BlogEdit;