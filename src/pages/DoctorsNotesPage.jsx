import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Avatar,
    Stack,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Modal,
    TextField,
    Grid
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import {
    fetchDoctors,
    deleteDoctor,
    createDoctor,
} from "../api/api.js";
import {useNavigate} from "react-router"; // Adjust the path if needed

const DoctorsNotesPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        firstname: "",
        lastname: "",
        speciality: "",
        appointmentDate: "",
        appointmentTime: "",
    });

    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({}); // To store validation errors

    const validateDoctorForm = (doctor) => {
        const errors = {};

        // Required field validation
        if (!doctor.firstname.trim()) errors.firstname = "First name is required";
        if (!doctor.lastname.trim()) errors.lastname = "Last name is required";
        if (!doctor.speciality.trim()) errors.speciality = "Speciality is required";
        if (!doctor.appointmentDate.trim()) errors.appointmentDate = "Appointment Date is required";
        if (!doctor.appointmentTime.trim()) errors.appointmentTime = "Appointment Time is required";

        // Appointment date format validation
        if (doctor.appointmentDate && !/^\d{4}-\d{2}-\d{2}$/.test(doctor.appointmentDate)) {
            errors.appointmentDate = "Invalid date format (YYYY-MM-DD required)";
        }

        // Appointment time format validation
        if (doctor.appointmentTime && !/^\d{2}:\d{2}(:\d{2})?$/.test(doctor.appointmentTime)) {
            errors.appointmentTime = "Invalid time format (HH:mm or HH:mm:ss required)";
        }

        return errors;
    };

    // Fetch doctors from the backend
    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const data = await fetchDoctors();
                setDoctors(formatDoctorDatetime(data));
            } catch (err) {
                console.error(err.message);
            }
        };
        loadDoctors();
    }, []);

    const handleMenuOpen = (event, doctor) => {
        setAnchorEl(event.currentTarget);
        setSelectedDoctor(doctor);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedDoctor(null);
    };

    const handleDeleteDoctor = async () => {
        if (selectedDoctor) {
            try {
                await deleteDoctor(selectedDoctor.id);
                setDoctors((prev) => prev.filter((doc) => doc.id !== selectedDoctor.id));
                handleMenuClose();
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => {
        setModalOpen(false);
        setNewDoctor({
            firstname: "",
            lastname: "",
            speciality: "",
            appointmentDate: "",
            appointmentTime: "",
        });
        setFormErrors({}); // Clear errors on modal close
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor((prev) => ({ ...prev, [name]: value }));
    };

    const formatDoctorDatetime = (doctors) => {
        console.log(doctors);
        return doctors.map(d => {
            let appointmentDate;
            let appointmentTime;
            if (d) {
                // eslint-disable-next-line no-unsafe-optional-chaining
                [appointmentDate, appointmentTime] = d.appointments[0]?.appointmentDate.split('T');
            }
            return {...d, appointmentDate, appointmentTime: appointmentTime.split(':').slice(0, 2).join(':')};
        });
    }

    const handleAddDoctor = () => {
        const errors = validateDoctorForm(newDoctor);

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors); // Set form errors to display them
            return;
        }
        createDoctor({...newDoctor,
            appointments: [{appointmentDate: `${newDoctor.appointmentDate}T${newDoctor.appointmentTime}`}]}, navigate)
            .then((savedDoctor) => {
                setDoctors(formatDoctorDatetime([...doctors, savedDoctor]));
                handleModalClose();
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to add doctor");
            });
    };

    return (
        <Box
            sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    marginBottom: 3,
                    color: "#1565c0",
                }}
            >
                Doctors & Appointments
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleModalOpen}
                sx={{ marginBottom: 3 }}
            >
                Add Doctor
            </Button>
            <Grid container spacing={3} sx={{ maxWidth: "1200px" }}>
                {doctors.map((doctor) => (
                    <Grid item xs={12} sm={12} md={4} lg={3} key={doctor.id}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 2,
                                backgroundColor: "#ffffff",
                                borderRadius: "10px",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 56,
                                    height: 56,
                                    marginBottom: 2,
                                    alignSelf: "center",
                                }}
                                src={doctor.image || "/default-avatar.png"}
                                alt={`${doctor.firstname} ${doctor.lastname}`}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                                    Appointment date
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <AccessTimeIcon fontSize="small" sx={{ color: "#1976d2" }} />
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        {/*{doctor.appointmentDate} - {doctor.appointmentTime}*/}
                                        {doctor.appointmentDate} - {doctor.appointmentTime}
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "#212121", fontWeight: 600, marginTop: 1 }}
                                >
                                    Dr. {doctor.firstname} {doctor.lastname}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#757575", fontStyle: "italic" }}
                                >
                                    {doctor.speciality}
                                </Typography>
                            </CardContent>
                            <IconButton
                                onClick={(e) => handleMenuOpen(e, doctor)}
                                sx={{
                                    alignSelf: "flex-end",
                                }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Menu for actions */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDeleteDoctor}>
                    <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Delete Doctor
                </MenuItem>
            </Menu>

            {/* Modal for adding a new doctor */}
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: "400px",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Add Doctor
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="First Name"
                            name="firstname"
                            value={newDoctor.firstname}
                            onChange={handleInputChange}
                            required
                            error={!!formErrors.firstname}
                            helperText={formErrors.firstname}
                        />
                        <TextField
                            label="Last Name"
                            name="lastname"
                            value={newDoctor.lastname}
                            onChange={handleInputChange}
                            required
                            error={!!formErrors.lastname}
                            helperText={formErrors.lastname}
                        />
                        <TextField
                            label="Speciality"
                            name="speciality"
                            value={newDoctor.speciality}
                            onChange={handleInputChange}
                            required
                            error={!!formErrors.speciality}
                            helperText={formErrors.speciality}
                        />
                        <TextField
                            label="Appointment Date"
                            name="appointmentDate"
                            value={newDoctor.appointmentDate}
                            onChange={handleInputChange}
                            required
                            error={!!formErrors.appointmentDate}
                            helperText={formErrors.appointmentDate}
                        />
                        <TextField
                            label="Appointment Time"
                            name="appointmentTime"
                            value={newDoctor.appointmentTime}
                            onChange={handleInputChange}
                            required
                            error={!!formErrors.appointmentTime}
                            helperText={formErrors.appointmentTime}
                        />
                        <Button variant="contained" onClick={handleAddDoctor}>
                            Add
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default DoctorsNotesPage;
