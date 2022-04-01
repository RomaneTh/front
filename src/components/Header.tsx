import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RoutePaths } from './Routes';
import AuthService from '../services/Auth';

let authService = new AuthService();

export class Header extends React.Component<RouteComponentProps<any>, any> {
    signOut() {
        authService.signOut();
        this.props.history.push(RoutePaths.SignIn, { signedOut: true });
    }

    render() {
        const search = this.props.location.search;

        return  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <button className="btn btn-outline-warning my-2 my-sm-0" type="button" onClick={() => this.signOut()}>Sign out</button>
                </nav>;
    }
}
