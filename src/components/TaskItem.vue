<template>
    <Modal v-show="this.$store.state.isModal">
        <h2>Введите непустое значение</h2>
    </Modal>
                    <div v-if="todoArray.length" class="task" v-for="item in todoArray" :key="item.id">
                        <input class="task__checkbox" type="checkbox" @change="makeComplete(item.id)" :checked="item.isDone"/>
                        <div class="content">
                            <input
                                    type="text"
                                    class="text"
                                    :value="item.todoName"
                                    :ref="`item_`+item.id"
                                    :readonly="item.isEdit?false:true"
                                    :style="{textDecoration:item.isDone?'line-through':'none'}"
                                    @click="!item.isEdit? this.$router.push(`/task/${item.id}`):{}"

                            >
                            <div v-show="item.taskList.length">
                                <ul  v-for="task in item.taskList" :key="task.id">
                                    <li>{{task.todoName}}</li>
                                </ul>

                            </div>
                        </div>
                        <div class="actions">
                            <button v-if="item.isEdit" @click="editDone(item.id)"  class="edit">
                                <svg xmlns="http://www.w3.org/2000/svg"    width="16" height="16" fill="#8B5CF6" class="bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                </svg>
                            </button>
                            <button v-else  @click="editMode(item.id)"  class="edit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8B5CF6" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                            </button>

                            <button class="delete" @click="deleteItem(item.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg></button>
                        </div>
                    </div>
    <div v-else>
        <h1>Нет записей</h1>
    </div>

</template>

<script>
    import Modal from "@/components/Modal";
    export default {
        components:{
            Modal

        },

        data(){
            return{
                todoArray:[],
                newTaskName:'',
            }

        },
        methods:{
            editMode(itemId){
                this.$store.commit('setEditMode',itemId);
            },
            editDone(itemId){
                if(this.$refs[`item_${itemId}`][0].value.trim()!==''){
                    let valId={id:itemId,
                        value:this.$refs[`item_${itemId}`][0].value
                    }
                    this.$store.commit('setEditModeDone',valId);
                    this.todoArray=this.$store.state.taskArray;
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
            },
            makeComplete(itemId){
                this.$store.commit('setComplete',itemId);
                this.editLocalArray();
            },
            deleteItem(itemId){
                this.$store.commit('deleteItem',itemId);
                this.editLocalArray();
     }
        },

        mounted() {
            setTimeout(()=>{
                this.todoArray=this.$store.state.taskArray;
            },500)


        }
    }
</script>

<style scoped>
    :root {
        --dark: #374151;
        --darker: #1F2937;
        --darkest: #111827;
        --grey: #6B7280;
        --pink: #EC4899;
        --purple: #8B5CF6;
        --light: #EEE;
    }

    * {
        margin: 0;
        box-sizing: border-box;
        font-family: "Fira sans", sans-serif;
    }

    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        color: #FFF;
        background-color: var(--dark);
    }

    header {
        padding: 2rem 1rem;
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
    }

    header h1{
        font-size: 2.5rem;
        font-weight: 300;
        color: var(--grey);
        margin-bottom: 1rem;
    }

    #new-task-form {
        display: flex;
    }

    input, button {
        appearance: none;
        border: none;
        outline: none;
        background: none;
    }

    #new-task-input {
        flex: 1 1 0%;
        background-color: var(--darker);
        padding: 1rem;
        border-radius: 1rem;
        margin-right: 1rem;
        color: var(--light);
        font-size: 1.25rem;
    }

    #new-task-input::placeholder {
        color: var(--grey);
    }

    #new-task-submit {
        color: var(--pink);
        font-size: 1.25rem;
        font-weight: 700;
        background-image: linear-gradient(to right, var(--pink), var(--purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        cursor: pointer;
        transition: 0.4s;
    }

    #new-task-submit:hover {
        opacity: 0.8;
    }

    #new-task-submit:active {
        opacity: 0.6;
    }

    main {
        flex: 1 1 0%;
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
    }

    .task-list {
        padding: 1rem;
    }

    .task-list h2 {
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--grey);
        margin-bottom: 1rem;
    }

    #tasks .task {
        display: flex;
        justify-content: space-between;
        background-color: var(--darkest);
        padding: 1rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
    }

    .text {
        cursor:pointer;
    }

    .task .content .text {
        color: var(--light);
        font-size: 1.125rem;
        width: 100%;
        display: block;
        transition: 0.4s;
    }

    .task .content .text:not(:read-only) {
        color: var(--pink);
    }

    .task .actions {
        display: flex;
        margin: 0 -0.5rem;
    }

    .task .actions button {
        cursor: pointer;
        margin: 0 0.5rem;
        font-size: 1.125rem;
        font-weight: 700;
        text-transform: uppercase;
        transition: 0.4s;
    }

    .task .actions button:hover {
        opacity: 0.8;
    }

    .task .actions button:active {
        opacity: 0.6;
    }

    .task .actions .edit {
        background-image: linear-gradient(to right, var(--pink), var(--purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .task .actions .delete {
        color: crimson;
    }

    .task__checkbox{
        -moz-appearance: checkbox;
        appearance: auto;
        cursor: pointer;
        transform:scale(2.0);
        margin-right: 5px;
    }
</style>