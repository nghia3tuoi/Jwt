import Home from "../pages/Home";
import User from "../pages/User";
const publicRoutes = [
	{ path: "/", component: Home },
	{ path: "/users", component: User },
];
// const privateRoutes = [];

export { publicRoutes };
