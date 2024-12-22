import {Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {TimePicker} from "@mui/x-date-pickers";
import {Add as AddIcon, Remove as RemoveIcon} from "@mui/icons-material";
import dayjs from "dayjs";


const MultipleTimesDailyTab = ({specificTimes, onChangeSpecificTimes, unitIndex, availableUnits, onSelectUnit}) => {

    const addSpecificTime = () => {
        onChangeSpecificTimes([...specificTimes, {time: dayjs(), dose: 1}]);
    };

    const handleSpecificTimeChange = (index, field, value) => {
        // console.log(availableUnits, index, field, value);
        const updatedTimes = [...specificTimes];
        updatedTimes[index] = {...updatedTimes[index], [field]: value};
        onChangeSpecificTimes(updatedTimes);
    };

    const removeSpecificTime = (index) => {
        const updatedTimes = [...specificTimes];
        updatedTimes.splice(index, 1);
        onChangeSpecificTimes(updatedTimes);
    };

    return (
        <>
            <FormControl fullWidth sx={{mb: 3}}>
                <InputLabel>Unit</InputLabel>
                <Select
                    value={unitIndex}
                    onChange={(e) => onSelectUnit(e.target.value)}
                    label="Unit"
                >
                    {
                        availableUnits.map((unit, unitIndex) => (
                            <MenuItem key={unit.id} value={unitIndex}>{unit.name}</MenuItem>)
                        )
                    }
                </Select>
            </FormControl>
            {specificTimes.map((t, index) => (
                <Box
                    key={index}
                    sx={{
                        mb: 2,
                        p: 2,
                        border: "1px solid #ddd", // Optional: Add border for better visual separation
                        borderRadius: "8px", // Optional: Rounded corners
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <TimePicker
                                value={t.time}
                                onChange={(newValue) => handleSpecificTimeChange(index, "time", newValue)}
                                views={["hours", "minutes"]}
                                ampm={false}
                                renderInput={(params) => <TextField {...params} fullWidth/>}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Dose"
                                type="number"
                                inputProps={{min: 1}}
                                value={t.dose}
                                onChange={(e) => handleSpecificTimeChange(index, "dose", Number(e.target.value))}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton color="error" onClick={() => removeSpecificTime(index)}>
                                <RemoveIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            ))}
            <Button
                startIcon={<AddIcon/>}
                onClick={addSpecificTime}
                color="primary"
                sx={{mt: 2}}
            >
                Add Time
            </Button>
        </>
    )

}


export default MultipleTimesDailyTab;