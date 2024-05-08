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
  const [formData, setFormData] = useState({
    points_not_working: "",
    points_work: "",
    nom_of_points: "",
    switch: "",
    room_name: "",
    departement: "",
    room_nom: "",
    round: "",
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
      const response = await api.post(
        `/DataCollage/CreateDataCollage`,
        {
          points_not_working: formData.points_not_working,
          points_work: formData.points_work,
          nom_of_points: formData.nom_of_points,
          switch: formData.switch,
          room_name: formData.room_name,
          departement: formData.departement,
          room_nom: formData.room_nom,
          round: formData.round,
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
          <h2 className={Style.h2}>Add Data</h2>
              <div className={Style.formGroup}>
                <label htmlFor="points_not_working" className={Style.label}>
                  Points not working
                </label>
                <input
                  placeholder="points_not_working"
                  type="text"
                  className={Style.formControl}
                  id="points_not_working"
                  name="points_not_working"
                  value={formData.points_not_working}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="points_work" className={Style.label}>
                  Points work
                </label>
                <input
                  placeholder="points_work"
                  type="number"
                  className={Style.formControl}
                  id="points_work"
                  name="points_work"
                  value={formData.points_work}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="nom_of_points" className={Style.label}>
                  Nom of points
                </label>
                <input
                  placeholder="nom_of_points"
                  type="number"
                  className={Style.formControl}
                  id="nom_of_points"
                  name="nom_of_points"
                  value={formData.nom_of_points}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="switch" className={Style.label}>
                  Switch
                </label>
                <input
                  placeholder="switch"
                  type="text"
                  className={Style.formControl}
                  id="switch"
                  name="switch"
                  value={formData.switch}
                  onChange={handleChange}
                  required
                />
              </div>
            
              <div className={Style.formGroup}>
                <label htmlFor="room_name" className={Style.label}>
                  Room name
                </label>
                <input
                  placeholder="room_name"
                  type="text"
                  className={Style.formControl}
                  id="room_name"
                  name="room_name"
                  value={formData.room_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="departement" className={Style.label}>
                  Departement
                </label>
                <input
                  placeholder="departement"
                  type="text"
                  className={Style.formControl}
                  id="departement"
                  name="departement"
                  value={formData.departement}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="room_nom" className={Style.label}>
                  Room nom
                </label>
                <input
                  placeholder="room_nom"
                  type="text"
                  className={Style.formControl}
                  id="room_nom"
                  name="room_nom"
                  value={formData.room_nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="round" className={Style.label}>
                  Round
                </label>
                <input
                  placeholder="round"
                  type="text"
                  className={Style.formControl}
                  id=""
                  name="round"
                  value={formData.round}
                  onChange={handleChange}
                  required
                />
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
