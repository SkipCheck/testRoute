<template>
    <div class="editor">
        <div>
            <label>ФИО:</label>
            <input type="text" id="name" v-model="editedEmployee.name" required>
        </div>
        
        <div>
            <label>Дата рождения:</label>
            <input type="date" id="birthdate" v-model="editedEmployee.birth_date" required>
        </div>
        
        <div>
            <label>Пол:</label>
            <select id="sex" v-model="editedEmployee.sex" required>
                <option value="0">Мужской</option>
                <option value="1">Женский</option>
            </select>
        </div>
        
        <div>
            <label>Организация:</label>
            <input type="text" id="organisation" v-model="editedEmployee.organisation" required>
        </div>
        
        <div>
            <label>Должность:</label>
            <input type="text" id="job_title" v-model="editedEmployee.job_title" required>
        </div>
        <button @click="endEditing()">Сохранить</button>
        <button @click="cancelEditing()">Отмена</button>
    </div>
</template>
<script>
    export default{
        name : "EditorForm",
        props : ['employee'],
        data() {
            return {
                editedEmployee : {
                    id : 0,
                    name: '',
                    birth_date: '',
                    sex: 0,
                    organisation: '',
                    job_title: '',
                    fired: false
                }
            };
        },
        created (){
            this.startEditing()
        },
        methods : {
            startEditing(){
                let birth_date =  (this.formatDate(this.employee.birth_date) != "Invalid Date" ? this.formatDate(this.employee.birth_date) : this.employee.birth_date)
                this.editedEmployee = {...this.employee}
                this.editedEmployee.birth_date = birth_date
            },
            formatDate(value){
                const date = new Date(value * 1000);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const formattedDate = date.toLocaleDateString('en-CA', options).replace(/\//g, '-');
                return formattedDate
            },
            endEditing(){
                this.$emit("updateEmployee", this.editedEmployee)
                this.clearEditor()
            },
            cancelEditing(){
                this.$emit("cancelEditing")
                this.clearEditor()
            },
            clearEditor(){
                this.editedEmployee = {
                    name: '',
                    birth_date: '',
                    sex: 0,
                    organisation: '',
                    job_title: '',
                    fired: false
                }
            }
        }
    }
</script>