import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../../API/api";

function TeamMembersView() {
  const params = useParams();
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getUsers();
    console.log("welcome to userview");
  }, []);

  let getUsers = async () => {
    try {
      const users = await api.get(`/api/user/teamMembers/${params.id}`);
      // console.log(user);
      setUserList(users.data);
      // console.log(userList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };

  return (
    <>
      {/* <div>UserView - {params.id}</div> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">UserView</h6>
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
                    <th>Id</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{params.id}</td>
                    <td> {userList.name} </td>
                    <td>{userList.role}</td>
                    <td>
                      <img
                        src={userList.imageSrc}
                        style={{ height: "100px", width: "100px" }}
                        alt=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TeamMembersView;
