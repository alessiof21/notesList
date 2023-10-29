import { createStore } from 'vuex'

export default createStore({
  state: function() {
    return {
      type_id: -1,
      current_notes: [],
      note_id: -1,
      types: [],
      notes: []
    }
  },
  getters: {
    currentNote: (state) => (param) => {
        const currentNote = state.current_notes.filter((note) => note.id === state.note_id)[0];
        if (currentNote === undefined) return;
        return currentNote[param];
    }
  },
  mutations: {
    chooseType(state, type_id) {
      state.type_id = type_id;
      state.note_id = -1;
    },
    addType(state, type) {
      state.types.push(type);
    },
    chooseNote(state, note_id) {
      state.note_id = note_id;
    },
    chooseNotes(state, notes) {
      state.current_notes = notes.slice(0);
    },
    changeTypes(state, types) {
      state.types = types.slice(0);
    },
    changeNotes(state, notes) {
      state.notes = notes.slice(0);
    },
    addNote(state, note) {
      state.notes.push(note);
      if (state.type_id !== -1) {
        state.current_notes.push(note);
      }
    },
    editNote(state, [i, title, text]) {
      state.current_notes[i].name = title;
      state.current_notes[i].description = text;
    }
  },
  actions: {
    loadTypes({state, commit}, types) {
      for (let i = 0; i < types.length; i++) {
        commit('addType', types[i]);
      }
    },
    loadNotes({state, commit}, notes) {
      for (let i = 0; i < notes.length; i++) {
        commit('addNote', notes[i]);
      }
    },
    save({state}, key) {
      const parsed = JSON.stringify(state[key]);
      localStorage.setItem(key, parsed);
    },
    chooseType({state, commit}, type_id) {
      commit('chooseType', type_id);
      const newNotes = state.notes.filter((note) => note.type_id === type_id);
      commit('chooseNotes', newNotes);
      return;
    },
    addType({state, commit, dispatch}, title) {
      const type = {
        id: Date.now(),
        name: title 
      }
      commit('addType', type);
      dispatch('save', 'types');
    },
    deleteType({state, commit, dispatch}, id) {
      const newTypes = state.types.filter((type) => type.id != id);
      const newNotes = state.notes.filter((note) => note.type_id != id);
      commit('chooseType', -1);
      commit('chooseNotes', []);
      commit('changeTypes', newTypes);
      commit('changeNotes', newNotes);
      dispatch('save', 'types');
      dispatch('save', 'notes');
    },
    addNote({state, commit, dispatch}, note) {
      commit('addNote', note);
      if (state.type_id !== -1) {
        commit('chooseNote', note.id);
      }
      dispatch('save', 'notes');
    },
    deleteNote({state, commit, dispatch}, id) {
      const newNotes = state.notes.filter((note) => note.id != id);
      const newCurrentNotes = state.current_notes.filter((note) => note.id != id);
      commit('chooseNotes', newCurrentNotes);
      commit('changeNotes', newNotes);
      commit('chooseNote', -1);
      dispatch('save', 'notes');
    },
    editNote({state, commit, dispatch}, [title, text]) {
      for (let i = 0; i < state.current_notes.length; i++) {
        if (state.current_notes[i].id === state.note_id) {
          commit('editNote', [i, title, text]);
          dispatch('save', 'notes');
          return;
        }
      }
    }
  },
  modules: {
  }
})
