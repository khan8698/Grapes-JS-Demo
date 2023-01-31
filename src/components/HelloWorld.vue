<template>
  <div class="flex items-stretch justify-start editor-row flex-nowrap">
    <div class="flex-grow editor-canvas">
      <div id="gjs"></div>
    </div>
    <div class="relative w-56 max-h-screen overflow-scroll panel__right">
      <div class="blocks-container" id="blocks-container"></div>
    </div>
  </div>
</template>

<script setup>
import './BasePath.js'
import grapesjs from 'grapesjs';
import { onMounted } from 'vue'
import "grapesjs/dist/css/grapes.min.css"
import presetWebpage from 'grapesjs-blocks-basic'
import gjsForms from 'grapesjs-plugin-forms';
import customCodePlugin from 'grapesjs-custom-code';
import ckEditorPlugin from 'grapesjs-plugin-ckeditor';
import 'ckeditor'
import CKEDITOR from 'ckeditor'
import "grapesjs-shape-divider";

// import gjsHead from "../Plugins/grapesjs-plugin-header/index";
// import gjsHead from "grapesjs-plugin-header";

onMounted(() => {
  grapesjs.init({
    container: '#gjs',
    height: '900px',
    width: '100%',
    fromElement: 1,
    plugins: [
      editor => presetWebpage(editor, {
        category: 'Structures',
        blocks: ['column1', 'column2', 'column3', 'column3-7'],
        flexGrid: true,
        labelColumn1: '1 Column',
        labelColumn2: '2 Columns',
        labelColumn3: '3 Columns',
        labelColumn37: '1+2 Columns',
      }),
      editor => presetWebpage(editor, {
        category: 'Elements',
        blocks: ['text', 'image', 'video', 'button'],
        flexGrid: true,
        labelImage: 'Image',
        labelVideo: 'Video'
      }),
      editor => gjsForms(editor, {
        category: 'Elements',
        blocks: ['button'],
      }),
      editor => customCodePlugin(editor, {
        blockCustomCode: {
          category: 'Elements',
          label: 'Custom HTML',
        },
      }),
      editor => ckEditorPlugin(editor, {
        position: 'center',
        options: {
          startupFocus: true,
          extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
          allowedContent: true, // Disable auto-formatting, class removing, etc.
          enterMode: CKEDITOR.ENTER_BR,
          extraPlugins: 'sharedspace,justify,colorbutton,panelbutton,font',
          toolbar: ['heading',
            { name: 'styles', items: ['Font', 'FontSize'] },
            ['Bold', 'Italic', 'Underline', 'Strike'],
            { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
            // { name: 'links', items: ['Link', 'Unlink'] },
            // { name: 'colors', items: ['TextColor', 'BGColor'] },
          ],
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading', class: 'ck-heading_heading1' },
            ],
          },
        }
      }),
      'grapesjs-shape-divider'
      // editor => gjsDivider(editor , {
      //   category: 'Elements',
      // })
      // gjsHead
      // editor => gjsHead(editor, { category: 'Elements' })
    ],
    storageManager: {
      id: 'gjs-',
      type: 'local',
      autosave: true,
      storeComponents: true,
      storeStyles: true,
      storeHtml: true,
      storeCss: true,
    },
    deviceManager: {
      devices:
        [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '',
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '575px',
          },
        ]
    },
    pluginsOpts: {
      'grapesjs-shape-divider': {
        category: 'Elements',

      }
    }
  })
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#gjs {
  border: 3px solid #444;
}

/* Reset some default styling */
.gjs-cv-canvas {
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
