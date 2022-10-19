module.exports = function () {
  if (!process.env.jwtPrivateKey) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
    //Might need to revisit this later in case issues with environment jwt variable
  }
};
