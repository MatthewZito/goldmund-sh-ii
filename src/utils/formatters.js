const stringBuilder = (base = '', delimiter = ' ') => ({
  base,
  append (str) {
    if (!str) return this;
    if (!this.base) this.base = str;
    else this.base += delimiter + str;
    return this;
  },
  result () {
    return this.base;
  }
});

export {
  stringBuilder
};
