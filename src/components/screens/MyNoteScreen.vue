<template>
    <div class="screen_note">
        <div class="note__grid" v-if="$store.state.note_id != -1">
            <div class="grid__name">
                <div class="title__flex">
                    <h4 class="title__edit" maxlength="20" id="title" contenteditable="true" @input="changeNote">{{ $store.getters.currentNote('name')}}</h4>
                </div>
            </div>
            <div class="grid__text">
                <p class="text__edit scrolled" id="text" contenteditable="true" @input="changeNote" v-html="$store.getters.currentNote('description')"></p>
            </div>  
            <div class="grid__text-btns">
                <!--Раздел под кнопки по редактированию текста (выделение, вставка картинок)-->
            </div>
            <div class="grid__edit-btns">
                <div class="edit-btns__flex">
                    <my-button>Удалить</my-button>
                    <my-button v-if="editState" @click="saveEdits">Сохранить</my-button>
                </div>
            </div>
        </div> 
        <div v-else>
            <h4 class="no-notes">Место для заметки</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'my-notescreen',
        data() {
            return {
                editState: false,
            }
        },
        methods: {
            changeNote() {
                if (this.editState === false) {
                    this.editState = true;
                }
            },
            saveEdits() {
                this.editState = false;
                const name = document.getElementById('title');
                const description = document.getElementById('text');
                name.innerText = name.innerText.trim().slice(0,30);
                description.innerHTML = description.innerHTML.replace(/\&nbsp;/g, '');
                this.$store.dispatch('editNote', [name.innerText, description.innerHTML]);
            }
        },
    }
</script>

<style scoped>
    .screen_note {
        width: 100%;
        height: 100%;
        border-left: 2px solid #a0a0a0;
    }
    .note__grid {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 8% 72% 10% 10%;
    }
    .grid__name {
        height:100%;
        grid-column: 1/2;
        grid-row: 1/2;
    }
    .grid__text {
        grid-column: 1/2;
        grid-row: 2/3;       
    }
    .grid__text-btns {
        grid-column: 1/2;
        grid-row: 3/4;
    }
    .grid__edit-btns {
        grid-column: 1/2;
        grid-row: 4/5;
    }
    .title__flex {
        display: flex;
        height: 100%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #a0a0a0;
    }
    .title__edit {
        overflow: hidden;
        max-height: 100%;
    }
    .text__edit {
        text-align: justify;
        overflow-wrap: break-word;
        margin: 0 2%;
        height: 100%;
        overflow-y: auto;
    }
    .text-btns__flex {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 2%;
    }

    .edit-btns__flex {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 2%;
    }
    .no-notes {
        padding-top: 30%;
        padding-left: 40%;
    }
</style>