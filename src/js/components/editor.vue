<template>
    <div>
      <textarea rows="30" :id="tinyId">{{editorValue}}</textarea>
    </div>
</template>

<script>
    import Vue from 'vue'
    import tinymce from 'tinymce'
    import theme from 'tinymce/themes/modern/index.js'


	export default {
		name: 'tinymce',
        data() {
            return {

            }
        },
		props: {
            editorValue: {
                required : true
            },
            tinyId: {
                required : true,
                validator: function (value) {
                    return !_.isEmpty(value)
                }
            }
	    },
        watch: {
            editorValue(){
                this.$emit('editorValueUpdate', this.editorValue)
            }
        },
        created () {

            var vm = this

            tinymce.init({
                selector: '#' + this.tinyId,
                themes:"modern",

                setup: function(editor) {

                    editor.on('blur', function() {
                        var newContent = editor.getContent()

                        vm.$emit('editorValueUpdate', newContent)
                    })

                }
            })

        }
	}

</script>
