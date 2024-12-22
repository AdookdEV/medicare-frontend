import {Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useState} from "react";

const DaysOfWeekTab = ({time, unitIndex, specificDaysOfWeek, dose, onChangeSpecificDaysOfWeek,
                           availableUnits, onChangeTime, onChangeUnit, onChangeDose}) => {
    return (
        <>
            <Grid container spacing={2}>
                {/* Time Picker */}
                <Grid item xs={6}>
                    <TimePicker
                        value={time}
                        onChange={(newValue) => onChangeTime(newValue || dayjs().hour(0).minute(0))}
                        views={["hours", "minutes"]}
                        ampm={false}
                        renderInput={(params) => <TextField {...params} fullWidth label="Select Time"/>}
                    />
                </Grid>

                {/* Dose Input */}
                <Grid item xs={3}>
                    <TextField
                        label="Dose"
                        type="number"
                        inputProps={{min: 1}}
                        value={dose}
                        onChange={(e) => onChangeDose(Number(e.target.value) || 1)}
                        fullWidth
                    />
                </Grid>

                {/* Unit Selection */}
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Unit</InputLabel>
                        <Select
                            value={unitIndex}
                            onChange={(e) => onChangeUnit(e.target.value)}
                            label="Unit"
                        >
                            {
                                availableUnits.map((unit, unitIndex) => (
                                    <MenuItem key={unit.id} value={unitIndex}>{unit.name}</MenuItem>)
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>

                {/* Days of the Week Selection */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="days-of-week-label">Days of Week</InputLabel>
                        <Select
                            labelId="days-of-week-label"
                            multiple
                            value={specificDaysOfWeek}
                            onChange={(e) => onChangeSpecificDaysOfWeek(e.target.value)}
                            renderValue={(selected) => selected.map((day) => day).join(", ")}
                            label="Days of Week"
                        >
                            {[
                                "Sunday",
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                            ].map((day) => (
                                <MenuItem key={day} value={day}>
                                    <Checkbox checked={specificDaysOfWeek.indexOf(day) > -1}/>
                                    <Typography>{day}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}


export default DaysOfWeekTab;