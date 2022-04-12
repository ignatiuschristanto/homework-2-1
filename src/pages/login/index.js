import ButtonComponent from "../../Component/Button";

const LoginPage = (props) =>{
    const {getSpotifyLinkAuthorize} = props
    return(
        <div className="container">
            <h1>Please Login to Continue</h1>
            <ButtonComponent onClick={getSpotifyLinkAuthorize}>Login</ButtonComponent>
        </div>
    )
}

export default LoginPage;