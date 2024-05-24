<template>
    <form @submit.prevent="addEmployee" class="employee-adder">
      <div>
        <label>ФИО:</label>
        <input type="text" id="name" v-model="newEmployee.name" required>
      </div>
      
      <div>
        <label>Дата рождения:</label>
        <input type="date" id="birthdate" v-model="newEmployee.birth_date" required>
      </div>
      
      <div>
        <label>Пол:</label>
        <select id="sex" v-model="newEmployee.sex" required>
          <option value="0">Мужской</option>
          <option value="1">Женский</option>
        </select>
      </div>
      
      <div>
        <label>Организация:</label>
        <input type="text" id="organisation" v-model="newEmployee.organisation" required>
      </div>
      
      <div>
        <label>Должность:</label>
        <input type="text" id="job_title" v-model="newEmployee.job_title" required>
      </div>
  
      <div>
        <label>Уволен/Не уволен</label>
        <select id="fired" v-model="newEmployee.fired" required>
          <option value="true">Уволен</option>
          <option value="false">Не уволен</option>
        </select>
      </div>
      
      <button type="submit">Добавить сотрудника</button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'EmployeeForm',
    data() {
      return {
        newEmployee: {
          id : '',
          name : '',
          birth_date : '',
          sex : 0,
          organisation : '',
          job_title : '',
          fired : false
        }
      };
    },
    created(){
      this.generateID()
    },
    methods: {
      addEmployee() {
        const axios = require('axios')
        this.newEmployee.fired = this.parseBool(this.newEmployee.fired)
        axios.post('http://localhost:3000/employees', this.newEmployee)
        .then(() =>{
          this.generateID()
        })
        this.resetForm();
      },
      generateID(){
        let tempID = 0
        const axios = require('axios')
        axios.get(`http://localhost:3000/employees`)
        .then((response) => {
          tempID = parseInt(response.data[response.data.length - 1].id)+1
          this.newEmployee.id = ''+tempID
        })
        .catch((error) => {
          console.log("Ошибка - ", error);
        })
      },
      resetForm() {
        this.newEmployee = {
          id : '',
          name: '',
          birth_date: '',
          sex: 0,
          organisation: '',
          job_title: '',
          fired: false
        };
      },
      parseBool(str) {
        return str === 'true';
      }
    }
  };
  </script>