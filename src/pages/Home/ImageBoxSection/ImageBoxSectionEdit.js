import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api.js";

function ImageBoxEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const logoFileInputRef = useRef(null);

  // Helper function to check if a URL is valid
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  // Optional: Helper function to check if a URL is a valid YouTube link
  function isValidYouTubeUrl(string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(string);
  }
  

  const [initialData, setInitialData] = useState({
    link: "",
    imageSrc: "",
    title: "",
    subTitle: "",
    content: "",
    year: "",
    percentage: "",
    percentageTitle: "",
    percentageContent: "",
    startYear: "",
    operating: "",
    logo: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(`/api/user/imageBox/${params.id}`);
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

      if (!values.link) {
        errors.link = "Please enter a video link";
      } else if (!isValidUrl(values.link)) {
        errors.link = "Please enter a valid URL";
      } else if (!isValidYouTubeUrl(values.link)) {
        // Optional: if you want to restrict to YouTube links
        errors.link = "Please enter a valid YouTube URL";
      }

      if (!values.title) {
        errors.title = "Please enter a title";
      } else if (values.title.length < 3) {
        errors.title = "title should be greater than 3 ";
      }

      if (!values.subTitle) {
        errors.subTitle = "please enter a subtitle ";
      } else if (values.subTitle.length < 3) {
        errors.subTitle = "subtitle should be greater than 3";
      }

      if (!values.content) {
        errors.content = "please enter a content ";
      } else if (values.content.length < 3) {
        errors.content = "content should be greater than 3";
      }

      if (!values.year) {
        errors.year = "Please enter a year";
      } else {
        const currentYear = new Date().getFullYear();
        const yearNumber = parseInt(values.year, 10);

        if (
          isNaN(yearNumber) ||
          yearNumber < 1900 ||
          yearNumber > currentYear
        ) {
          errors.year = `Please enter a valid year between 1900 and ${currentYear}`;
        }
      }

      if (!values.percentage && values.percentage !== 0) {
        errors.percentage = "Please enter a percentage";
      } else {
        const percentageNumber = parseFloat(values.percentage);

        if (isNaN(percentageNumber)) {
          errors.percentage = "Please enter a valid number";
        } else if (percentageNumber < 0 || percentageNumber > 100) {
          errors.percentage = "Percentage should be between 0 and 100";
        }
      }

      if (!values.percentageTitle) {
        errors.percentageTitle = "Please enter a percentagetitle";
      } else if (values.percentageTitle.length < 3) {
        errors.percentageTitle = "percentagetitle should be greater than 3 ";
      }

      if (!values.percentageContent) {
        errors.percentageContent = "please enter a content ";
      } else if (values.percentageContent.length < 3) {
        errors.percentageContent = "content should be greater than 3";
      }

      if (!values.startYear) {
        errors.startYear = "Please enter a year";
      } else {
        const currentYear = new Date().getFullYear();
        const yearNumber = parseInt(values.year, 10);

        if (
          isNaN(yearNumber) ||
          yearNumber < 1900 ||
          yearNumber > currentYear
        ) {
          errors.startYear = `Please enter a valid year between 1900 and ${currentYear}`;
        }
      }

      if (!values.operating) {
        errors.operating = "please enter a operating value ";
      } else if (values.operating.length < 3) {
        errors.operating = "operating value should be greater than 3";
      }

      if (!values.imageSrc) {
        errors.imageSrc = "Please insert an image";
      }

      if (!values.logo) {
        errors.logo = "Please insert an image";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await api.put(`/api/user/imageBox/${params.id}`, values);
        setLoading(false);
        navigate("/portal/imageBox-list");
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
    uploadImage(file, "imageSrc");
  };

  const handleLogoImageClick = () => {
    logoFileInputRef.current.click();
  };

  const handleLogoFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "logo");
  };

  const uploadImage = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);

    // Determine the folder name based on the field
    let folderName = "";
    if (field === "imageSrc") {
        folderName = "images/imageBox_pic";
      } else if (field === "logo") {
        folderName = "images/imageBox_logo_pic";
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
            <label>Link</label>
            <input
              name="link"
              value={myFormik.values.link}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.link ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.link}</span>
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
            <label>SubTitle</label>
            <input
              name="subTitle"
              value={myFormik.values.subTitle}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.subTitle ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.subTitle}</span>
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
            <label>Year</label>
            <input
              name="year"
              value={myFormik.values.year}
              onChange={myFormik.handleChange}
              type="number"
              min="1900" // Optional: Limiting the minimum year
              max={new Date().getFullYear()} // Optional: Limiting the maximum year to the current year
              className={`form-control ${
                myFormik.errors.year ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.year}</span>
          </div>

          <div className="col-lg-4">
            <label>Percentage</label>
            <input
              name="percentage"
              value={myFormik.values.percentage}
              onChange={myFormik.handleChange}
              type="number"
              min="0"
              max="100"
              step="any" // Optional: Allows decimal values
              className={`form-control ${
                myFormik.errors.percentage ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.percentage}</span>
          </div>

          <div className="col-lg-4">
            <label>Percentage Title</label>
            <input
              name="percentageTitle"
              value={myFormik.values.percentageTitle}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.percentageTitle ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.percentageTitle}</span>
          </div> 

          <div className="col-lg-4">
            <label>Percentage Content</label>
            <input
              name="percentageContent"
              value={myFormik.values.percentageContent}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.percentageContent ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.percentageContent}</span>
          </div>

          <div className="col-lg-4">
            <label>Start Year</label>
            <input
              name="startYear"
              value={myFormik.values.startYear}
              onChange={myFormik.handleChange}
              type="number"
              min="1900" // Optional: Limiting the minimum year
              max={new Date().getFullYear()} // Optional: Limiting the maximum year to the current year
              className={`form-control ${
                myFormik.errors.startYear ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.startYear}</span>
          </div>  

          <div className="col-lg-4">
            <label>Operating</label>
            <input
              name="operating"
              value={myFormik.values.operating}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.operating ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.operating}</span>
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
                src={initialData.logo}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleLogoImageClick("logo")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={logoFileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleLogoFileChange(event, "logo")} // Pass the field name
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

export default ImageBoxEdit;