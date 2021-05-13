export default () => ({
  posts: JSON.parse(sessionStorage.getItem(import.meta.env.VITE_POSTS_STORAGE_KEY)) || []
});
