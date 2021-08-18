export default () => ({
  posts: JSON.parse(sessionStorage.getItem(import.meta.env.VITE_APP_POSTS_STORAGE_KEY)) || []
});
