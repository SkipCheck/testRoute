<template>
    <div class="app-wrapper" v-if="!loading">
        <h1 v-if="this.fired">Уволенные сотрудники</h1>
        <h1 v-if="!this.fired">Нынешние сотрудники</h1>
        <FilterForm @createQuery="createQuery" @clearQuery="clearQuery" :titles="titles" :countEmployees="itemsSize" :countFindedEmployees="filteredEmployees != null ? filteredEmployees.length : employees.length"></FilterForm>
        <table class="table-app">
            <thead>
                <tr>
                <th scope="col">ФИО</th>
                <th scope="col">Дата рождения</th>
                <th scope="col">Пол</th>
                <th scope="col">Организация</th>
                <th scope="col">Должность</th>
                </tr>
            </thead>
            <tbody>
                <Row v-for="employee in (filteredEmployees != null ? filteredEmployees : employees)" class="row" 
                :key = "employee.id"
                :id = "parseInt(employee.id)"
                :people = "employee"
                :filterFired = "fired"
                @fireEmployee="fireEmployee"
                @clearQuery="clearQuery"
                @selectedEvent="selectedEvent"
                @unselectedEvent="unselectedEvent"
                />
            </tbody>
        </table>
        <div v-if="selectedEmployees.length > 0" class="action-buttons">
            <button v-if="!fired" @click="fireSelectedEmployee()" class="main-fire">Уволить</button>
        </div>
        <div class="pagination">
            <button v-for="number in numbers" :key="number" @click="changePage(number)">{{ number }}</button>
        </div>
    </div>
    <LoaderComponent v-else :loading="loading"></LoaderComponent>
</template>
<script>
import Row from '../components/Row.vue'
import FilterForm from '../components/Filters.vue'
import LoaderComponent from '../components/Loader.vue'

export default{
    name : "EmployeesPage",
    components : {
        FilterForm,
        Row,
        LoaderComponent
    },
    data(){
        return{
            titles : [],
            filteredEmployees : null,
            selectedEmployees : [],
            numberPages : [],
            employees : [],
            loading : true,
            currentPage : 1,
            viewedItems : 5,
            totalPages : 0,
            itemsSize : 0
        }
    },
    props : ['fired'],
    created () {
        this.startLoading()
    },
    computed : {
        numbers() {
            return Array.from({ length: this.totalPages}, (_, index) => 1 + index)
        }
    },
    methods:{
        createQuery(newQuery){
            this.filteredEmployees = this.employees.filter(employee => {
                let compare = (
                    (newQuery.name != null ? employee.name.toLowerCase().includes(newQuery.name.toLowerCase()) : true) &&
                    (newQuery.birth_date != null ? (this.filterDate(employee.birth_date )).toString().includes(newQuery.birth_date) : true) &&
                    (newQuery.sex != null ? employee.sex == newQuery.sex : true) &&
                    (newQuery.organisation != null ? employee.organisation.toLowerCase().includes(newQuery.organisation) : true) &&
                    (newQuery.job_title != null ? employee.job_title.toLowerCase().includes(newQuery.job_title.toLowerCase()) : true) &&
                    (newQuery.fired != null ? employee.fired == newQuery.fired : true)
                );
                return compare
            });
            if(this.filteredEmployees.length == 0){
                this.filteredEmployees = null;
            }
        },
        genTitles(employees){
            const uniqueTitles = Array.from(employees.reduce((acc, employee) => {
                acc.add(employee.job_title);
                return acc;
            }, new Set()));
            return uniqueTitles
        },
        fireEmployee(id){
            let employee = null
            this.employees.forEach(emp => {
                if(emp.id == id){
                    emp.fired = true
                    employee = emp
                }
            });
            const axios = require('axios')
            axios.put(`http://localhost:3000/employees/${employee.id}`, employee)
            .then(() => {
                this.loadEmployees()
            })
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
        },
        clearQuery(){
            this.filteredEmployees = null;
            this.loadEmployees()
        },
        selectedEvent(id){
            this.selectedEmployees.push(id)
        },
        unselectedEvent(id){
            const index = this.selectedEmployees.findIndex(item => item === id);
            this.selectedEmployees.splice(index, 1)
        },
        fireSelectedEmployee(){
            this.selectedEmployees.forEach(item => {
                this.fireEmployee(item)
            });
            this.selectedEmployees.splice(0, this.selectedEmployees.length)
            this.loadEmployees()
        },
        changePage(number){
            if(this.currentPage != number){
                this.selectedEmployees.splice(0, this.selectedEmployees.length)
            }

            this.filteredEmployees = null
            this.currentPage = number
            this.loadEmployees()
        },
        startLoading(){
            setTimeout(() => {
                this.loadEmployees()
            }, 2000);
        },
        loadEmployees(){
            const axios = require('axios')
            axios.get(`http://localhost:3000/employees?fired=${this.fired}&_page=${this.currentPage}&_per_page=${this.viewedItems}`)
            .then((response) => {
                this.totalPages = response.data.pages
                this.itemsSize = response.data.items
                this.numberPages = this.numbers
                this.employees = response.data.data
                this.titles = this.genTitles(this.employees)
            })
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
            .finally(() => {
                this.loading = false;
            });
        },
    },
}
</script>