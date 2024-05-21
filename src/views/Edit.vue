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
<div>
    หัวข้อ
    <input type="text" v-model="olddata.headline">
    คำอธิบาย
    <textarea rows="10" cols="30" v-model="olddata.description"></textarea><br>
    กำหนดส่ง
    <input type="date" v-model="olddata.date">
    <RouterLink to='/'><button @click="Update">Edit</button></RouterLink>
</div>
</template>