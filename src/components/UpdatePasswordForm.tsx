import 'object-assign';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AccountService, { IUpdatePassword } from '../services/UpdatePassword'

let accountService = new AccountService();

export class UpdatePasswordForm extends React.Component<RouteComponentProps<any>, any> {
    state = {
        account: null as IUpdatePassword,
        errors: {} as { [key: string]: string },
        success: {} as { [key: string]: string }
    }

    componentDidMount() {
        let newAccount: IUpdatePassword = {
            password: ''
        };
        this.setState({ account: newAccount });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.savePassword(this.state.account);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let accountUpdates = { // todo delete
            [name]: value
        };

        this.setState({
            account: Object.assign(this.state.account, accountUpdates)
        });
    }

    savePassword(account: IUpdatePassword) {
        this.setState({ errors: {} as { [key: string]: string } });
        accountService.update(account).then((response) => {
            if (response.is_error) {
                this.setState({ errors: {password: 'Password must be between 8 and 20 characters and contain one uppercase letter, one lowercase letter, one digit and one special character.' }});
            } else {
                this.setState({ success: {password: 'Password successfully saved.' }});
            }
        });
    }

    _formGroupClass(field: string) {
        var className = "form-group ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }

    render() {
        if (!this.state.account) {
            return <div>Loading...</div>;
        }
        else {
            return <fieldset className="form-group">
                <legend>Update password</legend>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={this._formGroupClass(this.state.errors.password)}>
                        <label htmlFor="inputPhone" className="form-control-label">Password</label>
                        <input type="password" name="password" id="inputPassword" value={this.state.account.password} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.password}</div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                </form>
                <div className="form-control-feedback">{this.state.success.password}</div>

            </fieldset>
        }
    }
}
