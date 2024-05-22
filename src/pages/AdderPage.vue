<template>
    <div class="app-wrapper">
        <h1>Новый сотрудник</h1>
        <EmployeeForm @addEmployee="addEmployee"></EmployeeForm>
    </div>
</template>
<script>
    import EmployeeForm from "../components/EmployeeForm.vue"
    export default{
        name : "AdderPage",
        components : {
            EmployeeForm
        },
        props : ['employees'],
        methods:{
            addEmployee(newEmployee) {
                const id = this.employees.length + 1;
                this.$set(this.employees, this.employees.length, { id, ...newEmployee });
                this.$forceUpdate();
            },
        }
    }
</script>