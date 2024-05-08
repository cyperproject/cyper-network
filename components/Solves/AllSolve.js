"use client"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Datacollage.css'; 
import api from "@/components/API/api";

export default function SolvedProblem() {
  const [rows, setRows] = useState([]);
  const [id,setId]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        const response = await api.get(`/Solve/GetAllSolves`, {
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
  }, [id]);

  const columns = [
    { field: 'Id', headerName: 'Solving ID',type: 'number', width: 100 },
    { field: 'ProblemId', headerName: 'Problem ID',type: 'number', width: 100 },
    { field: 'UserName', headerName: 'Eng name', width: 150 },
    { field: 'Description', headerName: 'Solve', width: 580 },
  ];

  return (
    <div style={{ maxHeight: 600, width: '85%', textAlign: "center", border: "2px solid #4e73df" }}>
      <h1 style={{textTransform: "capitalize"}}>All solved problems</h1>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
