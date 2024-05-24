<template>
    <tr>
      <td class="field focus" @click="redirectToMedexam()">{{ medexam.doctor_name }}</td>
      <td class="field focus" @click = "redirectToProfile()">{{ medexam.employee.name }}</td>
      <td class="field">{{ medexam.date_exam | formatDate }}</td>
      <td class='field-success' v-if="medexam.status">Пройден</td>
      <td class='field-lost' v-if="!medexam.status">Не пройден</td>
    </tr>
</template>

<script>
    export default {
        name: 'MedexamField',
        props : ['medexam'],
        methods : {
          redirectToProfile() {
            this.$router.push({ name: 'ProfilePage', params: { id: this.medexam.employee.id}});
          },
          redirectToMedexam(){
            this.$router.push({ name: 'MedexamPage', params: { idMedexam : this.medexam.id, idEmployee : this.medexam.employee.id}});
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
