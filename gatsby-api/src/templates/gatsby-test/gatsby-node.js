const path = require(`path`)
const Data = require("./content/Data.json");
const {PAGE_CATEGORIES, BLOCK_TYPES, BLOCK_CATEGORIES} = require("./src/constants/constants");
const { blockDataSelector } = require("./src/helpers/blockData");

const createPages = (createPage, pageListType, page) => {
  let context = {};

  if (pageListType === PAGE_CATEGORIES.DRAFT) {
    return;
  }

  context = page;

  createPage({
    path: `/${page.settings.slug}`,
    component: path.resolve(__dirname, "./src/templates/page.js"),
    context,
  });

  if (page.isDefault) {
    page.blocks.forEach(blockList => {
      if (
        blockList.type === BLOCK_CATEGORIES.MAIN &&
        (blockList.children[0].type === BLOCK_TYPES.EVENTS_LIST ||
          blockList.children[0].type === BLOCK_TYPES.ISSUES_LIST ||
          blockList.children[0].type === BLOCK_TYPES.NEWS_LIST)
      ) {
        const blockData = blockDataSelector({data: blockList.children[0].data});
        const sharedBlockData = blockList.children[0].sharedData ? blockDataSelector({data: blockList.children[0].sharedData}) : {};

        (blockData.items || sharedBlockData.items).forEach(item => {
          !item.link && 
            createPage({
              path: `/${page.settings.slug}/${item.id}`,
              component: path.resolve(__dirname, "./src/templates/page.js"),
              context,
            });
        });
      }
    });
  }
  if (page.children.length > 0) {
    page.children.forEach( subPage => {
      createPages(createPage, pageListType, subPage);
    });
  }
}

exports.createPages = ({ actions, reporter }) => {
  const { createPage } = actions

  if (!Data.site.pages || Data.site.pages.length == 0) {
    reporter.panicOnBuild(`Error while reading Data.json. Please make sure pages exists.`);
    return
  }

  Data.site.pages.forEach( pageList => {
        
    pageList.children.forEach( page => {

      createPages(createPage, pageList.type, page);

    });

  });

}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "@assets": path.join(__dirname, "src/assets"),
        "@components": path.join(__dirname, "src/components"),
        "@templates": path.join(__dirname, "src/templates"),
        "@styles": path.join(__dirname, "src/assets/styles"),
        "@constants": path.join(__dirname, "src/constants"),
        "@content": path.join(__dirname, "/content"),
        "@helpers": path.join(__dirname, "src/helpers"),
        "@services": path.join(__dirname, "src/services"),
      }
    },
  })
}