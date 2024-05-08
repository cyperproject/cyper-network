"use client";
import { useState } from "react";
import Style from "./AddData.module.css";
import { useRouter } from "next/navigation";
import api from "@/components/API/api";
import Successful from "@/components/Successful/Successful";

export default function AddData() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [id, setId] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const token = localStorage.getItem("Token");
      const response = await api.delete(
        `/DataCollage/DeleteDataCollage/${id}`,
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
          <h2 className={Style.h2}>Delete Data</h2>
              <div className={Style.formGroup}>
                <label htmlFor="id" className={Style.label}>
                  Id
                </label>
                <input
                  placeholder="Id of delete data"
                  type="number"
                  className={Style.formControl}
                  id="id"
                  name="id"
                  value={id}
                  onChange={handleChange}
                  required
                />
              </div>

          <div className={Style.formGroup}>
            <button type="submit" className={Style.btn} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
      {error && <p className={Style.error}>{Message}</p>}      
{done && <Successful />}
    </>
  );
}
