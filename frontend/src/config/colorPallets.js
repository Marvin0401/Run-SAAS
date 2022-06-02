/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import DEFAULT_BLOCK_THEME from "./defaultBlockTheme";

export const colorPallets = [
  {
    id: uuidv4(),
    name: "Pallette1",
    colors: [
      {
        id: uuidv4(),
        is_active: true,
        name: "Blue",
        hex: "#001f45",
        order: 1,
        css_var: "blue",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "Teal",
        hex: "#3eab93",
        order: 2,
        css_var: "teal",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "Red",
        hex: "#f00",
        order: 3,
        css_var: "red",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "White",
        hex: "#fff",
        order: 4,
        css_var: "white",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "Yellow",
        hex: "#ffda31",
        order: 4,
        css_var: "yellow",
      },
    ],
    blockTheme: [],
  },
  {
    id: uuidv4(),
    name: "Pallette2",
    colors: [
      {
        id: uuidv4(),
        is_active: true,
        name: "Blue",
        hex: "#001f45",
        order: 1,
        css_var: "blue",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "Teal",
        hex: "#3eab93",
        order: 2,
        css_var: "teal",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "Red",
        hex: "#f00",
        order: 3,
        css_var: "red",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "White",
        hex: "#fff",
        order: 4,
        css_var: "white",
      },
      {
        id: uuidv4(),
        is_active: true,
        name: "Yellow",
        hex: "#ffda31",
        order: 4,
        css_var: "yellow",
      },
    ],
    blockTheme: [],
  },
];

export const categories = [
  {
    id: uuidv4(),
    name: "Yellow",
    color: "#ffda00",
    palletsIds: [colorPallets[0].id, colorPallets[1].id],
    hiddenPattesIds: [],
  },
  {
    id: uuidv4(),
    name: "Orange",
    color: "#ffa500",
    palletsIds: [],
    hiddenPattesIds: [],
  },
  {
    id: uuidv4(),
    name: "Blue",
    color: "#00f",
    palletsIds: [],
    hiddenPattesIds: [],
  },
  {
    id: uuidv4(),
    name: "Red",
    color: "#f00",
    palletsIds: [],
    hiddenPattesIds: [],
  },
  {
    id: uuidv4(),
    name: "Green",
    color: "#008000",
    palletsIds: [],
    hiddenPattesIds: [],
  },
  {
    id: uuidv4(),
    name: "Purple",
    color: "#800080",
    palletsIds: [],
    hiddenPattesIds: [],
  },
];
