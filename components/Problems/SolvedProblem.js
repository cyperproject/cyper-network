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
        const response = await api.get(`/Solve/GetSolveDetails`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
         // Add a unique id to each row
         let arr=[response.data]
      const rowsWithIds = arr.map((row, index) => ({
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
    { field: 'ProblemId', headerName: 'ID',type: 'number', width: 100 },
    { field: 'UserName', headerName: 'Eng name', width: 100 },
    { field: 'Description_Problem', headerName: 'Problem', width: 350 },
    { field: 'Description_Solve', headerName: 'Solve', width: 450 },
  ];

  return (
    <div style={{ maxHeight: 600, width: '90%', textAlign: "center", border: "2px solid #4e73df" }}>
      <h1 style={{textTransform: "capitalize"}}>Problem Solve</h1>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
