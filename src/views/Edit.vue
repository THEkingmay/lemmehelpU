<script setup>
import { useTasksStores } from '../stores/Keeptasks'
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

const tasksStore = useTasksStores()

const index=tasksStore.myindex
const olddata = reactive({
    headline:tasksStore.headline,
    description:tasksStore.description,
    date:tasksStore.date,
    success:tasksStore.success
})
const Update=()=>{ 
    tasksStore.addUpdate(index,olddata)
}
</script>
<template>
<div class="con">
    <div>Task name</div>
    <input type="text" v-model="olddata.headline">
    <div>Description</div>
    <textarea rows="10" cols="30" v-model="olddata.description"></textarea>
    <div>Date</div>
    <input type="date" v-model="olddata.date">
    <div class="con-bt">
        <RouterLink to='/'><button @click="Update">Edit</button></RouterLink>
    </div>
</div>
</template>