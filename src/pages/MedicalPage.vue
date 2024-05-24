<template>
    <div class="app-wrapper" v-if="!loading">
        <h1>Медосмотры</h1>
        <table class="table-app">
            <thead>
                <tr>
                    <th scope="col">Врач</th>
                    <th scope="col">Сотрудник</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Статус</th>
                </tr>
            </thead>
            <tbody>
                <RowMedexam v-for="medexam in medexams" class="row"
                :key = "medexam.id"
                :medexam = "medexam"
                ></RowMedexam>
            </tbody>
        </table>
        <div class="pagination">
            <button v-for="number in numbers" :key="number" @click="changePage(number)">{{ number }}</button>
        </div>
    </div>
    <Loader :loading="loading" v-else></Loader>
</template>
<script>
import RowMedexam from '../components/RowMedexam.vue'
import Loader from "../components/Loader.vue"

export default{
    components : {
        RowMedexam,
        Loader
    },
    data(){
        return{
            medexams : [],
            loading : true,
            numberPages : [],
            currentPage : 1,
            viewedItems : 5,
            totalPages : 0,
        }
    },
    created () {
        this.startLoading()
    },
    computed : {
        numbers() {
            return Array.from({ length: this.totalPages}, (_, index) => 1 + index)
        }
    },
    methods : {
        startLoading(){
            setTimeout(() => {
                this.loadMedExam()
            }, 2000);
        },
        changePage(number){
            this.currentPage = number
            this.loadMedExam()
        },
        
        loadMedExam(){

            const axios = require('axios')
            axios.get(`http://localhost:3000/medexams?_embed=employee&_page=${this.currentPage}&_per_page=${this.viewedItems}`)
            .then((response) => {
                this.totalPages = response.data.pages
                this.numberPages = this.numbers
                this.medexams = response.data.data
                
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