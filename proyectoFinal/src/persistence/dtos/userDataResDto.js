export default class UserDataResDTO {
    constructor(user) {
        this.user_Name = user.first_name + " " + user.last_name,
            this.user_Email = user.email,
            this.user_Role = user.role
    }
}
