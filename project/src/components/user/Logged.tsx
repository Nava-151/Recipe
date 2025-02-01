import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useRef, useState } from "react"
import {Button, Grid2 as Grid, Modal, Box, TextField,} from "@mui/material";
import axios from 'axios';
import { modalStyle } from '../../style/style';


const Logged = ({ userId }: { userId: number }) => {
    const [user, userDispatch] = useContext(UserContext)
    const [isUpdate, SetIsUpdate] = useState(false)
    let url = 'http://localhost:3000/api/user'

    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const phoneNumberRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        userDispatch({
            type: 'UPDATE',
            data: {
                userId: 0,
                firstName: nameRef.current?.value || '',
                lastName: lastNameRef.current?.value || '',
                email: emailRef.current?.value || '',
                password: passwordRef.current?.value || '',
                address: addressRef.current?.value || '',
                phoneNumber: phoneNumberRef.current?.value || '',
            }
        });

        try {
            const res = await axios.put(
                url,
                {
                    firstName: nameRef.current!.value,
                    lastName: lastNameRef.current!.value,
                    email: emailRef.current!.value,
                    address: addressRef.current?.value || '',
                    phone: phoneNumberRef.current?.value || '',
                },
                { headers: { 'user-id': userId + "" } }
            )

        }
        catch (e: unknown) {
            if (axios.isAxiosError(e)) {

                if (e.status === 422)
                    alert('user is already login')
            }
            else
                console.log("unknown e", e);


        } finally {
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
        }

        SetIsUpdate(false)
    };

    return (
        <>
            <Grid container>
                <Grid size={4}>
                    {user.firstName && <Stack direction="row" spacing={2}>
                        <Avatar sx={{ bgcolor: deepOrange[200] }}>{user.firstName[0]}</Avatar>
                        <Button color="primary" variant="contained" onClick={() => SetIsUpdate(true)}>update</Button>
                    </Stack>}
                </Grid>
            </Grid>



            <Modal open={isUpdate} onClose={() => SetIsUpdate(false)}>
                <Box sx={modalStyle}>
                    <form onSubmit={handleSubmit}>

                        <TextField label='userName' inputRef={nameRef} value={user.firstName} />
                        <TextField label='userEmail' inputRef={emailRef} type='email' value={user.email} />
                        <TextField label='userAddress' inputRef={addressRef} />
                        <TextField label='userPhoneNumber' inputRef={phoneNumberRef} />
                        <TextField label='userLastName' inputRef={lastNameRef} />
                        <TextField label='userPassword' inputRef={passwordRef} type='password' value={user.password} />
                        <Button type="submit">update details</Button>

                    </form>
                </Box>
            </Modal>
        </>
    )
}
export default Logged