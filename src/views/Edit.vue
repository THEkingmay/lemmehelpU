<script setup>
import successcom from '@/components/success.vue'
import errorcom from '@/components/error.vue'
import { useTasksStores } from '../stores/Keeptasks'
import { ref,reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tasksStore = useTasksStores()

let currentindex= ref(0)
let olddata = reactive({
    headline: '',
    description: '',
    date: '',
    success:false
})

onMounted( ()=>{
    currentindex.value=tasksStore.currenttaskindex
    const task = tasksStore.lists[currentindex.value]
    console.log("Old data:",task)
    if (task) {
        olddata.headline = task.headline
        olddata.description = task.description
        olddata.date = task.date
        olddata.success=task.success
    }
})

const Update=()=>{ 
    if(olddata.headline.length>0){
    console.log("New data:",olddata)
    tasksStore.addUpdate(currentindex.value,olddata)
    router.push('/')
    }else{
        timealert(1)
    }
}

let iserror = ref(false)
let issuccess = ref(false)
function timealert(e){
    if(e==1)iserror.value=true
    else issuccess.value=true
    setTimeout(()=>{
        iserror.value=false;
        issuccess.value=false;
    },1000)
}
</script>
<template> 
<div class="flex flex-col h-screen justify-around p-4">
    <errorcom v-if="iserror"></errorcom>
    <successcom v-if="issuccess"></successcom>
    <div class="flex flex-col"> 
        <label class="form-control w-full">
        <div class="label">
            <span class="label-text text-lg">Task</span>
        </div>
        <input type="text" v-model="olddata.headline" class="input input-bordered w-full">
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text text-lg">Description</span>
            </div>
            <textarea rows="6" cols="30" v-model="olddata.description" class="textarea textarea-bordered"></textarea>
        </label>
        <label class="form-control w-full">
            <div class="label">
                <span class="label-text text-lg">Date</span>
            </div>
            <input type="date" v-model="olddata.date" class="input input-bordered w-full">
        </label>
        <button @click="Update" class="mt-4 btn btn-outline btn-success ">Edit</button>
    </div>
    <button class="btn btn-outline" @click="router.push('/')">
        <svg viewBox="0 0 24 24" class="w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#ffffff"></path> </g></svg>
    </button>
</div>
</template>