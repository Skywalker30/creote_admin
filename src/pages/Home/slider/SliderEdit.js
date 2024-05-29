import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api.js";

function SliderEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const sliderFileInputRef = useRef(null);
  const [initialData, setInitialData] = useState({
    heading: "",
    title: "",
    description: "",
    imageSrc: "",
    sliderImg: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get(`/api/user/slider/${params.id}`);
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
      if (!values.description) {
        errors.description = "please enter a title ";
      } else if (values.description.length < 3) {
        errors.description = "Invalid title address";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/slider/${params.id}`, values);
        setLoading(false);
        navigate("/portal/slider-list");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  // const handleImageClick = (field) => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //     setSelectedImageField(field); // Update the selected image field
  //   }
  // };

  // const handleFileChange = (event, field) => {
  //   const file = event.target.files[0];
  //   uploadImage(file, field); // Pass the selected image field
  // };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "imageSrc");
  };

  const handleSliderImageClick = () => {
    sliderFileInputRef.current.click();
  };

  const handleSliderFileChange = (event) => {
    const file = event.target.files[0];
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
      setInitialData((prevUserData) => ({
        ...prevUserData,
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
                src={initialData.sliderImg}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleSliderImageClick("sliderImg")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={sliderFileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleSliderFileChange(event, "sliderImg")} // Pass the field name
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

export default SliderEdit;