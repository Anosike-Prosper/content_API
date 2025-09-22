import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { CreateUserDto } from "./user.dto";

export class UserController {
  constructor(private userService: UserService) {}

  onCreateUser = async (
    req: Request<any, any, CreateUserDto>,
    res: Response
  ) => {
    const { username, interests } = req.body;

    const userExist = await this.userService.findUserByUsername(username)

    if(userExist){
         return res.status(400).json({
      message: `User with username ${username} already exist`,
    });
    }

    const user = await this.userService.onCreateUser({ username, interests });

    return res.status(201).json({
      user,
      message: "success",
    });
  };
}



//like once, unlike
//view and likes