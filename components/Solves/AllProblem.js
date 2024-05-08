"use client"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Datacollage.css'; 
import api from "@/components/API/api";

export default function AllProblem({ role }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await api.get(`/Problem/GetAllProblems`, {
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
    { field: 'Id', headerName: 'ID',type: 'number', width: 150 },
    { field: 'UserName', headerName: 'Username', width: 150 },
    { field: 'Description', headerName: 'Problem description', width: 590 },
  ];

  return (
    <div style={{ maxHeight: 600, width: '80%', textAlign: "center", border: "2px solid #4e73df" }}>
      <h1 style={{textTransform: "capitalize"}}>All problem</h1>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
