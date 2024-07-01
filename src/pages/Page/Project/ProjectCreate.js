

// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../../API/api";

// function ProjectCreate() {
//   const [selectedTeamMemberImage, setSelectedTeamMemberImage] = useState(null);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const projectFormik = useFormik({
//     initialValues: {
//       logo: "",
//       year: 0,
//       projectName: "",
//       technology: "",
//       description: "",

//       date: "",
//       descriptionImage: "",
//       clientName: "",
//       projectLink: "",

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
//       MemberImage: "",
//       MemberName: "",
//       MemberWork: ""
//     },
//     validate: (values) => {
//       let errors = {};

//       if (!values.projectName) {
//         errors.projectName = "Please enter Project Name";
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

//       if (!values.technology) {
//         errors.technology = "Please enter technology";
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

//       if (!values.clientName) {
//         errors.clientName = "Please enter Client Name";
//       }

//       if (!values.year) {
//         errors.year = "Please enter year ";
//       } else if (!/^\d+$/.test(values.year)) {
//         errors.year = "Year must be a valid number";
//       }

//       if (!values.logo) {
//         errors.logo = "Please insert an logo image";
//       }

//       const urlPattern = new RegExp(
//         "^(https?:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$",
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
//       console.log("Form values:", values);
//       console.log("Form errors:", projectFormik.errors); // Check if there are any validation errors
//       console.log("Is form valid?", projectFormik.isValid); // Check if Formik considers the form valid
//       setIsLoading(true);
//       try {
//         const formData = new FormData();

//         for (const key in values) {
//           if (key === "teamMembers") {
//             formData.append(key, JSON.stringify(teamMembers));
//           } else if (values[key] instanceof File) {
//             formData.append(key, values[key]);
//           } else {
//             formData.append(key, values[key]);
//           }
//         }
//         console.log("Submitting form data...");
//         for (let pair of formData.entries()) {
//           console.log(pair[0] + ': ' + pair[1]);
//         }

//         await api.post("/api/user/Project", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }).then(response => {
//           console.log("API Response:", response.data);
//           resetForm();
//           setTeamMembers([]);
//           setSelectedTeamMemberImage(null);
//           navigate("/portal/project-list");
//         }).catch(error => {
//           console.error("Error submitting form:", error);
//         });


//         resetForm();
//         setTeamMembers([]);
//         setSelectedTeamMemberImage(null);
//         navigate("/portal/project-list");
//       } catch (error) {
//         if (error.response) {
//           console.error("Error response:", error.response.data);
//         } else if (error.request) {
//           console.error("Error request:", error.request);
//         } else {
//           console.error("Error submitting form:", error);
//         }
//       }
//       setIsLoading(false);
//     }
//   });
//   // const handleSubmit = async (values, { resetForm }) => {
//   //   console.log("Form values:", values);
//   //   console.log("Form errors:", projectFormik.errors); // Check if there are any validation errors
//   //   console.log("Is form valid?", projectFormik.isValid); // Check if Formik considers the form valid
//   //   setIsLoading(true);
//   //   try {
//   //     const formData = new FormData();

//   //     for (const key in values) {
//   //       if (key === "teamMembers") {
//   //         formData.append(key, JSON.stringify(teamMembers));
//   //       } else if (values[key] instanceof File) {
//   //         formData.append(key, values[key]);
//   //       } else {
//   //         formData.append(key, values[key]);
//   //       }
//   //     }
//   //     console.log("Submitting form data...");
//   //     for (let pair of formData.entries()) {
//   //       console.log(pair[0] + ': ' + pair[1]);
//   //     }

//   //     await api.post("/api/user/Project", formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     }).then(response => {
//   //       console.log("API Response:", response.data);
//   //       resetForm();
//   //       setTeamMembers([]);
//   //       setSelectedTeamMemberImage(null);
//   //       navigate("/portal/project-list");
//   //     }).catch(error => {
//   //       console.error("Error submitting form:", error);
//   //     });
//   //     resetForm();
//   //     setTeamMembers([]);
//   //     setSelectedTeamMemberImage(null);
//   //     navigate("/portal/project-list");
//   //   } catch (error) {
//   //     if (error.response) {
//   //       console.error("Error response:", error.response.data);
//   //     } else if (error.request) {
//   //       console.error("Error request:", error.request);
//   //     } else {
//   //       console.error("Error submitting form:", error);
//   //     }
//   //   }
//   //   setIsLoading(false);

//   // }


//   const handleFileChange = (event, field, setFieldValue) => {
//     const file = event.currentTarget.files[0];
//     if (file) {
//       setFieldValue(field, file); // Update field value with the file object
//       if (field === "MemberImage") {
//         setSelectedTeamMemberImage(URL.createObjectURL(file));
//       }
//     }
//   };


//   const handleAddTeamMember = () => {
//     const newMember = {
//       MemberName: projectFormik.values.MemberName,
//       MemberWork: projectFormik.values.MemberWork,
//       MemberImage: selectedTeamMemberImage,
//     };
//     setTeamMembers([...teamMembers, newMember]);
//     projectFormik.setFieldValue("MemberName", "");
//     projectFormik.setFieldValue("MemberWork", "");
//     projectFormik.setFieldValue("MemberImage", null);
//     setSelectedTeamMemberImage(null);
//   };

//   return (
//     <div className="container">
//       <h2>Create Project</h2>
//       <form onSubmit={projectFormik.handleSubmit}>
//         <div className="row">
//           {/* Project Details */}
//           <div className="col-lg-6">
//             <label>Project Name</label>
//             <input
//               name="projectName"
//               value={projectFormik.values.projectName}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${projectFormik.errors.projectName ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.projectName}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Years Of Project Make</label>
//             <input
//               name="year"
//               value={projectFormik.values.year}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${projectFormik.errors.year ? "is-invalid" : ""
//                 }`}
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
//               className={`form-control ${projectFormik.errors.projectLink ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.projectLink}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Client Name</label>
//             <input
//               name="clientName"
//               value={projectFormik.values.clientName}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${projectFormik.errors.clientName ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.clientName}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Date</label>
//             <input
//               name="date"
//               value={projectFormik.values.date}
//               onChange={projectFormik.handleChange}
//               type="date"
//               className={`form-control ${projectFormik.errors.date ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>{projectFormik.errors.date}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Technology</label>
//             <input
//               name="technology"
//               value={projectFormik.values.technology}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${projectFormik.errors.technology ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.technology}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={projectFormik.values.description}
//               onChange={projectFormik.handleChange}
//               className={`form-control ${projectFormik.errors.description ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.description}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Structured Our Workflow</label>
//             <textarea
//               name="StructuredOurWorkflow"
//               value={projectFormik.values.StructuredOurWorkflow}
//               onChange={projectFormik.handleChange}
//               className={`form-control ${projectFormik.errors.StructuredOurWorkflow ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.StructuredOurWorkflow}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Logo</label>
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) =>
//                 handleFileChange(e, "logo", projectFormik.setFieldValue)
//               }
//             />
//             {projectFormik.values.logo && (
//               <img
//                 src={URL.createObjectURL(projectFormik.values.logo)}
//                 alt="logo"
//                 className="preview-image"
//               />
//             )}
//             <span style={{ color: "red" }}>{projectFormik.errors.logo}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Description Image</label>
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) =>
//                 handleFileChange(
//                   e,
//                   "descriptionImage",
//                   projectFormik.setFieldValue
//                 )
//               }
//             />
//             {projectFormik.values.descriptionImage && (
//               <img
//                 src={URL.createObjectURL(projectFormik.values.descriptionImage)}
//                 alt="descriptionImage"
//                 className="preview-image"
//               />
//             )}
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.descriptionImage}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image 1</label>
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) =>
//                 handleFileChange(e, "image1", projectFormik.setFieldValue)
//               }
//             />
//             {projectFormik.values.image1 && (
//               <img
//                 src={URL.createObjectURL(projectFormik.values.image1)}
//                 alt="image1"
//                 className="preview-image"
//               />
//             )}
//             <span style={{ color: "red" }}>{projectFormik.errors.image1}</span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title 1</label>
//             <input
//               name="imageTitle1"
//               value={projectFormik.values.imageTitle1}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${projectFormik.errors.imageTitle1 ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.imageTitle1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image Content 1</label>
//             <textarea
//               name="imageContent1"
//               value={projectFormik.values.imageContent1}
//               onChange={projectFormik.handleChange}
//               className={`form-control ${projectFormik.errors.imageContent1 ? "is-invalid" : ""
//                 }`}
//             />
//             <span style={{ color: "red" }}>
//               {projectFormik.errors.imageContent1}
//             </span>
//           </div>

//           <div className="col-lg-6">
//             <label>Image 2</label>
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) =>
//                 handleFileChange(e, "image2", projectFormik.setFieldValue)
//               }
//             />
//             {projectFormik.values.image2 && (
//               <img
//                 src={URL.createObjectURL(projectFormik.values.image2)}
//                 alt="image2"
//                 className="preview-image"
//               />
//             )}
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title 2</label>
//             <input
//               name="imageTitle2"
//               value={projectFormik.values.imageTitle2}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${projectFormik.errors.imageTitle2 ? "is-invalid" : ""
//                 }`}
//             />
//           </div>

//           <div className="col-lg-6">
//             <label>Image Content 2</label>
//             <textarea
//               name="imageContent2"
//               value={projectFormik.values.imageContent2}
//               onChange={projectFormik.handleChange}
//               className={`form-control ${projectFormik.errors.imageContent2 ? "is-invalid" : ""
//                 }`}
//             />
//           </div>

//           <div className="col-lg-6">
//             <label>Image 3</label>
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) =>
//                 handleFileChange(e, "image3", projectFormik.setFieldValue)
//               }
//             />
//             {projectFormik.values.image3 && (
//               <img
//                 src={URL.createObjectURL(projectFormik.values.image3)}
//                 alt="image3"
//                 className="preview-image"
//               />
//             )}
//           </div>

//           <div className="col-lg-6">
//             <label>Image Title 3</label>
//             <input
//               name="imageTitle3"
//               value={projectFormik.values.imageTitle3}
//               onChange={projectFormik.handleChange}
//               type="text"
//               className={`form-control ${projectFormik.errors.imageTitle3 ? "is-invalid" : ""
//                 }`}
//             />
//           </div>

//           <div className="col-lg-6">
//             <label>Image Content 3</label>
//             <textarea
//               name="imageContent3"
//               value={projectFormik.values.imageContent3}
//               onChange={projectFormik.handleChange}
//               className={`form-control ${projectFormik.errors.imageContent3 ? "is-invalid" : ""
//                 }`}
//             />
//           </div>

//           {/* Team Member Section */}
//           <div className="col-lg-12">
//             <h4>Add Team Member</h4>
//             <div className="row">
//               <div className="col-lg-4">
//                 <label>Member Name</label>
//                 <input
//                   name="MemberName"
//                   value={projectFormik.values.MemberName}
//                   onChange={projectFormik.handleChange}
//                   type="text"
//                   className={`form-control ${projectFormik.errors.MemberName ? "is-invalid" : ""
//                     }`}
//                 />
//                 <span style={{ color: "red" }}>
//                   {projectFormik.errors.MemberName}
//                 </span>
//               </div>

//               <div className="col-lg-4">
//                 <label>Member Work</label>
//                 <input
//                   name="MemberWork"
//                   value={projectFormik.values.MemberWork}
//                   onChange={projectFormik.handleChange}
//                   type="text"
//                   className={`form-control ${projectFormik.errors.MemberWork ? "is-invalid" : ""
//                     }`}
//                 />
//                 <span style={{ color: "red" }}>
//                   {projectFormik.errors.MemberWork}
//                 </span>
//               </div>

//               <div className="col-lg-4">
//                 <label>Member Image</label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={(e) =>
//                     handleFileChange(
//                       e,
//                       "MemberImage",
//                       projectFormik.setFieldValue
//                     )
//                   }
//                 />
//                 {selectedTeamMemberImage && (
//                   <img
//                     src={selectedTeamMemberImage}
//                     alt="Team Member"
//                     className="preview-image"
//                   />
//                 )}
//               </div>

//               <div className="col-lg-12">
//                 <div
//                   onClick={handleAddTeamMember}
//                   className="btn btn-primary mt-2"
//                 >
//                   Add Team Member
//                 </div>
//               </div>

//               <div className="col-lg-12 mt-3">
//                 <h5>Team Members</h5>
//                 {teamMembers.length === 0 && <p>No team members added yet.</p>}
//                 <ul className="list-group">
//                   {teamMembers.map((member, index) => (
//                     <li key={index} className="list-group-item">
//                       <div>
//                         <strong>Name:</strong> {member.MemberName}
//                       </div>
//                       <div>
//                         <strong>Work:</strong> {member.MemberWork}
//                       </div>
//                       {member.MemberImage && (
//                         <img
//                           src={member.MemberImage}
//                           alt={`Team Member ${index}`}
//                           className="preview-image"
//                         />
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-12 mt-3">
//             <button type="submit" className="btn btn-success" disabled={isLoading}>
//               {isLoading ? "Submitting..." : "Submit"}
//             </button>


//           </div>
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
      teamMembers: [{
        MemberImage: "",
        MemberName: "",
        MemberWork: ""
      }],

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
              className={`form-control ${projectFormik.errors.projectName ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.year ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.projectLink ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.clientName ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.date ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.technology ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.description ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.StructuredOurWorkflow ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.imageTitle1 ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.imageContent1 ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.imageTitle2 ? "is-invalid" : ""
                }`}
            />
          </div>

          <div className="col-lg-6">
            <label>Image Content 2</label>
            <textarea
              name="imageContent2"
              value={projectFormik.values.imageContent2}
              onChange={projectFormik.handleChange}
              className={`form-control ${projectFormik.errors.imageContent2 ? "is-invalid" : ""
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
              className={`form-control ${projectFormik.errors.imageTitle3 ? "is-invalid" : ""
                }`}
            />
          </div>

          <div className="col-lg-6">
            <label>Image Content 3</label>
            <textarea
              name="imageContent3"
              value={projectFormik.values.imageContent3}
              onChange={projectFormik.handleChange}
              className={`form-control ${projectFormik.errors.imageContent3 ? "is-invalid" : ""
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
                  className={`form-control ${projectFormik.errors.MemberName ? "is-invalid" : ""
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
                  className={`form-control ${projectFormik.errors.MemberWork ? "is-invalid" : ""
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
  )
}

export default ProjectCreate;


