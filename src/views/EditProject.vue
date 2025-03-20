<template>
    <form @submit.prevent="addProject">
        <label>Title</label>
        <input type="text" v-model="title">
        <label>Details</label>
        <textarea v-model="detail" name="" id="" cols="30" rows="10"></textarea>
        <button @click="updateProject">Update Project</button>
    </form>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            title: '',
            detail: ''
        }
    },
    mounted() {
        fetch('http://localhost:3000/projects/' + this.id)
        .then((response) => {
            return response.json()
        })
        .then((datas) => {
            this.title = datas.title
            this.detail = datas.detail
        })
        .catch((err) => {
            console.log(err)
        })
    },
    methods: {
        updateProject() {
            fetch('http://localhost:3000/projects/'+ this.id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.title,
                    detail: this.detail
                })
            })
            .then(() => {
                this.$router.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>