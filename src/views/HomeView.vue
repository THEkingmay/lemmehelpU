<script setup>
import { ref,computed ,watch ,reactive,onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useTasksStores } from '../stores/Keeptasks'
const tasksStore = useTasksStores()
const dtbt=ref(false)

let tasks = computed(()=> tasksStore.taskStore)
console.log(tasks)
console.log(typeof(tasks))

const more=ref([false])
more.length=tasks.length

const newdata = reactive({
    headline:tasksStore.headline||'',
    description:tasksStore.description||'',
    date:tasksStore.date||'',
    success:false
})
const add = ()=>{
    if(newdata.headline.length>0){
        tasksStore.addTask({...newdata})
        console.log(tasks)
        newdata.headline=''
        newdata.description=''
        newdata.date=''
    }else{
        alert('add some headline')
    }
}
const updateHl=()=>{
    tasksStore.detailHl(newdata)
}
function edit(index){
    tasksStore.edit(index,tasks.value[index])
}
function deleted(index){
    tasksStore.deleted(index)
}
function successChange(index){
    tasksStore.issuccess(index,tasks.value[index])
}
const headlineLength = computed(() => newdata.headline.length);
watch(headlineLength, () => {
  dtbt.value = newdata.headline.length > 0
})

</script>
<template>
    <div class="header">
        <input type="text" v-model="newdata.headline" placeholder="Add task">
        <div>
            <RouterLink :to="{ name:'detail' }" >
                <button @click="updateHl">+ detail</button>
            </RouterLink>
            <button @click="add">Add</button>
        </div>
    </div>
    <div class="show-con">
        <div v-for="(task, index) in tasks" :key="index">
            <br>
            <div class="show">
                <div class="task-details">
                    <input type="checkbox" v-model="task.success" @change="successChange(index)">
                    {{ task.headline }}
                    <button class="more-bt" @click="more[index]=!more[index]">+</button>
                </div>
                <div class="show-bt">
                    <RouterLink :to="{ name:'edit' }" >
                    <button @click="edit(index)" >Edit</button>
                    </RouterLink> 
                    <button @click="deleted(index)" >delete</button>
                </div>
                <div class="detail-more" :style="{display:more[index]?'block':'none'}">
                  <br><div><h3>Description:</h3>  {{ task.description }} </div>
                    <div><h3>Date:</h3>{{ task.date }}</div>  
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<style>
    .header{
        z-index: 1;
        position:fixed;
        margin-top:3rem;
        top: 0;
    }
    .header input{
        border: none;
        background: rgba(255, 255, 255, 0.899);
        box-shadow:1px 1px 10px 1px rgba(255, 255, 255, 0.827);
        width: 70vw;
        padding: 2rem;
        border-radius:1rem ;
        font-size: 1.5rem;
    }
    .header div{
        display: flex;
        justify-content: end;
        margin-top: 1rem
    }
    .header button{
        box-shadow: 0px 15px 15px 2px rgba(0, 0, 0, 0.5);
        margin-left: 1rem;
        padding:1rem 1rem;
        font-size: 1rem;
    }
    .show-con{
        background-color:#4f5965; 
        width: 80vw;
        margin-top: 12rem;
        padding: 2rem;
        border-radius: 1.5rem;
        max-width: 600px;
        box-shadow: 1px 1px 6px 0.3px rgb(0, 0, 0,0.8);
    }
    button{
        background-color:#486285; 
        color: #ffffff;
        padding: 1rem;
        border-radius: 0.7rem;
        border: none;
        font-size: 1rem;
    }
    .show{
        font-size: 1.5rem;
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;
        background-color:#eaf1fa; 
        border-radius: 1rem;     
        box-shadow: 0px 15px 15px 2px rgba(0, 0, 0, 0.5);
    }
    .show-bt{
        display: flex;
        gap: 1rem;
        justify-content: end;
    }
    .more-bt{
        margin-left: 10px;
        padding: 10px;
        border-radius: 50px;
        }
    input[type="checkbox"] {
        transform: scale(1.5);
        margin: 0 1rem;
        }
    @media screen and (max-width: 700px){
        .header input{
            font-size: 1rem
        }
        .show{
            display: flex;
            flex-direction: column;
            align-items:baseline;
            font-size: 1rem;
            gap: 1rem;
        }
        .show-con{
            width: 100vw;
            border-radius: 0;
            padding: 2rem;
        }
        .header button{
            box-shadow:1px 1px 10px 1px rgba(0, 0, 0, 0.827);
            margin-left: 1rem;
            padding:1rem 1rem;
            font-size: 1rem;
       }
    }
</style>


