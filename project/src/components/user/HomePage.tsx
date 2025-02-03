import { useContext, useRef, useState } from "react";
import { Box, Button, Grid2 as Grid, Modal, TextField, Typography } from "@mui/material";
import { UserContext } from "../../App";
import Logged from ".//Logged";
import axios from "axios";
import logo from "../../assets/images/icon.png";
import { colorStyle, headerStyle, modalStyle } from "../../style/style";

const HomePage = () => {
    let url = 'http://localhost:3000/api/user';
    const [isLoginOrReg, setIsLoginOrReg] = useState(false);
    const [logorReg, setLogorReg] = useState('');
    const [userID, setUserID] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [user, userDispatch] = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const res = await axios.post(
                url + logorReg,
                {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                }
            );
            userDispatch({
                type: 'LOGIN',
                data: {
                    userId: res.data.userId,
                    firstName: nameRef.current?.value || '',
                    email: emailRef.current?.value || '',
                    lastName: '',
                    address: '',
                    phoneNumber: '',
                    password: passwordRef.current?.value || '',
                }
            });
            setOpen(false);
            setIsLoginOrReg(true);
            setUserID(res.data.userId);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error:', e.message);
                if (e.response) {
                    if (e.response.status === 422) {
                        setErrorMessage("Validation error: Please check your input.");
                    } else {
                        setErrorMessage(`Error: ${e.response.data.message || e.message}`);
                    }
                } else {
                    setErrorMessage('Network error: Please try again later.');
                }
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        } finally {
            passwordRef.current!.value = "";
            nameRef.current!.value = "";
            emailRef.current!.value = "";
        }
    };

    const toggleModal = () => setOpen(prev => !prev);

    const LoginPressed = () => {
        setLogorReg('/login');
        toggleModal();
    };

    const RegisterPressed = () => {
        setLogorReg('/register');
        toggleModal();
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box sx={headerStyle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
                        {!isLoginOrReg ?
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '16px' }} />
                                <div>
                                    <Button sx={colorStyle} color="primary" variant="contained" onClick={LoginPressed} style={{ marginRight: '8px' }}>Sign In</Button>
                                    <Button sx={colorStyle} color="primary" variant="contained" onClick={RegisterPressed}>Sign Up</Button>
                                </div>
                            </div> :
                            <Logged userId={userID} />
                        }
                    </Box>
                </Grid>
            </Grid>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle} style={{ padding: '20px', borderRadius: '8px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField label='User Name' inputRef={nameRef} fullWidth variant="outlined" />
                        <TextField label='User Password' inputRef={passwordRef} type='password' fullWidth variant="outlined" />
                        <TextField label='User Email' inputRef={emailRef} type='email' fullWidth variant="outlined" />
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Button sx={colorStyle} type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>Login</Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};
export default HomePage;
