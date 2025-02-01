import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { UserContext } from "../App";
import { Box } from "@mui/system";
import { linkStyle } from "../style/style";

export default () => {
  const user = useContext(UserContext)

  return (
    <>

      <Box sx={{
        position: "absolute",
        top: 0,
        right: 0,
        m: 2,
        zIndex: 1000
      }}>
        <nav>

          <Link to="/all" style={linkStyle}> see all  </Link>
          {user[0].email && user[0].password && <Link to="/add" style={linkStyle} >  add </Link>}
          <NavLink to='/rer' />

        </nav>
      </Box>

    </>
  )
}