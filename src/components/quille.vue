<template>
  <div>
    <quill-editor
      ref="quill-editor"
      v-model="content"
      :options="options"
      v-loading="loading"
      :class="bleans ? 'pengtao':''"
      @input="onEditorBlur($event)"
      style="width: 100%; height: 100%"
    />
    <!-- @change="onEditorChange($event)" -->
    <div class="upload-col">
      <input
        class="quill-editor__uploadBtn"
        style="display: none !important"
        @change="uploadSuccess"
        multiple="multiple"
        accept="image/jpeg, image/jpg, image/png"
        type="file"
        ref="referenceUpload"
      />
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { uploadImages } from "../utils/axios";
import { quillEditor } from "vue-quill-editor";
/**
 * 富文本
 * content 内容
 * options 参数配置
 * uploadImageParam 上传图片的参数
 *
 */
export default {
  props: {
    values: {
      type: String,
    },
    options: {
      type: Object,
      default: () => {
        return {
          placeholder: "请输入内容",
          modules: {
            toolbar: {
              container: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [
                  {
                    header: 1,
                  },
                  {
                    header: 2,
                  },
                ],
                [
                  {
                    list: "ordered",
                  },
                  {
                    list: "bullet",
                  },
                ],
                [
                  {
                    script: "sub",
                  },
                  {
                    script: "super",
                  },
                ],
                [
                  {
                    indent: "-1",
                  },
                  {
                    indent: "+1",
                  },
                ],
                [
                  {
                    direction: "rtl",
                  },
                ],

                [
                  {
                    size: ["small", false, "large", "huge"],
                  },
                ],
                [
                  {
                    header: [1, 2, 3, 4, 5, 6, false],
                  },
                ],

                [
                  {
                    color: [],
                  },
                  {
                    background: [],
                  },
                ],
                [
                  {
                    font: [],
                  },
                ],
                [
                  {
                    align: [],
                  },
                ],
                ["image"],
                //  'video','link',
                ["clean"],
              ],
              handlers: {
                image: function (value) {
                  if (value) {
                    document.querySelector(".quill-editor__uploadBtn").click();
                  } else {
                    this.quill.format("image", false);
                  }
                },
              },
            },
          },
        };
      },
    },
    uploadImageParam: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      content: "",
      loading: false,
      inter:"",
      bleans:false
    };
  },
  mounted() {
    setTimeout(() => {
      this.content = this.values;
    }, 2000);
    this.inter = setInterval(() => {
      this.bleans = this.$store.state.srcoll_boolean
      
    },300)
  },
  destroyed(){
    clearInterval(this.inter)
  },
  components: {
    quillEditor,
  },
  methods: {
    onEditorBlur(quill) {
      this.$emit("blurs", this.content);
    },
    uploadSuccess(e) {
      const that = this;

      console.log(e.target.files);
      for (let i = 0; i < e.target.files.length; i++) {
        console.log(e.target.files[i]);
      }
      let params = new FormData();
      e.target.files.forEach((item, i) => {
        params.append(`file[${i}]`, item);
      });
      this.loading = true;
      uploadImages(params)
        .then((res) => {
          console.log(res);
          if (res.data.err_code == 0) {
            let quill = that.$refs["quill-editor"].quill
            let length = ""
            if(quill.getSelection().index || quill.getSelection().index == 0){
              length = quill.getSelection().index;
              res.data.err_msg.url_list.reverse();
              res.data.err_msg.url_list.forEach((item) => {
                console.log(item);
                quill.insertEmbed(length, "image", item);
                quill.setSelection(length + 1);
              });
              this.loading = false;
            }else{
              this.loading = false;
               that.$message({
                showClose: true,
                message: "上传失败,请重试",
                type: "error",
              });
            }
          } else {
            that.$message({
              showClose: true,
              message: res.data.err_msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.$refs.referenceUpload.value = null;
    },
    onEditorChange({ html }) {
      this.$emit("content", html);
    },
  },
  
  watch: {
    values(newVal, oldVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.upload-col {
  height: 0;
  width: 0;
  overflow: hidden;
}
/deep/ .quill-editor img {
  max-width: 600px;
}
.pengtao /deep/ .ql-toolbar.ql-snow {
  position: fixed;
  top: 85px;
  left: 50%;
  background: #fff;
  z-index: 100;
  margin-left: -487px;
  width: 1160px;
}
.ql-clipboard {
    position: fixed;
    display: none;
    left: 50%;
    top: 50%;
  }
</style>