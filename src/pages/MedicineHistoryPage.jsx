import React, { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { getHistory } from "../api/api.js";
import { useNavigate } from "react-router";
import { LOGIN_URL } from "../api/url.js";

const MedicineHistoryPage = () => {
    const [historyData, setHistoryData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHistory().then((res) => {
            if (res.status === 401) {
                navigate(LOGIN_URL);
            } else if (res.status === 200) {
                return res.json();
            }
        }).then(data => {
            setHistoryData(data);
        }).catch(error => {
            console.error(error.message);
        })
    }, [navigate]);

    // Function to format the time to "yyyy-MM-dd hh:mm"
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Medicine history
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                                Medication Title
                            </TableCell>
                            <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                                Time
                            </TableCell>
                            <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
                                State
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historyData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.medicationTitle}</TableCell>
                                <TableCell>{formatDateTime(item.time)}</TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {item.state === "taken" ? (
                                            <>
                                                <IconButton style={{ color: "green" }}>
                                                    <CheckCircle />
                                                </IconButton>
                                                <Typography variant="body2" style={{ marginLeft: 8, color: 'green' }}>
                                                    Taken
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton style={{ color: "red" }}>
                                                    <Cancel />
                                                </IconButton>
                                                <Typography variant="body2" style={{ marginLeft: 8, color: 'red' }}>
                                                    Skipped
                                                </Typography>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MedicineHistoryPage;
