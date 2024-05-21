import { defineStore } from 'pinia'

export const useTasksStores = defineStore('tasksStore', {
  state: () => ({
    taskStore: JSON.parse(localStorage.getItem('allTasks')) || [],
    headline:'',
    description:'',
    date:'',
    success:false,
    myindex:''
  }),
  actions: {
    addTask(newData) {
            this.taskStore.push(newData)
            localStorage.setItem('allTasks', JSON.stringify(this.taskStore))
            this.headline=''
            this.description=''
            this.date=''
    },
    detailHl(newUpdate){
      this.headline=newUpdate.headline
      this.description=''
      this.date=''
    },
    edit(index,indexdata){
      this.headline=indexdata.headline
      this.description=indexdata.description
      this.date=indexdata.date
      this.success=indexdata.success
      this.myindex=index
    },
    deleted(index){
      this.taskStore.splice(index,1)
      localStorage.setItem('allTasks', JSON.stringify(this.taskStore))
    },
    addUpdate(index,newdata){
        this.taskStore.splice(index,1,newdata)
        localStorage.setItem('allTasks', JSON.stringify(this.taskStore))
        this.headline=''
        this.description=''
        this.date=''
    },issuccess(index,data){
      console.log(data)
      this.taskStore.splice(index,1,data)
      localStorage.setItem('allTasks', JSON.stringify(this.taskStore))
    }
  }
})
