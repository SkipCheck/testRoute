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
          name: '',
          birth_date: '',
          sex: 0,
          organisation: '',
          job_title: '',
          fired: false
        }
      };
    },
    methods: {
      addEmployee() {
        this.$emit('addEmployee', this.newEmployee);
        this.resetForm();
      },
      resetForm() {
        this.newEmployee = {
          name: '',
          birth_date: '',
          sex: 0,
          organisation: '',
          job_title: '',
          fired: false
        };
      }
    }
  };
  </script>