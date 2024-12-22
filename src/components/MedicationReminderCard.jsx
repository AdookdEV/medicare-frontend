import {Card, CardContent, Typography, Box, IconButton} from "@mui/material";
import {Medication as MedicationIcon, Edit as EditIcon, Delete as DeleteIcon} from "@mui/icons-material";
import cronstrue from "cronstrue";

const parseSchedule = (scheduleType, entries) => {
    if (!entries || entries.length === 0) return ["No schedule set"];
    return entries.map(schedule => {
        return cronstrue.toString(schedule.cron, {use24HourTimeFormat: true})
            || ["Unknown schedule type"];
    }).join(', ');
};


const MedicationReminderCard = ({medicationReminder, onEdit, onRemove}) => {
    const {title, scheduleType, entries} = medicationReminder;
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
            <CardContent sx={{flex: 1}}>
                {/* Medication Title */}
                <Box display="flex" alignItems="center" mb={1}>
                    <MedicationIcon fontSize="medium" sx={{mr: 1, color: "primary.main"}}/>
                    <Typography variant="h6">{title}</Typography>
                </Box>

                {/* Schedule Details */}
                <Typography variant="body2" color="text.secondary" mb={1}>
                    {parseSchedule(scheduleType, entries)}
                </Typography>
            </CardContent>

            {/* Action Buttons */}
            <Box>
                <IconButton
                    color="primary"
                    onClick={() => onEdit(medicationReminder)}
                    sx={{mr: 1}}
                >
                    <EditIcon/>
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => onRemove(medicationReminder.id)}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Card>
    );
};

export default MedicationReminderCard;
