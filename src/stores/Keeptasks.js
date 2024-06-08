import { defineStore } from 'pinia'

export const useTasksStores = defineStore('tasksStore', {
  state: () => ({
    lists:JSON.parse(localStorage.getItem('allTasks')) || [],
    currenttaskindex:''
  }),
  actions: {
    addTask(newData) {
      this.lists.push(newData)
      localStorage.setItem('allTasks', JSON.stringify(this.lists))
    },
    deleted(index){
      this.lists.splice(index,1)
      localStorage.setItem('allTasks', JSON.stringify(this.lists))
    },
    addUpdate(index,newdata){
        this.lists.splice(index,1,newdata)
        localStorage.setItem('allTasks', JSON.stringify(this.lists))
    },
    issuccess(index,data){
      this.lists.splice(index,1,data)
      localStorage.setItem('allTasks', JSON.stringify(this.lists))
    }
  }
})
