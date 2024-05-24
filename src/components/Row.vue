<template>
    <tr v-if="(people.fired.toString().includes(this.filterFired.toString()))" >
      <td class="field focus" @click="redirectToProfile()">{{ people.name }}</td>
      <td class="field">{{ people.birth_date | formatDate }}</td>
      <td class="field">{{ people.sex | formatSex }}</td>
      <td class="field">{{ people.organisation}}</td>
      <td class="field">{{ people.job_title }}</td>
      <td class='fired' v-if="people.fired">Уволен</td>
      <button @click="setFired" v-if="!people.fired">Уволить</button>
      <input type="checkbox" v-model="selected" v-if="!people.fired" @change="selectEvent()"/>
    </tr>
</template>

<script>
export default {
  name: 'BlankField',
  data(){
    return{
      selected : null
    }
  },
  props: {
    id : Number,
    people: Object,
    filterFired : null
  },
  methods:{
    setFired(){
      this.$emit("fireEmployee", ''+this.id)
    },
    redirectToProfile() {
      this.$router.push({ name: 'ProfilePage', params: { id: this.id}});
    },
    selectEvent(){
      if(this.selected){
        this.$emit("selectedEvent", this.id)
      }else{
        this.$emit("unselectedEvent", this.id)
      }
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
