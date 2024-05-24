<template>
    <div class="sidebar">
        <div class="logo"></div>
        <router-link :to="{ name : 'MainPage' }" class="router-link">Главная</router-link>
        <router-link :to="{ name : 'EmployeesPage' }" class="router-link">Список сотрудников</router-link>
        <router-link :to="{ name : 'AdderPage'}" class="router-link">Добавить сотрудника</router-link>
        <router-link :to="{ name : 'FiredEmployees' }" class="router-link">Уволенные сотрудники</router-link>
        <router-link :to="{ name : 'MedicalPage' }" class="router-link">Медосмотры</router-link>
        <router-link :to="{ name : 'AdderMedexamPage' }" class="router-link">Добавить медосмотр</router-link>
        <router-link :to="{ name : 'NotFound' }" class="router-link">404</router-link>
    </div>
</template>
<script>
export default{
    name : "SidebarElement",
}
</script>