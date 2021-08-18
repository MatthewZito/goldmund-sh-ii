export {
  SessionManager
};

function SessionManager () {
  return {
    id: process.env.VITE_APP_SESSION_KEY,
    adapter: sessionStorage,
    track () {
      sessionStorage.setItem(this.id, 1);
    },
    tracking () {
      return !!sessionStorage.getItem(this.id);
    }
  };
}
