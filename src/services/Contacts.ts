import RestUtilities from './RestUtilities';

export interface IContact {
    email: string;
    password: string;
}

export default class Contacts {
    update(contact: IContact) {
        // @todo update auth + use jwt instead of sending id 
        return RestUtilities.put<IContact>(`/api/contacts`, contact);
    }
}

