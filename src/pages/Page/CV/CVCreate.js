import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api";

function CVCreate() {
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      imageSrc: "",
      yrOfExp: "",
      name: "",
      companyJoiningDate: "",
      companyCurrentDate: "",
      companyName: "",
      introduction: "",
      collegeName: "",
      startYearCollege: "",
      passingYearCollege: "",
      degree: "",
      collegePercentage: "",
      contract: "",
      strength: "",
      TimeZone: "",
      ClientVisit: "",
      MigrationVisit: "",
      developer: "",
      language: "",
      Communication: "",
      Point: "",
      title: "",
      position: "",
      keyPoint: "",
      technology: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Please enter name";
      }

      if (!values.developer) {
        errors.developer = "Please enter developer";
      }

      if (!values.language) {
        errors.language = "Please enter language";
      }

      if (!values.Communication) {
        errors.Communication = "Please enter Communication";
      }

      if (!values.Point) {
        errors.Point = "Please enter Point";
      }

      if (!values.title) {
        errors.title = "Please enter title";
      }

      if (!values.position) {
        errors.position = "Please enter position";
      }

      if (!values.keyPoint) {
        errors.keyPoint = "Please enter keyPoint";
      }

      if (!values.technology) {
        errors.technology = "Please enter technology";
      }

      if (!values.strength) {
        errors.strength = "Please enter strength";
      }

      if (!values.TimeZone) {
        errors.TimeZone = "Please enter Time Zone";
      }

      if (!values.ClientVisit) {
        errors.ClientVisit = "Please enter Client Visit";
      }

      if (!values.MigrationVisit) {
        errors.MigrationVisit = "Please enter MigrationVisit";
      }

      if (!values.companyName) {
        errors.companyName = "Please enter company Name";
      }

      if (!values.introduction) {
        errors.introduction = "Please enter introduction";
      }

      if (!values.collegeName) {
        errors.collegeName = "Please enter college Name";
      }

      if (!values.degree) {
        errors.degree = "Please enter Degree";
      }

      if (!values.contract) {
        errors.contract = "Please enter contract";
      }

      if (!values.yrOfExp) {
        errors.yrOfExp = "Please enter year of experience";
      } else if (!/^\d+$/.test(values.yrOfExp)) {
        errors.yrOfExp = "Year of experience must be a valid number";
      }

      if (!values.companyJoiningDate) {
        errors.companyJoiningDate = "Please enter company joining date";
      } else if (
        !/^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/.test(
          values.companyJoiningDate
        )
      ) {
        errors.companyJoiningDate =
          "Company joining date must be in the format 'Month Year' (e.g., April 2018)";
      }

      if (!values.companyCurrentDate) {
        errors.companyCurrentDate = "Please enter company current date";
      } else if (
        values.companyCurrentDate !== "Current" &&
        !/^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/.test(
          values.companyCurrentDate
        )
      ) {
        errors.companyCurrentDate =
          "Company current date must be 'Current' or in the format 'Month Year' (e.g., April 2018)";
      }

      if (!values.startYearCollege) {
        errors.startYearCollege = "Please enter start year of college";
      } else if (!/^\d{4}$/.test(values.startYearCollege)) {
        errors.startYearCollege =
          "Start year of college must be a valid year (e.g., 2018)";
      }

      if (!values.passingYearCollege) {
        errors.passingYearCollege = "Please enter Passing year of college";
      } else if (!/^\d{4}$/.test(values.passingYearCollege)) {
        errors.passingYearCollege =
          "Passing year of college must be a valid year (e.g., 2018)";
      }

      if (!values.collegePercentage) {
        errors.collegePercentage = "Please enter college percentage";
      } else if (
        !/^(\d{1,2}(\.\d{1,2})?|100(\.0{1,2})?)$/.test(values.collegePercentage)
      ) {
        errors.collegePercentage =
          "College percentage must be a valid percentage (e.g., 85.5 or 90)";
      }

      if (!values.imageSrc) {
        errors.imageSrc = "Please insert an image";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await api.post("/api/user/CV", values);
        navigate("/portal/cv-list");
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
    myFormik.setFieldValue("imageSrc", imageUrl);
    uploadImage(file); // Set imageSrc to URL
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderName", "images/CV_pic"); // Set folderName to "service_section_pic"

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
          <div className="col-lg-6">
            <label>Company Name</label>
            <input
              name="companyName"
              value={myFormik.values.companyName}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.companyName ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.companyName}</span>
          </div>
          <div className="col-lg-6">
            <label>Years Of Experience</label>
            <input
              name="yrOfExp"
              value={myFormik.values.yrOfExp}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.yrOfExp ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.yrOfExp}</span>
          </div>
          <div className="col-lg-6">
            <label>Company Joining Date</label>
            <input
              name="companyJoiningDate"
              value={myFormik.values.companyJoiningDate}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.companyJoiningDate ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {myFormik.errors.companyJoiningDate}
            </span>
          </div>
          <div className="col-lg-6">
            <label>Company Current Date</label>
            <input
              name="companyCurrentDate"
              value={myFormik.values.companyCurrentDate}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.companyCurrentDate ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {myFormik.errors.companyCurrentDate}
            </span>
          </div>
          <div className="col-lg-6">
            <label>Introduction</label>
            <input
              name="introduction"
              value={myFormik.values.introduction}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.introduction ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.introduction}</span>
          </div>
          <div className="col-lg-6">
            <label>College Name</label>
            <input
              name="collegeName"
              value={myFormik.values.collegeName}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.collegeName ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.collegeName}</span>
          </div>
          <div className="col-lg-6">
            <label>Degree</label>
            <input
              name="degree"
              value={myFormik.values.degree}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.degree ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.degree}</span>
          </div>
          <div className="col-lg-6">
            <label>Start Year College</label>
            <input
              name="startYearCollege"
              value={myFormik.values.startYearCollege}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.startYearCollege ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {myFormik.errors.startYearCollege}
            </span>
          </div>
          <div className="col-lg-6">
            <label>Passing Year College</label>
            <input
              name="passingYearCollege"
              value={myFormik.values.passingYearCollege}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.passingYearCollege ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {myFormik.errors.passingYearCollege}
            </span>
          </div>
          <div className="col-lg-6">
            <label>College Percenatage</label>
            <input
              name="collegePercentage"
              value={myFormik.values.collegePercentage}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.collegePercentage ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {myFormik.errors.collegePercentage}
            </span>
          </div>
          <div className="col-lg-6">
            <label>Contract</label>
            <input
              name="contract"
              value={myFormik.values.contract}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.contract ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.contract}</span>
          </div>
          <div className="col-lg-6">
            <label>Strength</label>
            <input
              name="strength"
              value={myFormik.values.strength}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.strength ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.strength}</span>
          </div>
          <div className="col-lg-6">
            <label>Time Zone</label>
            <input
              name="TimeZone"
              value={myFormik.values.TimeZone}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.TimeZone ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.TimeZone}</span>
          </div>
          <div className="col-lg-6">
            <label>Client Visit</label>
            <input
              name="ClientVisit"
              value={myFormik.values.ClientVisit}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.ClientVisit ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.ClientVisit}</span>
          </div>
          <div className="col-lg-6">
            <label>Migration Visit</label>
            <input
              name="MigrationVisit"
              value={myFormik.values.MigrationVisit}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.MigrationVisit ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {myFormik.errors.MigrationVisit}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Developer</label>
            <input
              name="developer"
              value={myFormik.values.developer}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.developer ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.developer}</span>
          </div>

          <div className="col-lg-6">
            <label>Language known</label>
            <input
              name="language"
              value={myFormik.values.language}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.language ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.language}</span>
          </div>

          <div className="col-lg-6">
            <label>Communication</label>
            <input
              name="Communication"
              value={myFormik.values.Communication}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.Communication ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {myFormik.errors.Communication}
            </span>
          </div>

          <div className="col-lg-6">
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
            <label>Position Point (In this . type to next line )</label>
            <textarea
              name="keyPoint"
              value={myFormik.values.keyPoint}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.keyPoint ? "is-invalid" : ""
              }`}
              rows="5"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.keyPoint}</span>
          </div>

          <div className="col-lg-6">
            <label>SUMMARY Point(In this . type to next line )</label>
            <textarea
              name="Point"
              value={myFormik.values.Point}
              onChange={myFormik.handleChange}
              type="text"
              className={`form-control ${
                myFormik.errors.Point ? "is-invalid" : ""
              }`}
              rows="5"
            ></textarea>
            <span style={{ color: "red" }}>{myFormik.errors.Point}</span>
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

          <div className="col-lg-5 mt-3">
            <label>Choose Picture</label>
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
        </div>
      </form>
    </div>
  );
}
export default CVCreate;
