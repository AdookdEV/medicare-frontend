import { Typography } from "@mui/material";
import {useEffect, useState} from "react";
import {getMedicationReminders} from "../api/api.js";
import {LOGIN_URL} from "../api/url.js";
import {useNavigate} from "react-router";

const MedicineHistoryPage = () => {

  return <Typography variant="h5">This page shows the Medicine History and Charts.</Typography>;
};

export default MedicineHistoryPage;
