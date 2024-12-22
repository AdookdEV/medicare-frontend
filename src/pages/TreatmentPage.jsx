import {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Button, Grid2 as Grid,
} from "@mui/material";
import ActivityModal from "../components/ActivityModal.jsx";
import {getMedicationUnits} from "../api/api.js";
import {useNavigate} from "react-router";
import {LOGIN_URL} from "../api/url.js";
import MedicationReminderCard from "../components/MedicationReminderCard.jsx";


const reminders = [{
    id: 1,
    title: "Medication",
    scheduleType: "MULTIPLE_TIMES_DAY",
    unitId: 1, // 1 = mg
    entries: [
        {cron: "0 8 * * *", dose: 10},
        {cron: "0 14 * * *", dose: 10},
        {cron: "0 20 * * *", dose: 10},
    ],
},
    {
        id: 2,
        title: "Medication",
        scheduleType: "MULTIPLE_TIMES_DAY",
        unitId: 1, // 1 = mg
        scheduleData: [
            {cron: "0 8 * * *", dose: 10},
            {cron: "0 14 * * *", dose: 10},
            {cron: "0 20 * * *", dose: 10},
        ],
    }
];


const TreatmentPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleModalOpen = (type) => {
        setSelectedActivity({type}); // Initialize activity type
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedActivity(null);
    };

    const handleSaveActivity = (formData) => {
        reminders.push({...formData, id: 3});
        handleModalClose();
    };

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
                    <Grid key={reminder.id} size={{xs: 12, sm: 12,  md: 6, lg: 4, xl: 3}}>
                        <MedicationReminderCard
                            medicationReminder={reminder}
                            onEdit={() => {
                            }}
                            onRemove={() => {
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
