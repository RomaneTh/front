import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import AuthService from '../services/Auth';
let authService = new AuthService();

export class Hash extends React.Component<RouteComponentProps<any>, any> {
  refs: {
    word: HTMLInputElement;
};

state = {
    initialLoad: true,
    success: null as string
};

handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({ errors: null, initialLoad: false });
    authService.postHash(this.refs.word.value).then(response => {
        this.setState({ success: response });
    });
}

render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);

    let initialLoadContent = null;
    if (this.state.initialLoad) {
    }
    return <div>
        <form  onSubmit={(e) => this.handleSubmit(e)}>
            <h2 >Please enter word</h2>

            <br/>
            {initialLoadContent}
            {this.state.success &&
                <div role="alert">
                    {this.state.success}
                </div>
            }
            <br/>
            <label htmlFor="inputWord" className="form-control-label sr-only">Email address </label>
            <input id="inputWord" ref="word" placeholder="Word"/>
           
            <button className="btn btn-lg btn-primary btn-block" type="submit">Get hash</button>
        </form>
    </div>;
}

}
