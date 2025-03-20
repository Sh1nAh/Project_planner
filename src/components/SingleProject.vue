<template>
    <div class="project" :class="{complete: project.complete}">
        <div class="flexing">
            <div>
                <h3 @click="showDetail = !showDetail">{{ project.title }}</h3>
                
            </div>
            <div class="test">
                <span class="material-icons" @click="deleteProject">delete</span>
                <router-link :to="{name: 'editproject', params: {id: project.id}}">
                    <span class="material-icons">edit</span>
                </router-link>
                <span class="material-icons" @click="completeProject" :class="{completeicon: project.complete}">done</span>
            </div>
        </div>
        <div>
            <p v-if="showDetail">{{ project.detail }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['project'],
    data() {
        return {
            showDetail: false,
            api: 'http://localhost:3000/projects'
        }
    },
    methods: {
        deleteProject() {
            let deleteRoute = this.api + '/' + this.project.id;
            fetch(deleteRoute, {method: "DELETE"})
            .then(()=> {
                this.$emit("delete", this.project.id)
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        completeProject() {
            let updateCompleteRoute = this.api + '/' + this.project.id;
            fetch(updateCompleteRoute, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    complete: !this.project.complete
                })
            })
            .then(()=> {
                this.$emit("complete", this.project.id)
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }
}
</script>

<style>
    .project {
        padding: 1rem;
        background-color: white;
        margin: 20px;
        border-left: 5px solid crimson;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h3 {
        color: #555;
        cursor: pointer;
    }
    p {
        color: #777;
        margin-top: 10px;
    }
    .flexing {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .test{
        display: flex;
        flex-wrap: nowrap;
        margin-top: 1rem;
    }
    span {
        color: #babab8;
        margin-left: 10px;
    }
    span:hover {
        color: #777;
        cursor: pointer;
    }
    .complete {
        border-left-color: #00ce89;
    }
    .completeicon {
        color: #00ce89;
    }
</style>