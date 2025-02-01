import { useContext, useRef, useState } from "react"
import { Box, Button, Grid2 as Grid, Modal, TextField } from "@mui/material";
import { UserContext } from "../../App";
import Logged from ".//Logged";
import axios from "axios";
import logo from "../../assets/images/icon.png"
import { headerStyle, modalStyle } from "../../style/style";
const HomePage = () => {
    let url = 'http://localhost:3000/api/user'

    const [isLoginOrReg, setIsLoginOrReg] = useState(false)
    const [logorReg, setLogorReg] = useState('')
    const [userID, setUserID] = useState<number>(0)
    const [open, setOpen] = useState(false)
    const [user, userDispatch] = useContext(UserContext)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
     
        try {
            const res = await axios.post(
                url + logorReg,
                {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                }
            )
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
            setUserID(res.data.userId)
        }
        catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error('Axios error:', e.message);
            }
            else
                console.error('Unexpected error:(', e);
        }
        finally {
            passwordRef.current!.value = ""
            nameRef.current!.value = ""
            emailRef.current!.value = ""
        }
    }

    const toggleModal = () => {
        setOpen(!open);
    };

    const LoginPressed = () => {
        setLogorReg('/login')
        toggleModal()
    }

    const RegisterPressed = () => {
        setLogorReg('/register')
        toggleModal()
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Box sx={headerStyle}>
                        {!isLoginOrReg ?
                            <div>
                                <img src={logo} alt="Logo" style={{ width: '50px', height: '50px' }}/>
                                <Button color="primary" variant="contained" onClick={() => LoginPressed()} > sign in </Button>
                                <Button color="primary" variant="contained" onClick={() => RegisterPressed()}> sign up </Button>
                            </div> :
                            <Logged userId={userID} />
                        }
                    </Box>
                </Grid>
            </Grid>

            

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <form onSubmit={handleSubmit}>

                        <TextField label='userName' inputRef={nameRef} />
                        <TextField label='userPassword' inputRef={passwordRef} type='password' />
                        <TextField label='userEmail' inputRef={emailRef} type='email' />
                        <Button type="submit">Login</Button>
                        
                    </form>
                </Box>
            </Modal>

        </>
    )
}
export default HomePage