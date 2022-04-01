import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SignIn } from './Auth';
import AuthService from '../services/Auth';
import { ErrorPage } from './Error';
import { UpdatePasswordForm } from './UpdatePasswordForm';
import { Header } from './Header';

export class RoutePaths {
    public static Account: string = "/account";
    public static SignIn: string = "/";
}

export default class Routes extends React.Component<any, any> {
    render() {
        return <Switch>
            <Route exact path={RoutePaths.SignIn} component={SignIn} />
            <DefaultLayout exact path={RoutePaths.Account} component={UpdatePasswordForm} />
            <Route path='/error/:code?' component={ErrorPage} />
        </Switch>
    }
}

const DefaultLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props => (
        AuthService.isSignedIn() ? (
            <div>
                <Header {...props} />
                <div className="container">
                    <Component {...props} />
                </div>
            </div>
        ) : (
                <Redirect to={{
                    pathname: RoutePaths.SignIn,
                    state: { from: props.location }
                }} />
            )
    )} />
);
