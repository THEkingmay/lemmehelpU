<script setup>
import { reactive } from 'vue'
import { useTasksStores } from '../stores/Keeptasks'
import { RouterLink } from 'vue-router'

const tasksStore = useTasksStores()

const newdata = reactive({
    headline:tasksStore.headline,
    description:tasksStore.description,
    date:tasksStore.date,
    success:false
})
const add = ()=>{ //เพิ่มงาน
    if(newdata.headline.length>0){  
        tasksStore.addTask({...newdata})
    }else{
        alert('add some headline')
    }
}
const updateHl=()=>{   //ย้อนกลับไป home
    tasksStore.detailHl(newdata)
}
</script>
<template>
   <input type="text" v-model="newdata.headline"><br>
   <textarea rows="10" cols="30" v-model="newdata.description"></textarea><br>
   <input type="date" v-model="newdata.date">

   <RouterLink to='/' >
      <button @click="updateHl">back</button>
   </RouterLink>
   <RouterLink to='/' >
      <button @click="add" >Add</button>
   </RouterLink>
</template>
<style>
</style>
