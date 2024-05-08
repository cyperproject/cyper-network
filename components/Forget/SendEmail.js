"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import  Style  from "./SendEmail.module.css";

let Message
export default function SendEmail() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailForm, setEmailForm] = useState("");
  const handleChange = (event) => {
    setEmailForm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const email = encodeURIComponent(emailForm);
      const response = await axios.post(`http://localhost:5084/api/Auth/SendResetPassword?Email=${email}`);
      console.log(response.data);
      if(response.data=="UserNotFound"){
        Message = response.data;
        setError(true);
        setLoading(false);
        return;
      }
      localStorage.setItem("email",email)
      setLoading(false);
      router.push("/EnterCode");
    } catch (error) {
      console.log(error.response.data); 
      setLoading(false);
    }
  };
  return (
    <>
<div className={Style.body}>
      <form onSubmit={handleSubmit} className={Style.container}>
        <h2 className={Style.h2}>Enter e-mail account...</h2>
        <div>
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email" // Change from "Email" to "email"
            value={emailForm}
            required
            onChange={handleChange}
            className={Style.input}
          />
        </div>
      {error && <p className={Style.error}>{Message}</p>}
        <div>
          <button type="submit" disabled={loading} className={Style.submit}>
            {loading ? "Sending..." : "Send code"}
          </button>
        </div>
      </form>
      </div>
    </>
  );
}
