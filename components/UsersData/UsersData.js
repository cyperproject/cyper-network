"use client"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './UsersData.css'; 
import api from "@/components/API/api";

export default function UsersData({ role }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await api.get(`/Admins/GetAllUserByRoleName/${role}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [role]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 360 },
    { field: 'username', headerName: 'Username', width: 200 },
  ];

  return (
    <div style={{ height: 500, width: 560, textAlign: "center", border: "2px solid #4e73df" }}>
      <h1 style={{textTransform: "capitalize"}}>{role}</h1>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
