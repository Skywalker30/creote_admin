import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faDatabase, faSearch, faTrash, faPen, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../API/api.js";

function BlogList() {
  const [blogList, setBlogList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const response = await api.get("/api/user/blog");
      setBlogList(response.data);
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
        await api.delete(`/api/user/blog/${id}`);
        getBlog();
      }
    } catch (error) {
      console.error("Error deleting Data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredDataList = blogList.filter(
    (data) =>
      ((data.imageTitle && data.imageTitle.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      ) ||
      ((data.content && data.content.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      ) ||
      ((data.heading && data.heading.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      ) ||
      ((data.name && data.name.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      ) ||
      ((data.date && data.date.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      )
  );

  const toggleDisplayOnPage = async (_id) => {
    try {
      const updatedDataList = blogList.map((data) => {
        if (data._id === _id) {
          return { ...data, displayOnPage: !data.displayOnPage };
        }
        return data;
      });
      setBlogList(updatedDataList);

      const DataToUpdate = blogList.find(
        (data) => data._id === _id
      );
      const updateddata = {
        ...DataToUpdate,
        displayOnPage: !DataToUpdate.displayOnPage,
      };
      await api.put(`/api/user/blog/${_id}`, updateddata);
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
        <h1 className="h3 mb-0 text-gray-800">Blog Section List :</h1>
        <Link
          to="/portal/blog-create"
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
                    <th>Name</th>
                    <th>Date</th>
                    <th>Image Title</th>
                    <th>Heading</th>
                    <th>Content</th>
                    <th>ImageSrc</th>
                    <th>Profile Image</th>
                    <th>Action</th>
                    <th>Display On Page</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDataList.map((data, index) => (
                    <tr key={data._id}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{formatDate(data.date)}</td>
                      <td>{data.imageTitle}</td>
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
                        <img
                          src={data.profilePic}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          to={`/portal/blog-edit/${data._id}`}
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
                          <FontAwesomeIcon icon={faDisplay} />
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

export default BlogList;
