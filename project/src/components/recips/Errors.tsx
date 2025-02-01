const style={
 color: 'red',
 fontWeight: 'bold'
}
const Errors = ({message}:{message:string})=>{
     return(
        <>
        <small style={style}>{message}</small>
        </>
    )
}
export default Errors