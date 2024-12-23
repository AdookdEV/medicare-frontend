import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    Box,
    Button,
    Stack,
    TextField,
    Modal,
    Paper,
    IconButton,
    Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Trash Can Icon

const DoctorsNotesPage = () => {
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            firstname: "Anna",
            lastname: "Connor",
            speciality: "Therapist",
            email: "anna.connor@email.com",
            phone: "+77771235566",
            appointments: [
                {
                    id: 1,
                    date: "2024-10-14",
                    time: "14:30",
                    note: "Regular follow-up",
                },
            ],
        },
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        firstname: "",
        lastname: "",
        speciality: "",
        email: "",
        phone: "",
        appointments: [{ id: 1, date: "", time: "", note: "" }],
    });

    const [formErrors, setFormErrors] = useState({
        firstname: false,
        lastname: false,
        speciality: false,
        appointments: [{ date: false, time: false }],
    });

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setNewDoctor({
            firstname: "",
            lastname: "",
            speciality: "",
            email: "",
            phone: "",
            appointments: [{ id: 1, date: "", time: "", note: "" }],
        });
        setFormErrors({
            firstname: false,
            lastname: false,
            speciality: false,
            appointments: [{ date: false, time: false }],
        });
    };

    const handleAddAppointment = () => {
        setNewDoctor((prev) => ({
            ...prev,
            appointments: [
                ...prev.appointments,
                { id: prev.appointments.length + 1, date: "", time: "", note: "" },
            ],
        }));
    };

    const handleRemoveAppointment = (index) => {
        setNewDoctor((prev) => ({
            ...prev,
            appointments: prev.appointments.filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor((prev) => ({ ...prev, [name]: value }));
    };

    const handleAppointmentChange = (index, e) => {
        const { name, value } = e.target;
        setNewDoctor((prev) => {
            const updatedAppointments = [...prev.appointments];
            updatedAppointments[index][name] = value;
            return { ...prev, appointments: updatedAppointments };
        });
    };

    const handleAddDoctor = () => {
        let errors = { ...formErrors };

        // Check if required fields are filled
        errors.firstname = newDoctor.firstname === "";
        errors.lastname = newDoctor.lastname === "";
        errors.speciality = newDoctor.speciality === "";

        // Check date and time format for each appointment
        errors.appointments = newDoctor.appointments.map((appointment) => ({
            date: !/^\d{4}-\d{2}-\d{2}$/.test(appointment.date),
            time: !/^\d{2}:\d{2}$/.test(appointment.time),
        }));

        setFormErrors(errors);

        if (
            !errors.firstname &&
            !errors.lastname &&
            !errors.speciality &&
            errors.appointments.every((appointment) => !appointment.date && !appointment.time)
        ) {
            setDoctors((prev) => [
                ...prev,
                { ...newDoctor, id: prev.length + 1 },
            ]);
            handleCloseModal();
        }
    };

    const handleDeleteDoctor = (id) => {
        setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    };

    const handleDeleteAppointment = (doctorId, appointmentId) => {
        setDoctors((prevDoctors) => {
            return prevDoctors.map((doctor) => {
                if (doctor.id === doctorId) {
                    return {
                        ...doctor,
                        appointments: doctor.appointments.filter(
                            (appointment) => appointment.id !== appointmentId
                        ),
                    };
                }
                return doctor;
            });
        });
    };

    return (
        <Box sx={{ backgroundColor: "#e3f2fd", minHeight: "100vh", padding: 3 }}>
            <Typography
                variant="h4"
                sx={{ textAlign: "center", marginBottom: 3, color: "#1565c0" }}
            >
                Doctors & Appointments
            </Typography>

            <Stack spacing={2}>
                {doctors.map((doctor) => (
                    <Accordion key={doctor.id} sx={{ backgroundColor: "#bbdefb", position: "relative" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: "bold", color: "#0d47a1" }}>
                                {doctor.firstname} {doctor.lastname} ({doctor.speciality})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <strong>Email:</strong> {doctor.email}
                            </Typography>
                            <Typography>
                                <strong>Phone:</strong> {doctor.phone}
                            </Typography>
                            <Typography sx={{ marginTop: 2, marginBottom: 1, fontWeight: "bold", color: "#0d47a1" }}>
                                Appointments:
                            </Typography>
                            <List
                                sx={{
                                    maxHeight: 200,
                                    overflowY: "auto",
                                    backgroundColor: "#e3f2fd",
                                    padding: 1,
                                    borderRadius: "4px",
                                }}
                            >
                                {doctor.appointments.map((appointment) => (
                                    <Box key={appointment.id} sx={{ padding: 1, marginBottom: 1, borderRadius: "4px", backgroundColor: "#bbdefb", position: "relative" }}>
                                        <Typography><strong>Date:</strong> {appointment.date}</Typography>
                                        <Typography><strong>Time:</strong> {appointment.time}</Typography>
                                        <Typography><strong>Note:</strong> {appointment.note}</Typography>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteAppointment(doctor.id, appointment.id)}
                                            sx={{
                                                position: "absolute",
                                                top: 5,
                                                right: 5,
                                                zIndex: 1, // Ensure delete icon stays on top of other elements
                                                color: "#f44336",
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </List>
                        </AccordionDetails>
                        <IconButton
                            color="error"
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                zIndex: 1, // Ensure delete icon stays on top of other elements
                                color: "#f44336",
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Accordion>
                ))}
            </Stack>

            <Button
                variant="contained"
                sx={{
                    marginTop: 3,
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "#1565c0",
                }}
                onClick={handleOpenModal}
            >
                Add Doctor
            </Button>

            {/* Modal for adding a new doctor */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Paper
                    sx={{
                        width: "80%",
                        maxWidth: 500,
                        margin: "auto",
                        marginTop: 5,
                        padding: 3,
                        backgroundColor: "#ffffff",
                        overflowY: "auto",
                        maxHeight: "80vh",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
                        Add New Doctor
                    </Typography>
                    <Stack spacing={2} sx={{ pt: 3 }}>
                        <TextField
                            label="First Name"
                            name="firstname"
                            value={newDoctor.firstname}
                            onChange={handleChange}
                            fullWidth
                            error={formErrors.firstname}
                            helperText={formErrors.firstname ? "First name is required" : ""}
                        />
                        <TextField
                            label="Last Name"
                            name="lastname"
                            value={newDoctor.lastname}
                            onChange={handleChange}
                            fullWidth
                            error={formErrors.lastname}
                            helperText={formErrors.lastname ? "Last name is required" : ""}
                        />
                        <TextField
                            label="Speciality"
                            name="speciality"
                            value={newDoctor.speciality}
                            onChange={handleChange}
                            fullWidth
                            error={formErrors.speciality}
                            helperText={formErrors.speciality ? "Speciality is required" : ""}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={newDoctor.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={newDoctor.phone}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            Appointments
                        </Typography>
                        {newDoctor.appointments.map((appointment, index) => (
                            <Box key={index} sx={{ marginBottom: 2, position: "relative" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Date (YYYY-MM-DD)"
                                            name="date"
                                            value={appointment.date}
                                            onChange={(e) => handleAppointmentChange(index, e)}
                                            fullWidth
                                            error={formErrors.appointments[index]?.date}
                                            helperText={formErrors.appointments[index]?.date ? "Invalid date format" : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Time (HH:MM)"
                                            name="time"
                                            value={appointment.time}
                                            onChange={(e) => handleAppointmentChange(index, e)}
                                            fullWidth
                                            error={formErrors.appointments[index]?.time}
                                            helperText={formErrors.appointments[index]?.time ? "Invalid time format" : ""}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    label="Note"
                                    name="note"
                                    value={appointment.note}
                                    onChange={(e) => handleAppointmentChange(index, e)}
                                    fullWidth
                                />
                                <IconButton
                                    color="error"
                                    onClick={() => handleRemoveAppointment(index)}
                                    disabled={newDoctor.appointments.length === 1}
                                    sx={{ marginTop: 1, position: "absolute", top: 5, right: 5 }}
                                >
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button
                            variant="outlined"
                            onClick={handleAddAppointment}
                            sx={{ alignSelf: "flex-start" }}
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Add Appointment
                        </Button>
                    </Stack>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 3, backgroundColor: "#1565c0" }}
                        onClick={handleAddDoctor}
                    >
                        Save Doctor
                    </Button>
                </Paper>
            </Modal>
        </Box>
    );
};

export default DoctorsNotesPage;
