import ReactQuill from "react-quill";
import { v4 as uuidv4 } from "uuid";

let BlockEmbed = ReactQuill.Quill.import("blots/block/embed");

export class CustomImage extends BlockEmbed {
  static create(data) {
    console.log(data);
    const node = super.create(data);
    node.setAttribute("src", data.src);
    node.setAttribute("class", data.class || "img-float-left");
    node.setAttribute("id", data.id || uuidv4());
    node.setAttribute("style", data.style || "width: 20%;");
    node.setAttribute("data-verify", data.verify || "RUN-TEXT-EDITOR");
    return node;
  }

  static value(node) {
    return {
      style: node.getAttribute("style"),
      src: node.getAttribute("src"),
      class: node.getAttribute("class"),
      id: node.getAttribute("id"),
      verify: "RUN-TEXT-EDITOR",
    };
  }
}

CustomImage.blotName = "CustomImage";
CustomImage.tagName = "img";
ReactQuill.Quill.register({ "formats/CustomImage": CustomImage });
