<template>
    <form :action="url" class="dropzone" :id="id"></form>
</template>

<script>
    import Dropzone from 'dropzone'

    export default {
        data() {
            return {

            }
        },

        props: {
            id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            clickable: {
                type: Boolean,
                default: true
            },
            paramName: {
                type: String,
                default: 'file'
            },
            acceptedFiles: {
                type: String
            },
            thumbnailHeight: {
                type: Number,
                default: 100
            },
            thumbnailWidth: {
                type: Number,
                default: 100
            },
            addRemoveLinks: {
                type: Boolean,
                default: true
            },
            maxFilesize: {
                type: Number,
                default: 2
            },
            maxFiles: {
                type: Number,
                default: 5
            },
            autoProcessQueue: {
                type: Boolean,
                default: true
            },
            headers: {
                type: Object
            },
            uploadMultiple : {
                type: Boolean,
                default: true
            },
            language: {
                type: Object,
                default: function() {
                    return {
                        dictDefaultMessage: 'Drop files here to upload',
                        dictFallbackMessage: 'Your browser does not support drag and drop file uploads.',
                        dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',
                        dictInvalidFileType: 'You ca not upload files of this type.',
                        dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
                        dictResponseError: 'Server responded with {{statusCode}} code.',
                        dictCancelUpload: 'Cancel upload',
                        dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
                        dictRemoveFile: 'Remove',
                        dictMaxFilesExceeded: 'You can not upload any more files.'
                    }
                }
            },
            dzOptions: {
                type: Object
            },
            dzMedias: {
                type:Array
            }
        },

        methods: {
        },

        mounted () {
            // Can not access to 'this' instance into mounted. So set vm var
            var vm = this

            // We create programmatically Dropzone, so : Disabling autoDiscover, otherwise Dropzone will try to attach twice.
            Dropzone.autoDiscover = false

            // Get the element
            var element = document.getElementById(this.id)

            // Existing imgs ?
            var medias = this.dzMedias || []

            // Create DropZone instance
            this.dropzone = new Dropzone(element, {
                clickable: this.dzOptions.clickable || this.clickable,
                paramName: this.dzOptions.paramName || this.paramName,
                thumbnailWidth: this.dzOptions.thumbnailWidth || this.thumbnailWidth,
                thumbnailHeight: this.dzOptions.thumbnailHeight || this.thumbnailHeight,
                maxFiles: this.dzOptions.maxFiles || this.maxFiles,
                maxFilesize: this.dzOptions.maxFilesize || this.maxFilesize,
                addRemoveLinks: this.dzOptions.addRemoveLinks || this.addRemoveLinks,
                acceptedFiles: this.dzOptions.acceptedFiles || this.acceptedFiles,
                autoProcessQueue: this.dzOptions.autoProcessQueue || this.autoProcessQueue,
                uploadMultiple: this.dzOptions.uploadMultiple || this.uploadMultiple,
                headers: this.dzOptions.headers || this.headers,
                previewTemplate: this.dzOptions.previewTemplate || '<div class="dz-preview dz-file-preview">  <div class="dz-image"><img data-dz-thumbnail /></div>  <div class="dz-details">    <div class="dz-size"><span data-dz-size></span></div>    <div class="dz-filename"><span data-dz-name></span></div>  </div>  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark"></div>  <div class="dz-error-mark"></div></div>',
                dictDefaultMessage: this.dzOptions.language.dictDefaultMessage || this.language.dictDefaultMessage,
                dictFallbackMessage: this.dzOptions.language.dictFallbackMessage || this.language.dictFallbackMessage,
                dictFallbackText: this.dzOptions.language.dictFallbackText || this.language.dictFallbackText,
                dictInvalidFileType: this.dzOptions.language.dictInvalidFileType || this.language.dictInvalidFileType,
                dictFileTooBig: this.dzOptions.language.dictFileTooBig || this.language.dictFileTooBig,
                dictResponseError: this.dzOptions.language.dictResponseError || this.language.dictResponseError,
                dictCancelUpload: this.dzOptions.language.dictCancelUpload || this.language.dictCancelUpload,
                dictCancelUploadConfirmation: this.dzOptions.language.dictCancelUploadConfirmation || this.language.dictCancelUploadConfirmation,
                dictRemoveFile: this.dzOptions.language.dictRemoveFile || this.language.dictRemoveFile,
                dictMaxFilesExceeded: this.dzOptions.language.dictMaxFilesExceeded || this.language.dictMaxFilesExceeded,

                init: function() {

                    // Refer to Dropzone instance
                    var _this = this

                    // Render existing images
                    if(!_.isEmpty(medias)) {

                        element.classList.add('dz-started')

                        _.forEach(medias,function(value){

                            // set mockFile to load
                            var mockFile = {
                                name: "Filename",
                                size: 12345,
                                accepted : true
                            }

                            // Call the default addedfile event handler
                            _this.emit("addedfile", mockFile)

                            // if the file on your server is not yet in the right
                            // size, you can let Dropzone download and resize it
                            // callback and crossOrigin are optional.
                            _this.createThumbnailFromUrl(mockFile, "uploads/"+value, function(){

                            })

                            // Make sure that there is no progress bar, etc...
                            _this.emit("success", mockFile)
                            _this.emit("complete", mockFile)


                            // Push files in Dz
                            _this.files.push(mockFile)
                        });
                    }


                    // Event listeners
                    _this
                    .on('thumbnail', function(file, dataUrl) {
                        // console.log('thumbnail')
                    })

                    .on('addedfile', function(file) {
                        // console.log('addedfile')
                    })

                    .on('addedfiles', function(files) {
                        // console.log('addedfiles')
                    })

                    .on('removedfile', function(file) {
                        // console.log('removedfile')
                    })

                    .on('success', function(file, response, e) {
                        // console.log('success')
                    })

                    .on('successmultiple', function(file, response, e) {
                        // console.log('successmultiple')
                    })

                    .on('error', function(file, message, xhr) {
                        // console.log('error')
                        // alert(message)
                    })

                    .on('errormultiple', function(files, message, xhr) {
                        // console.log('errormultiple')
                    })

                    .on('sending', function(file, xhr, formData){
                        // console.log('sending')
                    })

                    .on('sendingmultiple', function(file, xhr, formData){
                        // console.log('sendingmultiple')
                    })

                    .on('queuecomplete', function(){
                        // console.log('queuecomplete')
                    })

                    .on('canceled', function(file){
                        // console.log('canceled')
                    })

                    .on('canceledmultiple', function(file){
                        // console.log('canceledmultiple')
                    })

                    .on('complete', function(file){
                        // console.log('complete')
                    })

                    .on('completemultiple', function(file){
                        // console.log('completemultiple')
                    })

                    .on('maxfilesexceeded', function(file){
                        // console.log('maxfilesexceeded')
                    })

                    .on('maxfilesreached', function(files){
                        // console.log('maxfilesreached')
                    })

                    .on('processing', function(file){
                        // console.log('processing')
                    })

                    .on('processingmultiple', function(files){
                        // console.log('processingmultiple')
                    })

                    .on('uploadprogress', function(file, progress, bytesSent){
                        // console.log('uploadprogress')
                    })

                    .on('totaluploadprogress', function(totalUploadProgress, totalBytes, totalBytesSent){
                        // console.log('totaluploadprogress')
                    })

                } // end init()
            }) // end new Dropzone()
        },

        beforeDestroy () {
            this.dropzone.destroy();
        }
    }
</script>
