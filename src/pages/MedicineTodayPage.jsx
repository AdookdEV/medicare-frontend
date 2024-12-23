import { Box, Button, Card, CardContent, Checkbox, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalPharmacy, EventAvailable, CheckCircle, CheckBoxOutlineBlank } from "@mui/icons-material"; // New icons

const convertCronToTime = (cron) => {
    // Dummy function to convert cron to readable time format (You can implement real conversion)
    return "2:00 PM"; // For demo purposes
};

const MedicineTodayPage = () => {
    const [medications, setMedications] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [snackMessage, setSnackMessage] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);

    useEffect(() => {
        // Replace with actual API call
        const fetchedMedications = [
            {
                "id": 1,
                "scheduleType": "MULTIPLE_TIMES_DAY",
                "entries": [
                    { "cron": "0 14 * * *", "dose": 2 },
                    { "cron": "0 18 * * *", "dose": 1 }
                ],
                "title": "Aspirin",
                "unitId": 2
            },
            {
                "id": 2,
                "scheduleType": "MULTIPLE_TIMES_DAY",
                "entries": [{ "cron": "13 17 * * *", "dose": 4 }],
                "title": "Asparkam",
                "unitId": 4
            },
            {
                "id": 3,
                "scheduleType": "MULTIPLE_TIMES_DAY",
                "entries": [
                    { "cron": "10 20 * * *", "dose": 3 },
                    { "cron": "20 18 * * *", "dose": 2 }
                ],
                "title": "Diacarb",
                "unitId": 2
            }
        ];
        const fetchedAppointments = [
            { id: 1, title: "Doctor's Visit", time: '10:00 AM' },
            { id: 2, title: "Physiotherapy Appointment", time: '2:00 PM' }
        ];

        setMedications(fetchedMedications);
        setAppointments(fetchedAppointments);
    }, []);

    const handleMarkMedicationTaken = (medicationId) => {
        // Remove the medication from the list after marking it as taken
        setMedications((prevMedications) => prevMedications.filter((med) => med.id !== medicationId));
        setSnackMessage('Medication marked as taken');
        setSnackOpen(true);
    };

    const handleMarkAppointmentVisited = (appointmentId) => {
        // Remove the appointment from the list after marking it as visited
        setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== appointmentId));
        setSnackMessage('Appointment marked as visited');
        setSnackOpen(true);
    };

    const handleCloseSnack = () => {
        setSnackOpen(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            {/* Medications Section */}
            {medications.length > 0 && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Medications for Today
                    </Typography>
                    <Grid container spacing={3}>
                        {medications.map((med) => (
                            <Grid item xs={12} sm={6} md={4} key={med.id}>
                                <Card sx={{
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' },
                                    boxShadow: 3,
                                    borderRadius: 2
                                }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <LocalPharmacy sx={{ fontSize: 40, color: 'primary.main' }} />
                                            <Typography variant="h6" sx={{ marginLeft: 2 }}>{med.title}</Typography>
                                        </Box>
                                        {med.entries.map((entry, index) => (
                                            <Typography key={index}>
                                                Dose: {entry.dose} {med.unitId} at {convertCronToTime(entry.cron)}
                                            </Typography>
                                        ))}
                                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 2 }}>
                                            <Checkbox
                                                onChange={() => handleMarkMedicationTaken(med.id)}
                                                icon={<CheckBoxOutlineBlank />}
                                                checkedIcon={<CheckCircle sx={{ color: 'green' }} />}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {/* Appointments Section */}
            {appointments.length > 0 && (
                <>
                    <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
                        Appointments for Today
                    </Typography>
                    <Grid container spacing={3}>
                        {appointments.map((appointment) => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                <Card sx={{
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' },
                                    boxShadow: 3,
                                    borderRadius: 2
                                }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <EventAvailable sx={{ fontSize: 40, color: 'primary.main' }} />
                                            <Typography variant="h6" sx={{ marginLeft: 2 }}>{appointment.title}</Typography>
                                        </Box>
                                        <Typography>Time: {appointment.time}</Typography>
                                        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleMarkAppointmentVisited(appointment.id)}
                                                startIcon={<CheckCircle />}
                                            >
                                                Mark as Visited
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {/* Message for No Medications or Appointments */}
            {medications.length === 0 && appointments.length === 0 && (
                <Typography variant="h5" sx={{ marginTop: 4, color: 'gray' }}>
                    No medications or appointments available today.
                </Typography>
            )}

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                message={snackMessage}
            />
        </Box>
    );
};

export default MedicineTodayPage;
