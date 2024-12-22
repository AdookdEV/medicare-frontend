import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import MedicineHistoryPage from "../pages/MedicineHistoryPage";
import MedicineTodayPage from "../pages/MedicineTodayPage";
import TreatmentPage from "../pages/TreatmentPage.jsx";
import DoctorsNotesPage from "../pages/DoctorsNotesPage";


const MainContent = () => {
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Routes>
        <Route path="/statistics" element={<MedicineHistoryPage />} />
        <Route path="/today" element={<MedicineTodayPage />} />
        <Route path="/treatment" element={<TreatmentPage />} />
        <Route path="/support" element={<DoctorsNotesPage />} />
      </Routes>
    </Box>
  );
};

export default MainContent;