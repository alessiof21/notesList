<template>
    <div class="modal_out" @click="this.$emit('close')">
        <div @click.stop class="modal_in">
            <div class="modal__flex-container">
                <div class="flex-item__title">
                    <h6>Новый тип заметок</h6>
                </div>
                <div class="flex-item__input">
                    <my-input :helpText="helpText" :mistake="mistake" v-model:title="title" type="text" placeholder="Название"/>
                </div>
                <div class="flex-item__btns">
                    <div class="btns">
                        <my-button class="btn" @click="createType">Сохранение</my-button>
                        <my-button class="btn" @click="this.$emit('close')">Выйти</my-button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    export default {
        name: 'my-dialog',
        data() {
            return {
                title: '',
                helpText: 'Введите не более 20 символов',
                mistake: false,
            }
        },
        methods: {
            createType() {
                if (this.title === '') {
                    this.helpText = 'Пустое значение нельзя использовать';
                    this.mistake = true;
                    return;
                }
                for (let i = 0; i < this.$store.state.types.length; i++) {
                    if (this.$store.state.types[i].name == this.title) {
                        this.helpText = 'Такое название уже используется';
                        this.mistake = true;
                        return;
                    }
                }
                this.$store.dispatch('addType', this.title);
                this.$emit('close');
                return;
            }
        }
    }
</script>

<style scoped>
    .modal_out {
        position: absolute;
        width: 100%;
        height: 90%;
        background-color: rgba(255,255,255,0.3);
    }

    .modal_in {
        position: absolute;
        padding: 5px;
        background-color: white;
        border: 2px solid black;
        width: 30vw;
        height: 30vh;
        top: 30%;
        left: 35%;
    }

    .modal__flex-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .flex-item__input {
        width: 100%;
        flex-grow: 1;
    }
    .flex-item__btns {
        width: 100%;
    }

    .btns {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

</style>