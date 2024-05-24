<template>
    <form @submit.prevent="addMedexam" class="employee-adder">
        <div>
            <label>ФИО врача:</label>
            <input type="text" id="name" v-model="newMedexam.doctor_name" required>
        </div>
      
        <div>
            <label>Сотрудник:</label>
            <select type="date" v-model="newMedexam.employeeId" required>
                <option v-for="employee in employeeList" :value="employee.id" :key="employee.id">{{ employee.name }}</option>
            </select>
        </div>

        <div>
            <label>Дата медосмотра:</label>
            <input type="date" v-model="newMedexam.date_exam" required>
        </div>

        <div>
            <label>Температура</label>
            <input type="number" v-model="newMedexam.temperature" only-digits required>
        </div>

        <div>
            <labeL>Систолическое давление</labeL>
            <input type="number" v-model="newMedexam.pressure_systolic" required>
        </div>

        <div>
            <labeL>Диастолическое давление</labeL>
            <input type="number" v-model="newMedexam.pressure_diastolic" required>
        </div>

        <div>
            <label>Статус</label>
            <select v-model="newMedexam.status" required>
                <option value="true">Пройден</option>
                <option value="false">Не пройден</option>
            </select>
        </div>
      
        <button type="submit">Добавить медосмотр</button>
    </form>
</template>
<script>
export default{
    name : "MedexamForm",
    data () {
        return {
            newMedexam : {
                id: '',
                employeeId: '',
                date_exam: '',
                doctor_name: '',
                temperature: 0,
                pressure_systolic: 0,
                pressure_diastolic: 0,
                status: false
            },
            employeeList : []
        }
    },
    created(){
        this.generateID()
        this.generateEmployeeList()
    },
    methods : {
        addMedexam() {
            const axios = require('axios')

            this.newMedexam.temperature = parseFloat(this.newMedexam.temperature )
            this.newMedexam.pressure_systolic = parseInt(this.newMedexam.pressure_systolic)
            this.newMedexam.pressure_diastolic = parseInt(this.newMedexam.pressure_diastolic)
            this.newMedexam.status = this.parseBool(this.newMedexam.status)

            axios.post('http://localhost:3000/medexams', this.newMedexam)
            .then(() =>{
                this.generateID()
            })
            this.resetForm();
        },
        generateID(){
            let tempID = 0
            const axios = require('axios')
            axios.get(`http://localhost:3000/medexams`)
            .then((response) => {
                tempID = parseInt(response.data[response.data.length - 1].id)+1
                this.newMedexam.id = ''+tempID
            })
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
        },
        generateEmployeeList(){
            const axios = require('axios')
            axios.get(`http://localhost:3000/employees?fired=false`)
            .then((response) => {
                this.employeeList = response.data
            })
            .catch((error) => {
                console.log("Ошибка - ", error);
            })
        },
        resetForm() {
            this.newMedexam = {
                id: '',
                employeeId: '',
                date_exam: '',
                doctor_name: '',
                temperature: 0,
                pressure_systolic: 0,
                pressure_diastolic: 0,
                status: false
            }
        },
        parseBool(str) {
            return str === 'true';
        }
    }
}
</script>