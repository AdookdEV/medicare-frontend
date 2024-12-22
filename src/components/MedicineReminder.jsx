import {useState, useEffect} from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import MultipleTimesDailyTab from "./tabs/MultipleTimesDailyTab.jsx";
import {getMedicationUnits} from "../api/api.js";
import DaysOfWeekTab from "./tabs/DaysOfWeekTab.jsx";

const mapWeekDay = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
};


const MedicineReminder = ({onGenerateCron, existingSchedule = ""}) => {
    const token = localStorage.getItem("accessToken");

    const [unitIndex, setUnitIndex] = useState(0);
    const [tabIndex, setTabIndex] = useState(0);

    const [specificTimes, setSpecificTimes] = useState([{time: dayjs(), dose: 1, unitIndex: null}]);
    const [availableUnits, setAvailableUnits] = useState([]);

    const [specificDaysOfWeek, setSpecificDaysOfWeek] = useState([]);
    const [time, setTime] = useState(dayjs().hour(0).minute(0));
    const [dose, setDose] = useState(1);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        generateCronFromTab1()
        if (onGenerateCron) {
            onGenerateCron(generateCronFromTab2());
        }
    }, [specificDaysOfWeek, time, dose, tabIndex]);

    useEffect(() => {
        generateCronFromTab1()
        if (onGenerateCron) {
            onGenerateCron(generateCronFromTab1());
        }
    }, [specificTimes, unitIndex, tabIndex]);

    const generateCronFromTab1 = () => {
        let scheduleData = specificTimes.map(entry => {
            const cron = `${entry.time.minute()} ${entry.time.hour()} * * *`;
            return {cron, dose: entry.dose};
        });
        return {
            scheduleType: "MULTIPLE_TIMES_DAY",
            unitId: availableUnits[unitIndex]?.id,
            scheduleData,
        }
    };

    const generateCronFromTab2 = () => {
        let scheduleData = {
            cron: `${time.minute()} ${time.hour()} * * ${specificDaysOfWeek.map(day => mapWeekDay[day]).join(',') || '*'}`,
            dose: dose,
        }

        return {
            scheduleType: "SPECIFIC_DAYS_WEEK",
            unit_id: availableUnits[unitIndex]?.id,
            scheduleData,
        }
    };

    // Get list of available units from API
    useEffect(() => {
        getMedicationUnits(token)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.error("Error: ", response);
                }
            })
            .then(data => {
                setAvailableUnits(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Configure Schedule
            </Typography>

            <Tabs value={tabIndex} onChange={handleTabChange} sx={{mb: 2}}>
                <Tab label="Multiple Times Daily"/>
                <Tab label="Specific Days of Week"/>
            </Tabs>


            {tabIndex === 0 && (
                <MultipleTimesDailyTab specificTimes={specificTimes}
                                       onChangeSpecificTimes={(data) => setSpecificTimes(data)}
                                       availableUnits={availableUnits}
                                       unitIndex={unitIndex}
                                       onSelectUnit = {(uIndex)  => {setUnitIndex(uIndex)}}/>
            )}
            {
                tabIndex === 1 && (
                    <DaysOfWeekTab time={time}
                                   unitIndex={unitIndex}
                                   availableUnits={availableUnits}
                                   specificDaysOfWeek={specificDaysOfWeek}
                                   dose={dose}
                                   onChangeSpecificDaysOfWeek={(value) => {
                                       setSpecificDaysOfWeek(value);
                                   }}
                                   onChangeUnit={(value) => {
                                       setUnitIndex(value)
                                   }}
                                   onChangeTime={(value) => {
                                       setTime(value)
                                   }}
                                   onChangeDose={(value) => {setDose(value)}}
                    />
                )
            }

        </Box>
    );
};

export default MedicineReminder;
