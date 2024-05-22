import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import MainPage from "./pages/Home.vue"
import EmployeesPage from "./pages/Employees.vue"
import FiredEmployees from "./pages/Employees.vue"
import AdderPage from "./pages/AdderPage.vue"
import NotFound from "./pages/NotFound.vue"
import { employees } from './data/employees'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage},
  { path: '/employees', component: EmployeesPage, props : {employees : employees, fired : false}},
  { path: '/fired-employees', component: FiredEmployees, props : {employees : employees, fired : true}},
  { path: '/add-employee', component: AdderPage, props : {employees : employees}},
  { path: '/404', component: NotFound},
  { path: '*', component: NotFound}
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