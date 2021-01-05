export const requestHandler = (route,config) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${route}`, config)
}