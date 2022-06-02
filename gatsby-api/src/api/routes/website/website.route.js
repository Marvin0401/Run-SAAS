const generateBuild = require("../../../services/generate-build");

const express = require("express");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const template = req.body["template"];

  let output;
  if (template && template === "gatsby-test") {
    try {
      output = await generateBuild(
        template,
        req.body.data,
        req.body["isProduction"],
        req.body["siteId"],
        req.body["domain"]
      );

      res.send("Build Complete!");
    } catch (err) {
      console.log({ err });
      res.status(400).send({
        error: JSON.stringify(err),
        output: output
      });
    }
  } else {
    res.status(406).send("Invalid template name!");
  }
});

module.exports = router;
