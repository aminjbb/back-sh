<template>
  <div>
    <textarea :id="id">{{ content }}</textarea>
  </div>
</template>

<script>
import axios from "axios";
// Import TinyMCE
import tinymce from "tinymce/tinymce";

// A theme is also required
import "tinymce/themes/modern/theme";

// Any plugins you want to use has to be imported
import "tinymce/plugins/advlist";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/codesample";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/hr";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/media";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/paste";
import "tinymce/plugins/print";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/template";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/bbcode";
import "tinymce/plugins/code";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/directionality";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/legacyoutput";
import "tinymce/plugins/lists";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/save";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/table";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/toc";
import "tinymce/plugins/visualchars";

import "tinymce/skins/lightgray/skin.min.css";

export default {
  name: "tinymce",
  props: {
    id: {
      type: String,
      required: true,
    },
    htmlClass: { default: "", type: String },
    value: {
      type: String,
      default: '',
    },
    plugins: {
      default: function () {
        return [
          "advlist autolink lists link image charmap print preview hr anchor pagebreak",
          "searchreplace wordcount visualblocks visualchars code fullscreen",
          "insertdatetime media nonbreaking save table contextmenu directionality",
          "template paste textcolor colorpicker textpattern imagetools toc help emoticons hr codesample",
          "autoresize",
        ];
      },
      type: Array,
    },
    toolbar1: {
      default:
          "undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak  |  print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl ",
      type: String,
    },
    toolbar2: { default: "", type: String },
    other_options: {
      default: function () {
        return {};
      },
      type: Object,
    },
  },
  data() {
    return {
      content: "",
      editor: null,
      checkerTimeout: null,
      isTyping: false,
      readonly: false,
    };
  },
  beforeMount() {
    this.content = this.value;
  },
  beforeDestroy() {
    this.destroyTinyMCE();
  },
  activated() {
    this.initTinyMCE();
  },
  deactivated() {
    this.destroyTinyMCE();
  },
  watch: {
    value: function (newValue) {
      this.content = newValue;
      if (this.editor !== null) {
        this.content = newValue;
      } else this.content = newValue;
    },
  },
  methods: {
    initTinyMCE() {
      let options = {
        selector: "#" + this.id,
        skin: false,
        toolbar1: this.toolbar1,
        toolbar2: this.toolbar2,
        plugins: this.plugins,
        init_instance_callback: this.initEditor,
        images_upload_handler: this.images_upload_handler,
      };
      tinymce.init(this.concatAssciativeArrays(options, this.other_options));
    },
    destroyTinyMCE() {
      if (tinymce.get()) {
        tinymce.remove();
      }
    },
    images_upload_handler(blobInfo, success, failure) {
      let data = new FormData();
      data.append('file', blobInfo.blob());
      data.append('module', 'sku');
      axios
          .post(import.meta.env.VITE_API_BASEURL + "/v1/file-manager/direct/store", data, {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("adminToken"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (res) {
            success( res.data.data.data.url );
          })
          .catch(function (err) {
            failure("HTTP Error: " + err.message);
          });
    },
    initEditor(editor) {
      this.editor = editor;
      editor.on("KeyUp", () => {
        this.submitNewContent();
      });
      editor.on("Change", () => {
        if (this.editor.getContent() !== this.value) {
          this.submitNewContent();
        }
        this.$emit("editorChange", this.editor.getContent());
      });
      editor.on("init", () => {
        editor.setContent(this.content);
        this.$emit("input", this.content);
      });

      if (this.readonly) {
        this.editor.setMode("readonly");
      } else {
        this.editor.setMode("design");
      }

      this.$emit("editorInit", editor);
    },
    concatAssciativeArrays(array1, array2) {
      return {...array1, ...array2};
    },
    submitNewContent() {
      this.isTyping = true;
      if (this.checkerTimeout !== null) clearTimeout(this.checkerTimeout);
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 300);

      this.$emit("input", this.editor.getContent());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>