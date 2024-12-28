const logger = (store) => (next) => (action) => {
  next(action);
  console.log("ACTION: ", action);
};

export default logger;
