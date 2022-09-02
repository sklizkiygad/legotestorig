<template>

    <div class="item_card">
       <h1>{{todoItem.todoName}}</h1>
        <h3>Список задач</h3>
        <form id="new-task-form" @submit="createTask">
            <input
                    type="text"
                    name="new-task-input"
                    id="new-task-input"
                    placeholder="Создать задачу"
                    v-model="newTaskName"
            />
            <input
                    type="submit"
                    id="new-task-submit"
                    value="Добавить"
            />
        </form>

        <section class="task-list">
            <h2>Задачи</h2>
            <div id="tasks">
                <PageTaskItem/>
            </div>
        </section>

    </div>
</template>

<script>

    import PageTaskItem from "@/components/PageTaskItem";
    import Modal from "@/components/Modal";
    export default {
        components:{
            PageTaskItem,
            Modal
        },
        data(){
            return{
                todoItem:{},
                arrayOfTasks:[],
                idInArray:null,
                newTaskName:''
            }
        },
        methods:{
            idOfItem(e){
                let idNeed=0;
                for(let i=0;i<this.arrayOfTasks.length;i++){
                    if(this.arrayOfTasks[i].id==e){
                        idNeed = i;
                        break;
                    }
                }
                return idNeed;
            },
          getItemPage(){
              this.arrayOfTasks=JSON.parse(localStorage.getItem('tasksList'));
              let needId=this.idOfItem(this.$route.params.id);
              this.todoItem=this.arrayOfTasks[needId];
              this.idInArray=needId;
          },

            editMode(e){
                 const idOfEdit=this.idOfItem(e);
                 this.todoItem[idOfEdit].isEdit=true;
                 this.$refs['item_'+e][0].readOnly=false;
            },
            deleteItem(e){
                let idOfDelete=this.idOfItem(e);
                this.todoItem.splice(idOfDelete,1);
            },

            createTask(e){
                e.preventDefault();
                let biggestId=0;

                if(this.newTaskName.trim()!=''){
                    this.$store.state.taskArray[this.idInArray].taskList.forEach((item)=>{
                        console.log(item.id);
                         if(item.id>biggestId){
                             biggestId=item.id;
                             console.log(biggestId)
                         }
                    })
                    let value={
                        idOfItem:this.idInArray,
                        value:{id:biggestId+1,todoName:this.newTaskName,isDone:false,isEdit:false}
                    }

                    this.$store.commit('addTaskItemPage', value)
                    this.newTaskName='';
                    this.editLocalArray();
                }
                else{
                    this.$store.state.isModal=true;
                    this.$store.state.typeOfModal=2;
                    setTimeout(()=>{
                        this.$store.state.isModal=false;
                        this.$store.state.typeOfModal=0;
                    },2000)
                }

            },
            editLocalArray(){
                localStorage.setItem('tasksList',JSON.stringify(this.$store.state.taskArray))
            }

        },
        mounted(){
            this.getItemPage();
        }


    }
</script>

<style scoped>
    .item_card{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>