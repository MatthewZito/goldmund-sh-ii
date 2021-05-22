export {
  SessionManager
};

function SessionManager () {
  return {
    id: 'g_x_x_p',
    adapter: sessionStorage,
    track () {
      sessionStorage.setItem(this.id, 1);
    },
    tracking () {
      return !!sessionStorage.getItem(this.id);
    }
  };
}
