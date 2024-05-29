import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../API/api.js";

function HumanResourceCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const myFormik = useFormik({
        initialValues: {
            title: "",
            content: ""
        },
        validate: (values) => {
            let errors = {};

            if(!values.title) {
                errors.title = "Please enter a title";
            }else if (values.title.length < 3 || values.title.length > 20) {
            errors.title = "title should be between 3 and 20 characters";
            }

            if (!values.content){
                errors.content = "Please enter a content";
            }
            return errors;
        },

        onSubmit: async (values) => {
            try{
                setLoading(true);
                const response = await api.post(
                    "api/user/humanResource",
                    values
                );
                navigate("/portal/humanResource-list");
            }catch (error) {
                console.error("Error creating user:", error);
                alert("Failed to create HumanResource data. Please try again.");
                setLoading(false);
            }
        }
    });

 return (
    <div className="container">
        <form onSubmit={myFormik.handleSubmit}>
            <div className="row">
                <div className="col-lg-6">
                    <label>Title</label>
                    <input 
                        name="title"
                        value={myFormik.values.title}
                        onChange={myFormik.handleChange}
                        type="text"
                        className={`form-control ${
                            myFormik.errors.title ? "is-invalid" : ""
                        }`}
                        />
                        <span style={{color: "red"}}>{myFormik.errors.title}</span>
                </div>

                <div className="col-lg-4">
                    <label>Content</label>
                    <input 
                        name="content"
                        value={myFormik.values.content}
                        onChange={myFormik.handleChange}
                        type="text"
                        className={`form-control ${
                            myFormik.errors.content ? "is-invalid" : ""
                        }`}
                        />
                        <span style={{color: "red"}}>{myFormik.errors.content}</span>
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

export default HumanResourceCreate;