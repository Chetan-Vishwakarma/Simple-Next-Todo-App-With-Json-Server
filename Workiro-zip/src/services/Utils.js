export default class Utils{
    constructor(){
        this.Param = {
            agrno:localStorage.getItem('agrno'),
            Email:localStorage.getItem('Email'),
            password:localStorage.getItem('password')
        }
    }
}