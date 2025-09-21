import User, {IUser } from "../models/user.model";

export class UserService {
  async onCreateUser(data: Partial<IUser>) {
    const {username, interests} = data

    
    if (!username) {
      throw new Error("Username is required");
    }

    const user = await this.findUserByUsername(username)

     if (user) {
      throw new Error("Username already exists");
    }

    return await User.create({username, interests})

  }


  async findUserByUsername(username:string) {
    
    return await User.findOne({username})   

  }


}
