import RestUtilities from './RestUtilities';

export interface IUpdatePassword {
    password: string;
}

export default class UpdatePassword {
    update(account: IUpdatePassword) {
        return RestUtilities.patch<IUpdatePassword>(`http://localhost:5000/api/user/update-password`, account);
    }
}

