import DocRouter from "./endpoints/doc.js";
import VersionRouter from "./endpoints/version.js";
import UserRouter from "./endpoints/user.js";
import AuthenticationRouter from "./endpoints/authentication.js";
import DocumentSharesRouter from "./endpoints/documentShares.js";

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
  {
    path: "/shares",
    router: DocumentSharesRouter,
  },
];

export default routers;
