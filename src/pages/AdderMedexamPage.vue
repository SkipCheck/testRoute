<template>
    <div class="app-wrapper">
        <h1>Новый медосмотр</h1>
        <MedexamForm></MedexamForm>
    </div>
</template>
<script>
import MedexamForm from "../components/MedexamForm.vue"

export default{
    components : {
        MedexamForm,
    }
}
</script>