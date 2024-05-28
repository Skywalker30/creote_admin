// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { faTrash, faSearch, faPen, faEye, faDisplay } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
// import { api } from "../../API/api.js";
// // import io from "socket.io-client"; // Import Socket.IO client

// function TeamMembersList() {
//   const [userList, setUserList] = useState([]);
//   const [isLoading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredUserList, setFilteredUserList] = useState([]);

//   // useEffect(() => {
//   //   getUsers();
//   //   console.log("welcome");

//   //   // Establish connection to Socket.IO server
//   //   const socket = io("http://localhost:5000"); // Change URL as needed

//   //   // Listen for 'dataUpdated' event from the server
//   //   socket.on("databaseChange", (updatedData) => {
//   //     console.log("Data updated:", updatedData);
//   //     // Update component state with the updated data
//   //     setUserList(updatedData);
//   //   });

//   //   // Clean up socket event listeners when component unmounts
//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, []);

//   useEffect(() => {
//     const filteredUsers = userList.filter(
//       (user) =>
//         ((user.role && user.role.toLowerCase()) || "").includes(
//           searchQuery.toLowerCase()
//         ) ||
//         ((user.name && user.name.toLowerCase()) || "").includes(
//           searchQuery.toLowerCase()
//         )
//     );
//     setFilteredUserList(filteredUsers);
//   }, [searchQuery, userList]);

//   let getUsers = async () => {
//     try {
//       const users = await api.get("/api/creote/teamMembers");
//       setUserList(users.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   let handleDelete = async (id) => {
//     try {
//       const confirmDelete = window.confirm(
//         "Are you sure you want to delete the user?"
//       );
//       if (confirmDelete) {
//         if (id !== undefined) {
//           await api.delete(`/api/user/teamMembers/${id}`);
//           getUsers();
//         } else {
//           console.log("id is undefined");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const toggleDisplayOnPage = async (_id) => {
//     try {
//       const updatedUserList = userList.map((user) => {
//         if (user._id === _id) {
//           return { ...user, displayOnPage: !user.displayOnPage };
//         }
//         return user;
//       });
//       setUserList(updatedUserList);

//       const userToUpdate = userList.find((user) => user._id === _id);
//       const updatedUser = {
//         ...userToUpdate,
//         displayOnPage: !userToUpdate.displayOnPage,
//       };
//       await api.put(`/api/user/teamMembers/${_id}`, updatedUser); // Fixed typo here
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//       <form className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
//         <div className="input-group">
//           <input
//             type="text"
//             className="form-control bg-light border-0 small"
//             placeholder="Search for..."
//             aria-label="Search"
//             aria-describedby="basic-addon2"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//           <div className="input-group-append">
//             <button className="btn btn-primary" type="button">
//               <FontAwesomeIcon icon={faSearch} />
//             </button>
//           </div>
//         </div>
//       </form>
//       <div className="d-sm-flex align-items-center justify-content-between mb-4">
//         <h1 className="h3 mb-0 text-gray-800">TeamMembers List :</h1>
//         <Link
//           to="/portal/teammembers-user"
//           className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
//         >
//           <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
//           Create TeamMember
//         </Link>
//       </div>
//       <div className="card shadow mb-4">
//         <div className="card-header py-3">
//           <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
//         </div>
//         <div className="card-body">
//           {isLoading ? (
//             <img
//               src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif"
//               alt=""
//             />
//           ) : (
//             <div className="table-responsive">
//               <table
//                 className="table table-bordered"
//                 id="dataTable"
//                 width="100%"
//                 cellSpacing="0"
//               >
//                 <thead>
//                   <tr>
//                     <th>Sr.No</th>
//                     <th>Name</th>
//                     <th>Role</th>
//                     <th>ImageSrc</th>
//                     <th>Action</th>
//                     <th>Display On Page</th> {/* New column for the flag */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUserList.map((user, index) => (
//                     <tr key={user._id}>
//                       <td>{index + 1}</td>
//                       <td>{user.name}</td>
//                       <td>{user.role}</td>
//                       <td>
//                         <img
//                           src={user.imageSrc}
//                           style={{ height: "100px", width: "100px" }}
//                           alt=""
//                         />
//                       </td>
//                       <td>
//                         <Link
//                           to={`/portal/teammembers-view/${user._id}`}
//                           className="btn btn-primary btn-sm mr-1"
//                         >
//                           <FontAwesomeIcon icon={faEye} />
//                         </Link>
//                         <Link
//                           to={`/portal/teammembers-edit/${user._id}`}
//                           className="btn btn-info btn-sm mr-1"
//                         >
//                           <FontAwesomeIcon icon={faPen} />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           className="btn btn-danger btn-sm mr-1"
//                         >
//                            <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => toggleDisplayOnPage(user._id)}
//                           className={`btn btn-sm ${
//                             user.displayOnPage ? "btn-success" : "btn-secondary"
//                           }`}
//                         >
//                           {user.displayOnPage ? <FontAwesomeIcon icon={faDisplay}/> : <FontAwesomeIcon icon={faDisplay} />}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeamMembersList;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faTrash, faSearch, faPen, faEye, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { api } from "../../API/api.js";

function TeamMembersList() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);

  useEffect(() => {
    getUsers();
    console.log("welcome");
  }, []);

  useEffect(() => {
    const filteredUsers = userList.filter(
      (user) =>
        ((user.role && user.role.toLowerCase()) || "").includes(
          searchQuery.toLowerCase()
        ) ||
        ((user.name && user.name.toLowerCase()) || "").includes(
          searchQuery.toLowerCase()
        )
    );
    setFilteredUserList(filteredUsers);
  }, [searchQuery, userList]);

  let getUsers = async () => {
    try {
      const users = await api.get("/api/creote/teamMembers");
      setUserList(users.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the user?"
      );
      if (confirmDelete) {
        if (id !== undefined) {
          await api.delete(`/api/user/teamMembers/${id}`);
          getUsers();
        } else {
          console.log("id is undefined");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDisplayOnPage = async (_id) => {
    try {
      const updatedUserList = userList.map((user) => {
        if (user._id === _id) {
          return { ...user, displayOnPage: !user.displayOnPage };
        }
        return user;
      });
      setUserList(updatedUserList);

      const userToUpdate = userList.find((user) => user._id === _id);
      const updatedUser = {
        ...userToUpdate,
        displayOnPage: !userToUpdate.displayOnPage,
      };
      await api.put(`/api/user/teamMembers/${_id}`, updatedUser); // Fixed typo here
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <form className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </form>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">TeamMembers List :</h1>
        <Link
          to="/portal/teammembers-user"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create TeamMember
        </Link>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img
              src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif"
              alt=""
            />
          ) : (
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>ImageSrc</th>
                    <th>Action</th>
                    <th>Display On Page</th> {/* New column for the flag */}
                  </tr>
                </thead>
                <tbody>
                  {filteredUserList.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>
                        <img
                          src={user.imageSrc}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          to={`/portal/teammembers-view/${user._id}`}
                          className="btn btn-primary btn-sm mr-1"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                        <Link
                          to={`/portal/teammembers-edit/${user._id}`}
                          className="btn btn-info btn-sm mr-1"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-danger btn-sm mr-1"
                        >
                           <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleDisplayOnPage(user._id)}
                          className={`btn btn-sm ${
                            user.displayOnPage ? "btn-success" : "btn-secondary"
                          }`}
                        >
                          {user.displayOnPage ? <FontAwesomeIcon icon={faDisplay}/> : <FontAwesomeIcon icon={faDisplay} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMembersList;