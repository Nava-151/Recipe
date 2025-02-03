import dishesImage from './../assets/images/dishesBackground.png'

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    maxHeight: "90vh",
    overflowY: "auto",
};
export const listRecipe = {
    position: 'fixed',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    padding: 2,
    backgroundColor: 'white', // Optional: to make it more visible
    boxShadow: 1, // Optional: to add some shadow
    borderRadius: 1 // Optional: to add rounded corners
}

export const linkStyle = {

    color: "white",
    backgroundColor: "#607d8b",
    padding: "10px 20px",
    margin: "30px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
        backgroundColor: "#455a64",
    },
}
export const headerStyle = {
    backgroundColor: "black",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
}
export const backgroundStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${dishesImage})`,
    backgroundSize: '750px 750px',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
}
export const colorStyle = { backgroundColor: '#607d8b', color: 'white', '&:hover': { backgroundColor: '#455a64' } }
