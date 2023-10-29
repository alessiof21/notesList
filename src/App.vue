<template>
  <my-nav/>
  <router-view/>
</template>

<script>
  export default {
    methods: {
      start() {
        if (!localStorage.getItem('used')) { // Если приложение не запускалось еще ни разу
          this.$store.dispatch('addType', 'Пример');
          this.$store.dispatch('addNote', {id: 1, type_id: this.$store.state.types[0].id, name: 'Пример заметки', description: 'Здесь можно написать первую заметку'});
          localStorage.setItem('used', true);
        } else { // Приложение уже запускали
          if (localStorage.getItem('types')) {
            try {
              const types = JSON.parse(localStorage.getItem('types'));
              this.$store.dispatch('loadTypes', types);
            } catch(e) {
              localStorage.removeItem('types');
            }
          }
          if (localStorage.getItem('notes')) {
            try {
              const notes = JSON.parse(localStorage.getItem('notes'));
              this.$store.dispatch('loadNotes', notes);
            } catch(e) {
              localStorage.removeItem('notes');
            }
          }
        }
      },
    },
    mounted() {
      this.start();
    }
  }
</script>

<style>
  html {
    min-width: 800px;
  }
  .scrolled::-webkit-scrollbar {
        width: 10px;
        background-color: #f9f9fd;
    }

    .scrolled::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgb(25, 135, 84); 
    }

    .scrolled::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
        border-radius: 10px;
        background-color: #f9f9fd;
    }
</style>
