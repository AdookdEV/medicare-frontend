import {BrowserRouter as Router, Route, Routes} from 'react-router'
import MainPage from "./pages/MainPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<LoginPage/>}/>
                <Route path="/auth/register" element={<RegisterPage/>}/>
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage/>}/>
                <Route path = "/*" element={<MainPage/>} />
            </Routes>
        </Router>
    );
};

export default App;
