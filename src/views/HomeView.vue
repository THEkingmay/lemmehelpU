<script setup>
import successcom from '@/components/success.vue'
import errorcom from '@/components/error.vue'
import { ref,reactive,onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useTasksStores } from '../stores/Keeptasks'
const tasksStore = useTasksStores()
const currentindex = ref(-1)
const more=ref([false])
let tasks = ref([])
onMounted(()=>{
    tasks.value=tasksStore.lists
    more.length=tasks.length
})

const newdata = reactive({
    headline:'',
    description:'',
    date:'',
    success:false
})
const add = () => {
    if(newdata.headline.length>0){
        tasksStore.addTask({...newdata})
        console.log("add task:",newdata)
        newdata.headline=''
        newdata.description=''
        newdata.date=''
        timealert(2) //success
    }else{
        timealert(1) //error
    }
}
function deleted(index){
    tasksStore.deleted(index)
    timealert(2)
}
function successChange(index){
    tasksStore.issuccess(index,tasks.value[index])
    timealert(2)
}
function edit(index){
    tasksStore.currenttaskindex=index
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

let clickdelete =ref(false)
function clickdeleteresult(result){
    if(result==1) // No
        clickdelete.value=false 
    else{ // Yes
        clickdelete.value=false
        deleted(currentindex);
    }
}

</script>
<template>
    <errorcom v-if="iserror"></errorcom>
    <successcom v-if="issuccess"></successcom>
    <div v-if="clickdelete" role="alert" class="alert fixed top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2 w-1/2 flex flex-col">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Delete?</span>
        <div>
            <button class="btn btn-sm" @click="clickdeleteresult(1)">No</button>
            <button class="btn btn-sm btn-primary" @click="clickdeleteresult(2)">Yes</button>
        </div>
    </div>
    <div class="sticky top-0 left-0  backdrop-blur-xl">
        <div class="flex flex-col p-5 pt-8 pb-1">
            <input class="input input-bordered w-full p-4" type="text" v-model="newdata.headline" placeholder="Add here">
            <div class="flex justify-end p-4">
                <RouterLink :to="{ name:'detail' }" >
                    <button class="btn btn-outline btn-success mr-3">detail</button>
                </RouterLink>
                <button class="btn btn-outline btn-success" @click="add">Add</button>
            </div>
        </div>
    </div>
    <div class=" flex flex-col p-4">
        <div class="mb-2 border-b" v-for="(task, index) in tasks" :key="index">
            <div class="grid grid-cols-2">
                <div class="p-3">
                    <div class="flex items-center">
                        <input type="checkbox" class="checkbox checkbox-success mr-4" v-model="task.success" @change="successChange(index)">
                        <div>{{ task.headline }}</div>
                        <button class="ml-3 btn btn-sm btn-ghost" @click="more[index]=!more[index]">
                            <svg viewBox="0 0 24 24" class="w-5" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="18" cy="12" r="1.5" transform="rotate(90 18 12)" fill="#ffffff"></circle> <circle cx="12" cy="12" r="1.5" transform="rotate(90 12 12)" fill="#ffffff"></circle> <circle cx="6" cy="12" r="1.5" transform="rotate(90 6 12)" fill="#ffffff"></circle> </g></svg>
                        </button>
                    </div>
                </div>
                <div class="flex justify-end items-center">
                    <RouterLink :to="{ name:'edit' }" >
                    <button class="btn btn-ghost mr-3" @click="edit(index)" >
                        <svg viewBox="0 0 24 24" fill="none" class="w-5" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 10C7.433 10 9 8.433 9 6.5C9 4.567 7.433 3 5.5 3C3.567 3 2 4.567 2 6.5C2 8.433 3.567 10 5.5 10Z" stroke="#fffa6b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.5 21C7.433 21 9 19.433 9 17.5C9 15.567 7.433 14 5.5 14C3.567 14 2 15.567 2 17.5C2 19.433 3.567 21 5.5 21Z" stroke="#fffa6b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 6L8.64999 15.98" stroke="#fffa6b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 17.97L8.64999 7.97998" stroke="#fffa6b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    </RouterLink> 
                    <button class="btn btn-ghost" @click="clickdelete=true;currentindex=index" >
                        <svg viewBox="0 0 24 24" fill="none" class="w-5" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#fb5656" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                </div>
                <div class="p-3 col-span-2 break-words" :style="{display:more[index]?'block':'none'}">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text underline">Description</span>
                        </div>
                        <div>{{ task.description }}</div>
                    </label>
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text underline">Date</span>
                        </div>
                        <div>{{ task.date }}</div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>



