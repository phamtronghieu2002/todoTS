import React from "react";
import {Home,Login,Register} from "../pages";
import configs from "../configs";

interface IRouteConfig {
  path: string;
  element: React.FC; // Update the type to JSX.Element
}

const PublicRoutes: IRouteConfig[] = [
{
    path: configs.paths.login,
    element:Login, 
  },
  {
    path: configs.paths.register,
    element:Register, 
  },
];

const PrivateRoutes: IRouteConfig[] = [
  {
    path: configs.paths.home,
    element: Home,
  }
];

export { PublicRoutes, PrivateRoutes };
