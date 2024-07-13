/** @format */

import { useEffect } from "react";
import Header from "../common/Header";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const formSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:4000/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      toast.success("User updated successfully.");
      navigate("/users");
    } catch (error) {
      toast.error(`Failed to update user: ${error.message}`);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/users");

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error: ${errorData.message || res.statusText}`);
      }

      const data = await res.json();
      // Handle your data here
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error(`Failed to fetch users: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row py-4">
          <div className="col-md-6">
            <h3>Users / Edit</h3>
          </div>
          <div className="col-md-6 text-end">
            <Link to="/users" className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
        <div className="card border-0 shadow p-3">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-3">
              <label>Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter Name"
              />
              {errors.name && (
                <p className="invalid-feedback">This field is required</p>
              )}
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="invalid-feedback">{errors.email?.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label>Mobile</label>
              <input
                {...register("mobile", { required: true })}
                type="text"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                placeholder="Enter Mobile"
              />
              {errors.mobile && (
                <p className="invalid-feedback">This field is required</p>
              )}
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
