"use client"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Datacollage.css'; 
import api from "@/components/API/api";

export default function Datacollage({ role }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await api.get(`/DataCollage/GetDataCollageDetails`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
         // Add a unique id to each row
      const rowsWithIds = response.data.map((row, index) => ({
        ...row,
        id: index + 1 // Assuming index starts from 0, you might need to adjust if not
      }));
      setRows(rowsWithIds);
      // setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [role]);

  const columns = [
    { field: 'Id', headerName: 'ID',type: 'number', width: 130 },
    { field: 'Points_not_working', headerName: 'Points not working', width: 70 },
    { field: 'Points_work', headerName: 'Points Work',type: 'number', width: 130 },
    { field: 'Nom_of_points', headerName: 'Num of ports',type: 'number', width: 130 },
    { field: 'Switch', headerName: 'His switch', width: 90},
    { field: 'Room_name', headerName: 'Room name', width: 90},
    { field: 'Departement', headerName: 'Department', width: 90},
    { field: 'Room_nom', headerName: 'Room num', width: 90},
    { field: 'Round', headerName: 'Round', width: 90},
  ];

  return (
    <div style={{ height: 600, width: '90%', textAlign: "center", border: "2px solid #4e73df" }}>
      <h1 style={{textTransform: "capitalize"}}>{role}</h1>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
