import grapesjs from "grapesjs";

export default grapesjs.plugins.add(
  "gjs-plugin-social",
  (editor, opts = {}) => {
    const bm = editor.BlockManager;

    bm.add("socialgroup", {
      label: "Social Group",
      content: `
    <div data-gjs-type="groupsocial" class="groupsocial" mode="horizontal">
    <div class="div_group" style="margin:0 auto; display:flex; padding:5px; pointer-events: none;" data-gjs-hoverable="false" data-gjs-highlightable="false">
    
    <div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(59, 89, 152) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>

    <div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(220, 78, 65) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/google-plus.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>

    <div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(85, 172, 238) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/twitter.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>

    </div>
    </div>`,
      attributes: { class: "fa fa-share-alt" },
      category: opts.category || "Basic",
    });

    bm.add("socialelement", {
      label: "Social Element",
      content: `<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background: rgb(59, 89, 152) none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
    <a href="#" target="_blank" style="pointer-events: none;">
      <img src="https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
    </a>
    </div>`,
      attributes: { class: "fa fa-share-alt" },
      category: opts.category || "Basic",
    });

    const dc = editor.DomComponents;

    dc.addType("groupsocial", {
      // isComponent: isComponentType(type),

      isComponent(el) {
        let match = false;
        if (el && el.classList) {
          el.classList.forEach(function (klass) {
            if (klass == "groupsocial") {
              match = true;
            }
          });
        }
        if (match) return { type: "groupsocial" };
      },

      model: {
        defaults: {
          name: "Social Group",
          resizable: {
            tl: 0,
            tc: 0,
            tr: 0,
            cl: 1,
            cr: 1,
            bl: 0,
            bc: 0,
            br: 0,
          },
          tagName: "div",
          attributes: {
            style: "display: flex;",
          },
          mode: "horizontal",
          traits: [
            {
              type: "select",
              label: "Mode",
              name: "mode",
              changeProp: 1,
              options: [
                { value: "horizontal", name: "Horizontal" },
                { value: "vertical", name: "Vertical" },
              ],
            },
          ],
        },
        init() {
          this.on("change:mode", this.updateMode);
        },
        updateMode() {
          const mode = this.get("mode");

          if (mode == "horizontal") {
            editor.addStyle(
              `#` + this.ccid + ` div { display:flex; !important }`
            );
          } else {
            editor.addStyle(
              `#` + this.ccid + ` div { display:block; !important }`
            );
          }
        },
      },
    });

    dc.addType("elemntsocial", {
      // isComponent: isComponentType(type),

      isComponent(el) {
        let match = false;
        if (el && el.classList) {
          el.classList.forEach(function (klass) {
            if (klass == "elemntsocial") {
              match = true;
            }
          });
        }
        if (match) return { type: "elemntsocial" };
      },

      model: {
        defaults: {
          name: "Social Element",
          tagName: "div",
          draggable: ".div_group",
          traits: [
            {
              type: "select",
              label: "Icon",
              name: "social",
              changeProp: 1,
              options: [
                {
                  value: "facebook",
                  name: "Facebook",
                  color: "rgb(59, 89, 152)",
                },
                {
                  value: "twitter",
                  name: "Twitter",
                  color: "rgb(85, 172, 238)",
                },
                { value: "google", name: "Google", color: "rgb(220, 78, 65)" },
                {
                  value: "instagram",
                  name: "Instagram",
                  color: "rgb(63, 114, 155)",
                },
                { value: "web", name: "Web", color: "rgb(75, 173, 233)" },
                {
                  value: "youtube",
                  name: "Youtube",
                  color: "rgb(235, 51, 35)",
                },
                {
                  value: "pinterest",
                  name: "Pinterest",
                  color: "rgb(189, 8, 28)",
                },
                {
                  value: "linkedin",
                  name: "Linkedin",
                  color: "rgb(0, 119, 181)",
                },
                {
                  value: "snapchat",
                  name: "Snapchat",
                  color: "rgb(255, 250, 84)",
                },
                { value: "vimeo", name: "Vimeo", color: "rgb(83, 180, 231)" },
                { value: "tumblr", name: "Tumblr", color: "rgb(52, 67, 86)" },
                { value: "github", name: "Github", color: "rgb(0, 0, 0)" },
                {
                  value: "soundcloud",
                  name: "SoundCloud",
                  color: "rgb(239, 127, 49)",
                },
                { value: "medium", name: "Medium", color: "rgb(0, 0, 0)" },
                {
                  value: "dribbble",
                  name: "Dribbble",
                  color: "rgb(217, 89, 136)",
                },
                { value: "xing", name: "Xing", color: "rgb(41, 99, 102)" },
              ],
            },
            { name: "src", changeProp: 1 },
            { name: "href", changeProp: 1 },
          ],
        },
        init() {
          this.on("change:social", this.updateIcon);
          this.on("change:src", this.updateSrc);
          this.on("change:href", this.updateHref);
        },
        updateSrc() {
          const src = this.get("src");
          this.addAttributes({ src: src });
          this.components()
            .models[0].components()
            .models[0].addAttributes({ src: src });
        },
        updateHref() {
          const href = this.get("href");
          this.addAttributes({ href: href });
          this.components().models[0].addAttributes({ href: href });
        },
        updateIcon() {
          const social = this.get("social");

          let href_new = this.get("href") || "#";

          const src = this.get("src");
          let src_new;
          let color;
          let imgBaseURL =
            "https://www.mailjet.com/images/theme/v1/icons/ico-social";
          if (social == "facebook") {
            src_new = src || `${imgBaseURL}/facebook.png`;
            color = "rgb(59, 89, 152)";
          } else if (social == "twitter") {
            src_new = src || `${imgBaseURL}/twitter.png`;
            color = "rgb(85, 172, 238)";
          } else if (social == "google") {
            src_new = src || `${imgBaseURL}/google-plus.png`;

            color = "rgb(220, 78, 65)";
          } else if (social == "instagram") {
            src_new = src || `${imgBaseURL}/instagram.png`;

            color = "rgb(63, 114, 155)";
          } else if (social == "web") {
            src_new = src || `${imgBaseURL}/web.png`;

            color = "rgb(75, 173, 233)";
          } else if (social == "youtube") {
            src_new = src || `${imgBaseURL}/youtube.png`;

            color = "rgb(235, 51, 35)";
          } else if (social == "pinterest") {
            src_new = src || `${imgBaseURL}/pinterest.png`;

            color = "rgb(189, 8, 28)";
          } else if (social == "linkedin") {
            src_new = src || `${imgBaseURL}/linkedin.png`;

            color = "rgb(0, 119, 181)";
          } else if (social == "snapchat") {
            src_new = src || `${imgBaseURL}/snapchat.png`;

            color = "rgb(255, 250, 84)";
          } else if (social == "vimeo") {
            src_new = src || `${imgBaseURL}/vimeo.png`;

            color = "rgb(83, 180, 231)";
          } else if (social == "tumblr") {
            src_new = src || `${imgBaseURL}/tumblr.png`;

            color = "rgb(52, 67, 86)";
          } else if (social == "github") {
            src_new = src || `${imgBaseURL}/github.png`;

            color = "rgb(0, 0, 0)";
          } else if (social == "soundcloud") {
            src_new = src || `${imgBaseURL}/soundcloud.png`;

            color = "rgb(239, 127, 49)";
          } else if (social == "medium") {
            src_new = src || `${imgBaseURL}/medium.png`;

            color = "rgb(0, 0, 0)";
          } else if (social == "dribbble") {
            src_new = src || `${imgBaseURL}/dribbble.png`;

            color = "rgb(217, 89, 136)";
          } else if (social == "xing") {
            src_new = src || `${imgBaseURL}/xing.png`;

            color = "rgb(41, 99, 102)";
          }

          this.parent().append(
            `<div data-gjs-type="elemntsocial" class="elemntsocial" style="margin:5px; background:${color} none repeat scroll 0% 0%; border-radius: 12px; width: 24px; pointer-events: all;">
            <a href="${href_new}" target="_blank" style="pointer-events: none;">
            <img src="${src_new}" style="border-radius: 12px; display: block; pointer-events: none;" width="24" height="24">
            </a>
            </div>`,
            { at: this.index() }
          );

          let at = this.index() - 1;
          let index = this.parent();

          this.remove();
          editor.select(index.components().models[at]);

          index.components().models[at].addAttributes({ social: social });
        },
      },
    });
  }
);
