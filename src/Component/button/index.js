const ButtonComponent = ({children, onClick}) =>{
    return (
        <button className='new-btn' onClick={onClick}>{children}</button>
    )
}
export default ButtonComponent;