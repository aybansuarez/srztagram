const backendURL = (
  process.env.REACT_APP_BACKEND_URL ?
    process.env.REACT_APP_BACKEND_URL :
    'http://localhost:5000'
)

export default backendURL;