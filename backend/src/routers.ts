import DocRouter from "./endpoints/doc.js";
import VersionRouter from "./endpoints/version.js";

const routers = [
  {
    path: "/docs",
    router: DocRouter,
  },
  {
    path: "/version",
    router: VersionRouter,
  },
];

export default routers;
