import factory from "../persistence/daos/factory.js";
const { userDao } = factory;
import UserResDTO from "../persistence/dtos/userResDto.js";


export default class ProductRepository {

    constructor() {
        this.dao = userDao;
    }

    async getUserDTO(id) {
        try {
            const user = await this.dao.getUserById(id)
            return new UserResDTO(user);
        } catch (error) {
            console.log(error);
        }
    }

}


