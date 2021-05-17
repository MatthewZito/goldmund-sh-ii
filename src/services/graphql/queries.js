/**
 * @summary Get post contingent on its slug
 * @param {string} slug
 */
export const GET_POST = `
  query GetPostBySlug($slug: String!) {
    payload: post(slug: $slug) {
      title
      subtitle
      createdAt
      updatedAt
      imgSrc
      tags
      body
    }
  }
`;

/**
 * @summary Get all posts
 */
export const GET_POSTS = `
  query GetAllPosts {
    payload: posts {
      title
      imgSrc
      slug
    }
  }
`;
