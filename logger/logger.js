module.exports = {
  logIn: (req, res, next) => {
    console.log(`<= body`, JSON.stringify(req.body, null, 2));
    console.log(`<= query`, JSON.stringify(req.query, null, 2));
    next();
  },
  logOut: message => {
    console.log(`resposne => ${JSON.stringify(message, null, 2)}`);
  },
  logError: (message = "", actionFunction = null) => {
    const RED = "\x1b[31m";
    const RESET = "\x1b[0m";
    const GREEN = "\x1b[32m";
    if (!actionFunction) {
      console.log(`${RED}Error log ${RESET}: ${message}`);
    } else {
      console.log(
        `${RED}Error log ${GREEN} Action Function:${
          actionFunction.name
        }${RESET} Error: ${message}`
      );
    }
  }
};
