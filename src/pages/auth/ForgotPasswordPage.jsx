import { Link } from 'react-router';
import { TextField, Button, Box, Typography, Container, Card, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const ForgotPasswordPage = () => {
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
                            <LocalHospitalIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                            <Typography variant="h4" gutterBottom>
                                Forgot Password
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Enter your email to reset your password.
                            </Typography>
                            <form>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                />
                                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                                    Reset Password
                                </Button>
                            </form>
                            <Box mt={2}>
                                <Typography variant="body2">
                                    Remember your password? <Link to="/login">Login</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default ForgotPasswordPage;

