import Button from '@mui/material/Button';

const ButtonComponent = ({children, onClick}) =>{
    return (
        <><Button variant="outlined" className='btn' onClick={onClick}>{children}</Button>
        {/* <button className='new-btn' onClick={onClick}>{children}</button> */}
        </>
    )
}
export default ButtonComponent;