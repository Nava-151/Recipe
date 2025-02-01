import { Outlet } from "react-router"
import NavBar from "./NavBar"
import HomePage from "./user/HomePage"

const AppLayout = () => {

    return (
        <>
            <HomePage />
            <NavBar />
            <Outlet />
        </>
    )

}
export default AppLayout