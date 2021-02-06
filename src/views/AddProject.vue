<template>
  <form @submit.prevent="handleSubmit">
    <label>Title:</label>
    <input v-model="title" type="text" required />
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <button>Add Project</button>
  </form>
</template>

<script>
import { projectFirestore } from "../firebase/config";
export default {
  data() {
    return {
      title: "",
      details: "",
      uri: "http://localhost:3000/projects",
    };
  },
  methods: {
    handleSubmit() {
      let project = {
        title: this.title,
        details: this.details,
        complete: false,
      };
      // fetch(this.uri, {
      //     method: 'POST',
      //     headers: {'Content-type': 'application/json'},
      //     body: JSON.stringify(project)
      // }).then(()=>{
      //     this.$router.push('/')
      // }).catch(err=> console.log(err.message))

      projectFirestore
        .collection("projects")
        .add(project)
        .then( () => { this.$router.push('/') })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style>
form {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
</style>