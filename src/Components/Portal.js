import React , {useContext} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import Topbar from "../pages/Topbar";
import Userlist from "../pages/teammembers/TeamMembersList";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

function Portal() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }


  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* <Topbar /> */}
            <div className="container-fluid mt-2 border-4">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portal;