import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../API/api";

function ProjectEdit() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const projectFileInputRef = useRef(null);
  const image1FileInputRef = useRef(null);
  const image2FileInputRef = useRef(null);
  const image3FileInputRef = useRef(null);
  const TeamMemberImage1FileInputRef = useRef(null);
  const TeamMemberImage2FileInputRef = useRef(null);
  const TeamMemberImage3FileInputRef = useRef(null);
  const [initialData, setInitialData] = useState({
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
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get(`/api/user/Project/${params.id}`);
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

      if (!values.projectName) {
        errors.projectName = "Please enter Project Name";
      }

      if (!values.StructuredOurWorkflow) {
        errors.StructuredOurWorkflow = "Please enter StructuredOurWorkflow";
      }

      if (!values.MemberName1) {
        errors.MemberName1 = "Please enter Project Member Name";
      }

      if (!values.MemberWork1) {
        errors.MemberWork1 = "Please enter Project MemberWork";
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
      try {
        setLoading(true);
        await api.put(`/api/user/Project/${params.id}`, values);
        setLoading(false);
        navigate("/portal/project-list");
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
    uploadImage(file, "logo");
  };

  const handleProjectImageClick = () => {
    projectFileInputRef.current.click();
  };

  const handleProjectFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "descriptionImage");
  };

  const handleImage1Click = () => {
    image1FileInputRef.current.click();
  };

  const handleImage1FileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "image1");
  };

  const handleImage2Click = () => {
    image2FileInputRef.current.click();
  };

  const handleImage2FileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "image2");
  };

  const handleImage3Click = () => {
    image3FileInputRef.current.click();
  };

  const handleImage3FileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "image3");
  };

  const handleTeamMemberImage1Click = () => {
    TeamMemberImage1FileInputRef.current.click();
  };

  const handleTeamMemberImage1FileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "MemberImage1");
  };

  const handleTeamMemberImage2Click = () => {
    TeamMemberImage2FileInputRef.current.click();
  };

  const handleTeamMemberImage2FileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file, "MemberImage2");
  };

  const handleTeamMemberImage3Click = () => {
    TeamMemberImage3FileInputRef.current.click();
  };

  const handleTeamMemberImage3FileChange = (event) => {
    const file = event.target.files[0];
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
              <span style={{ color: "red" }}>
                {myFormik.errors.projectName}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.projectLink}
              </span>
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
                rows="5"
              ></textarea>
              <span style={{ color: "red" }}>
                {myFormik.errors.description}
              </span>
            </div>

            <div className="col-lg-6 mt-3">
              <label>Description Image</label>
              <br />
              <img
                src={initialData.descriptionImage}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleProjectImageClick("descriptionImage")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={projectFileInputRef} // For imageSrc input
                style={{ display: "none" }}
                onChange={(event) =>
                  handleProjectFileChange(event, "descriptionImage")
                } // Pass the field name
              />
            </div>

            <div className="col-lg-6 mt-3">
              <label>Choose Logo Picture</label>
              <br />
              <img
                src={initialData.logo}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleImageClick("profilePic")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleFileChange(event, "logo")} // Pass the field name
              />
            </div>

            <div className="col-lg-6 mt-3">
              <label>Choose Project Picture1</label>
              <br />
              <img
                src={initialData.image1}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleImage1Click("image1")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={image1FileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleImage1FileChange(event, "image1")} // Pass the field name
              />
            </div>

            <div className="col-lg-6 mt-3">
              <label>Choose Project Picture2</label>
              <br />
              <img
                src={initialData.image2}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleImage2Click("image2")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={image2FileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleImage2FileChange(event, "image2")} // Pass the field name
              />
            </div>

            <div className="col-lg-6 mt-3">
              <label>Choose Project Picture3</label>
              <br />
              <img
                src={initialData.image3}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleImage3Click("image3")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={image3FileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) => handleImage3FileChange(event, "image3")} // Pass the field name
              />
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
              <span style={{ color: "red" }}>
                {myFormik.errors.imageTitle1}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.imageTitle1}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.imageTitle1}
              </span>
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
                add title and make this ::: and add Statement and for second
                data add this //n )
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
              <br />
              <img
                src={initialData.MemberImage1}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleTeamMemberImage1Click("MemberImage1")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={TeamMemberImage1FileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) =>
                  handleTeamMemberImage1FileChange(event, "MemberImage1")
                } // Pass the field name
              />
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
              <span style={{ color: "red" }}>
                {myFormik.errors.MemberName1}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.MemberWork1}
              </span>
            </div>

            <div className="col-lg-6 mt-3">
              <label>Choose TeamMember Picture 2</label>
              <br />
              <img
                src={initialData.MemberImage2}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleTeamMemberImage2Click("MemberImage2")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={TeamMemberImage2FileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) =>
                  handleTeamMemberImage2FileChange(event, "MemberImage2")
                } // Pass the field name
              />
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
              <span style={{ color: "red" }}>
                {myFormik.errors.MemberName1}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.MemberWork1}
              </span>
            </div>

            <div className="col-lg-6 mt-3">
              <label>Choose TeamMember Picture 3</label>
              <br />
              <img
                src={initialData.MemberImage3}
                alt="Previous"
                style={{ width: "100px", height: "100px", cursor: "pointer" }}
                onClick={() => handleTeamMemberImage3Click("MemberImage3")} // Pass the field name
              />
              <input
                type="file"
                accept="image/*"
                ref={TeamMemberImage3FileInputRef} // For sliderImg input
                style={{ display: "none" }}
                onChange={(event) =>
                  handleTeamMemberImage3FileChange(event, "MemberImage3")
                } // Pass the field name
              />
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
              <span style={{ color: "red" }}>
                {myFormik.errors.MemberName1}
              </span>
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
              <span style={{ color: "red" }}>
                {myFormik.errors.MemberWork1}
              </span>
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

export default ProjectEdit;
