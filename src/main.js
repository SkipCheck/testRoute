import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import MainPage from "./pages/Home.vue"
import EmployeesPage from "./pages/Employees.vue"
import FiredEmployees from "./pages/Employees.vue"
import AdderPage from "./pages/AdderPage.vue"
import NotFound from "./pages/NotFound.vue"
import ProfilePage from "./pages/Profile.vue"
import { employees } from './data/employees'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'MainPage', component: MainPage},
  { path: '/employees', name: 'EmployeesPage', component: EmployeesPage, props : {employees : employees, fired : false}},
  { path: '/fired-employees', name: 'FiredEmployees', component: FiredEmployees, props : {employees : employees, fired : true}},
  { path: '/add-employee', name: 'AdderPage', component: AdderPage, props : {employees : employees}},
  { path: '/404', name: 'NotFound', component: NotFound},
  { path: '*', name: 'NotFound', component: NotFound},
  { path: '/profile/:id', name: 'ProfilePage', component : ProfilePage, props: (route) => ({ id : parseInt(route.params.id), employees : employees})}
];

const router = new VueRouter({
  routes
});

//конвертируем дату рождения
Vue.filter('formatDate', function(value) {
  const date = new Date(value * 1000)
  return (date.toLocaleDateString('ru-RU') != "Invalid Date" 
  ? date.toLocaleDateString('ru-RU') :
   new Date(value).toLocaleDateString('ru-RU'))
})

//функция определения пола
Vue.filter('formatSex', function(value) {
  return value ? 'женский' : 'мужской'
})

new Vue({
  router,
  data(){
    return{
      employees
    }
  },
  render: h => h(App)
}).$mount('#app')