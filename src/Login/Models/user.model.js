export class UserModel {
    constructor(userId) {
        this.userId = userId || null;
        this.fullName = '';
        this.userName = '';
        this.email = '';
        this.password = '';
        this.address = '';
        this.phoneNo = '';
        this.userLevel = '0';
    }
}