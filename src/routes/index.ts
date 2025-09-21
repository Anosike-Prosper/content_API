import { Routes } from "../interface/routes.interface";
import { ArticleRoutes } from "./article/article.route";
import { UserRoutes } from "./user/user.route";
import { InteractionRoutes } from "./interaction/interaction.route";



export const routes = [
  new ArticleRoutes(),
  new UserRoutes(),
  new InteractionRoutes()
] as Routes[];
