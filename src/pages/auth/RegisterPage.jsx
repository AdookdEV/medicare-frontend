import {Link, useNavigate} from 'react-router';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    DialogTitle,
    DialogContent, DialogActions, Dialog
} from '@mui/material';
import {LOGIN_URL} from '../../api/url.js';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useState} from "react";
import {callRegisterApiRequest} from "../../api/api.js";

const RegisterPage = () => {
    const nagivate = useNavigate();


    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const [highLightEmail, setHighLightEmail] = useState(false);
    const [highLightPassword, setHighLightPassword] = useState(false);
    const [highLightFirstname, setHighLightFirstname] = useState(false);
    const [highLightLastname, setHighLightLastname] = useState(false);

    const handleEmailChange = (e) => {
        e.preventDefault();
        setHighLightEmail(false);
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setHighLightPassword(false);
        setPassword(e.target.value);
    }

    const handleFirstnameChange = (e) => {
        e.preventDefault();
        setHighLightFirstname(false);
        setFirstname(e.target.value);
    }

    const handleLastnameChange = (e) => {
        e.preventDefault();
        setHighLightLastname(false);
        setLastname(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setHighLightEmail(true);
        }

        if (!password) {
            setHighLightPassword(true);
        }

        if (!firstname) {
            setHighLightFirstname(true);
        }

        if (!lastname) {
            setHighLightLastname(true);
        }

        if (!password || !email || !firstname || !lastname) {
            return;
        }

        console.log("Registering users...");
        callRegisterApiRequest({firstname, lastname, email, password}).then((response) => {
            const data = response.body;
            if (response.status === 200) {
                console.log("Register was successful!");
                nagivate(LOGIN_URL);
            }
        });
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Container maxWidth="xs">
                <Card elevation={3} sx={{mt: 4}}>
                    <CardContent>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <LocalHospitalIcon color="primary" sx={{fontSize: 50, mb: 2}}/>
                            <Typography variant="h4" gutterBottom>
                                Medicare Registration
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Create an account to track your health and medicines.
                            </Typography>
                            <form>
                                <TextField
                                    fullWidth
                                    label="First name"
                                    margin="normal"
                                    variant="outlined"
                                    type="text"
                                    value={firstname}
                                    error={highLightFirstname}
                                    helperText={highLightFirstname ? "First name is empty" : ""}
                                    onChange={handleFirstnameChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    margin="normal"
                                    variant="outlined"
                                    type="text"
                                    value={lastname}
                                    error={highLightLastname}
                                    helperText={highLightLastname ? "Last name is empty" : ""}
                                    onChange={handleLastnameChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                    value={email}
                                    error={highLightEmail}
                                    helperText={highLightEmail ? "Email is empty" : ""}
                                    onChange={handleEmailChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    margin="normal"
                                    variant="outlined"
                                    type="password"
                                    value={password}
                                    error={highLightPassword}
                                    helperText={highLightPassword ? "Password is empty" : ""}
                                    onChange={handlePasswordChange}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="contained"
                                    sx={{mt: 2}}
                                    onClick={handleSubmit}
                                >
                                    Register
                                </Button>
                            </form>
                            <Box mt={2}>
                                <Typography variant="body2">
                                    Already have an account? <Link to={LOGIN_URL}>Login</Link>
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

export default RegisterPage;
