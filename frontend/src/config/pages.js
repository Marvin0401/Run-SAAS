import { v4 as uuidv4 } from "uuid";

import {
  BLOCK_CATEGORIES,
  BLOCK_TYPES,
  BLOCK_VARIANT,
  DATA_TYPE,
  PAGE_CATEGORIES,
  PAGE_TYPES,
  INTRO_LAYOUT_TYPE,
  EMBED_VIDEO_TYPE,
  LANDING_POPUP_TYPES,
} from "@constants";

import { BLOCK_DATA } from "@config/blocks";

const endorsementsBlockId = uuidv4();
const newsDefaultBlockId = uuidv4();
const issuesDefaultBlockId = uuidv4();

const sharedEndorsementsDataId = uuidv4();
const defaultEndorsementsDataId = uuidv4();
const sharedEventsDataId = uuidv4();
const sharedFooterDataId = uuidv4();
const sharedHeroDataId = uuidv4();
const defaultIssuesDataId = uuidv4();
const sharedIssuesDataId = uuidv4();
const extraIssuesDataId = uuidv4();
const sharedNewsDataId = uuidv4();
const defaultNewsDataId = uuidv4();

// hero data ids
const issuesHeroDataId = uuidv4();
const newsHeroDataId = uuidv4();
const endorsementsHeroDataId = uuidv4();
const eventsHeroDataId = uuidv4();
const aboutHeroDataId = uuidv4();
const contactHeroDataId = uuidv4();
const volunteerHeroDataId = uuidv4();
const donateHeroDataId = uuidv4();
const homeHeroDataId = uuidv4();

const defaultIntroDataId = uuidv4();
const sharedDonateDataId = uuidv4();
const lockedLandingPopupDataId = uuidv4();

const homePageId = uuidv4();
const issuesPageId = uuidv4();
const newsPageId = uuidv4();
const endorsementsPageId = uuidv4();
const eventsPageId = uuidv4();
const aboutPageId = uuidv4();
const contactPageId = uuidv4();
const volunteerPageId = uuidv4();
const donatePageId = uuidv4();

const PAGE_SETTINGS = {
  slug: "",
  title: "",
  meta_title: "",
  meta_description: "",
  header: "",
  body: "",
  footer: "",
};

// unique data for internal pages
// const INTERNAL_PAGES_HERO_DATA = {
//   splitImage: "",
//   mobileImage: "",
//   fullImage: "",
//   headlineOn: true,
// };

let HERO_INITIAL_DATA = [
  issuesHeroDataId,
  newsHeroDataId,
  endorsementsHeroDataId,
  eventsHeroDataId,
  aboutHeroDataId,
  contactHeroDataId,
  volunteerHeroDataId,
  donateHeroDataId,
].map((id) => ({
  id: id,
  type: DATA_TYPE.UNIQUE,
  blockType: BLOCK_TYPES.HERO,
  ...BLOCK_DATA[BLOCK_TYPES.HERO],
}));

HERO_INITIAL_DATA.push({
  id: homeHeroDataId,
  type: DATA_TYPE.UNIQUE,
  blockType: BLOCK_TYPES.HERO,
  headlineOn: true,
  originalSplitImage: "",
  splitImage: "",
  mobileImage: "",
  originalMobileImage: "",
  fullImage: "",
  originalFullImage: "",
  floatImage: "",
  originalFloatImage: "",
  ...BLOCK_DATA[BLOCK_TYPES.HERO],
});

export const INITIAL_DATA = [
  {
    id: defaultEndorsementsDataId,
    type: DATA_TYPE.UNIQUE,
    blockType: BLOCK_TYPES.ENDORSEMENTS,
    description:
      "Hundreds of our community organizations and leaders are standing with Janice as she fights to build a better tomorrow.",
    eyebrow: "We are strongly supporting",
    headline: "Janice Turner for Congress",
    individualEndorsers: [
      {
        id: uuidv4(),
        subtitle: "Job",
        title: "FORMER COVEROR",
      },
      {
        id: uuidv4(),
        subtitle: "Job",
        title: "BERNIE SANDERS",
      },
    ],
    organizationalEndorsers: [
      {
        id: uuidv4(),
        title: "CALIFORNIA NURSES",
      },
      {
        id: uuidv4(),
        title: "AMERICAN DIABETES",
      },
      {
        id: uuidv4(),
        title: "1199 SEIU",
      },
      {
        id: uuidv4(),
        title: "NURSES 2",
      },
      {
        id: uuidv4(),
        title: "AMERICAN OR",
      },
      {
        id: uuidv4(),
        title: "CALIFORNIA NURSES",
      },
    ],
    showEyebrow: false,
    showDescription: false,
    showFeatureIndividuals: true,
    showFeatureOrganizations: true,
    showEndorserList: true,
    numRows: "1",
  },
  {
    id: sharedEndorsementsDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.ENDORSEMENTS,
    blockId: endorsementsBlockId,
    pageId: endorsementsPageId,
    featuredIndividuals: [
      {
        id: uuidv4(),
        title: "KENDRA BROOKS",
        subtitle: "Job of Endorser",
        image: "https://media.designedtorun.com/sample/sample_endorser-1.jpg",
        originalImage:
          "https://media.designedtorun.com/sample/sample_endorser-1.jpg",
      },
      {
        id: uuidv4(),
        title: "PETER JACKSON",
        subtitle: "Job desc",
        image: "https://media.designedtorun.com/sample/sample_endorser-2.jpg",
        originalImage:
          "https://media.designedtorun.com/sample/sample_endorser-2.jpg",
      },
      {
        id: uuidv4(),
        title: "KAREN BASS",
        subtitle: "Job",
        image: "https://media.designedtorun.com/sample/sample_endorser-3.jpg",
        originalImage:
          "https://media.designedtorun.com/sample/sample_endorser-3.jpg",
      },
    ],
    featuredOrganizations: [
      {
        id: uuidv4(),
        title: "CALIFORNIA NURSES",
        image: "https://media.designedtorun.com/sample/sample_logo-1.png",
        originalImage:
          "https://media.designedtorun.com/sample/sample_logo-1.png",
      },
      {
        id: uuidv4(),
        title: "AMERICAN DIABETES",
        image: "https://media.designedtorun.com/sample/sample_logo-2.png",
        originalImage:
          "https://media.designedtorun.com/sample/sample_logo-2.png",
      },
      {
        id: uuidv4(),
        title: "1199 SEIU",
        image: "https://media.designedtorun.com/sample/sample_logo-3.png",
        originalImage:
          "https://media.designedtorun.com/sample/sample_logo-3.png",
      },
      {
        id: uuidv4(),
        title: "NURSES 2",
        image: "https://media.designedtorun.com/sample/sample_logo-1.png",
        originalImage:
          "https://media.designedtorun.com/sample/sample_logo-1.png",
      },
      {
        id: uuidv4(),
        title: "AMERICAN OR",
        image: "https://media.designedtorun.com/sample/sample_logo-2.png",
        originalImage:
          "https://media.designedtorun.com/sample/sample_logo-2.png",
      },
      {
        id: uuidv4(),
        title: "CALIFORNIA NURSES",
        image: "https://media.designedtorun.com/sample/sample_logo-3.png",
        originalImage:
          "https://media.designedtorun.com/sample/sample_logo-3.png",
      },
    ],
    isMonochrome: false,
  },
  {
    id: sharedFooterDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.FOOTER,
    disclaimer: "Paid for by name of campaign committee",
    info: "info@ourcampaign.com",
    siteLinks: [],
  },
  {
    id: sharedEventsDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.EVENTS_LIST,
    title: "At Our Events",
    eyebrow: "Join Us",
    intro:
      "<b>Want to be a part of the Carlos Mechaca team?</b> Our team is mobilizing to support our community and re-elect Alexandria Ocasio-Cortez in both hands-on and remote efforts. Join our volunteer squad to fight for positive, progressive change, and have some fun while doing it!",
    items: [
      {
        id: uuidv4(),
        title: "Phonebanking with Carlos and the Rest of the Team",
        date: "sat january 2 and sun january 3",
        link: "https://google.com",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        longDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: uuidv4(),
        title: "Phonebanking with Carlos and the Rest of the Team",
        date: "sat january 2 and sun january 3",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        longDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },
  {
    id: sharedHeroDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.HERO,
    menuItems: [
      {
        children: [],
        pageId: issuesPageId,
        title: "Issues",
      },
      {
        children: [],
        pageId: newsPageId,
        title: "News",
      },
      {
        children: [],
        pageId: endorsementsPageId,
        title: "Endorsements",
      },
      {
        children: [],
        pageId: eventsPageId,
        title: "Events",
      },
      {
        children: [],
        pageId: aboutPageId,
        title: "About",
      },
      {
        children: [],
        pageId: contactPageId,
        title: "Contact",
      },
      {
        children: [],
        pageId: volunteerPageId,
        title: "Volunteer",
      },
    ],
    featuredPage: {
      pageId: donatePageId,
      title: "Donate",
    },
    bgColor: "blue",
    flipContent: false,
    layoutType: "gradient_box",
    internalPagesLayoutType: "gradient_box",
    headerGradientOpacity: 100,
    // headlineOn: true,
    formType: "bar_form",
    buttonType: "underlined",
    socialIconsType: "filled",
    socialBelowContentOn: false,
    disclaimerOn: true,
    originalSplitImage: "",
    splitImage: "",
    originalMobileImage: "",
    mobileImage: "",
    originalFullImage: "",
    fullImage: "",
    // originalFloatImage: "",
    // floatImage: "",
    tagline: "Join us in building a better country!",
    disclaimer:
      "You may be required by law to put a legal disclaimer here, if you intend to send text messages to people whose number you collect.",
    logo: "https://media.designedtorun.com/sample/logo.png",
    originalLogo: "https://media.designedtorun.com/sample/logo.png",
  },
  {
    id: defaultIssuesDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.ISSUES_LIST,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    eyebrow: "A DEEPER LOOK AT",
    headline: "Carlos's Priorities",
    items: [
      {
        id: uuidv4(),
        title: "Protection our environment",
        shortDescription:
          "Write a short blurb about an issue your campaign is highlighting. Try to keep the text a similar size between the various issue blurbs.Write a short blurb about an issue your campaign is highlighting. Try to keep the text a similar size between the various issue blurbs.",
        eyebrow: "Carlos believes in",
        description: `<p>We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.making New York City the first place in America to guarantee the right to an attorney for those facing eviction. We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.</p>
                      <p>Mark has twice been elected to represent the 7th Council district – one of the most diverse in New York City – covering West Harlem/Hamilton Heights, Morningside Heights, and parts of the Upper West Side and Washington Heights.</p>
                      <p>In a historic first for the nation, Mark passed legislation guaranteeing a right to counsel for tenants facing eviction in New York City’s housing courts. This landmark policy has leveled the playing field for tenants and has already resulted in a significant decline in the number of families in New York City losing their homes because of evictions.a to guarantee the right to an attorney for those facing eviction. We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.</p>`,
      },
      {
        id: uuidv4(),
        title: "Fighting for workers",
        eyebrow: "Carlos believes in",
        shortDescription:
          "Write a short blurb about an issue your campaign is highlighting. Try to keep the text a similar size between the various issue blurbs.Write a short blurb about an issue your campaign is highlighting. Try to keep the text a similar size between the various issue blurbs.",
        description: `<p>We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.making New York City the first place in America to guarantee the right to an attorney for those facing eviction. We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.</p>
                      <p>Mark has twice been elected to represent the 7th Council district – one of the most diverse in New York City – covering West Harlem/Hamilton Heights, Morningside Heights, and parts of the Upper West Side and Washington Heights.</p>
                      <p>In a historic first for the nation, Mark passed legislation guaranteeing a right to counsel for tenants facing eviction in New York City’s housing courts. This landmark policy has leveled the playing field for tenants and has already resulted in a significant decline in the number of families in New York City losing their homes because of evictions.a to guarantee the right to an attorney for those facing eviction. We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.</p>`,
      },
      {
        id: uuidv4(),
        title: "Education our kids",
        eyebrow: "Carlos believes in",
        shortDescription:
          "Write a short blurb about an issue your campaign is highlighting. Try to keep the text a similar size between the various issue blurbs.Write a short blurb about an issue your campaign is highlighting. Try to keep the text a similar size between the various issue blurbs.",
        description: `<p>We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.making New York City the first place in America to guarantee the right to an attorney for those facing eviction. We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.</p>
                      <p>Mark has twice been elected to represent the 7th Council district – one of the most diverse in New York City – covering West Harlem/Hamilton Heights, Morningside Heights, and parts of the Upper West Side and Washington Heights.</p>
                      <p>In a historic first for the nation, Mark passed legislation guaranteeing a right to counsel for tenants facing eviction in New York City’s housing courts. This landmark policy has leveled the playing field for tenants and has already resulted in a significant decline in the number of families in New York City losing their homes because of evictions.a to guarantee the right to an attorney for those facing eviction. We have more fights ahead, but if we dare to be bold, we can make Manhattan a place of opportunity for all.</p>`,
      },
    ],
    showEyebrow: true,
    showLinkToFullIssuePages: true,
    showPageDescription: true,
  },
  {
    id: sharedIssuesDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.ISSUES_LIST,
    pageId: issuesPageId,
    blockId: issuesDefaultBlockId,
    items: [
      {
        id: uuidv4(),
        title: "Protecting Our Environment",
        description: "I passed legislation to protect our environment.",
      },
      {
        id: uuidv4(),
        title: "Fighting For Workers",
        description: "I passed legislation to protect blue collar workers.",
      },
    ],
  },
  {
    id: extraIssuesDataId,
    type: DATA_TYPE.UNIQUE,
    blockType: BLOCK_TYPES.ISSUES_LIST,
    items: [
      {
        id: uuidv4(),
        title: "Protecting Our Environment",
        description: "I passed legislation to protect our environment.",
      },
      {
        id: uuidv4(),
        title: "Fighting For Workers",
        description: "I passed legislation to protect blue collar workers.",
      },
    ],
  },
  {
    id: defaultNewsDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.NEWS_LIST,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    eyebrow: "A DEEPER LOOK AT",
    headline: "Carlos in the news",
  },
  {
    id: sharedNewsDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.NEWS_LIST,
    pageId: newsPageId,
    blockId: newsDefaultBlockId,
    items: [
      {
        id: uuidv4(),
        title: "Featured news articles and press",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        createdAt: "2021-09-20T08:51:51.684Z",
        link: null,
      },
      {
        id: uuidv4(),
        title: "Articles and releases can either be hosted here",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        createdAt: "2025-09-20T08:51:51.684Z",
        link: "https://google.com",
      },
      {
        id: uuidv4(),
        title: "Articles3 and releases can either be hosted here",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        createdAt: "2028-09-20T08:51:51.684Z",
        link: "https://google.com",
      },
    ],
  },
  {
    id: defaultIntroDataId,
    type: DATA_TYPE.UNIQUE,
    blockType: BLOCK_TYPES.INTRO,
    heading: "Write a catchy headline for this spot that sums up your campaign",
    text: "“Replace this text and bold the first. This section can be a quote, in which case, replace the signature image below with the candidate's signature. If you'd prefer your text not appear as a quote, remove the quotation marks and delete the signature.”",
    layoutType: INTRO_LAYOUT_TYPE.VIDEO,
    vertImage:
      "https://media.designedtorun.com/sample/sample_image-vertical-1.jpg",
    originalVertImage:
      "https://media.designedtorun.com/sample/sample_image-vertical-1.jpg",
    horizImage: "https://media.designedtorun.com/sample/sample_image-1.jpg",
    originalHorizImage:
      "https://media.designedtorun.com/sample/sample_image-1.jpg",
    showSignature: true,
    signatureImage: "https://media.designedtorun.com/sample/signature.png",
    originalSignatureImage:
      "https://media.designedtorun.com/sample/signature.png",
    embedType: EMBED_VIDEO_TYPE.VIMEO,
    embedCode: "",
  },
  {
    id: lockedLandingPopupDataId,
    type: DATA_TYPE.UNIQUE,
    blockType: BLOCK_TYPES.LANDING_POPUP,
    popupType: LANDING_POPUP_TYPES.DONATE,
    generalData: {
      heading: "Voting Starts Friday!",
      description:
        "Voting is starting this Friday and we need everyone who can to get out and vote early. Click below to find out how to vote.",
      showDescription: true,
      buttonUrl: "",
      buttonText: "How to Vote",
    },
    donateData: {
      heading: "Donate",
      description: "We rely on supporters like you!",
    },
    signupData: {
      heading: "Volunteers",
      description: "We rely on supporters like you!",
      data: [],
    },
    timeToTrigger: 15,
  },
  {
    id: sharedDonateDataId,
    type: DATA_TYPE.SHARED,
    blockType: BLOCK_TYPES.DONATE,
    buttonData: [
      {
        amount: 10,
        url: "",
      },
      {
        amount: 25,
        url: "",
      },
      {
        amount: 50,
        url: "",
      },
      {
        amount: 100,
        url: "",
      },
      {
        amount: 2000,
        url: "",
      },
      {
        amount: null,
        url: "",
      },
    ],
  },
  ...HERO_INITIAL_DATA,
];

export const START_PAGES = [
  {
    id: issuesPageId,
    type: PAGE_TYPES.ITEM,
    isDefault: true,
    isHidden: false,
    name: "Issues",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: "issues" },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: issuesHeroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [
          {
            type: BLOCK_TYPES.ISSUES_LIST,
            variant: BLOCK_VARIANT.DEFAULT,
            id: issuesDefaultBlockId,
            title: "Issues",
            callout: null,
            data: defaultIssuesDataId,
            sharedData: sharedIssuesDataId,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: newsPageId,
    type: PAGE_TYPES.ITEM,
    isDefault: true,
    isHidden: false,
    name: "News",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: "news" },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: newsHeroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [
          {
            type: BLOCK_TYPES.NEWS_LIST,
            variant: BLOCK_VARIANT.DEFAULT,
            id: newsDefaultBlockId,
            title: "News",
            callout: null,
            data: defaultNewsDataId,
            sharedData: sharedNewsDataId,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: endorsementsPageId,
    type: PAGE_TYPES.ITEM,
    isDefault: true,
    isHidden: false,
    name: "Endorsements",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: "endorsements" },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: endorsementsHeroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [
          {
            type: BLOCK_TYPES.ENDORSEMENTS,
            variant: BLOCK_VARIANT.DEFAULT,
            id: endorsementsBlockId,
            title: "Endorsements",
            label: "We are strongly supporting",
            subTitile: "Janice Turner for Congress",
            description:
              "Hundreds of our community organizations and leaders are standing with Janice as she fights to build a better tomorrow.",
            callout: null,
            data: defaultEndorsementsDataId,
            sharedData: sharedEndorsementsDataId,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: eventsPageId,
    type: PAGE_TYPES.ITEM,
    isDefault: true,
    isHidden: false,
    name: "Events",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: "events" },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: eventsHeroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [
          {
            type: BLOCK_TYPES.EVENTS_LIST,
            variant: BLOCK_VARIANT.DEFAULT,
            id: uuidv4(),
            title: "Events",
            callout: null,
            data: sharedEventsDataId,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: aboutPageId,
    type: PAGE_TYPES.ITEM,
    isDefault: false,
    isHidden: false,
    name: "About",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: "about" },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: aboutHeroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: contactPageId,
    type: PAGE_TYPES.ITEM,
    isDefault: false,
    isHidden: false,
    name: "Contact",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: "contact" },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: contactHeroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: volunteerPageId,
    type: PAGE_TYPES.ITEM,
    isDefault: false,
    isHidden: false,
    name: "Volunteer",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: "volunteer" },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: volunteerHeroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  },
];

export const NEW_PAGE = (heroDataId, sharedHeroDataId, sharedFooterDataId) => {
  return {
    type: PAGE_TYPES.ITEM,
    isDefault: false,
    isHidden: false,
    name: "New Page",
    externalLink: null,
    settings: { ...PAGE_SETTINGS, slug: `new-${Math.random(50000)}` },
    blocks: [
      {
        type: BLOCK_CATEGORIES.HERO,
        id: uuidv4(),
        title: "Hero",
        children: [
          {
            type: BLOCK_TYPES.HERO,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Hero",
            sharedData: sharedHeroDataId,
            data: heroDataId,
            callout: null,
          },
        ],
      },
      {
        type: BLOCK_CATEGORIES.MAIN,
        id: uuidv4(),
        title: "Main blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.EXTRA,
        id: uuidv4(),
        title: "Extra Blocks",
        children: [],
      },
      {
        type: BLOCK_CATEGORIES.FOOTER,
        id: uuidv4(),
        title: "Footer",
        children: [
          {
            type: BLOCK_TYPES.FOOTER,
            variant: BLOCK_VARIANT.LOCKED,
            id: uuidv4(),
            title: "Footer",
            callout: null,
            data: sharedFooterDataId,
          },
        ],
      },
    ],
    children: [],
  };
};

export const INITIAL_PAGES = [
  {
    type: PAGE_CATEGORIES.FEATURED_NAV,
    id: uuidv4(),
    title: "Featured Navigation",
    children: [
      {
        type: PAGE_TYPES.ITEM,
        id: donatePageId,
        isDefault: false,
        isHidden: false,
        name: "Donate",
        externalLink: "https://www.actblue.com",
        settings: { ...PAGE_SETTINGS, slug: "fetaured-nav" },
        blocks: [
          {
            type: BLOCK_CATEGORIES.HERO,
            id: uuidv4(),
            title: "Hero",
            children: [
              {
                type: BLOCK_TYPES.HERO,
                variant: BLOCK_VARIANT.LOCKED,
                id: uuidv4(),
                title: "Hero",
                sharedData: sharedHeroDataId,
                data: donateHeroDataId,
                callout: null,
              },
            ],
          },
          {
            type: BLOCK_CATEGORIES.MAIN,
            id: uuidv4(),
            title: "Main blocks",
            children: [],
          },
          {
            type: BLOCK_CATEGORIES.EXTRA,
            id: uuidv4(),
            title: "Extra Blocks",
            children: [],
          },
          {
            type: BLOCK_CATEGORIES.FOOTER,
            id: uuidv4(),
            title: "Footer",
            children: [
              {
                type: BLOCK_TYPES.FOOTER,
                variant: BLOCK_VARIANT.LOCKED,
                id: uuidv4(),
                title: "Footer",
                callout: null,
                data: sharedFooterDataId,
              },
            ],
          },
        ],
        children: [],
      },
    ],
  },
  {
    type: PAGE_CATEGORIES.HOME,
    id: uuidv4(),
    title: "Home",
    children: [
      {
        id: homePageId,
        type: PAGE_TYPES.ITEM,
        isDefault: true,
        isHidden: false,
        name: "Home",
        externalLink: null,
        settings: { ...PAGE_SETTINGS, slug: "" },
        blocks: [
          {
            type: BLOCK_CATEGORIES.HERO,
            id: uuidv4(),
            title: "Hero",
            children: [
              {
                type: BLOCK_TYPES.HERO,
                variant: BLOCK_VARIANT.LOCKED,
                id: uuidv4(),
                title: "Hero",
                sharedData: sharedHeroDataId,
                data: homeHeroDataId,
                callout: null,
              },
            ],
          },
          {
            type: BLOCK_CATEGORIES.POPUP,
            id: uuidv4(),
            title: "Landing Popup",
            children: [
              {
                type: BLOCK_TYPES.LANDING_POPUP,
                variant: BLOCK_VARIANT.LOCKED,
                id: uuidv4(),
                title: "Landing Popup",
                data: lockedLandingPopupDataId,
                sharedData: sharedDonateDataId,
                callout: null,
              },
            ],
          },
          {
            type: BLOCK_CATEGORIES.MAIN,
            id: uuidv4(),
            title: "Main blocks",
            children: [
              {
                type: BLOCK_TYPES.INTRO,
                variant: BLOCK_VARIANT.DEFAULT,
                id: uuidv4(),
                title: "Intro",
                data: defaultIntroDataId,
                callout: null,
              },
            ],
          },
          {
            type: BLOCK_CATEGORIES.EXTRA,
            id: uuidv4(),
            title: "Extra Blocks",
            children: [],
          },
          {
            type: BLOCK_CATEGORIES.FOOTER,
            id: uuidv4(),
            title: "Footer",
            children: [
              {
                type: BLOCK_TYPES.FOOTER,
                variant: BLOCK_VARIANT.LOCKED,
                id: uuidv4(),
                title: "Footer",
                callout: null,
                data: sharedFooterDataId,
              },
            ],
          },
        ],
        children: [],
      },
    ],
    blocks: [],
  },
  {
    type: PAGE_CATEGORIES.MAIN_NAV,
    id: uuidv4(),
    title: "Main Navigation",
    children: START_PAGES,
  },
  {
    type: PAGE_CATEGORIES.HIDDEN,
    id: uuidv4(),
    title: "Hidden But Live",
    externalLink: null,
    children: [],
  },
  {
    type: PAGE_CATEGORIES.DRAFT,
    id: uuidv4(),
    title: "Draft Only",
    children: [],
  },
];
