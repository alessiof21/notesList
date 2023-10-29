<template>
    <my-dialog @close="toggleCreateDialog" v-if="typeCreateDialog" />
    <div class="main-flexcontainer">
        <div class="main__types">
            <div class="main__grid">
        <div class="grid__title">
            <div class="title__flex">
                <h4>Категории</h4>
            </div>
        </div>
        <div class="grid__body">
            <div v-if="isEmpty('types')" class="body__flex">
                <my-types :elements="$store.state.types" @deleteType="deleteType"/>
            </div>
        </div>
        <div class="grid__footer">
            <div class="footer__flex">
                <my-button @click="toggleCreateDialog">Создать раздел</my-button>
            </div>
        </div>
    </div>
        </div>
        <div class="main__notes">
            <div class="main__grid">
                <div class="grid__title">
                    <div class="title__flex">
                        <h4>Заметки</h4>
                    </div>
                </div>
                <div class="grid__body">
                    <div v-if="isEmpty('current_notes')" class="body__flex scrolled">
                        <my-notes :elements="$store.state.current_notes" @deleteNote="deleteNote"/>
                    </div>
                </div>
                <div class="grid__footer">
                    <div class="footer__flex">
                        <my-button @click="createNote">Создать заметку</my-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="main__note-screen">
            <my-notescreen />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                typeCreateDialog: false
            }
        },
        methods: {
            isEmpty(name) {
                if (this.$store.state[name].length == 0) {
                    return false;
                }
                return true;
            },
            toggleCreateDialog() {
                this.typeCreateDialog = ! this.typeCreateDialog;
            },
            deleteType(id) {
                this.$store.dispatch('deleteType', id);
            },
            deleteNote(id) {
                this.$store.dispatch('deleteNote', id);
            },
            createNote() {
                if (this.$store.state.type_id === -1) {
                    console.log('Сначала выберите категорию');
                    return;
                }
                const note = {
                    id: Date.now(),
                    type_id: this.$store.state.type_id,
                    name: 'Новая заметка',
                    description: 'Здесь можно писать текст',
                }
                this.$store.dispatch('addNote', note);
            },
        }
    }
</script>

<style scoped>
    .main-flexcontainer {
        display: flex; 
        flex-direction: row;
        justify-content: flex-start;
        height: 92vh;
        border-bottom: 2px solid #a0a0a0;
    }
    .main__types {
        width: 18%;
        height: 100%;
    }

    .main__grid {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 8% 82% 10%;
    }
    .grid__title {
        grid-column: 1/2;
        grid-row: 1/2;
    }

    .grid__body {
        grid-column: 1/2;
        grid-row: 2/3;
        padding: 0 5%;
    }

    .grid__footer {
        grid-column: 1/2;
        grid-row: 3/4;
    }

    .title__flex {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #a0a0a0;
    }

    .body__flex {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 100%;
        overflow-y: auto;
    }

    .footer__flex {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 2%;
    }
    .main__notes {
        width: 22%;
        height: 100%;
        border-left: 2px solid #a0a0a0;
    }

    .main__note-screen {
        width: 60%;
        height: 100%;
    }
</style>