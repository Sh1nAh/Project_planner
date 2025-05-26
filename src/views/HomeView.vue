<template>
  <div class="home">
    <FilterNav @filterValue="current = $event" :current="current"></FilterNav>
    <div v-for="project in filteredProjects" :key="project.id">
      <SingleProject :project="project" @delete="deleteProject" @complete="completeProject"></SingleProject>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase/config'

import FilterNav from '../components/FilterNav'
import SingleProject from '../components/SingleProject'

export default {
  name: 'HomeView',
  components: {
    FilterNav,
    SingleProject,
  },
  data() {
    return {
      projects: [],
      current: 'all'
    }
  },
  methods: {
    deleteProject(id) {
      this.projects = this.projects.filter((project => {
        return project.id !== id;
      }))
    },
    completeProject(id) {
      let findProject = this.projects.find((project) => {
        return project.id === id
      })
      findProject.complete = !findProject.complete
    }
  },
  computed: {
    filteredProjects() {
      if (this.current === 'complete') {
        return this.projects.filter((project) => {
          return project.complete
        })
      }
      if (this.current === 'ongoing') {
        return this.projects.filter((project) => {
          return !project.complete
        })
      }
      return this.projects
    }
  },
  // mounted() {
  //   fetch('http://localhost:3000/projects')
  //   .then((response)=> {
  //     return response.json()
  //   })
  //   .then((datas)=> {
  //     this.projects = datas   
  //   })
  //   .catch(()=> {
  //   })
  // }

  mounted() {
    db.collection('projects')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      let results = []
      snapshot.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      this.projects = results
    }, err => {
      console.log('Snapshot error:', err)
    })
  }
}
</script>