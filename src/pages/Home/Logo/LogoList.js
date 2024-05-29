import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faDatabase, faSearch, faTrash, faPen, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../../API/api.js";

function LogoList() {
    const [logoList, setLogoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getLogo();
    }, []);

    const getLogo = async () => {
        try {
            const response = await api.get("/api/user/logo");
            setLogoList(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm (
                "Are you sure you want to delete the Data?"
            );
            if (confirmDelete) {
                await api.delete(`/api/user/logo/${id}`);
                getLogo();
            }
        } catch (error) {
            console.log("Error deleting data:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

    const toggleDisplayOnPage = async (_id) => {
        try {
            const updatedLogoList = logoList.map((logo) => {
                if (logo._id === _id) {
                    return { ...logo, displayOnPage: !logo.displayOnPage };
                }
                return logo;
            });
            setLogoList(updatedLogoList);

            const logoToUpdate = logoList.find(
                (logo) => logo._id  === _id
            );
            const updatedLogo = {
                ...logoToUpdate,
                displayOnPage: !logoToUpdate.displayOnPage,
            };
            await api.put(`/api/user/logo/${_id}`, updatedLogo);
        } catch (error) {
            console.log(error);
        }
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
        <h1 className="h3 mb-0 text-gray-800">Logo List :</h1>
        <Link
          to="/portal/logo-create"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faDatabase} className="creatinguser mr-2" />
          Create Logo
        </Link>
        </div>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">LogoTables</h6>
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
                                    <th>Logo</th>
                                    <th>Action</th>
                                    <th>Display On Page</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logoList.map((logo, index) => (
                                    <tr key={logo._id}>
                                        <td>{index +1}</td>
                                        <td>
                                            <img 
                                               src={logo.imageSrc}
                                               style={{ height: "100px", width: "100px" }}
                                               alt=""
                                               />
                                        </td>
                                        <td>
                                            <Link
                                              to={`/portal/logo-edit/${logo._id}`}
                                              className="btn btn-info btn-sm mr-1"
                                              >
                                                <FontAwesomeIcon icon={faPen} />
                                              </Link>
                                              <button
                                               onClick={() => handleDelete(logo._id)}
                                               className="btn btn-danger btn-sm mr-1"
                                               >
                                                <FontAwesomeIcon icon={faTrash} />
                                               </button>
                                        </td>
                                        <td>
                                            <button
                                              onClick={() => toggleDisplayOnPage(logo._id)}
                                              className={`btn btn-sm ${
                                                logo.displayOnPage
                                                 ? "btn-success"
                                                 : "btn-secondary"
                                              }`}
                                              >
                                                {logo.displayOnPage
                                                  ? <FontAwesomeIcon icon={faDisplay}/> : <FontAwesomeIcon icon={faDisplay} />}
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

export default LogoList;