import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faDatabase, faSearch, faTrash, faPen, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../API/api.js";

function ImageBoxlist() {
  const [imageBoxList, setImageBoxList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getImageBox();
  }, []);

  const getImageBox = async () => {
    try {
      const response = await api.get("/api/user/imageBox");
      setImageBoxList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the Data?"
      );
      if (confirmDelete) {
        await api.delete(`/api/user/imageBox/${id}`);
        getImageBox();
      }
    } catch (error) {
      console.error("Error deleting Data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter dataList directly based on searchQuery
  const filteredImageBoxList = imageBoxList.filter(
    (data) =>
      ((data.title && data.title.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      ) ||
      ((data.content && data.content.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      )
  );

  const toggleDisplayOnPage = async (_id) => {
    try {
      const updatedImageBoxList = imageBoxList.map((data) => {
        if (data._id === _id) {
          return { ...data, displayOnPage: !data.displayOnPage };
        }
        return data;
      });
      setImageBoxList(updatedImageBoxList);

      const imageBoxToUpdate = imageBoxList.find(
        (data) => data._id === _id
      );
      const updatedImageBox = {
        ...imageBoxToUpdate,
        displayOnPage: !imageBoxToUpdate.displayOnPage,
      };
      await api.put(`/api/user/imageBox/${_id}`, updatedImageBox);
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
        <h1 className="h3 mb-0 text-gray-800">ImageBox Service List :</h1>
        <Link
          to="/portal/imageBox-create"
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
                    <th>Video Link</th>
                    <th>Title</th>
                    <th>SubTitle</th>
                    <th>Content</th>
                    <th>Year</th>
                    <th>Percentage</th>
                    <th>Percentage Title</th>
                    <th>Percentage Content</th>
                    <th>Start Year</th>
                    <th>Operating</th>
                    <th>Video Image</th>
                    <th>Logo</th>
                    <th>Action</th>
                    <th>Display On Page</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredImageBoxList.map((data, index) => (
                    <tr key={data._id}>
                      <td>{index + 1}</td>
                      <td>{data.link}</td>
                      <td>{data.title}</td>
                      <td>{data.subTitle}</td>
                      <td>{data.content}</td>
                      <td>{data.year}</td>
                      <td>{data.percentage}</td>
                      <td>{data.percentageTitle}</td>
                      <td>{data.percentageContent}</td>
                      <td>{data.startYear}</td>
                      <td>{data.operating}</td>
                      <td>
                        <img
                          src={data.imageSrc}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <img
                          src={data.logo}
                          style={{ height: "50px", width: "50px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          to={`/portal/imageBox-edit/${data._id}`}
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
                            data.displayOnPage
                              ? "btn-success"
                              : "btn-secondary"
                          }`}
                        >
                          {data.displayOnPage
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

export default ImageBoxlist;
