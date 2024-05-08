"use client";
import { useState } from "react";
import Style from "./SignUp.module.css";
import { useRouter } from "next/navigation";
import api from "@/components/API/api";
import Successful from "@/components/Successful/Successful";

let Message;
export default function SignUp() {

  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const token = localStorage.getItem("Token");
      const response = await api.post(`/Auth/registerwithRole?role=${formData.role}`, {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      console.log(response.data);
      setLoading(false);
      if (response.data.success === false) {
        setError(true);
        return;
      }
      setDone(true);
      setTimeout(() => {
        setDone(false);
      }, 2500);
    } catch (error) {
      Message = error.response.data;
      console.log(error.response.data);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className={Style.contactForm}>
        <form onSubmit={handleSubmit} className={Style.form}>
          <h2 className={Style.h2}>Sign Up</h2>
          <div className={Style.formGroup}>
            <label htmlFor="fullName" className={Style.label}>
              First Name:
            </label>
            <input
              placeholder="fullName"
              type="text"
              className={Style.formControl}
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Style.formGroup}>
            <label htmlFor="username" className={Style.label}>
              Username:
            </label>
            <input
              placeholder="Username"
              type="text"
              className={Style.formControl}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Style.formGroup}>
            <label htmlFor="email" className={Style.label}>
              Email:
            </label>
            <input
              placeholder="Email"
              type="email"
              className={Style.formControl}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Style.formGroup}>
            <label htmlFor="password" className={Style.label}>
              Password:
            </label>
            <input
              placeholder="Password"
              type="password"
              className={Style.formControl}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/*  */}
          <div className={Style.formGroup}>
            <label className={Style.label}>Role:</label>
            <div className={Style.radioContainer}>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                User
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="engineer"
                  checked={formData.role === "engineer"}
                  onChange={handleChange}
                />
                Engineer
              </label>
            </div>
            </div>
          </div>
          {/*  */}
          <div className={Style.formGroup}>
            <button
              type="submit"
              className={Style.btn}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      {error && <p className={Style.error}>{Message}</p>}
      {done && <Successful />}
    </>
  );
}