import { useSelector } from "react-redux";
import { 
    BrowserRouter as Router,
    Switch,
    Route, 
    Redirect
 } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";

const AppRoute = () => {
     const isLogin = useSelector((state) => state.authToken.isLogin);
     return(
         <Router>
             <Switch>
                <Route path= "/create-playlist">
                    <HomePage />
                </Route>
                <Route path= "/login">
                    <HomePage />
                </Route>
                <Route path = "/">
                    {isLogin ? (
                        <><h1>You are Logged In.</h1>
                        <Redirect to="/create-playlist" /></>
                    ):(
                        <><h1>Login First.</h1>
                        <Redirect to="/login" /></>
                    )
                    }

                </Route>
                 
             </Switch>
         </Router>
     )
 }

 export default AppRoute;