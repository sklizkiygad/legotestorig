<template>
    <div class="modal" @click="closeModal">
        <div @click.stop class="modal__content">
            <slot></slot>

        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            closeModal(){
                this.$store.state.typeOfModal=0;
                this.$store.state.isModal=false;
            }
        }

    }
</script>

<style scoped>
    .modal{
        position: fixed;
        display: flex;
        top:0;
        right:0;
        left:0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 100;
    }
    .modal__content{
        z-index: 101;
        margin: auto;
        background: white;
        border-radius: 8px;
        min-height: 60px;
        min-width: 300px;
        color:black;
        padding: 10px;

    }

</style>