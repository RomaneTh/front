import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { RoutePaths } from './Routes';
import AuthService from '../services/Auth';
let authStyle = require('../styles/auth.styl');
let authService = new AuthService();

export class SignIn extends React.Component<RouteComponentProps<any>, any> {
    refs: {
        email: HTMLInputElement;
        password: HTMLInputElement;
    };

    state = {
        initialLoad: true,
        error: null as string
    };

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.setState({ errors: null, initialLoad: false });
        authService.signIn(this.refs.email.value, this.refs.password.value).then(response => {
            if (!response.is_error) {
                this.props.history.push(RoutePaths.Account);
            } else {
                this.setState({ error: 'Username or password is incorrect' });
            }
        });
    }

    render() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);

        let initialLoadContent = null;
        if (this.state.initialLoad) {
            if (params.get('expired')) {
                initialLoadContent = <div className="alert alert-info" role="alert">
                    <strong>Session Expired</strong> You need to sign in again.
                    </div>
            }
        }
        return <div className={authStyle.auth}>
            <form className={authStyle.formAuth} onSubmit={(e) => this.handleSubmit(e)}>
                <h2 className={authStyle.formAuthHeading}>Please sign in</h2>

                <br/>
                {initialLoadContent}
                {this.state.error &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
                }
                <br/>
                <label htmlFor="inputEmail" className="form-control-label sr-only">Email address</label>
                <input type="email" id="inputEmail" ref="email" defaultValue="romane.thu@gmail.com" className="form-control form-control-danger" placeholder="Email address"/>
                <br/>
                <label htmlFor="inputPassword" className="form-control-label sr-only">Password</label>
                <input type="password" id="inputPassword" ref="password" defaultValue="Password123!" className="form-control" placeholder="Password" />
                <br/><br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        </div>;
    }
}
