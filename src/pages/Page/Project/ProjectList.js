import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  faTrash,
  faSearch,
  faPen,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../../API/api";

function ProjectList() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filteredData = dataList.filter((data) =>
      [
        data.projectName,
        data.year,
        data.technology,
        data.date,
        data.description,
        data.clientName,
        data.projectLink
        
      ]
        .filter((item) => item !== undefined && item !== null)
        .some((item) =>
          item.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredDataList(filteredData);
  }, [searchQuery, dataList]);

  const getData = async () => {
    try {
      const response = await api.get("/api/user/Project");
      setDataList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the Data?"
      );
      if (confirmDelete && id !== undefined) {
        await api.delete(`/api/user/Project/${id}`);
        getData();
      }
    } catch (error) {
      console.error(error);
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
        <h1 className="h3 mb-0 text-gray-800"> Project Section Data :</h1>
        <Link
          to="/portal/project-create"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faDatabase} className="creatinguser mr-2" />
          Create Data
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
              alt="Loading"
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
                    <th>Project Name</th>
                    <th>Technology</th>
                    <th>Year</th>
                    <th>Project Link</th>
                    <th>Date</th>
                    <th>Client Name</th>
                    <th>Description</th>
                    <th>Description Image</th>
                    <th>Project Logo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataList.map((data, index) => (
                    <tr key={data._id}>
                      <td>{index + 1}</td>
                      <td>{data.projectName}</td>
                      <td>{data.technology}</td>
                      <td>{data.year}</td>
                      <td>{data.projectLink}</td>
                      <td>{data.date}</td>
                      <td>{data.clientName}</td>
                      <td>{data.description}</td>
                      <td>
                        <img
                          src={data.descriptionImage}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <img
                          src={data.logo}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          to={`/portal/project-edit/${data._id}`}
                          className="btn btn-info btn-sm mr-1"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="btn btn-danger btn-sm mr-1"
                        >
                          <FontAwesomeIcon icon={faTrash} />
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

export default ProjectList;
