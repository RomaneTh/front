import RestUtilities from './RestUtilities';

export interface IContact {
    password: string;
}

export default class Contacts {
    update(contact: IContact) {
        return RestUtilities.patch<IContact>(`http://localhost:5000/api/user/update-password`, contact);
    }
}

