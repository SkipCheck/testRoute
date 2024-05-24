<template>
    <div class="app-wrapper">
        <h1>Новый сотрудник</h1>
        <EmployeeForm></EmployeeForm>
    </div>
</template>
<script>
    import EmployeeForm from "../components/EmployeeForm.vue"
    export default{
        name : "AdderPage",
        components : {
            EmployeeForm
        }
    }
</script>