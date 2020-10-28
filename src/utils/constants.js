export const BACKEND_URL = (
  process.env.REACT_APP_BACKEND_URL ?
    process.env.REACT_APP_BACKEND_URL :
    'http://localhost:5000'
);

export const AUTH_API_URL = `${BACKEND_URL}/api/auth`;
export const PROFILE_API_URL = `${BACKEND_URL}/api/profiles`;
export const POSTS_API_URL = `${BACKEND_URL}/api/posts`;
export const COMMENTS_API_URL = `${BACKEND_URL}/api/comments`;
