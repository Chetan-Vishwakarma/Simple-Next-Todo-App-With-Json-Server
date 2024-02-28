export default class Utils {
    constructor() {
        this.Param = {
            agrno: localStorage.getItem('agrno'),
            Email: localStorage.getItem('Email'),
            password: localStorage.getItem('password')
        }
    }
}

export const credentials = {
    agrno: localStorage.getItem('agrno'),
    Email: localStorage.getItem('Email'),
    password: localStorage.getItem('Password'),
    folderId: localStorage.getItem("FolderId")
};