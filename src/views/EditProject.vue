<template>
  <div class="message" v-if="error">
    <p>{{error}} </p>
    <span @click="error = ''" class="material-icons"> cancel </span>
  </div>
  <form @submit.prevent="handleSubmit" v-if="!error">
    <label>Title:</label>
    <input v-model="title" type="text" required />
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <button>Update Project</button>
  </form>
</template>

<script>
import { projectFirestore } from "../firebase/config.js";

export default {
  props: ["id"],
  data() {
    return {
      title: "",
      details: "",
      error: "",
      // uri: "http://localhost:3000/projects/" + this.id,
    };
  },
  mounted() {
    // fetch(this.uri)
    //   .then((res) => res.json())
    //   .then((project) => {
    //     this.title = project.title;
    //     this.details = project.details;
    //   })
    //   .catch((err) => {
    //     this.error = "The content was not found";
    //     console.log(err.message);
    //   });
    projectFirestore
      .collection("projects")
      .doc(this.id)
      .get()
      .then((res) => {
        if (!res.exists) {
          throw Error("That post does not exist. :(");
        }
        let project = res.data();
        this.title = project.title;
        this.details = project.details;
      })
      .catch((err) => {
        this.error = err.message;
        console.log(err.message);
      });
  },
  methods: {
    handleSubmit() {
      // fetch(this.uri, {
      //   method: "PATCH",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({
      //     title: this.title,
      //     details: this.details,
      //   }),
      // })
      //   .then(() => {
      //     this.$router.push("/");
      //   })
      //   .catch((err) => console.log(err.message));
      
      projectFirestore
        .collection("projects")
        .doc(this.id)
        .update({
          title: this.title,
          details: this.details,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style>
.message {
  margin: 20px auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  background: #cce5ff;
  border-radius: 6px;
}
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
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
textarea {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
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