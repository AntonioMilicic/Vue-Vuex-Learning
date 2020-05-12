import Home from "./components/Home.vue";
import Header from "./components/Header.vue";

//require je da odma loada file.
//ovako resolva samo ako je potrebno ucitat
//tada webpack napravi vise razlicitih paketa koje loada samo ako je potebno.
const User = resolve => {
  require.ensure(
    ["./components/user/User.vue"],
    () => {
      resolve(require("./components/user/User.vue"));
    },
    "user"
  );
};
const UserStart = resolve => {
  require.ensure(
    ["./components/user/UserStart.vue"],
    () => {
      resolve(require("./components/user/UserStart.vue"));
    },
    "user"
  );
};
const UserEdit = resolve => {
  require.ensure(["./components/user/UserEdit.vue"], () => {
    resolve(require("./components/user/UserEdit.vue"));
  });
};
const UserDetail = resolve => {
  require.ensure(["./components/user/UserDetail.vue"], () => {
    resolve(require("./components/user/UserDetail.vue"));
  });
};

export const routes = [
  {
    path: "/",
    components: {
      default: Home,
      "header-top": Header
    }
  },
  // { path: "/user/:id", component: User, props: true } //user/something, gdje je something id

  // Drugi dio zadatka za listu usera. Component: je za 1, s je za vise.
  {
    path: "/user",
    components: { default: User, "header-bottom": Header },
    children: [
      { path: "", component: UserStart },
      {
        path: ":id",
        component: UserDetail,
        beforeEnter: (to, from, next) => {
          console.log("inside route setup");
          next();
        }
      },
      { path: ":id/edit", component: UserEdit, name: "userEdit" }
    ]
  },
  { path: "/redirect-me", redirect: "/home" },
  { path: "*", redirect: "/" }
];
