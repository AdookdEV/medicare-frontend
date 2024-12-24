import { Box, Card, CardContent, Checkbox, Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalPharmacy, EventAvailable, SkipNext } from "@mui/icons-material";
import {
    getMedicationUnits,
    markMedicationTakenAPI,
    skipMedicationAPI,
    skipAppointmentAPI,
    getMedicationRemindersToday, deleteScheduleData
} from "../api/api.js";
import { useNavigate } from "react-router";
import { LOGIN_URL } from "../api/url.js";
import parser from "cron-parser";

const convertCronToTime = (cron) => {
    let interval = parser.parseExpression(cron);
    let cronDate = interval.next();
    let minutes = cronDate.getMinutes().toString().padStart(2, "0");
    let hours = cronDate.getHours().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

const MedicineTodayPage = () => {
    const [medicationsForToday, setMedicationsForToday] = useState([]);
    const [appointmentsForToday, setAppointmentsForToday] = useState([]);
    const [availableUnits, setAvailableUnits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedMedications = [
            {
                id: 6,
                scheduleType: "MULTIPLE_TIMES_DAY",
                entries: [
                    { id: 1, cron: "11 5 * * *", dose: 4, nextDateTime: "2024-12-25T05:11:00", taken: false },
                ],
                title: "Paracetamol",
                unitId: 2,
            },
        ];

        getMedicationRemindersToday().then(response => {
            if (response.status === 401) {
                navigate(LOGIN_URL)
            } else if (response.status === 200) {
                return response.json();
            }
            console.error(response.body);
        }).then(data => {
            console.log(data)
            setMedicationsForToday(data);
        }).catch(error => {
            console.error(error.message);
        })

        const fetchedAppointments = [
            // { id: 1, title: "Doctor's Visit", time: "10:00 AM" },
            // { id: 2, title: "Physiotherapy Appointment", time: "2:00 PM" },
        ];

        initUnits();

        // setMedicationsForToday(fetchedMedications);
        setAppointmentsForToday(fetchedAppointments);
    }, []);

    const initUnits = () => {
        const token = localStorage.getItem("accessToken");
        getMedicationUnits(token)
            .then((response) => {
                if (response.status === 401) {
                    navigate(LOGIN_URL);
                    return;
                }
                if (response.status === 200) {
                    return response.json();
                }
                console.error(response.body);
            })
            .then((data) => {
                setAvailableUnits(data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const findUnitById = (unitId) => {
        return availableUnits.find((unit) => unitId === unit.id);
    };

    const handleToggleTaken = (medicationId, entryId) => {
        deleteScheduleData(entryId);
        markMedicationTakenAPI(medicationId)
            .then(response => {
                if (response.status === 401) {
                    navigate(LOGIN_URL);
                } else if (response.status !== 200) {
                    console.error(response.body);
                }
            })
            .then(() => {
                setMedicationsForToday((prevMedications) =>
                    prevMedications
                        .map((medication) => {
                            if (medication.id === medicationId) {
                                const updatedEntries = medication.entries.map((entry) =>
                                    entry.id === entryId ? { ...entry, taken: true } : entry
                                );
                                // Remove the card if all entries are taken
                                const allTaken = updatedEntries.every((entry) => entry.taken);
                                return allTaken ? null : { ...medication, entries: updatedEntries };
                            }
                            return medication;
                        })
                        .filter(Boolean)
                );
            })
            .catch((error) => {
                console.error("Failed to mark medication as taken:", error);
            });
    };

    const handleSkipMedication = (medicationId, entryId) => {
        deleteScheduleData(entryId);
        skipMedicationAPI(medicationId)
            .then(() => {
                setMedicationsForToday((prevMedications) =>
                    prevMedications
                        .map((medication) => {
                            if (medication.id === medicationId) {
                                const updatedEntries = medication.entries.filter((entry) => entry.id !== entryId);
                                return updatedEntries.length > 0 ? { ...medication, entries: updatedEntries } : null;
                            }
                            return medication;
                        })
                        .filter(Boolean)
                );
            })
            .catch((error) => {
                console.error("Failed to skip medication:", error);
            });
    };

    const handleSkipAppointment = (appointmentId) => {
        // Send API request to skip appointment
        skipAppointmentAPI(appointmentId)
            .then(() => {
                setAppointmentsForToday((prevAppointments) =>
                    prevAppointments.filter((appointment) => appointment.id !== appointmentId)
                );
            })
            .catch((error) => {
                console.error("Failed to skip appointment:", error);
            });
    };

    return (
        <Box sx={{ padding: 3 }}>
            {/* Medications Section */}
            {medicationsForToday.length > 0 && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Medications for Today
                    </Typography>
                    <Grid container spacing={3}>
                        {medicationsForToday.map((med) => (
                            <Grid item xs={12} sm={6} md={4} key={med.id}>
                                <Card
                                    sx={{
                                        transition: "transform 0.3s ease-in-out",
                                        "&:hover": { transform: "scale(1.05)" },
                                        boxShadow: 3,
                                        borderRadius: 2,
                                    }}
                                >
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <LocalPharmacy sx={{ fontSize: 40, color: "primary.main" }} />
                                            <Typography variant="h6" sx={{ marginLeft: 2 }}>
                                                {med.title}
                                            </Typography>
                                        </Box>
                                        {med.entries.map((entry) => (
                                            <Box key={entry.id} display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                                                <Checkbox
                                                    // checked={entry.taken}
                                                    onChange={() => handleToggleTaken(med.id, entry.id)}
                                                    color="success"
                                                    // disabled={entry.taken}
                                                />
                                                <Typography fontSize={15}>
                                                    {entry.dose} {findUnitById(med.unitId)?.name} at {convertCronToTime(entry.cron)}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleSkipMedication(med.id, entry.id)}
                                                    startIcon={<SkipNext />}
                                                    sx={{ marginLeft: 2 }}
                                                >
                                                    Skip
                                                </Button>
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {/* Appointments Section */}
            {appointmentsForToday.length > 0 && (
                <>
                    <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
                        Appointments for Today
                    </Typography>
                    <Grid container spacing={3}>
                        {appointmentsForToday.map((appointment) => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                <Card
                                    sx={{
                                        transition: "transform 0.3s ease-in-out",
                                        "&:hover": { transform: "scale(1.05)" },
                                        boxShadow: 3,
                                        borderRadius: 2,
                                    }}
                                >
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <EventAvailable sx={{ fontSize: 40, color: "primary.main" }} />
                                            <Typography variant="h6" sx={{ marginLeft: 2 }}>
                                                {appointment.title}
                                            </Typography>
                                        </Box>
                                        <Typography>Time: {appointment.time}</Typography>
                                        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleSkipAppointment(appointment.id)}
                                                startIcon={<SkipNext />}
                                            >
                                                Skip
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
            {medicationsForToday.length === 0 && appointmentsForToday.length === 0 && (
                <Typography variant="h5" sx={{ marginTop: 4, color: "gray" }}>
                    No medications available today.
                </Typography>
            )}
        </Box>
    );
};

export default MedicineTodayPage;
