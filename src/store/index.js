import { createStore } from 'vuex'
export default createStore({
  state: ()=>({
    isModal:false,
    editItemId:null,
    taskArray:[],
    typeofModal:0
  }),
  getters: {
  },
  mutations: {
    setEditItemId(state,index){
      state.editItemId=index;
    },
    setLocalArray(state,array){
      state.taskArray=array;
    },
    setEditMode(state,id){
      let k=0;
     state.taskArray.forEach(item=>{
       if(item.id===id){
         item.isEdit=true;
       }
       k++;
     })
    },
    setEditModeDone(state,value){
      state.taskArray.forEach(item=>{
        if(item.id==value.id){
          item.isEdit=false;
          item.todoName=value.value;
        }
      })
    },
    addTaskItem(state,value){
      state.taskArray.push(value)
    },
    setComplete(state,itemId){
      state.taskArray.forEach(item=>{
        if(item.id==itemId){
          item.isDone=!item.isDone;

        }
      })
    },
    deleteItem(state,itemId){
      for(let i=0;i<state.taskArray.length;i++){
        if(state.taskArray[i].id==itemId){
          state.taskArray.splice(i,1);
        }
      }
      },



    setEditModePage(state,value){

      state.taskArray[value.idOfItem].taskList.forEach(item=>{
        if(item.id===value.taskId){
          item.isEdit=true;
        }

      })
    },
    setEditModeDonePage(state,value){
      state.taskArray[value.idOfItem].taskList.forEach(item=>{
        if(item.id==value.taskId){
          item.isEdit=false;
          item.todoName=value.value;
        }
      })
    },
    addTaskItemPage(state,value){

     state.taskArray[value.idOfItem].taskList.push(value.value);
    },

    setCompletePage(state,value){
      state.taskArray[value.idOfItem].taskList.forEach(item=>{
        if(item.id==value.taskId){
          item.isDone=!item.isDone;

        }
      })
    },
    deleteItemPage(state,value){
      for(let i=0;i<state.taskArray[value.idOfItem].taskList.length;i++){
        if(state.taskArray[value.idOfItem].taskList[i].id==value.taskId){
          state.taskArray[value.idOfItem].taskList.splice(i,1);
        }
      }
    }
    },

  actions: {



  },
  modules: {
  }
})
