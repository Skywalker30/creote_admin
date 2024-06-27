// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../../API/api";

// function ProjectCreate() {
//   const [isLoading, setLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedProjectImage, setSelectedProjectImage] = useState(null);
//   // const [selectedMultipleImage, setSelectedMultipleImage] = useState([]);
//   const [selectedImage1, setSelectedImage1] = useState(null);
//   const [selectedImage2, setSelectedImage2] = useState(null);
//   const [selectedImage3, setSelectedImage3] = useState(null);
//   const [selectedTeamMemberImage, setSelectedTeamMemberImage] = useState(null)
//   const navigate = useNavigate();

//   const myFormik = useFormik({
//     initialValues: {
//       logo: "",
//       year: "",
//       projectName: "",
//       technology: "",
//       description: "",
//       projectLink: "",
//       date: "",
//       clientName: "",
//       descriptionImage: "",
//       StructuredOurWorkflow: "",
//       image1: "",
//       imageTitle1: "",
//       imageContent1: "",
//       image2: "",
//       imageTitle2: "",
//       imageContent2: "",
//       image3: "",
//       imageTitle3: "",
//       imageContent3: "",
//       MemberName : "",
//       MemberImage : "",
//       MemberWork : ""
//     },
//     validate: (values) => {
//       let errors = {};

//       if (!values.projectName) {
//         errors.projectName = "Please enter Project Name";
//       }

//       if (!values.MemberName) {
//         errors.MemberName = "Please enter Project Member Name";
//       }

//       if (!values.MemberWork) {
//         errors.MemberWork = "Please enter Project MemberWork";
//       }

//       if (!values.StructuredOurWorkflow) {
//         errors.StructuredOurWorkflow = "Please enter StructuredOurWorkflow";
//       }

//       if (!values.imageContent1) {
//         errors.imageContent1 = "Please enter Image Content";
//       }

//       if (!values.imageTitle1) {
//         errors.imageTitle1 = "Please enter Image Title";
//       }

//       if (!values.description) {
//         errors.description = "Please enter description";
//       }

//       if (!values.clientName) {
//         errors.clientName = "Please enter Client Name";
//       }

//       if (!values.technology) {
//         errors.technology = "Please enter technology";
//       }

//       if (!values.year) {
//         errors.year = "Please enter year ";
//       } else if (!/^\d+$/.test(values.year)) {
//         errors.year = "Year must be a valid number";
//       }

//       if (!values.descriptionImage) {
//         errors.descriptionImage = "Please insert an image";
//       }

//       if (!values.MemberImage) {
//         errors.MemberImage = "Please insert an image";
//       }

//       if (!values.image1) {
//         errors.image1 = "Please insert an image";
//       }

//       if (!values.logo) {
//         errors.logo = "Please insert an logo image";
//       }

//       const urlPattern = new RegExp(
//         "^(https?:\\/\\/)?" + // protocol
//           "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//           "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//           "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//           "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//           "(\\#[-a-z\\d_]*)?$",
//         "i" // fragment locator
//       );

//       if (!values.projectLink) {
//         errors.projectLink = "Please enter Website Link";
//       } else if (!urlPattern.test(values.projectLink)) {
//         errors.projectLink = "Please enter a valid Website Link";
//       }

//       if (!values.date) {
//         errors.date = "Please enter a date";
//       } else {
//         const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Example pattern for YYYY-MM-DD format
//         if (!datePattern.test(values.date)) {
//           errors.date = "Please enter a valid date in the format YYYY-MM-DD";
//         } else {
//           const date = new Date(values.date);
//           const now = new Date();
//           if (isNaN(date.getTime())) {
//             errors.date = "Invalid date";
//           } else if (date > now) {
//             errors.date = "Date cannot be in the future";
//           }
//         }
//       }

//       return errors;
//     },

//     onSubmit: async (values) => {
//       console.log("Submitting values:", values);
//       try {
//         setLoading(true);
//         await api.post("/api/user/Project", values);
//         navigate("/portal/project-list");
//       } catch (error) {
//         console.error("Error creating data:", error);
//         alert("Failed to create data. Please try again.");
//         setLoading(false);
//       }
//     },
//   });

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file); // Create URL from file
//     setSelectedImage(imageUrl); // Set selectedImage to URL
//     myFormik.setFieldValue("logo", imageUrl);
//     uploadImage(file, "logo"); // Set imageSrc to URL
//   };

//   const handleProjectFileChange = (event) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setSelectedProjectImage(imageUrl);
//     myFormik.setFieldValue("descriptionImage", imageUrl);
//     uploadImage(file, "descriptionImage");
//   };

//   const handleImage1FileChange = (event) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setSelectedImage1(imageUrl);
//     myFormik.setFieldValue("image1", imageUrl);
//     uploadImage(file, "image1");
//   };

//   const handleImage2FileChange = (event) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setSelectedImage2(imageUrl);
//     myFormik.setFieldValue("image2", imageUrl);
//     uploadImage(file, "image2");
//   };

//   const handleImage3FileChange = (event) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setSelectedImage3(imageUrl);
//     myFormik.setFieldValue("image3", imageUrl);
//     uploadImage(file, "image3");
//   };

//   const handleTeamMemberImageFileChange = (event) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setSelectedTeamMemberImage(imageUrl);
//     myFormik.setFieldValue("MemberImage", imageUrl);
//     uploadImage(file, "MemberImage");
//   };

//   // const handleMultipleImageFileChange = (event) => {
//   //   const files =Array.from(event.target.files);
//   //   const imageUrl = files.map(file => URL.createObjectURL(file));
//   //   setSelectedMultipleImage(prevImages => [...prevImages, ...imageUrl]);
//   //   myFormik.setFieldValue("images",  [...myFormik.values.image, ...imageUrl]);
//   //   files.forEach(file => {
//   //   uploadImage(file, "images");
//   // })
//   // };

//   // const handleImageRemove = (indexToRemove) => {
//   //   setSelectedMultipleImage(prevImages =>
//   //       prevImages.filter((_, index) => index !== indexToRemove)
//   //   );
//   //   const remainingImages = [...myFormik.values.image];
//   //   remainingImages.splice(indexToRemove, 1);
//   //   myFormik.setFieldValue("images", remainingImages);
//   // };

//   const uploadImage = async (file, field) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     let folderName = "";
//     if (field === "logo") {
//       folderName = "images/Project_logo_pic";
//     } else if (field === "descriptionImage") {
//       folderName = "images/Project_pic";
//     } else if (field === "image1") {
//       folderName = "images/Project_pic";
//     } else if (field === "image2") {
//       folderName = "images/Project_pic";
//     } else if (field === "image3") {
//       folderName = "images/Project_pic";
//     } else if (field === "MemberImage") {
//       folderName = "images/profile_pic";
//     }

//     if (folderName === "") {
//       console.error("Invalid filed provided");
//     }

//     formData.append("folderName", folderName);
//     try {
//       console.log("Uploading file:", file);
//       const response = await api.post("/api/uploadAndStore", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("File uploaded:", response.data);
//       myFormik.setFieldValue(field, response.data.filePath);
//     } catch (error) {
//       console.error(`Error uploading ${field} image:`, error);
//       console.log("Error Response:", error.response);
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={myFormik.handleSubmit}>
//         <div className="row">
//           <div className="col-lg-6">
//             <label>Project Name</label>
//             <input
//               name="projectName"
//               value={myFormik.values.projectName}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.projectName ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.projectName}</span>
//           </div>
//           <div className="col-lg-6">
//             <label>Years Of Project Make</label>
//             <input
//               name="year"
//               value={myFormik.values.year}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.year ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.year}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Link</label>
//             <input
//               name="projectLink"
//               value={myFormik.values.projectLink}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.projectLink ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.projectLink}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Client Name</label>
//             <input
//               name="clientName"
//               value={myFormik.values.clientName}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.clientName ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.clientName}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Date</label>
//             <input
//               name="date"
//               value={myFormik.values.date}
//               onChange={(e) => {
//                 myFormik.handleChange(e);
//               }}
//               type="date"
//               className={`form-control ${
//                 myFormik.errors.date ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.date}</span>
//             {myFormik.values.date && !myFormik.errors.date && (
//               <div>Selected Date: {myFormik.values.date}</div>
//             )}
//           </div>

//           <div className="col-lg-6">
//             <label>
//               Technology(add title before : and than technology and , to next
//               line )
//             </label>
//             <textarea
//               name="technology"
//               value={myFormik.values.technology}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.technology ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>{myFormik.errors.technology}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Description</label>
//             <textarea
//               name="description"
//               value={myFormik.values.description}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.description ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>{myFormik.errors.description}</span>
//           </div>

//           {/* <div className="container"> */}
//           {/* <form onSubmit={myFormik.handleSubmit}> */}
//           <div className="col-lg-6 mt-3">
//             <label>Description Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 myFormik.errors.descriptionImage ? "is-invalid" : ""
//               }`}
//               onChange={handleProjectFileChange}
//             />
//             {selectedProjectImage && (
//               <img
//                 src={selectedProjectImage}
//                 alt="Selected"
//                 style={{ maxWidth: "1000%", maxHeight: "100px" }}
//               />
//             )}
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Logo Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 myFormik.errors.logo ? "is-invalid" : ""
//               }`}
//               onChange={handleFileChange}
//             />
//             {selectedImage && (
//               <img
//                 src={selectedImage}
//                 alt="Selected"
//                 style={{ maxWidth: "1000%", maxHeight: "100px" }}
//               />
//             )}
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Project Picture1</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 myFormik.errors.image1 ? "is-invalid" : ""
//               }`}
//               onChange={handleImage1FileChange}
//             />
//             {selectedImage1 && (
//               <img
//                 src={selectedImage1}
//                 alt="Selected"
//                 style={{ maxWidth: "1000%", maxHeight: "100px" }}
//               />
//             )}
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Project Picture2</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 myFormik.errors.image1 ? "is-invalid" : ""
//               }`}
//               onChange={handleImage2FileChange}
//             />
//             {selectedImage2 && (
//               <img
//                 src={selectedImage2}
//                 alt="Selected"
//                 style={{ maxWidth: "1000%", maxHeight: "100px" }}
//               />
//             )}
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Project Picture3</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 myFormik.errors.image1 ? "is-invalid" : ""
//               }`}
//               onChange={handleImage3FileChange}
//             />
//             {selectedImage3 && (
//               <img
//                 src={selectedImage3}
//                 alt="Selected"
//                 style={{ maxWidth: "1000%", maxHeight: "100px" }}
//               />
//             )}
//           </div>

//           {/* <div className="col-lg-5 mt-3">
//                 <label>Project Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   className={`form-control ${
//                     myFormik.errors.images ? "is-invalid" : ""
//                   }`}
//                   onChange={handleMultipleImageFileChange}
//                 />
//                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                 {selectedMultipleImage.map((image, index) => (
//                   <div key={index} style={{ position: 'relative', marginRight: '10px' }}>
//                   <img
//                     src={image}
//                     alt={`Selected ${index}`}
//                     style={{ maxWidth: "100%", maxHeight: "100px", margin: "5px", cursor: 'pointer' }}
//                     onClick={() => handleImageRemove(index)}
//                   />
//                   <span
//                       style={{
//                         position: 'absolute',
//                         top: '5px',
//                         right: '5px',
//                         cursor: 'pointer',
//                         backgroundColor: 'white',
//                         padding: '2px 5px',
//                         borderRadius: '50%'
//                       }}
//                       onClick={() => handleImageRemove(index)}
//                       >
//                         &times;
//                       </span>
//                   </div>
//                ) )}
//                </div>
//               </div>  */}
//           {/* </form> */}
//           {/* </div> */}

//           <div className="col-lg-6">
//             <label>Image Title1</label>
//             <input
//               name="imageTitle1"
//               value={myFormik.values.imageTitle1}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.imageTitle1 ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.imageTitle1}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Content1</label>
//             <textarea
//               name="imageContent1"
//               value={myFormik.values.imageContent1}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.imageContent1 ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {myFormik.errors.imageContent1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title2</label>
//             <input
//               name="imageTitle2"
//               value={myFormik.values.imageTitle2}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.imageTitle1 ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.imageTitle1}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Content2</label>
//             <textarea
//               name="imageContent2"
//               value={myFormik.values.imageContent2}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.imageContent1 ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {myFormik.errors.imageContent1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title3</label>
//             <input
//               name="imageTitle3"
//               value={myFormik.values.imageTitle3}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.imageTitle1 ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{myFormik.errors.imageTitle1}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Content3</label>
//             <textarea
//               name="imageContent3"
//               value={myFormik.values.imageContent3}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.imageContent1 ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {myFormik.errors.imageContent1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>
//               Structured Our Workflow (first add number than make this :: and
//               add title and make this ::: and add Statement and for second data
//               add this //n )
//             </label>
//             <textarea
//               name="StructuredOurWorkflow"
//               value={myFormik.values.StructuredOurWorkflow}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.StructuredOurWorkflow ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {myFormik.errors.StructuredOurWorkflow}
//             </span>
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose TeamMember Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 myFormik.errors.MemberImage ? "is-invalid" : ""
//               }`}
//               onChange={handleTeamMemberImageFileChange}
//             />
//             {selectedTeamMemberImage && (
//               <img
//                 src={selectedTeamMemberImage}
//                 alt="Selected"
//                 style={{ maxWidth: "1000%", maxHeight: "100px" }}
//               />
//             )}
//           </div>

//           <div className="col-lg-6">
//             <label>TeamMember Name</label>
//             <textarea
//               name="MemberName"
//               value={myFormik.values.MemberName}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.MemberName ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {myFormik.errors.MemberName}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>TeamMember Work</label>
//             <textarea
//               name="MemberWork"
//               value={myFormik.values.MemberWork}
//               onChange={myFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 myFormik.errors.MemberWork ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {myFormik.errors.MemberWork}
//             </span>
//           </div>

//           <div className="col-lg-12 mt-3">
//             <input
//               disabled={isLoading}
//               type="submit"
//               style={{ margin: "30px" }}
//               value={isLoading ? "Submitting..." : "Create"}
//               className="btn btn-primary"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default ProjectCreate;

// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../../API/api";

// function ProjectCreate() {
//   const [isLoading, setLoading] = useState(false);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [selectedTeamMemberImage, setSelectedTeamMemberImage] = useState(null);
//   const navigate = useNavigate();

//   const projectFormik = useFormik({
//     initialValues: {
//       logo: "",
//       year: "",
//       projectName: "",
//       technology: "",
//       description: "",
//       projectLink: "",
//       date: "",
//       clientName: "",
//       descriptionImage: "",
//       StructuredOurWorkflow: "",
//       image1: "",
//       imageTitle1: "",
//       imageContent1: "",
//       image2: "",
//       imageTitle2: "",
//       imageContent2: "",
//       image3: "",
//       imageTitle3: "",
//       imageContent3: "",
//       teamMembers: [],
//     },
//     validate: (values) => {
//       let errors = {};

//       if (!values.projectName) {
//         errors.projectName = "Please enter Project Name";
//       }

//       if (!values.StructuredOurWorkflow) {
//         errors.StructuredOurWorkflow = "Please enter StructuredOurWorkflow";
//       }

//       if (!values.imageContent1) {
//         errors.imageContent1 = "Please enter Image Content";
//       }

//       if (!values.imageTitle1) {
//         errors.imageTitle1 = "Please enter Image Title";
//       }

//       if (!values.description) {
//         errors.description = "Please enter description";
//       }

//       if (!values.clientName) {
//         errors.clientName = "Please enter Client Name";
//       }

//       if (!values.technology) {
//         errors.technology = "Please enter technology";
//       }

//       if (!values.year) {
//         errors.year = "Please enter year ";
//       } else if (!/^\d+$/.test(values.year)) {
//         errors.year = "Year must be a valid number";
//       }

//       if (!values.descriptionImage) {
//         errors.descriptionImage = "Please insert an image";
//       }

//       if (!values.MemberImage) {
//         errors.MemberImage = "Please insert an image";
//       }

//       if (!values.image1) {
//         errors.image1 = "Please insert an image";
//       }

//       if (!values.logo) {
//         errors.logo = "Please insert an logo image";
//       }

//       const urlPattern = new RegExp(
//         "^(https?:\\/\\/)?" + // protocol
//           "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//           "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//           "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//           "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//           "(\\#[-a-z\\d_]*)?$",
//         "i" // fragment locator
//       );

//       if (!values.projectLink) {
//         errors.projectLink = "Please enter Website Link";
//       } else if (!urlPattern.test(values.projectLink)) {
//         errors.projectLink = "Please enter a valid Website Link";
//       }

//       if (!values.date) {
//         errors.date = "Please enter a date";
//       } else {
//         const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Example pattern for YYYY-MM-DD format
//         if (!datePattern.test(values.date)) {
//           errors.date = "Please enter a valid date in the format YYYY-MM-DD";
//         } else {
//           const date = new Date(values.date);
//           const now = new Date();
//           if (isNaN(date.getTime())) {
//             errors.date = "Invalid date";
//           } else if (date > now) {
//             errors.date = "Date cannot be in the future";
//           }
//         }
//       }

//       return errors;
//     },

//     onSubmit: async (values, { resetForm }) => {
//       try {
//         setLoading(true);
//         // Append teamMembers to the main form values
//         values.teamMembers = teamMembers;
//         await api.post("/api/user/Project", values);
//         resetForm();
//         setTeamMembers([]); // Clear teamMembers list
//         navigate("/portal/project-list");
//       } catch (error) {
//         console.error("Error creating data:", error);
//         alert("Failed to create data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleAddTeamMember = () => {
//     const newMember = {
//       MemberName: projectFormik.values.MemberName,
//       MemberWork: projectFormik.values.MemberWork,
//       MemberImage: projectFormik.values.MemberImage,
//     };

//     // Update local state for team members
//     setTeamMembers([...teamMembers, newMember]);

//     // Update Formik field value for team members only
//     projectFormik.setFieldValue("teamMembers", [...teamMembers, newMember]);

//     // Reset only the team member fields in Formik values
//     projectFormik.setFieldValue("MemberName", "");
//     projectFormik.setFieldValue("MemberWork", "");
//     projectFormik.setFieldValue("MemberImage", "");

//     setSelectedTeamMemberImage(null);
//   };

//   const handleFileChange = async (event, field, setFieldValue) => {
//     const file = event.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setFieldValue(field, imageUrl);
//     await uploadImage(file, field, setFieldValue);
//   };

//   const uploadImage = async (file, field, setFieldValue) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     let folderName = "";
//     if (field === "logo") {
//       folderName = "images/Project_logo_pic";
//     } else if (field === "descriptionImage" || field === "image1" || field === "image2" || field === "image3") {
//       folderName = "images/Project_pic";
//     } else if (field === "MemberImage") {
//       folderName = "images/profile_pic";
//     }

//     if (folderName === "") {
//       console.error("Invalid field provided");
//       return;
//     }

//     formData.append("folderName", folderName);
//     try {
//       console.log("Uploading file:", file);
//       const response = await api.post("/api/uploadAndStore", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("File uploaded:", response.data);
//       // Update Formik field value with uploaded file path
//       setFieldValue(field, response.data.filePath);
//     } catch (error) {
//       console.error(`Error uploading ${field} image:`, error);
//       console.log("Error Response:", error.response);
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={projectFormik.handleSubmit}>
//         <div className="row">
//           <div className="col-lg-6">
//             <label>Project Name</label>
//             <input
//               name="projectName"
//               value={projectFormik.values.projectName}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.projectName ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.projectName}</span>
//           </div>
//           <div className="col-lg-6">
//             <label>Years Of Project Make</label>
//             <input
//               name="year"
//               value={projectFormik.values.year}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.year ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.year}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Link</label>
//             <input
//               name="projectLink"
//               value={projectFormik.values.projectLink}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.projectLink ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.projectLink}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Client Name</label>
//             <input
//               name="clientName"
//               value={projectFormik.values.clientName}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.clientName ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.clientName}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Date</label>
//             <input
//               name="date"
//               value={projectFormik.values.date}
//               onChange={(e) => {
//                 projectFormik.handleChange(e);
//               }}
//               type="date"
//               className={`form-control ${
//                 projectFormik.errors.date ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.date}</span>
//             {projectFormik.values.date && !projectFormik.errors.date && (
//               <div>Selected Date: {projectFormik.values.date}</div>
//             )}
//           </div>

//           <div className="col-lg-6">
//             <label>
//               Technology(add title before : and than technology and , to next
//               line )
//             </label>
//             <textarea
//               name="technology"
//               value={projectFormik.values.technology}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.technology ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>{projectFormik.errors.technology}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Description</label>
//             <textarea
//               name="description"
//               value={projectFormik.values.description}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.description ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>{projectFormik.errors.description}</span>
//           </div>
//           <div className="col-lg-6 mt-3">
//             <label>Description Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 projectFormik.errors.descriptionImage ? "is-invalid" : ""
//               }`}
//               onChange={(event) =>
//                 handleFileChange(
//                   event,
//                   "descriptionImage",
//                   projectFormik.setFieldValue
//                 )
//               }
//             />
//              <span style={{ color: "red" }}>
//               {projectFormik.errors.descriptionImage}
//             </span>
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Logo Picture</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 projectFormik.errors.logo ? "is-invalid" : ""
//               }`}
//               onChange={(event) =>
//                 handleFileChange(
//                   event,
//                   "logo",
//                   projectFormik.setFieldValue
//                 )
//               }
//             />
//               <span style={{ color: "red" }}>{projectFormik.errors.logo}</span>
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Project Picture1</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 projectFormik.errors.image1 ? "is-invalid" : ""
//               }`}
//               onChange={(event) =>
//                 handleFileChange(
//                   event,
//                   "image1",
//                   projectFormik.setFieldValue
//                 )
//               }
//             />
//           <span style={{ color: "red" }}>{projectFormik.errors.image1}</span>
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Project Picture2</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 projectFormik.errors.image1 ? "is-invalid" : ""
//               }`}
//               onChange={(event) =>
//                 handleFileChange(
//                   event,
//                   "image2",
//                   projectFormik.setFieldValue
//                 )
//               }
//             />
//           </div>

//           <div className="col-lg-6 mt-3">
//             <label>Choose Project Picture3</label>
//             <input
//               type="file"
//               accept="image/*"
//               className={`form-control ${
//                 projectFormik.errors.image1 ? "is-invalid" : ""
//               }`}
//               onChange={(event) =>
//                 handleFileChange(
//                   event,
//                   "image3",
//                   projectFormik.setFieldValue
//                 )
//               }
//             />
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title1</label>
//             <input
//               name="imageTitle1"
//               value={projectFormik.values.imageTitle1}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.imageTitle1 ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.imageTitle1}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Content1</label>
//             <textarea
//               name="imageContent1"
//               value={projectFormik.values.imageContent1}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.imageContent1 ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.imageContent1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title2</label>
//             <input
//               name="imageTitle2"
//               value={projectFormik.values.imageTitle2}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.imageTitle1 ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.imageTitle1}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Content2</label>
//             <textarea
//               name="imageContent2"
//               value={projectFormik.values.imageContent2}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.imageContent1 ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.imageContent1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title3</label>
//             <input
//               name="imageTitle3"
//               value={projectFormik.values.imageTitle3}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.imageTitle1 ? "is-invalid" : ""
//               }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.imageTitle1}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Project Content3</label>
//             <textarea
//               name="imageContent3"
//               value={projectFormik.values.imageContent3}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.imageContent1 ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.imageContent1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>
//               Structured Our Workflow (first add number than make this :: and
//               add title and make this ::: and add Statement and for second data
//               add this //n )
//             </label>
//             <textarea
//               name="StructuredOurWorkflow"
//               value={projectFormik.values.StructuredOurWorkflow}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${
//                 projectFormik.errors.StructuredOurWorkflow ? "is-invalid" : ""
//               }`}
//               rows="5"
//             ></textarea>
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.StructuredOurWorkflow}
//             </span>
//           </div>

//            {/* Team members section */}
//         <div className="team-member-section mt-5">
//           <h3>Add Team Members</h3>
//           <div className="row">
//             <div className="col-lg-4">
//               <label>Member Name</label>
//               <input
//                 name="MemberName"
//                 value={projectFormik.values.MemberName}
//                 onChange={projectFormik.handleChange}
//                 type="text"
//                 className={`form-control ${
//                   projectFormik.errors.MemberName ? "is-invalid" : ""
//                 }`}
//               />
//               <span style={{ color: "red" }}>
//                 {projectFormik.errors.MemberName}
//               </span>
//             </div>
//             <div className="col-lg-4">
//               <label>Member Work</label>
//               <input
//                 name="MemberWork"
//                 value={projectFormik.values.MemberWork}
//                 onChange={projectFormik.handleChange}
//                 type="text"
//                 className={`form-control ${
//                   projectFormik.errors.MemberWork ? "is-invalid" : ""
//                 }`}
//               />
//               <span style={{ color: "red" }}>
//                 {projectFormik.errors.MemberWork}
//               </span>
//             </div>
//             <div className="col-lg-4">
//               <label>Upload Member Image</label>
//               <input
//                 name="MemberImage"
//                 type="file"
//                 className={`form-control ${
//                   projectFormik.errors.MemberImage ? "is-invalid" : ""
//                 }`}
//                 onChange={(event) =>
//                   handleFileChange(
//                     event,
//                     "MemberImage",
//                     projectFormik.setFieldValue
//                   )
//                 }
//               />
//               <span style={{ color: "red" }}>
//                 {projectFormik.errors.MemberImage}
//               </span>
//             </div>
//             <div className="col-lg-12 mt-3">
//               <button
//                 type="button"
//                 onClick={handleAddTeamMember}
//                 className="btn btn-primary"
//               >
//                 Add Team Member
//               </button>
//             </div>
//           </div>
//           <div className="team-members-list mt-3">
//             <h4>Team Members List</h4>
//             <ul>
//               {teamMembers.map((member, index) => (
//                 <li key={index}>
//                   <div className="team-member-item">
//                     <img
//                       src={member.MemberImage}
//                       alt="Team Member"
//                       style={{ width: "50px", height: "50px" }}
//                     />
//                     <p>Name: {member.MemberName}</p>
//                     <p>Work: {member.MemberWork}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Submit button */}
//         <div className="col-lg-12 mt-3">
//           <button type="submit" className="btn btn-primary">
//             {isLoading ? "Creating..." : "Create Project"}
//           </button>
//         </div>
//         </div>
//       </form>
//     </div>
//   );
// }
// export default ProjectCreate;

import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api";

function ProjectCreate() {
  const [selectedTeamMemberImage, setSelectedTeamMemberImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const projectFormik = useFormik({
      initialValues: {
        logo: "",
        year: "",
        projectName: "",
        technology: "",
        description: "",
        date: "",
        descriptionImage: "",
        clientName: "",
        projectLink: "",
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
        teamMembers: [],
        MemberImage:"",
        MemberName:"",
        MemberWork:""
      },
    validate: (values) => {
      let errors = {};

      if (!values.projectName) {
        errors.projectName = "Please enter Project Name";
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

      if (!values.technology) {
        errors.technology = "Please enter technology";
      }

      if (!values.descriptionImage) {
        errors.descriptionImage = "Please insert an image";
      }

      if (!values.MemberImage) {
        errors.MemberImage = "Please insert an image";
      }

      if (!values.image1) {
        errors.image1 = "Please insert an image";
      }

      if (!values.clientName) {
        errors.clientName = "Please enter Client Name";
      }

      if (!values.year) {
        errors.year = "Please enter year ";
      } else if (!/^\d+$/.test(values.year)) {
        errors.year = "Year must be a valid number";
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
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        for (const key in values) {
          if (values[key] instanceof File) {
            formData.append(key, values[key]);
          } else if (key === "teamMembers") {
            formData.append(
              key,
              JSON.stringify(
                teamMembers.map((member) => ({
                  ...member,
                  MemberImage:
                    member.MemberImage instanceof File
                      ? URL.createObjectURL(member.MemberImage)
                      : member.MemberImage,
                }))
              )
            );
          } else {
            formData.append(key, values[key]);
          }
        }
    
        // Make API call using axios
        await api.post("/api/user/Project", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        // Reset form and state
        resetForm();
        setTeamMembers([]);
        setSelectedTeamMemberImage(null);
        navigate("/portal/project-list");
      } catch (error) {
        console.error("Error submitting form", error);
      }
      setIsLoading(false);
    },
    
    
//    onSubmit: async (values, { resetForm }) => {
//   setIsLoading(true);
//   console.log("here we are")
//   try {
//     const formData = new FormData();
//     // Append regular form fields
//     for (const key in values) {
//       if (values[key] instanceof File) {
//         formData.append(key, values[key]);
//       } else {
//         formData.append(key, values[key]);
//       }
//     }

//     // Append team members data
//     formData.append("teamMembers", JSON.stringify(
//       teamMembers.map(member => ({
//         ...member,
//         MemberImage: member.MemberImage instanceof File 
//           ? URL.createObjectURL(member.MemberImage)
//           : member.MemberImage // handle if not a File
//       }))
//     ));

//     // Make API call
//     console.log("HERE", formData)
//     await api.post("/api/user/Project", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
    
//     // Reset form and state
//     resetForm();
//     setTeamMembers([]);
//     navigate("/portal/project-list");
//   } catch (error) {
//     console.error("Error submitting form", error);
//   }
//   setIsLoading(false);
// },

  });

  // const handleFileChange = (event, field, setFieldValue) => {
  //   const file = event.currentTarget.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFieldValue(field, file);
  //     if (field === "MemberImage") {
  //       setSelectedTeamMemberImage(reader.result);
  //     }
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = (event, field, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue(field, file); // Update field value with the file object
      if (field === "MemberImage") {
        setSelectedTeamMemberImage(URL.createObjectURL(file));
      }
    }
  };
  

  const handleAddTeamMember = () => {
    const newMember = {
      MemberName: projectFormik.values.MemberName,
      MemberWork: projectFormik.values.MemberWork,
      MemberImage: selectedTeamMemberImage,
    };
    setTeamMembers([...teamMembers, newMember]);
    projectFormik.setFieldValue("MemberName", "");
    projectFormik.setFieldValue("MemberWork", "");
    projectFormik.setFieldValue("MemberImage", null);  
    setSelectedTeamMemberImage(null);
  };

  return (
    <div className="container">
      <h2>Create Project</h2>
      <form onSubmit={projectFormik.handleSubmit}>
        <div className="row">
          {/* Project Details */}
          <div className="col-lg-6">
            <label>Project Name</label>
            <input
              name="projectName"
              value={projectFormik.values.projectName}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.projectName ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.projectName}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Years Of Project Make</label>
            <input
              name="year"
              value={projectFormik.values.year}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.year ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{projectFormik.errors.year}</span>
          </div>

          <div className="col-lg-6">
            <label>Project Link</label>
            <input
              name="projectLink"
              value={projectFormik.values.projectLink}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.projectLink ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.projectLink}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Client Name</label>
            <input
              name="clientName"
              value={projectFormik.values.clientName}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.clientName ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.clientName}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Date</label>
            <input
              name="date"
              value={projectFormik.values.date}
              onChange={projectFormik.handleChange}
              type="date"
              className={`form-control ${
                projectFormik.errors.date ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>{projectFormik.errors.date}</span>
          </div>

          <div className="col-lg-6">
            <label>Technology</label>
            <input
              name="technology"
              value={projectFormik.values.technology}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.technology ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.technology}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Description</label>
            <textarea
              name="description"
              value={projectFormik.values.description}
              onChange={projectFormik.handleChange}
              className={`form-control ${
                projectFormik.errors.description ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.description}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Structured Our Workflow</label>
            <textarea
              name="StructuredOurWorkflow"
              value={projectFormik.values.StructuredOurWorkflow}
              onChange={projectFormik.handleChange}
              className={`form-control ${
                projectFormik.errors.StructuredOurWorkflow ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.StructuredOurWorkflow}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Logo</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                handleFileChange(e, "logo", projectFormik.setFieldValue)
              }
            />
            {projectFormik.values.logo && (
              <img
                src={URL.createObjectURL(projectFormik.values.logo)}
                alt="logo"
                className="preview-image"
              />
            )}
            <span style={{ color: "red" }}>{projectFormik.errors.logo}</span>
          </div>

          <div className="col-lg-6">
            <label>Description Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                handleFileChange(
                  e,
                  "descriptionImage",
                  projectFormik.setFieldValue
                )
              }
            />
            {projectFormik.values.descriptionImage && (
              <img
                src={URL.createObjectURL(projectFormik.values.descriptionImage)}
                alt="descriptionImage"
                className="preview-image"
              />
            )}
            <span style={{ color: "red" }}>
              {projectFormik.errors.descriptionImage}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Image 1</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                handleFileChange(e, "image1", projectFormik.setFieldValue)
              }
            />
            {projectFormik.values.image1 && (
              <img
                src={URL.createObjectURL(projectFormik.values.image1)}
                alt="image1"
                className="preview-image"
              />
            )}
            <span style={{ color: "red" }}>{projectFormik.errors.image1}</span>
          </div>

          <div className="col-lg-6">
            <label>Image Title 1</label>
            <input
              name="imageTitle1"
              value={projectFormik.values.imageTitle1}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.imageTitle1 ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.imageTitle1}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Image Content 1</label>
            <textarea
              name="imageContent1"
              value={projectFormik.values.imageContent1}
              onChange={projectFormik.handleChange}
              className={`form-control ${
                projectFormik.errors.imageContent1 ? "is-invalid" : ""
              }`}
            />
            <span style={{ color: "red" }}>
              {projectFormik.errors.imageContent1}
            </span>
          </div>

          <div className="col-lg-6">
            <label>Image 2</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                handleFileChange(e, "image2", projectFormik.setFieldValue)
              }
            />
            {projectFormik.values.image2 && (
              <img
                src={URL.createObjectURL(projectFormik.values.image2)}
                alt="image2"
                className="preview-image"
              />
            )}
          </div>

          <div className="col-lg-6">
            <label>Image Title 2</label>
            <input
              name="imageTitle2"
              value={projectFormik.values.imageTitle2}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.imageTitle2 ? "is-invalid" : ""
              }`}
            />
          </div>

          <div className="col-lg-6">
            <label>Image Content 2</label>
            <textarea
              name="imageContent2"
              value={projectFormik.values.imageContent2}
              onChange={projectFormik.handleChange}
              className={`form-control ${
                projectFormik.errors.imageContent2 ? "is-invalid" : ""
              }`}
            />
          </div>

          <div className="col-lg-6">
            <label>Image 3</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                handleFileChange(e, "image3", projectFormik.setFieldValue)
              }
            />
            {projectFormik.values.image3 && (
              <img
                src={URL.createObjectURL(projectFormik.values.image3)}
                alt="image3"
                className="preview-image"
              />
            )}
          </div>

          <div className="col-lg-6">
            <label>Image Title 3</label>
            <input
              name="imageTitle3"
              value={projectFormik.values.imageTitle3}
              onChange={projectFormik.handleChange}
              type="text"
              className={`form-control ${
                projectFormik.errors.imageTitle3 ? "is-invalid" : ""
              }`}
            />
          </div>

          <div className="col-lg-6">
            <label>Image Content 3</label>
            <textarea
              name="imageContent3"
              value={projectFormik.values.imageContent3}
              onChange={projectFormik.handleChange}
              className={`form-control ${
                projectFormik.errors.imageContent3 ? "is-invalid" : ""
              }`}
            />
          </div>

          {/* Team Member Section */}
          <div className="col-lg-12">
            <h4>Add Team Member</h4>
            <div className="row">
              <div className="col-lg-4">
                <label>Member Name</label>
                <input
                  name="MemberName"
                  value={projectFormik.values.MemberName}
                  onChange={projectFormik.handleChange}
                  type="text"
                  className={`form-control ${
                    projectFormik.errors.MemberName ? "is-invalid" : ""
                  }`}
                />
                <span style={{ color: "red" }}>
                  {projectFormik.errors.MemberName}
                </span>
              </div>

              <div className="col-lg-4">
                <label>Member Work</label>
                <input
                  name="MemberWork"
                  value={projectFormik.values.MemberWork}
                  onChange={projectFormik.handleChange}
                  type="text"
                  className={`form-control ${
                    projectFormik.errors.MemberWork ? "is-invalid" : ""
                  }`}
                />
                <span style={{ color: "red" }}>
                  {projectFormik.errors.MemberWork}
                </span>
              </div>

              <div className="col-lg-4">
                <label>Member Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "MemberImage",
                      projectFormik.setFieldValue
                    )
                  }
                />
                {selectedTeamMemberImage && (
                  <img
                    src={selectedTeamMemberImage}
                    alt="Team Member"
                    className="preview-image"
                  />
                )}
              </div>

              <div className="col-lg-12">
                <div
                  onClick={handleAddTeamMember}
                  className="btn btn-primary mt-2"
                >
                  Add Team Member
                </div>
              </div>

              <div className="col-lg-12 mt-3">
                <h5>Team Members</h5>
                {teamMembers.length === 0 && <p>No team members added yet.</p>}
                <ul className="list-group">
                  {teamMembers.map((member, index) => (
                    <li key={index} className="list-group-item">
                      <div>
                        <strong>Name:</strong> {member.MemberName}
                      </div>
                      <div>
                        <strong>Work:</strong> {member.MemberWork}
                      </div>
                      {member.MemberImage && (
                        <img
                          src={member.MemberImage}
                          alt={`Team Member ${index}`}
                          className="preview-image"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-3">
            <button type="submit" className="btn btn-success">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProjectCreate;
