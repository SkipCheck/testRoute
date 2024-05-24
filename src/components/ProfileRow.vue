<template>
     <tr>
      <td class="field focus" @click="redirectToMedexam()">{{ medexam.doctor_name }}</td>
      <td class="field">{{ medexam.date_exam | formatDate }}</td>
      <td class='field-success' v-if="medexam.status">Пройден</td>
      <td class='field-lost' v-if="!medexam.status">Не пройден</td>
    </tr>
</template>
<script>
    export default{
        name : "ProfileRow",
        props : ['medexam', 'id'],
        methods : {
            redirectToMedexam(){
                this.$router.push({ name: 'MedexamPage', params: { idMedexam : this.medexam.id, idEmployee : this.id}});
            }
        }
    }
</script>