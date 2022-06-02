const path = require("path");

const { v4: uuidv4 } = require("uuid");

const { exec } = require("child_process");
const fs = require("fs");

const copyDir = require("../utils/copyDir");

async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject({err, stdout, stderr});
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

const generateBuild = async (
  templateName,
  data,
  isProduction,
  siteId,
  domain
) => {
  // const id = uuidv4();
  console.log("about to build", siteId);
  const templateDir = path.resolve(__dirname, `../templates/${templateName}`);
  const tempDir = path.resolve(__dirname, `../../temp/${siteId}`);

  await copyDir(templateDir, tempDir);

  const filePath = path.join(tempDir, `content/Data.json`);
  fs.writeFileSync(filePath, JSON.stringify(data));

  // Building
  let { stdout, stderr, err } = await sh(`cd "${tempDir}" && gatsby clean && gatsby build`);

  // Copy the static site to staging and domain also if production
  const sitePath = `/opt/${siteId}/staging`;
  const buildPath = path.join(tempDir, "public");
  await copyDir(buildPath, sitePath);

  if (isProduction) {
    const prodSitePath = `/opt/${domain}`;
    await copyDir(buildPath, prodSitePath);
  }

  // delete dir
  await fs.rmdirSync(tempDir, { recursive: true });

  return { stdout, siteId, stderr, err };
};

module.exports = generateBuild;
