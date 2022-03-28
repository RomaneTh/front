import 'object-assign';
import * as React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import ContactService, { IContact } from '../services/Contacts'
import { RoutePaths } from './Routes';

let contactService = new ContactService();

export class ContactForm extends React.Component<RouteComponentProps<any>, any> {
    state = {
        contact: null as IContact,
        errors: {} as { [key: string]: string }
    }

    componentDidMount() {
        let newContact: IContact = {
            password: ''
        };
        this.setState({ contact: newContact });
        
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.saveContact(this.state.contact);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let contactUpdates = {
            [name]: value
        };

        this.setState({
            contact: Object.assign(this.state.contact, contactUpdates)
        });
    }

    saveContact(contact: IContact) {
        this.setState({ errors: {} as { [key: string]: string } });
        contactService.update(contact).then((response) => {
            if (!response.is_error) {
                console.log('ok saved');
            } else {
                this.setState({ errors: response.error_content });
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
        if (!this.state.contact) {
            return <div>Loading...</div>;
        }
        else {
            return <fieldset className="form-group">
                <legend>Update password</legend>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className={this._formGroupClass(this.state.errors.password)}>
                        <label htmlFor="inputPhone" className="form-control-label">Password</label>
                        <input type="password" name="password" id="inputPassword" value={this.state.contact.password} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                        <div className="form-control-feedback">{this.state.errors.password}</div>
                        {/* todo display error message */}
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                </form>
            </fieldset>
        }
    }
}
