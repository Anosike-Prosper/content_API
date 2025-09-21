import { Router } from 'express';
import { UserController } from '../../controller/user/user.controller';
import { UserService } from '../../services/user.service';
import { UserValidator } from '../../validation/user/user.validation';

export class UserRoutes {
  public router: Router;
  public path: string;
  private controller: UserController;
  private userValidation: UserValidator;

  constructor() {
    this.path = '/user';
    this.router = Router();

    const userService = new UserService();
    this.controller = new UserController(userService);
    this.userValidation = new UserValidator();
    this.initRoutes();
  }

  private initRoutes() {
    

    this.router.post(
      `${this.path}/`,
      this.userValidation.createUserValidation,
      this.controller.onCreateUser,
    );

  }
}
