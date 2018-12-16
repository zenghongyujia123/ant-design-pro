export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // {
  //   path: '/form',
  //   icon: 'form',
  //   name: 'form',
  //   hideChildrenInMenu: true,
  //   routes: [
  //     // {
  //     //   path: '/form/basic-form',
  //     //   name: 'basicform',
  //     //   component: './Forms/BasicForm',
  //     // },
  //     {
  //       path: '/form/yifang-detail',
  //       name: 'yifangdetail',
  //       component: './Forms/YiFangDetail',
  //     },
  //     {
  //       path: '/form/jiafang-detail',
  //       name: 'jiafangdetail',
  //       component: './Forms/JiaFangDetail',
  //     }]
  // },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/form/yifang-detail',
            name: 'yifangdetail',
            component: './Forms/YiFangDetail',
          },
          {
            path: '/form/jiafang-detail',
            name: 'jiafangdetail',
            component: './Forms/JiaFangDetail',
          },
        ],
      },
      {
        path: '/list/user-list',
        name: 'list.usertable',
        component: './List/UserList',
      },
      {
        path: '/list/order-list',
        name: 'list.ordertable',
        component: './List/OrderList',
      },
      {
        path: '/list/yifang-list',
        name: 'list.yifangtable',
        component: './List/YiFangList',
      },
      {
        path: '/list/jiafang-list',
        name: 'list.jiafangtable',
        component: './List/JiaFangList',
      },
      {
        path: '/list/setting-detail',
        name: 'list.settingdetail',
        component: './List/SettingDetail',
      },
    ]
  }
]