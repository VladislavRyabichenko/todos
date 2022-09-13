export const modal = {
  currentItem: {
    id: null,
    value: null,
  },
  setCurrentId(id, value) {
    this.currentItem.id = id;
    this.currentItem.value = value;
  },

  setDefaults() {
    this.currentItem.id = null;
    this.currentItem.id = null;
  },
};
