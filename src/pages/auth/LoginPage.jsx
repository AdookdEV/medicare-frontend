import {Link, useNavigate} from 'react-router';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {callLoginApiRequest} from '../../api/api.js'
import {useState} from "react";
import {FORGOT_PASS_URL, REGISTER_URL, TODAY_URL} from "../../api/url.js";

const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [highlightLogin, setHighlightLogin] = useState(false);
    const [highlightPassword, setHighlightPassword] = useState(false);

    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");


    const navigate = useNavigate();

    const handleLoginChange = (event) => {
        setHighlightLogin(false);
        setEmailErrorText("");
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setHighlightPassword(false);
        setPasswordErrorText("");
        setPassword(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Login...");

        if (!login) {
            setHighlightLogin(true);
            setEmailErrorText("Email is empty");
        }

        if (!password) {
            setHighlightPassword(true);
            setPasswordErrorText("Password is empty");
        }

        if (!login || !password) {
            return;
        }

        setLoading(true);
        callLoginApiRequest(login, password)
            .then((response) => {
                setLoading(false);
                if (response.status === 200) {
                    console.log("Login succeeded");
                    return response.json();
                } else if (response.status === 401) {
                    setError("Incorrect email or password");
                } else {
                    setError("Internal Server Error");
                }
            })
            .then(data => {
                if (!data) return;
                const {accessToken, refreshToken} = data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                navigate(TODAY_URL);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.message);
            });
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Container maxWidth="xs">
                <Card elevation={3}>
                    <CardContent>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <LocalHospitalIcon color="primary" sx={{fontSize: 50, mb: 2}}/>
                            <Typography variant="h4" gutterBottom>
                                Medicare Login
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Access your health dashboard and medicine tracker.
                            </Typography>
                            <form>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                    value={login}
                                    error={highlightLogin}
                                    helperText={emailErrorText}
                                    onChange={handleLoginChange}
                                />
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                    value={password}
                                    error={highlightPassword}
                                    helperText={passwordErrorText}
                                    onChange={handlePasswordChange}
                                />
                                <Button fullWidth variant={loading ? "outlined" : "contained"}
                                        color="primary"
                                        onClick={onSubmit}
                                        sx={{mt: 2, height: 40}}
                                >
                                    {loading ? (<CircularProgress size={30}/>) : "Login"}
                                </Button>
                            </form>
                            <Box mt={2}>
                                <Typography variant="body2">
                                    <Link to={FORGOT_PASS_URL}>Forgot Password?</Link>
                                </Typography>
                                <Typography variant="body2">
                                    Don’t have an account? <Link to={REGISTER_URL}>Register</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Dialog open={Boolean(error)} onClose={() => setError('')}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>
                        <Typography>{error}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setError('')}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default LoginPage;
