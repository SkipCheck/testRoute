<template>
    <div class="filters">
        <form @submit.prevent="createQuery" class="form-filters">
            <div>
                <div>
                    <label>ФИО:</label>
                    <input type="text" id="name" v-model="newQuery.name">
                </div>
                
                <div>
                    <label>Дата рождения</label>
                    <input type="text" id="name" v-model="newQuery.birth_date" >
                </div>
            </div>
            

            <span>
                <input type="radio" id="name" value="0"  v-model="newQuery.sex" >
                <label>Мужской</label>

                <input type="radio" id="name" value="1" v-model="newQuery.sex" >
                <label>Женский</label>
            </span>
            
            <div>
                <div>
                    <label>Организация</label>
                    <input type="text" id="name" v-model="newQuery.organisation">
                </div>

                <div>
                    <label>Должность</label>
                    <select v-model="newQuery.job_title">
                        <option v-for="title in titles" :key="title" :value="title">{{title}}</option>
                    </select>
                </div>
            </div>
            

            <span>
                <input type="checkbox" v-model="newQuery.fired">
                <label>Уволен</label>
            </span>

            <div>
                <button type="submit" class="find">Найти</button>
                <button @click="clearQuery" class="find">Сброс</button>
            </div>
            
            <span>
                Количество работников {{ countFindedEmployees }} из {{ countEmployees }}
            </span>
        </form>
    </div>
</template>
<script>
    export default{
        name : 'FilterForm',
        data(){
            return{
                title : null,
                newQuery:{
                    name: null,
                    birth_date: null,
                    sex: null,
                    organisation: null,
                    job_title: null,
                    fired: null
                }
            }
        },
        props: {
            titles: [],
            countEmployees : null,
            countFindedEmployees : null
        },
        methods:{
            createQuery(){
                this.$emit("createQuery", this.newQuery)
            },
            clearQuery(){
                this.$emit("clearQuery")
                this.newQuery = {
                    name: null,
                    birth_date: null,
                    sex: null,
                    organisation: null,
                    job_title: null,
                    fired: null
                }
            }
        }
    }
</script>