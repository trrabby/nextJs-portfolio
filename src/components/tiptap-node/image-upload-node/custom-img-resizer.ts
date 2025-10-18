import { Image } from "@tiptap/extension-image";

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "auto",
        parseHTML: (element) => element.style.width || "auto",
        renderHTML: (attrs) => ({ style: `width: ${attrs.width};` }),
      },
      height: {
        default: "auto",
        parseHTML: (element) => element.style.height || "auto",
        renderHTML: (attrs) => ({ style: `height: ${attrs.height};` }),
      },
      align: {
        default: "center",
        parseHTML: (element) => element.style.float || "center",
        renderHTML: (attrs) => ({
          style:
            attrs.align === "center"
              ? "display:block; margin:0 auto;"
              : attrs.align === "left"
              ? "float:left; margin-right:1rem;"
              : "float:right; margin-left:1rem;",
        }),
      },
    };
  },
});
