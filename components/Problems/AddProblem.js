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
  const [desc, setDesc] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDesc(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const token = localStorage.getItem("Token");
      const response = await api.post(
        `/Problem/CreateProblem`,
        {
          description:desc,
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
          <h2 className={Style.h2}>Add Problem</h2>
              <div className={Style.formGroup}>
                <label htmlFor="description" className={Style.label}>
                Description
                </label>
                <textarea 
                 placeholder="Problem description"
                 className={Style.formtext}
                 id="description"
                 name="description"
                 value={desc}
                 onChange={handleChange}
                 required
                 >
                </textarea>
              </div>
          
          <div className={Style.formGroup}>
            <button type="submit" className={Style.btn} disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
      {error && <p className={Style.error}>{Message}</p>}      
{done && <Successful />}
    </>
  );
}
