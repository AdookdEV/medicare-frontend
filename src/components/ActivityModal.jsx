import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography} from "@mui/material";
import MedicineReminder from "./MedicineReminder";
import {useState} from "react";

const ActivityModal = ({open, activity, onClose, onSave}) => {
    const [formData, setFormData] = useState({
        title: "",
        type: activity?.type || "Pills",
        scheduleType: "",
        entries: [
            {
                cron: "",
                dose: 1
            }
        ],
        state: "Active",
    });

    const [highlightActivityTextField, setHighlightActivityTextField] = useState(false);

    const handleSubmit = () => {
        if (!formData.title) {
            setHighlightActivityTextField(true)
            return;
        }
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant={'h4'} component='p' sx={{mt: 3}}>
                    {activity?.id ? "Change medication details" : "Add your medication"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    error={highlightActivityTextField}
                    margin="normal"
                    label="Medication name"
                    name="name"
                    value={formData.title}
                    onChange={
                        (e) => {
                            setFormData({...formData, title: e.target.value});
                        }
                    }
                />

                <MedicineReminder
                    onGenerateCron={(data) => {
                        setFormData({...formData, ...data});
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ActivityModal;
