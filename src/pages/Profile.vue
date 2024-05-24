<template>
    <div class="app-wrapper"  v-if="!loading">
        <img src="../assets/icon.png" class="avatar"/>
        <div class="details" v-if="!editing">
            <span>{{ employee.name }}</span>
            <span> Дата рождения: {{ employee.birth_date | formatDate}}</span>
            <span> Пол: {{ employee.sex | formatSex }}</span>
            <span> Место работы: {{ employee.organisation }}</span>
            <span> Должность: {{ employee.job_title }}</span>
            <span v-if = "employee.fired" class="fired-text">Уволен</span>
            
            <div class="profile-buttons">
                <button @click="setFired() " v-if = "!employee.fired" class="fired-button">Уволить</button>
                <button @click="startEditing()" class="fired-button">Редактировать</button>
                <button @click="prevPage()" class="fired-button">Вернуться назад</button>
            </div>
            
            <div class="profile-medexam">
                <h1>Медосмотры</h1>
                <table class="table-app" v-if="medexams.length > 0">
                    <thead>
                        <tr>
                            <th scope="col">Врач</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProfileRow v-for="medexam in medexams" class="row"
                        :key = "medexam.id"
                        :medexam = "medexam"
                        :id = "employee.id"
                        ></ProfileRow>
                    </tbody>
                </table>
                <span v-else>Нет информации о медосмотрах</span>
            </div>
        </div>
        <EditorForm v-else :employee="employee" @cancelEditing="cancelEditing" @updateEmployee="updateEmployee"></EditorForm>
        
    </div>
    <LoaderComponent v-else :loading="loading"></LoaderComponent>
</template>
<script>
import EditorForm from "../components/EditorForm.vue"
import LoaderComponent from '../components/Loader.vue'
import ProfileRow from './../components/ProfileRow.vue'

export default{
    name : "ProfilePage",
    props: ['id'],
    components : {
        EditorForm,
        LoaderComponent,
        ProfileRow
    },
    data(){
        return{
            employee : Object,
            editing : false,
            loading : true,
            medexams : [],
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
        this.startLoading()
    },
    methods : {
        setFired(){
            this.employee.fired = true
            this.saveChanges()
        },
        startEditing(){
            this.editing = true
            this.editingEmployee.name = this.employee.name
        },
        updateEmployee(editedEmployee){
            this.editing = false
            this.employee = editedEmployee
            this.saveChanges()
        },
        saveChanges(){
            const axios = require('axios')
            axios.put(`http://localhost:3000/employees/${this.employee.id}`, this.employee)
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
        },
        prevPage(){
            this.$router.go(-1);
        },
        cancelEditing(){
            this.editing = false
        },
        startLoading(){
            setTimeout(() => {
                this.loadEmployees()
                this.loadMedExams()
            }, 2000);
        },
        loadEmployees(){
            const params = {
                id : this.id
            }
            const axios = require('axios')
            axios.get(`http://localhost:3000/employees`, {params})
            .then((response) => {
                this.employee = response.data[0]
            })
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
        },
        loadMedExams(){
            const params = {
                employeeId : this.id
            }
            const axios = require('axios')
            axios.get(`http://localhost:3000/medexams`, {params})
            .then((response) => {
                this.medexams = response.data
            })
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
            .finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>