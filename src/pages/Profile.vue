<template>
    <div class="app-wrapper">
        
        <img src="../assets/icon.png" class="avatar"/>
        <div class="details" v-if="!editing">
            <span>{{ employee.name }}</span>
            <span> Дата рождения: {{ employee.birth_date | formatDate}}</span>
            <span> Пол: {{ employee.sex | formatSex }}</span>
            <span> Место работы: {{ employee.organisation }}</span>
            <span> Должность: {{ employee.job_title }}</span>
            <span v-if = "employee.fired" class="fired-text">Уволен</span>
            
            <button @click="setFired(id) " v-if = "!employee.fired" class="fired-button">Уволить</button>
            <button @click="startEditing()" class="fired-button">Редактировать</button>
            <router-link :to="{ name: 'EmployeesPage' }" class="back"><button class="back-button">Вернуться назад</button></router-link>
        </div>
        <EditorForm v-else :employee="employee" @updateEmployee="updateEmployee" @cancelEditing="cancelEditing"></EditorForm>
    </div>
</template>
<script>
import EditorForm from "../components/EditorForm.vue"

export default{
    name : "ProfilePage",
    props: ['id', 'employees'],
    components : {
        EditorForm
    },
    data(){
        return{
            employee : Object,
            editing : false,
            editingEmployee: {
                name: '',
                birth_date: '',
                sex: 0,
                organisation: '',
                job_title: ''
            }
        }
    },
    created(){
        this.employee = this.employees[this.id]
    },
    methods : {
        setFired(index){
            this.$set(this.employees[index], 'fired', true);
        },
        startEditing(){
            this.editing = true
            this.editingEmployee.name = this.employee.name
        },
        updateEmployee(editedEmployee){
            this.$set(this.employees, this.id, editedEmployee);
            this.editing = false
            this.employee = editedEmployee
            console.log(this.employee.birth_date)
        },
        cancelEditing(){
            this.editing = false
        }
    }
}
</script>