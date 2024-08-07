import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api";

function ProjectCreate() {
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProjectImage, setSelectedProjectImage] = useState(null);
  // const [selectedMultipleImage, setSelectedMultipleImage] = useState([]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedTeamMemberImage1, setSelectedTeamMemberImage1] =
    useState(null);
  const [selectedTeamMemberImage2, setSelectedTeamMemberImage2] =
    useState(null);
  const [selectedTeamMemberImage3, setSelectedTeamMemberImage3] =
    useState(null);
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
      StructuredOurWorkflow: "",
      image1: "",
      imageTitle1: "",
      imageContent1: "",
      image2: "",
      imageTitle2: "",
      imageContent2: "",
      image3: "",
      imageTitle3: "",
      imageContent3: "",
      MemberName1: "",
      MemberImage1: "",
      MemberWork1: "",
      MemberName2: "",
      MemberImage2: "",
      MemberWork2: "",
      MemberName3: "",
      MemberImage3: "",
      MemberWork3: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.projectName) {
        errors.projectName = "Please enter Project Name";
      }

      if (!values.MemberName1) {
        errors.MemberName1 = "Please enter Project Member Name";
      }

      if (!values.MemberWork1) {
        errors.MemberWork1 = "Please enter Project MemberWork";
      }

      if (!values.StructuredOurWorkflow) {
        errors.StructuredOurWorkflow = "Please enter StructuredOurWorkflow";
      }

      if (!values.imageContent1) {
        errors.imageContent1 = "Please enter Image Content";
      }

      if (!values.imageTitle1) {
        errors.imageTitle1 = "Please enter Image Title";
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

      if (!values.MemberImage1) {
        errors.MemberImage1 = "Please insert an image";
      }

      if (!values.image1) {
        errors.image1 = "Please insert an image";
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
      console.log("Submitting values:", values);
      try {
        setLoading(true);
        await api.post("/api/user/Project", values);
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

  const handleImage1FileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage1(imageUrl);
    myFormik.setFieldValue("image1", imageUrl);
    uploadImage(file, "image1");
  };

  const handleImage2FileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage2(imageUrl);
    myFormik.setFieldValue("image2", imageUrl);
    uploadImage(file, "image2");
  };

  const handleImage3FileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage3(imageUrl);
    myFormik.setFieldValue("image3", imageUrl);
    uploadImage(file, "image3");
  };

  const handleTeamMemberImage1FileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedTeamMemberImage1(imageUrl);
    myFormik.setFieldValue("MemberImage1", imageUrl);
    uploadImage(file, "MemberImage1");
  };

  const handleTeamMemberImage2FileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedTeamMemberImage2(imageUrl);
    myFormik.setFieldValue("MemberImage2", imageUrl);
    uploadImage(file, "MemberImage2");
  };

  const handleTeamMemberImage3FileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedTeamMemberImage3(imageUrl);
    myFormik.setFieldValue("MemberImage3", imageUrl);
    uploadImage(file, "MemberImage3");
  };

  const uploadImage = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);

    let folderName = "";
    if (field === "logo") {
      folderName = "images/Project_logo_pic";
    } else if (field === "descriptionImage") {
      folderName = "images/Project_pic";
    } else if (field === "image1") {
      folderName = "images/Project_pic";
    } else if (field === "image2") {
      folderName = "images/Project_pic";
    } else if (field === "image3") {
      folderName = "images/Project_pic";
    } else if (field === "MemberImage1") {
      folderName = "images/profile_pic";
    } else if (field === "MemberImage2") {
      folderName = "images/profile_pic";
    } else if (field === "MemberImage3") {
      folderName = "images/profile_pic";
    }

    if (folderName === "") {
      console.error("Invalid filed provided");
    }

    formData.append("folderName", folderName);
    try {
      console.log("Uploading file:", file);
      const response = await api.post("/api/uploadAndStore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded:", response.data);
      myFormik.setFieldValue(field, response.data.filePath);
    } catch (error) {
      console.error(`Error uploading image:`, error);
      // console.log("Error Response:", error.response);
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
              rows="3"
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
              rows="2"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.description}</span>
          </div>

          {/* <div className="container"> */}
          {/* <form onSubmit={myFormik.handleSubmit}> */}
          <div className="col-lg-6 mt-3">
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

          <div className="col-lg-6 mt-3">
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

          <div className="col-lg-6 mt-3">
            <label>Choose Project Picture1</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${
                myFormik.errors.image1 ? "is-invalid" : ""
              }`}
              onChange={handleImage1FileChange}
            />
            {selectedImage1 && (
              <img
                src={selectedImage1}
                alt="Selected"
                style={{ maxWidth: "1000%", maxHeight: "100px" }}
              />
            )}
          </div>

          <div className="col-lg-6 mt-3">
            <label>Choose Project Picture2</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${
                myFormik.errors.image1 ? "is-invalid" : ""
              }`}
              onChange={handleImage2FileChange}
            />
            {selectedImage2 && (
              <img
                src={selectedImage2}
                alt="Selected"
                style={{ maxWidth: "1000%", maxHeight: "100px" }}
              />
            )}
          </div>

          <div className="col-lg-6 mt-3">
            <label>Choose Project Picture3</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${
                myFormik.errors.image1 ? "is-invalid" : ""
              }`}
              onChange={handleImage3FileChange}
            />
            {selectedImage3 && (
              <img
                src={selectedImage3}
                alt="Selected"
                style={{ maxWidth: "1000%", maxHeight: "100px" }}
              />
            )}
          </div>

          <div className="col-lg-6">
            <label>Image Title1</label>
            <input
              name="imageTitle1"
              value={myFormik.values.imageTitle1}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.imageTitle1 ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.imageTitle1}</span>
          </div>

          <div className="col-lg-6">
            <label>Project Content1</label>
            <textarea
              name="imageContent1"
              value={myFormik.values.imageContent1}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.imageContent1 ? "is-invalid" : ""
              }`}
              rows="2"
            ></textarea>
            <span style={{ color: "red" }}>
              {myFormik.errors.imageContent1}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Image Title2</label>
            <input
              name="imageTitle2"
              value={myFormik.values.imageTitle2}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.imageTitle1 ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.imageTitle1}</span>
          </div>

          <div className="col-lg-6">
            <label>Project Content2</label>
            <textarea
              name="imageContent2"
              value={myFormik.values.imageContent2}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.imageContent1 ? "is-invalid" : ""
              }`}
              rows="2"
            ></textarea>
            <span style={{ color: "red" }}>
              {myFormik.errors.imageContent1}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Image Title3</label>
            <input
              name="imageTitle3"
              value={myFormik.values.imageTitle3}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.imageTitle1 ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.imageTitle1}</span>
          </div>

          <div className="col-lg-6">
            <label>Project Content3</label>
            <textarea
              name="imageContent3"
              value={myFormik.values.imageContent3}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.imageContent1 ? "is-invalid" : ""
              }`}
              rows="2"
            ></textarea>
            <span style={{ color: "red" }}>
              {myFormik.errors.imageContent1}
            </span>
          </div>

          <div className="col-lg-6">
            <label>
              Structured Our Workflow (first add number than make this :: and
              add title and make this ::: and add Statement and for second data
              add this //n )
            </label>
            <textarea
              name="StructuredOurWorkflow"
              value={myFormik.values.StructuredOurWorkflow}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.StructuredOurWorkflow ? "is-invalid" : ""
              }`}
              rows="3"
            ></textarea>
            <span style={{ color: "red" }}>
              {myFormik.errors.StructuredOurWorkflow}
            </span>
          </div>

          <div className="col-lg-6 mt-3">
            <label>Choose TeamMember Picture 1</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${
                myFormik.errors.MemberImage1 ? "is-invalid" : ""
              }`}
              onChange={handleTeamMemberImage1FileChange}
            />
            {selectedTeamMemberImage1 && (
              <img
                src={selectedTeamMemberImage1}
                alt="Selected"
                style={{ maxWidth: "1000%", maxHeight: "100px" }}
              />
            )}
          </div>

          <div className="col-lg-6">
            <label>TeamMember Name 1</label>
            <input
              name="MemberName1"
              value={myFormik.values.MemberName1}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.MemberName1 ? "is-invalid" : ""
              }`}
            ></input>
            <span style={{ color: "red" }}>{myFormik.errors.MemberName1}</span>
          </div>

          <div className="col-lg-6">
            <label>TeamMember Work 1</label>
            <textarea
              name="MemberWork1"
              value={myFormik.values.MemberWork1}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.MemberWork1 ? "is-invalid" : ""
              }`}
              rows="2"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.MemberWork1}</span>
          </div>

          <div className="col-lg-6 mt-3">
            <label>Choose TeamMember Picture 2</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${
                myFormik.errors.MemberImage1 ? "is-invalid" : ""
              }`}
              onChange={handleTeamMemberImage2FileChange}
            />
            {selectedTeamMemberImage2 && (
              <img
                src={selectedTeamMemberImage2}
                alt="Selected"
                style={{ maxWidth: "1000%", maxHeight: "100px" }}
              />
            )}
          </div>

          <div className="col-lg-6">
            <label>TeamMember Name 2</label>
            <input
              name="MemberName2"
              value={myFormik.values.MemberName2}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.MemberName1 ? "is-invalid" : ""
              }`}
            ></input>
            <span style={{ color: "red" }}>{myFormik.errors.MemberName1}</span>
          </div>

          <div className="col-lg-6">
            <label>TeamMember Work 2</label>
            <textarea
              name="MemberWork2"
              value={myFormik.values.MemberWork2}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.MemberWork1 ? "is-invalid" : ""
              }`}
              rows="2"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.MemberWork1}</span>
          </div>

          <div className="col-lg-6 mt-3">
            <label>Choose TeamMember Picture 3</label>
            <input
              type="file"
              accept="image/*"
              className={`form-control ${
                myFormik.errors.MemberImage1 ? "is-invalid" : ""
              }`}
              onChange={handleTeamMemberImage3FileChange}
            />
            {selectedTeamMemberImage3 && (
              <img
                src={selectedTeamMemberImage3}
                alt="Selected"
                style={{ maxWidth: "1000%", maxHeight: "100px" }}
              />
            )}
          </div>

          <div className="col-lg-6">
            <label>TeamMember Name 3</label>
            <input
              name="MemberName3"
              value={myFormik.values.MemberName3}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.MemberName1 ? "is-invalid" : ""
              }`}
            ></input>
            <span style={{ color: "red" }}>{myFormik.errors.MemberName1}</span>
          </div>

          <div className="col-lg-6">
            <label>TeamMember Work 3</label>
            <textarea
              name="MemberWork3"
              value={myFormik.values.MemberWork3}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.MemberWork1 ? "is-invalid" : ""
              }`}
              rows="2"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.MemberWork1}</span>
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
