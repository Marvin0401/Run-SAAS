import { v4 as uuidv4 } from "uuid";

import BasicTextIcon from "../assets/images/cms/block_icon-basic_text.svg";
import BulletGridIcon from "../assets/images/cms/block_icon-bullet_grid.svg";
import DonateIcon from "../assets/images/cms/block_icon-donate_buttons.svg";
import EndorsersIcon from "../assets/images/cms/block_icon-endorsers_preview.svg";
import FullWidthImageIcon from "../assets/images/cms/block_icon-full_width_image.svg";
import FullWidthVideoIcon from "../assets/images/cms/block_icon-full_width_video.svg";
import IssuesIcon from "../assets/images/cms/block_icon-issues_preview.svg";
import LongFormIcon from "../assets/images/cms/block_icon-long_form.svg";
import NewsIcon from "../assets/images/cms/block_icon-news_preview.svg";
import ShortFormIcon from "../assets/images/cms/block_icon-short_form.svg";
import TextSidebarIcon from "../assets/images/cms/block_icon-text_sidebar.svg";
import TimelineIcon from "../assets/images/cms/block_icon-timeline.svg";
import TwitterIcon from "../assets/images/cms/block_icon-twitter_preview.svg";

import { BLOCK_FREQUENCY, BLOCK_TYPES, BLOCK_VARIANT } from "@constants";

const BLOCKS = [
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: EndorsersIcon,
    title: "Endorsements",
    type: BLOCK_TYPES.ENDORSEMENTS,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    title: "Events",
    type: BLOCK_TYPES.EVENTS_LIST,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    title: "Events",
    type: BLOCK_TYPES.EVENTS_PAGE,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    title: "Intro",
    type: BLOCK_TYPES.INTRO,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: IssuesIcon,
    title: "Issues",
    type: BLOCK_TYPES.ISSUES_LIST,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: IssuesIcon,
    title: "Issues",
    type: BLOCK_TYPES.ISSUES_PAGE,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: NewsIcon,
    title: "News",
    type: BLOCK_TYPES.NEWS_LIST,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: NewsIcon,
    title: "News",
    type: BLOCK_TYPES.NEWS_PAGE,
    variant: BLOCK_VARIANT.DEFAULT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: EndorsersIcon,
    title: "Endorsements",
    type: BLOCK_TYPES.ENDORSEMENTS,
    variant: BLOCK_VARIANT.EXTRA,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: DonateIcon,
    title: "Donate",
    type: BLOCK_TYPES.LANDING_POPUP,
    variant: BLOCK_VARIANT.EXTRA,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: NewsIcon,
    title: "News",
    type: BLOCK_TYPES.NEWS_LIST,
    variant: BLOCK_VARIANT.EXTRA,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: IssuesIcon,
    title: "Issues",
    type: BLOCK_TYPES.ISSUES_LIST,
    variant: BLOCK_VARIANT.EXTRA,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: BasicTextIcon,
    title: "Text",
    type: BLOCK_TYPES.BASIC_TEXT,
    variant: BLOCK_VARIANT.CUSTOM,
    text: "",
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: BulletGridIcon,
    title: "Bullets",
    type: BLOCK_TYPES.BULLET_COLUMNS,
    variant: BLOCK_VARIANT.CUSTOM,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: TextSidebarIcon,
    title: "Text with sidebar",
    type: BLOCK_TYPES.TEXT_WITH_SIDEBAR,
    variant: BLOCK_VARIANT.CUSTOM,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: TimelineIcon,
    title: "Timeline",
    type: BLOCK_TYPES.TIMELINE,
    variant: BLOCK_VARIANT.CUSTOM,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    title: "Footer",
    type: BLOCK_TYPES.FOOTER,
    variant: BLOCK_VARIANT.LOCKED,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    title: "Hero",
    type: BLOCK_TYPES.HERO,
    variant: BLOCK_VARIANT.LOCKED,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    title: "Landing popup",
    type: BLOCK_TYPES.LANDING_POPUP,
    variant: BLOCK_VARIANT.LOCKED,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    title: "Life",
    type: BLOCK_TYPES.LIFE_DETAILS,
    variant: BLOCK_VARIANT.CALLOUT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    title: "Quote",
    type: BLOCK_TYPES.QUOTE,
    variant: BLOCK_VARIANT.CALLOUT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    title: "Quote image",
    type: BLOCK_TYPES.QUOTE_IMAGE,
    variant: BLOCK_VARIANT.CALLOUT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: TextSidebarIcon,
    title: "Text",
    type: BLOCK_TYPES.TEXT,
    variant: BLOCK_VARIANT.CALLOUT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: TextSidebarIcon,
    title: "Text image",
    type: BLOCK_TYPES.TEXT_IMAGE,
    variant: BLOCK_VARIANT.CALLOUT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: TextSidebarIcon,
    title: "Data",
    type: BLOCK_TYPES.DATA_DETAILS,
    variant: BLOCK_VARIANT.CALLOUT,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: TwitterIcon,
    title: "Twitter",
    type: BLOCK_TYPES.TWITTER,
    variant: BLOCK_VARIANT.EXTRA,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: FullWidthImageIcon,
    title: "Full Width Image",
    type: BLOCK_TYPES.FULL_WIDTH_IMAGE,
    variant: BLOCK_VARIANT.MULTI,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: LongFormIcon,
    title: "Long Form",
    type: BLOCK_TYPES.LONG_FORM,
    variant: BLOCK_VARIANT.MULTI,
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.ONCE,
    icon: ShortFormIcon,
    title: "Short Form",
    type: BLOCK_TYPES.SHORT_FORM,
    variant: BLOCK_VARIANT.MULTI,
    sharedData: uuidv4(),
  },
  {
    callout: null,
    frequency: BLOCK_FREQUENCY.MULTIPLE,
    icon: FullWidthVideoIcon,
    title: "Full Width Video",
    type: BLOCK_TYPES.FULL_WIDTH_VIDEO,
    variant: BLOCK_VARIANT.MULTI,
  },
];

export const EmptyIcon = BasicTextIcon;

export const BLOCK_DATA = {
  [BLOCK_TYPES.BASIC_TEXT]: {
    text: "Basic text",
  },
  [BLOCK_TYPES.BULLET_COLUMNS]: {
    data: [
      {
        id: uuidv4(),
        title: "Item 1",
        value:
          '<p><strong>I co-organized the "Twelve days of Christmas" fundraiser</strong> for detainees in the northwest.</p>',
      },
      {
        id: uuidv4(),
        title: "Item 2",
        value:
          '<p><strong>I co-organized the "Twelve days of Christmas" fundraiser</strong> for detainees in the northwest.</p>',
      },
    ],
  },
  [BLOCK_TYPES.ENDORSEMENTS]: {
    headline: "Janice Turner for Congress",
    showFeatureIndividuals: true,
    showFeatureOrganizations: true,
    showHeadline: true,
    numRows: "1",
  },
  [BLOCK_TYPES.LANDING_POPUP]: {
    headlineOn: false,
    headline: "Donate to support the campaign!",
  },
  [BLOCK_TYPES.NEWS_LIST]: {
    headline: "News & updates",
  },
  [BLOCK_TYPES.TEXT_WITH_SIDEBAR]: {
    sidebarListItems: [
      {
        id: uuidv4(),
        title: "Challenge 1",
        value: "Challenge 1",
      },
      {
        id: uuidv4(),
        title: "Challenge 1",
        value: "Challenge 1",
      },
    ],
    description:
      "<h1>I was able to overcome the daunting challenge of...</h1><p>trying to pass legislation in the face of adversity.</p>",
    sidebarTitle: "Challenges",
  },
  [BLOCK_TYPES.TIMELINE]: {
    title: "Timeline Title",
    data: [
      {
        id: uuidv4(),
        title: "2007",
        value:
          "<p><strong>I help create hundreds of units of housing</strong> by passing legislation in my district.</p>",
      },
      {
        id: uuidv4(),
        title: "2011",
        value:
          "<p><strong>I co-organized a fund raiser</strong> for impoverished children in the local area.</p>",
      },
    ],
  },
  [BLOCK_TYPES.QUOTE_IMAGE]: {
    text: "Insert quote text here.",
    img: "https://media.designedtorun.com/sample/sample_image-3.jpg",
    orignalImg: "https://media.designedtorun.com/sample/sample_image-3.jpg",
    isFlipped: false,
  },
  [BLOCK_TYPES.QUOTE]: {
    text: "Insert quote text here.",
  },
  [BLOCK_TYPES.DATA_DETAILS]: {
    data: [
      {
        id: uuidv4(),
        title: "Born",
        label: "Born",
        value: "1982",
      },
      {
        id: uuidv4(),
        title: "Party",
        label: "Party",
        value: "Democratic",
      },
    ],
  },
  [BLOCK_TYPES.FULL_WIDTH_VIDEO]: {
    title: "A capitvating video",
    description: "A descriptive caption.",
    thumbnail: "https://media.designedtorun.com/sample/sample_image-2.jpg",
    originalImage: "https://media.designedtorun.com/sample/sample_image-2.jpg",
    headlineOn: true,
    captionOn: true,
    embedCode: "",
  },
  [BLOCK_TYPES.FULL_WIDTH_IMAGE]: {
    title: "An insightful image",
    description: "A descriptive caption.",
    thumbnail: "https://media.designedtorun.com/sample/sample_image-2.jpg",
    originalImage: "https://media.designedtorun.com/sample/sample_image-2.jpg",
    headlineOn: true,
    captionOn: true,
  },
  [BLOCK_TYPES.SHORT_FORM]: {
    fields: [],
    imageOn: true,
    flipContent: false,
    submitBtnText: "Submit",
    image: "https://media.designedtorun.com/sample/sample_image-3.jpg",
    originalImage: "https://media.designedtorun.com/sample/sample_image-3.jpg",
    smallHeader: "Sign up to",
    bigHeader: "Get Involved",
  },
  [BLOCK_TYPES.TWITTER]: {
    username: "berniesanders",
  },
  [BLOCK_TYPES.LONG_FORM]: {
    fields: [],
    eyebrow: "Sign up to",
    eyebrowOn: true,
    wrapForm: true,
    submitBtnText: "Submit",
    formWidth: 50,
    title: "Get Involved",
    blockStyle: "color_block",
    description:
      "<p><b>The bail industry’s pockets are deep,</b> and they have spent millions of dollars to roll back California’s progress and protect their bottom line. Help ensure a fairer system that doesn’t base freedom on the ability to pay but on the public safety risk of the defendant. Join the coalition to End Money Bail today.</p>",
  },
  [BLOCK_TYPES.HERO]: {
    splitImage: "",
    originalSplitImage: "",
    mobileImage: "",
    originalMobileImage: "",
    fullImage: "",
    originalFullImage: "",
    headlineOn: true,
    showImage: true,
  },
};

export default BLOCKS;
