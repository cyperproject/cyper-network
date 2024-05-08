"use client";
import { useState } from "react";
import Style from "./ChangeRole.module.css";
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
    UserNameOrID: "",
    RoleName: "",
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
      const token = localStorage.getItem('Token');
      const response = await api.post(`/Admins/AddUserToRole/${formData.UserNameOrID}/${formData.RoleName}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success === false) {
        setError(true);
        return;
      }
      setDone(true);
      setTimeout(() => {
        setDone(false);
      }, 2500);
      setLoading(false);
    } catch (error) {
      Message = "User not existed";
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className={Style.contactForm}>
        <form onSubmit={handleSubmit} className={Style.form}>
          <h2 className={Style.h2}>Change Role</h2>
          <div className={Style.formGroup}>
            <label htmlFor="usernameOrId" className={Style.label}>
              Username:
            </label>
            <input
              placeholder="Username or ID"
              type="text"
              className={Style.formControl}
              id="usernameOrId"
              name="UserNameOrID"
              value={formData.UserNameOrID}
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
                  name="RoleName"
                  value="user"
                  checked={formData.RoleName === "user"}
                  onChange={handleChange}
                  required
                />
                User
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="RoleName"
                  value="admin"
                  checked={formData.RoleName === "admin"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="RoleName"
                  value="engineer"
                  checked={formData.RoleName === "engineer"}
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
              {loading ? "Changing..." : "Change"}
            </button>
          </div>
        </form>
      </div>
      {error && <p className={Style.error}>{Message}</p>}
      {done && <Successful />}
    </>
  );
}
