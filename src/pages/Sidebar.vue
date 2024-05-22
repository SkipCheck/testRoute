<template>
    <div class="sidebar">
        <div class="logo"></div>
        <router-link to="/" class="router-link">Главная</router-link>
        <router-link to="/employees" class="router-link">Список сотрудников</router-link>
        <router-link to="/add-employee" class="router-link">Добавить сотрудника</router-link>
        <router-link to="/fired-employees" class="router-link">Уволенные сотрудники</router-link>
        <router-link to="/404" class="router-link">404</router-link>
    </div>
</template>
<script>
export default{
    name : "SidebarElement",
}
</script>