module.exports = () => {
  // check if serverless
  if (process.env.VERCEL) {
    process.env.SERVERLESS = 1;
  }
};
