
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faTrash, faSearch, faPen, faDatabase, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../../../API/api";

function LogoSectionOurTeamList() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    getData();
    console.log("welcome");
  }, []);

  useEffect(() => {
    const filteredData = dataList.filter(
      (data) =>
        ((data.heading && data.heading.toLowerCase()) || "").includes(
          searchQuery.toLowerCase()
        ) ||
        ((data.content && data.content.toLowerCase()) || "").includes(
          searchQuery.toLowerCase()
        )
    );
    setFilteredDataList(filteredData);
  }, [searchQuery, dataList]);

  let getData = async () => {
    try {
      const data = await api.get("/api/user/logoSectionDataOurTeam");
      setDataList(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the Data?"
      );
      if (confirmDelete) {
        if (id !== undefined) {
          await api.delete(`/api/user/logoSectionDataOurTeam/${id}`);
          getData();
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
      const updatedDataList = dataList.map((data) => {
        if (data._id === _id) {
          return { ...data, displayOnPage: !data.displayOnPage };
        }
        return data;
      });
      setDataList(updatedDataList);

      const dataToUpdate = dataList.find((data) => data._id === _id);
      const updatedData = {
        ...dataToUpdate,
        displayOnPage: !dataToUpdate.displayOnPage,
      };
      await api.put(`/api/user/logoSectionDataOurTeam/${_id}`, updatedData); // Fixed typo here
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
        <h1 className="h3 mb-0 text-gray-800"> Logo Section Data Of OurTeam List :</h1>
        <Link
          to="/portal/logoSectionDataOurTeam-create"
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
                    <th>Heading</th>
                    <th>Content</th>
                    <th>ImageSrc</th>
                    <th>Action</th>
                    <th>Display On Page</th> {/* New column for the flag */}
                  </tr>
                </thead>
                <tbody>
                  {filteredDataList.map((data, index) => (
                    <tr key={data._id}>
                      <td>{index + 1}</td>
                      <td>{data.heading}</td>
                      <td>{data.content}</td>
                      <td>
                        <img
                          src={data.imageSrc}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          to={`/portal/logoSectionDataOurTeam-edit/${data._id}`}
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
                      <td>
                        <button
                          onClick={() => toggleDisplayOnPage(data._id)}
                          className={`btn btn-sm ${
                            data.displayOnPage ? "btn-success" : "btn-secondary"
                          }`}
                        >
                          {data.displayOnPage ? <FontAwesomeIcon icon={faDisplay}/> : <FontAwesomeIcon icon={faDisplay} />}
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

export default LogoSectionOurTeamList;