import {useEffect, useState} from "react";
import {
    Box,
    Typography,
    Button, Grid2 as Grid,
} from "@mui/material";
import ActivityModal from "../components/ActivityModal.jsx";
import {deleteMedicationReminder, getMedicationReminders, saveMedicationRemind} from "../api/api.js";
import {useNavigate} from "react-router";
import {LOGIN_URL} from "../api/url.js";
import MedicationReminderCard from "../components/MedicationReminderCard.jsx";


const TreatmentPage = () => {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const [reminders, setReminders] = useState([]);

    const handleModalOpen = (type) => {
        setSelectedActivity({type}); // Initialize activity type
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedActivity(null);
    };

    const handleSaveActivity = (formData) => {
        const token = localStorage.getItem("accessToken");
        console.log(JSON.stringify(formData));
        saveMedicationRemind(token, formData).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            if (response.status === 401) {
                navigate(LOGIN_URL);
                return;
            }
            console.error(response.body)
        }).then(data => {
            setReminders([...reminders, {...formData, id: data.id}]);
        }).catch(error => {
            console.error(error.message);
        })
        handleModalClose();
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        getMedicationReminders(token)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                if (response.status === 401) {
                    navigate(LOGIN_URL);
                    return;
                }
                console.error(response.body);
            })
            .then(data => {
                setReminders([...data]);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>
                Treatment
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => handleModalOpen("Pills")}
                sx={{mb: 3}}
            >
                Add
            </Button>

            <Grid container spacing={3} sx={{pb: 3}}>
                {reminders.map((reminder) => (
                    <Grid key={reminder.id} size={{xs: 12, sm: 12, md: 6, lg: 4, xl: 3}}>
                        <MedicationReminderCard
                            medicationReminder={reminder}
                            onEdit={() => {

                            }}
                            onRemove={() => {
                                const token = localStorage.getItem('accessToken');
                                deleteMedicationReminder(token, reminder.id)
                                    .then(response => {
                                        if (response.status === 200) {
                                            setReminders(reminders.filter(r => r.id !== reminder.id));
                                        } else if (response.state === 401) {
                                            navigate(LOGIN_URL);
                                        } else {
                                            console.error(response.body)
                                        }
                                    })
                                    .catch(error => {
                                        console.error(error.message);
                                    });
                            }}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Modal for Create/Update */}
            {
                modalOpen && (<ActivityModal
                    open={modalOpen}
                    activity={selectedActivity}
                    onClose={handleModalClose}
                    onSave={handleSaveActivity}
                />)
            }

        </Box>
    );
};

export default TreatmentPage;
