<template>
    <div class="app-wrapper" v-if="!loading">
        <img src="../assets/icon.png" class="avatar"/>
        <div class="details">
            <span>{{ medexam.employee.name }}</span>
            <span> Врач: {{ medexam.doctor_name }}</span>
            <span> Температура: {{ medexam.temperature }}</span>
            <span> Систолическое давление: {{ medexam.pressure_systolic }}</span>
            <span> Диастолическое давление: {{ medexam.pressure_diastolic }}</span>
            <span> Статус: {{ medexam.status ? 'Пройден' : 'Не пройден' }}</span>
            
            <div class="profile-buttons">
                <button @click="prevPage()" class="fired-button">Вернуться назад</button>
            </div>
        </div>
    </div>
    <LoaderComponent v-else :loading="loading"></LoaderComponent>
</template>
<script>
import LoaderComponent from "../components/Loader.vue"

export default{
    name : "MedexamCard",
    components : {
        LoaderComponent
    },
    props : ['idMedexam', 'idEmployee'],
    data () {
        return {
            loading : true,
            medexam : Object,
        }
    },
    created(){
        this.startLoading()
    },
    methods : {
        startLoading(){
            setTimeout(() => {
                this.loadMedExam()
            }, 2000);
        },
        loadMedExam(){
            const params = {
                id : this.idMedexam,
                employeeId : this.idEmployee
            }
            const axios = require('axios')
            axios.get(`http://localhost:3000/medexams?_embed=employee`, {params})
            .then((response) => {
                this.medexam = response.data[0]
            })
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
            .finally(() => {
                this.loading = false;
            });
        },
        prevPage(){
            this.$router.go(-1);
        },
    }
}
</script>