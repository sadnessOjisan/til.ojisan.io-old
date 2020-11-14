const _genEnv = () => {
  const mode = process.env.NODE_ENV;
  if (mode === "development") {
    console.log("ddddeeee");
    return {
      NEXT_PUBLIC_ENDPOINT: "http://localhost:3000",
    };
  }
};

module.exports = {
  env: _genEnv(),
};
