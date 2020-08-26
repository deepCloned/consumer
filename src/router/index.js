import App from "../App.jsx";
import Login from "../pages/login/Login.jsx";
import Main from "../pages/main/Main.jsx";

// const routes = [
//   {
//     path: "/",
//     component: App,
//     exact: true,
//   },
//   {
//     path: "/login",
//     component: Login,
//     exact: true,
//   },
//   {
//     path: "/main",
//     component: Main,
//     exact: true,
//   }
// ];

const routes = [
  {
    path: "/",
    component: App,
    exact: true,
    routes: [
      {
        path: "/login",
        component: Login,
        exact: true,
      },
      {
        path: "/main",
        component: Main,
        exact: true,
      },
    ],
  },
];

export { routes };
