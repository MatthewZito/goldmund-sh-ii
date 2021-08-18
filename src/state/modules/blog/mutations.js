export const updatePosts = (state, posts) => {
  state.posts = posts;
  sessionStorage.setItem(
    import.meta.env.VITE_APP_POSTS_STORAGE_KEY,
    JSON.stringify(posts)
  );
};
