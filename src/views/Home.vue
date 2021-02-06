<template>
  <div class="home">
    <FilterdNav @filterChange="current = $event" :current="current" />
    <div v-if="filteredProjects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject
          :project="project"
          @delete="handleDelete"
          @complete="handleComplete"
        />
      </div>
    </div>

    <div v-else>Loading data...</div>
  </div>
</template>

<script>
import { projectFirestore } from "../firebase/config.js";
import SingleProject from "../components/SingleProject";
import FilterdNav from "../components/FilterdNav";

export default {
  name: "Home",
  data() {
    return {
      projects: [],
      current: "all",
    };
  },
  mounted() {
    // fetch("http://localhost:3000/projects")
    //   .then((res) => res.json())
    //   .then((data) => (this.projects = data))
    //   .catch((err) => console.log(err.message));

    projectFirestore
      .collection("projects")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          // let project = doc.data()
          // project.id = doc.id
          let project = { ...doc.data(), id: doc.id };
          this.projects.push(project);
        });
      })
      .catch((err) => console.log(err.message));
  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter((project) => project.id !== id);
    },
    handleComplete(id) {
      let p = this.projects.find((project) => project.id === id);
      p.complete = !p.complete;
    },
  },
  computed: {
    filteredProjects() {
      if (this.current === "completed") {
        return this.projects.filter((project) => project.complete);
      } else if (this.current === "ongoing") {
        return this.projects.filter((project) => !project.complete);
      } else {
        return this.projects;
      }
    },
  },
  components: {
    SingleProject,
    FilterdNav,
  },
};
</script>

<style>
</style>