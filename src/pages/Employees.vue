<template>
    <div class="app-wrapper">
        <h1 v-if="this.fired">Уволенные сотрудники</h1>
        <h1 v-if="!this.fired">Нынешние сотрудники</h1>
        <FilterForm @createQuery="createQuery" :titles="titles" :countEmployees="employees.length" :countFindedEmployees="filteredEmployees != null ? filteredEmployees.length : 0"></FilterForm>
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
                :id = "getIndexOfEmployee(employee)"
                :people = "employee"
                :filterFired = "fired"
                @setFired="setFired"
                @clearQuery="clearQuery"
                @selectedEvent="selectedEvent"
                @unselectedEvent="unselectedEvent"
                />
            </tbody>
        </table>
        <button v-if="selectedEmployees.length > 0 && !fired" @click="fireSelectedEmployee()" class="main-fire">Уволить</button>
    </div>
   
</template>
<script>
import Row from '../components/Row.vue'
import FilterForm from '../components/Filters.vue'
export default{
    name : "EmployeesPage",
    components : {
        FilterForm,
        Row
    },
    data(){
        return{
            titles : this.genTitles(),
            filteredEmployees : null,
            selectedEmployees : []
        }
    },
    props : ['employees', 'fired'],
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
        genTitles(){
            const uniqueTitles = Array.from(this.employees.reduce((acc, employee) => {
                acc.add(employee.job_title);
                return acc;
            }, new Set()));
            return uniqueTitles
        },
        getIndexOfEmployee(employee){
            for (let i = 0; i < this.employees.length; i++) {
                if (this.employees[i] === employee) {
                    return i;
                }
            }
        },
        setFired(index){
            this.$set(this.employees[index], 'fired', true);
        },
        clearQuery(){
            this.filteredEmployees = null;
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
                if(this.employees[item].fired != true){
                    this.$set(this.employees[item], 'fired', true);
                }
            });
            this.selectedEmployees.splice(0, this.selectedEmployees.length)
        }
    },
}
</script>