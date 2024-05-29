import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api";

function HeaderCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const myFormik = useFormik({
        initialValues: {
            location: "",
            email: "",
            phone: ""
        },
        validate: (values) => {
            let errors = {};

            if(!values.location) {
                errors.location = "Please enter a location";
            }else if (values.location.length < 3 || values.location.length > 20) {
            errors.location = "location should be between 3 and 20 characters";
            }

            if (!values.email) {
                errors.email = "Email address is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "Invalid email address";
            }
            
            if (!values.phone) {
                errors.phone = "Phone number is required";
            } else if (!/^\+\d{10}$/.test(values.phone)) {
                errors.phone = "Phone number must start with '+' and be exactly 10 digits long after that";
            }
            return errors;
        },

        onSubmit: async (values) => {
            try{
                setLoading(true);
                const response = await api.post(
                    "api/user/header",
                    values
                );
                navigate("/portal/header-list");
            }catch (error) {
                console.error("Error creating Header data:", error);
                alert("Failed to create Header data. Please try again.");
                setLoading(false);
            }
        }
    });

 return (
    <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
            <div className="row">
                <div className="col-lg-6">
                    <label>Location</label>
                    <input 
                        name="location"
                        value={myFormik.values.location}
                        onChange={myFormik.handleChange}
                        type="text"
                        className={`form-control ${
                            myFormik.errors.location ? "is-invalid" : ""
                        }`}
                        />
                        <span style={{color: "red"}}>{myFormik.errors.location}</span>
                </div>

                <div className="col-lg-4">
                    <label>Email</label>
                    <input 
                        name="email"
                        value={myFormik.values.email}
                        onChange={myFormik.handleChange}
                        type="email"
                        className={`form-control ${
                            myFormik.errors.email ? "is-invalid" : ""
                        }`}
                        />
                        <span style={{color: "red"}}>{myFormik.errors.email}</span>
                </div>

                <div className="col-lg-4">
                    <label>Phone No.</label>
                    <input 
                        name="phone"
                        value={myFormik.values.phone}
                        onChange={myFormik.handleChange}
                        type="text"
                        className={`form-control ${
                            myFormik.errors.phone ? "is-invalid" : ""
                        }`}
                        />
                        <span style={{color: "red"}}>{myFormik.errors.phone}</span>
                </div>

                <div className="col-lg-12 mt-3">
                    <input 
                        disabled={isLoading}
                        type="submit"
                        style={{ margin: "30px"}}
                        value={isLoading ? "Submitting..." : "Create"}
                        className="btn btn-primary"
                        />
                </div>
            </div>
        </form>
    </div>
 )
}

export default HeaderCreate;