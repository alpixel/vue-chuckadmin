<template>
    <div>
        <textarea :id="textareaId" class="body">{{content}}</textarea>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'

    export default {
        name: 'tinymce',
        
        data() {
            return {

            }
        },

        props: {
            textareaId:    { type: String, required: true },                        // id of the textarea == id of tinymce.Editor (without leading '#'!)
            content:       { type: String, required: false, default: "" },
            tinyMceConfig: { type: Object, required: false, default: function() {   // TinyMCE default configuration, can be overwritten from parent component
                return {
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table contextmenu paste'
                    ],
                    toolbar: 'undo redo | table | styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link charmap | image | code',
                    height : 300,
                    max_height: 500,
                    body_class: 'my-tinymce',
                    content_css: 'dist/tinymce.css?' + new Date().getTime()
                }
            }}
        },

        methods: {
            getContent() {
                return tinymce.get(this.textareaId).getContent()
            },
            setContent(newContent) {
                tinymce.get(this.textareaId).setContent(newContent)
            },
            updateContent() {
                this.$emit('input', this.getContent())
            }
        },

        mounted () {

            this.tinyMceConfig.selector = '#' + this.textareaId

            tinymce.init(this.tinyMceConfig)
            .then(editors => {
                tinymce.get(this.textareaId)
                .on('keyup',  this.updateContent)
                .on('change', this.updateContent)
                .on('undo',   this.updateContent)
                .on('redo',   this.updateContent)
            })

        },

        beforeDestroy () {
            tinymce.remove('#'+this.textareaId)
        }
    }

</script>
