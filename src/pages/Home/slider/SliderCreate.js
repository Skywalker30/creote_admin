import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api.js";

function SliderCreate() {
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSliderImage, setSelectedSliderImage] = useState(null);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      heading: "",
      title: "",
      description: "",
      imageSrc: "",
      sliderImg: "",
      displayOnPage: false,
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
      if (!values.description) {
        errors.description = "please enter a title ";
      } else if (values.description.length < 3) {
        errors.description = "Invalid title address";
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
          "/api/user/postSlider",
          values // Pass form data as request body
        );
        console.log(response.data); // Handle response as needed
        navigate("/portal/slider-list");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Failed to create user. Please try again.");
        setLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    myFormik.setFieldValue("imageSrc", imageUrl);
    uploadImage(file, "imageSrc");
  };

  const handleSliderFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedSliderImage(imageUrl);
    myFormik.setFieldValue("sliderImg", imageUrl)
    uploadImage(file, "sliderImg");
  };


  const uploadImage = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);

    // Determine the folder name based on the field
    let folderName = "";
    if (field === "imageSrc") {
      folderName = "images/slider_profile_pic";
    } else if (field === "sliderImg") {
      folderName = "images/slider_pic";
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
            <span style={{ color: "red" }}>{myFormik.errors.content}</span>
          </div>
          <div className="col-lg-4">
            <label>Description</label>
            <input
              name="description"
              value={myFormik.values.description}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.description ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.content}</span>
          </div>

          <div className="container">
            <form onSubmit={myFormik.handleSubmit}>
              {/* Your form inputs */}
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
                {/* Error message */}
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>

              <div className="col-lg-5 mt-3">
                <label>Choose Slider Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control ${
                    myFormik.errors.sliderImg ? "is-invalid" : ""
                  }`}
                  onChange={handleSliderFileChange}
                />
                {/* Error message */}
                {selectedSliderImage && (
                  <img
                    src={selectedSliderImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                )}
              </div>
              {/* Rest of your form */}
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

export default SliderCreate;
