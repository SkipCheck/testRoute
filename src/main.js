import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import MainPage from "./pages/Home.vue"
import EmployeesPage from "./pages/Employees.vue"
import AdderPage from "./pages/AdderPage.vue"
import NotFound from "./pages/NotFound.vue"
import ProfilePage from "./pages/Profile.vue"
import MedicalPage from './pages/MedicalPage.vue'
import MedexamPage from "./pages/Medexam.vue"
import AdderMedexamPage from './pages/AdderMedexamPage.vue'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.filter('formatDate', function(value) {
  const date = new Date(value * 1000)
  return (date.toLocaleDateString('ru-RU') != "Invalid Date" ? date.toLocaleDateString('ru-RU') : new Date(value).toLocaleDateString('ru-RU'))
})

Vue.filter('formatSex', function(value) {
  return value ? 'женский' : 'мужской'
})

Vue.directive('only-digits', {
  bind(el) {
    el.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }
});

function init(){

  const routes = [
    { path: '/', name: 'MainPage', component : MainPage},
    { path: '/employees', name: 'EmployeesPage', component : EmployeesPage, props : {fired : false}},
    { path: '/fired-employees', name: 'FiredEmployees', component : {...EmployeesPage}, props : {fired : true}},
    { path: '/add-employee', name: 'AdderPage', component : AdderPage},
    { path: '/404', name: 'NotFound', component : NotFound},
    { path: '/medical', name : 'MedicalPage', component : MedicalPage},
    { path: '*', name: 'NotFound', component: NotFound},
    { path: '/profile/:id', name: 'ProfilePage', component : ProfilePage, props: (route) => ({ id : parseInt(route.params.id)})},
    { path: '/medexam/:idMedexam/:idEmployee', name: 'MedexamPage', component : MedexamPage, props: (route) =>({ idMedexam : parseInt(route.params.idMedexam), idEmployee : parseInt(route.params.idEmployee)})},
    { path: '/add-medexam', name : 'AdderMedexamPage', component : AdderMedexamPage}
  ];
  const router = new VueRouter({
    routes
  });
  
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

init()