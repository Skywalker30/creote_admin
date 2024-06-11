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

function CVList() {
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
        data.name,
        data.yrOfExp,
        data.companyCurrentDate,
        data.companyName,
        data.introduction,
        data.collegeName,
        data.startYearCollege,
        data.passingYearCollege,
        data.degree,
        data.collegePercentage,
        data.contract,
        data.companyJoiningDate,
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
      const response = await api.get("/api/user/CV");
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
        await api.delete(`/api/user/CV/${id}`);
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
        <h1 className="h3 mb-0 text-gray-800"> CV Section Data :</h1>
        <Link
          to="/portal/cv-create"
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
                    <th>Name</th>
                    <th>Company Name</th>
                    <th>Years Of Experience</th>
                    <th>Company Joining Date</th>
                    <th>Company Current Date</th>
                    <th>Introduction</th>
                    <th>College Name</th>
                    <th>Degree</th>
                    <th>Start Year College</th>
                    <th>Passing Year College</th>
                    <th>College Percentage</th>
                    <th>Contract</th>
                    <th>Strength</th>
                    <th>Time-Zone</th>
                    <th>Client-Visit</th>
                    <th>Migration-Visit</th>
                    <th>Developer</th>
                    <th>Language known</th>
                    <th>Communication</th>
                    <th>SUMMARY Point</th>
                    <th>Title</th>
                    <th>Position</th>
                    <th>Position Point</th>
                    <th>Technology</th>
                    <th>ImageSrc</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataList.map((data, index) => (
                    <tr key={data._id}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.companyName}</td>
                      <td>{data.yrOfExp}</td>
                      <td>{data.companyJoiningDate}</td>
                      <td>{data.companyCurrentDate}</td>
                      <td>{data.introduction}</td>
                      <td>{data.collegeName}</td>
                      <td>{data.degree}</td>
                      <td>{data.startYearCollege}</td>
                      <td>{data.passingYearCollege}</td>
                      <td>{data.collegePercentage}</td>
                      <td>{data.contract}</td>
                      <td>{data.strength}</td>
                      <td>{data.TimeZone}</td>
                      <td>{data.ClientVisit}</td>
                      <td>{data.MigrationVisit}</td>
                      <td>{data.developer}</td>
                      <td>{data.language}</td>
                      <td>{data.Communication}</td>
                      <td>{data.Point}</td>
                      <td>{data.title}</td>
                      <td>{data.position}</td>
                      <td>{data.keyPoint}</td>
                      <td>{data.technology}</td>
                      <td>
                        <img
                          src={data.imageSrc}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          to={`/portal/cv-edit/${data._id}`}
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

export default CVList;
