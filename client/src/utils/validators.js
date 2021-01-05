export const isEmpty = (val) => {
  
  const isEmpty = Object.keys(val).every(key => val[key] !== "" )
  return !isEmpty;
}