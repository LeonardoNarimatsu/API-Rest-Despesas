const fs = require("fs/promises");

const seeds = async () => {
  let seeds = await fs.readdir("./src/db/seeds");
  seeds = seeds.filter((i) => i !== "index.js");

  const runners = seeds.map(async (seed) => {
    const { runSeed } = require(`./${seed}`);
    await runSeed();
    console.log(seed, '\x1b[32mDONE!\x1b[0m')
  });

  await Promise.all(runners);
};

module.exports = { seeds };
