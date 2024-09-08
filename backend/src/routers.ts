import DocRouter from "./endpoints/doc.js";
import VersionRouter from "./endpoints/version.js";
import UserRouter from "./endpoints/user.js";
import AuthenticationRouter from "./endpoints/authentication.js";

const routers = [
  {
    path: "/docs",
    router: DocRouter,
  },
  {
    path: "/version",
    router: VersionRouter,
  },
  {
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/auth",
    router: AuthenticationRouter,
  },
];

export default routers;
