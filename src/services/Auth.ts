import RestUtilities from './RestUtilities';
import AuthStore from '../stores/Auth';

interface IAuthResponse {
    token: string;
}

export default class Auth {
    static isSignedIn(): boolean {
        return !!AuthStore.getToken();
    }

    signIn(email: string, password: string) {
        return RestUtilities.post<IAuthResponse>('http://localhost:5000/api/user/authenticate', 
        { email: email,  password: password})
        .then((response) => {
            if (!response.is_error) {
                AuthStore.setToken(response.content.token);
            }
            return response;
        });
    }

    signOut(): void {
        AuthStore.removeToken();
    }
}
