import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Medication as MedicationIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import cronstrue from "cronstrue";

// Function to parse the schedule data into a human-readable string
const parseSchedule = (scheduleType, scheduleData) => {
    if (!scheduleData || scheduleData.length === 0) return "No schedule set";

    if (scheduleType === "MULTIPLE_TIMES_DAY") {
        const times = scheduleData.map((entry) =>
            cronstrue.toString(entry.cron, { verbose: false, use24HourTimeFormat: true })
        );
        return `${scheduleData.length} times daily — ${times.join(", ")}`;
    } else if (scheduleType === "INTERVAL") {
        const cronDescription = cronstrue.toString(scheduleData[0].cron, { verbose: false });
        return `Interval schedule — ${cronDescription}`;
    } else if (scheduleType === "SPECIFIC_DAYS_WEEK") {
        const cronDescription = cronstrue.toString(scheduleData[0].cron, { verbose: false });
        return `Specific days — ${cronDescription}`;
    }

    return "Unknown schedule type";
};


const MedicationReminderCard = ({ medicationReminder, onEdit, onRemove }) => {
    const { title, scheduleType, scheduleData } = medicationReminder;

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: "16px",
                padding: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <CardContent sx={{ flex: 1 }}>
                {/* Medication Title */}
                <Box display="flex" alignItems="center" mb={1}>
                    <MedicationIcon fontSize="medium" sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="h6">{title}</Typography>
                </Box>

                {/* Schedule Details */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                    {parseSchedule(scheduleType, scheduleData)}
                </Typography>
            </CardContent>

            {/* Action Buttons */}
            <Box>
                <IconButton
                    color="primary"
                    onClick={() => onEdit(medicationReminder)}
                    sx={{ mr: 1 }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => onRemove(medicationReminder.id)}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default MedicationReminderCard;
