import factory from "../persistence/daos/factory.js";
const { userDao } = factory;
import UserResDTO from "../persistence/dtos/userResDto.js";
import userDataResDto from '../persistence/dtos/userDataResDto.js';

export default class UserRepository {

    constructor() {
        this.dao = userDao;
    }

    async getUsersDTO() {
        try {
            const usersArray = await this.dao.getAll()
            const dtoArray = [];
            usersArray.map((user) => {
                let newUser = new userDataResDto(user);
                dtoArray.push(newUser)
            });
            return dtoArray;
        } catch (error) {
            console.log(error);
        }
    }

}


