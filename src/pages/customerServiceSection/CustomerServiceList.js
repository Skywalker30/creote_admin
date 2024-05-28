import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faDatabase, faSearch, faTrash, faPen, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../../API/api.js";

function Customerlist() {
  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    try {
      const response = await api.get("/api/user/customerServiceSection");
      setCustomerList(response.data);
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
        await api.delete(`/api/user/customerServiceSection/${id}`);
        getCustomer();
      }
    } catch (error) {
      console.error("Error deleting Data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter dataList directly based on searchQuery
  const filteredCustomerList = customerList.filter(
    (customer) =>
      ((customer.title && customer.title.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      ) ||
      ((customer.content && customer.content.toLowerCase()) || "").includes(
        searchQuery.toLowerCase()
      )
  );

  const toggleDisplayOnPage = async (_id) => {
    try {
      const updatedCustomerList = customerList.map((customer) => {
        if (customer._id === _id) {
          return { ...customer, displayOnPage: !customer.displayOnPage };
        }
        return customer;
      });
      setCustomerList(updatedCustomerList);

      const customerToUpdate = customerList.find(
        (customer) => customer._id === _id
      );
      const updatedCustomer = {
        ...customerToUpdate,
        displayOnPage: !customerToUpdate.displayOnPage,
      };
      await api.put(`/api/user/customerServiceSection/${_id}`, updatedCustomer);
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
        <h1 className="h3 mb-0 text-gray-800">Customer Service List :</h1>
        <Link
          to="/portal/customerservice-create"
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
                    <th>Title</th>
                    <th>Content</th>
                    <th>ImageSrc</th>
                    <th>Action</th>
                    <th>Display On Page</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomerList.map((customer, index) => (
                    <tr key={customer._id}>
                      <td>{index + 1}</td>
                      <td>{customer.title}</td>
                      <td>{customer.content}</td>
                      <td>
                        <img
                          src={customer.imageSrc}
                          style={{ height: "100px", width: "100px" }}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          to={`/portal/customerservice-edit/${customer._id}`}
                          className="btn btn-info btn-sm mr-1"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <button
                          onClick={() => handleDelete(customer._id)}
                          className="btn btn-danger btn-sm mr-1"
                        >
                           <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleDisplayOnPage(customer._id)}
                          className={`btn btn-sm ${
                            customer.displayOnPage
                              ? "btn-success"
                              : "btn-secondary"
                          }`}
                        >
                          {customer.displayOnPage
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

export default Customerlist;
