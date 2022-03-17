import React from 'react';
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';

import { ErrorBoundary, LocaleProvider, ThemeProvider } from '@lib';
import { Header, Footer, Error } from '@components';

import '@assets/styles/index.css';

import './DefaultLayout.css';
import defaultRoutes from './DefaultLayout.route';

/**
 * 
 * @param {*} props 
 */
const DefaultLayout = (props) => {

    return (
        <ErrorBoundary>
        {/*<ThemeProvider>
        <LocaleProvider>*/}
            
            <Header />
            <section>
                <Switch>
                    {defaultRoutes.map((prop, key) => <Route path={prop.path} key={key} component={prop.component} />)}
                    <Route exact path='/' render={() => <Redirect to='/home' />} />
                    <Route path='*' render={(props) => <Error code={404} />} />
                </Switch>
            </section>
            <Footer/>

        {/*</ThemeProvider>
        </LocaleProvider>*/}
        </ErrorBoundary>
    );
}

export default DefaultLayout;