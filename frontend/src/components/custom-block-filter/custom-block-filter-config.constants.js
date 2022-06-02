import { BLOCK_TYPES } from "@constants";
import { v4 as uuidv4 } from "uuid";

export const ACTIONS_TYPES = {
  DELETE: "DELETE",
  LINK: "LINK",
  EDIT: "EDIT",
};

const NEWS_NEW_ITEM = () => {
  return {
    id: uuidv4(),
    title: "New Item",
    description: "",
    createdAt: new Date().toISOString(),
    type: "NEWS ARTICLE",
    link: "",
  };
};

const FORM_NEW_ITEM = () => {
  return {
    id: uuidv4(),
    title: "New Item",
    type: "input",
    inputType: "text",
    name: `firstName`,
    placeholder: "",
  };
};

export const DEFAULT_NEW_ITEM = () => {
  return {
    id: uuidv4(),
    title: "New Item",
    value: "",
  };
};

export const SELECT_OPTION = () => {
  return {
    id: uuidv4(),
    title: "New Item",
  };
};

export const DATA_DETAILS_NEW_ITEM = () => {
  return {
    id: uuidv4(),
    title: "New Item",
    label: "",
    value: "",
  };
};

export const EVENTS_NEW_ITEM = () => {
  return {
    id: uuidv4(),
    title: "Phonebanking with Carlos and the Rest of the Team",
    date: "sat january 2 and sun january 3",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };
};

export const CustomBlockFilterConfigConstants = {
  [BLOCK_TYPES.ISSUES_LIST]: {
    instruction:
      "Only displays issues in even numbers. If there is an odd number, the final issue will be hidden.",
    shouldShowTitle: true,
    itemsLimit: -1,
    actions: [ACTIONS_TYPES.DELETE],
  },
  [BLOCK_TYPES.DATA_DETAILS]: {
    instruction:
      "Only displays items in even numbers. If there is an odd number, the final item will be hidden.",
    shouldShowTitle: true,
    shouldShowCallout: false,
    itemsLimit: -1,
    newItem: DATA_DETAILS_NEW_ITEM,
    actions: [ACTIONS_TYPES.DELETE],
  },
  [BLOCK_TYPES.TEXT_WITH_SIDEBAR]: {
    shouldShowCallout: true,
    shouldShowTitle: true,
    itemsLimit: -1,
    actions: [ACTIONS_TYPES.DELETE],
  },
  [BLOCK_TYPES.TIMELINE]: {
    shouldShowCallout: true,
    shouldShowTitle: true,
    itemsLimit: -1,
    actions: [ACTIONS_TYPES.DELETE],
  },
  [BLOCK_TYPES.EVENTS_LIST]: {
    shouldShowCallout: false,
    shouldShowTitle: true,
    itemsLimit: -1,
    newItem: EVENTS_NEW_ITEM,
    shouldItemAddToStart: true,
    actions: [ACTIONS_TYPES.LINK, ACTIONS_TYPES.DELETE],
  },
  [BLOCK_TYPES.NEWS_LIST]: {
    shouldShowCallout: false,
    shouldShowTitle: true,
    itemsLimit: -1,
    shouldItemAddToStart: true,
    actions: [ACTIONS_TYPES.LINK, ACTIONS_TYPES.DELETE],
    newItem: NEWS_NEW_ITEM,
  },
  [BLOCK_TYPES.BULLET_COLUMNS]: {
    shouldShowCallout: true,
    shouldShowTitle: true,
    itemsLimit: -1,
    actions: [ACTIONS_TYPES.DELETE],
  },
  [BLOCK_TYPES.LANDING_POPUP]: {
    shouldShowTitle: false,
    itemsLimit: 5,
    actions: [ACTIONS_TYPES.DELETE],
  },
  [BLOCK_TYPES.SHORT_FORM]: {
    shouldShowTitle: false,
    itemsLimit: 5,
    actions: [ACTIONS_TYPES.EDIT, ACTIONS_TYPES.DELETE],
    newItem: FORM_NEW_ITEM,
  },
  [BLOCK_TYPES.LONG_FORM]: {
    shouldShowTitle: false,
    itemsLimit: -1,
    actions: [ACTIONS_TYPES.EDIT, ACTIONS_TYPES.DELETE],
    newItem: FORM_NEW_ITEM,
  },
  SHORT_FORM_OPTION: {
    itemsLimit: -1,
    shouldShowTitle: true,
    actions: [ACTIONS_TYPES.DELETE],
    newItem: SELECT_OPTION,
  },
};
