import { Home, Detail } from '@views';
import { HOME_URL, DETAIL_URL, DEFAULT_URL} from './DefaultLayout.constant';

const defaultRoutes = [
    {
        auth: false,
        name: "Home",
        path: HOME_URL,
        component: Home,
    },
    {
        auth: false,
        name: "Detail", 
        path: DETAIL_URL, 
        component: Detail //Launch
    },
    /*{ 
        redirect: true, 
        path: DEFAULT_URL, 
        to: HOME_URL,  
    }*/
];

export default defaultRoutes;
             /*
                    <Route exact path="/" render={() => (
                        this.isUserLoggedIn() ? (
                                                    <Home />
                                                ) : (
                                                    <Redirect to="/signin" />
                                                )
                    )}/>
                    <Route exact path="/signin" render={() => (
                        this.isUserLoggedIn() ? (
                                                    <Redirect to="/" />
                                                ) : (
                                                    <Signin />
                                                )
                    )}/>
                    <Route exact path="/signup" render={() => (
                        this.isUserLoggedIn() ? (
                                                    <Redirect to="/" />
                                                ) : (
                                                    <Signup />
                                                )
                    )}/>
            
                */