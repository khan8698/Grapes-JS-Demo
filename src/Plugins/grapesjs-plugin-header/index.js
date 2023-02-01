import grapesjs from "grapesjs";

export default grapesjs.plugins.add(
  "grapesjs-plugin-header",
  (editor, opts = {}) => {
    const config = {
      ...{
        // default options
        category: "Basic",
        defaultTagName: "h1",
        labelN1: "One (largest)",
        labelN2: "Two",
        labelN3: "Three",
        labelN4: "Four",
        labelN5: "Five",
        labelN6: "Six (smallest)",
        labelBlock: "Header",
        labelTrait: "Size",
        placeholder: "Insert your header text here",
      },
      ...opts,
    };

    const bm = editor.BlockManager;

    bm.add("header", {
      label: config.labelBlock,
      category: config.category,
      attributes: { class: "fa fa-header" },
      content: {
        type: "header",
        content: config.placeholder,
        activeOnRender: 1,
      },
    });

    const domc = editor.DomComponents;
    const textType = domc.getType("text");
    const textModel = textType.model;
    const textView = textType.view;

    domc.addType("header", {
      isComponent(el) {
        if (
          el &&
          el.tagName &&
          ["H1", "H2", "H3", "H4", "H5", "H6"].includes(el.tagName)
        ) {
          return { type: "header" };
        }
      },

      model: {
        defaults: Object.assign({}, textModel.prototype.defaults, {
          "custom-name": "Header",
          tagName: config.defaultTagName,
          traits: [
            {
              type: "select",
              options: [
                { value: "h1", name: config.labelN1 },
                { value: "h2", name: config.labelN2 },
                { value: "h3", name: config.labelN3 },
                { value: "h4", name: config.labelN4 },
                { value: "h5", name: config.labelN5 },
                { value: "h6", name: config.labelN6 },
              ],
              label: config.labelTrait,
              name: "tagName",
              changeProp: 1,
            },
          ],
        }),
      },
      view: textView,
    });
  }
);
