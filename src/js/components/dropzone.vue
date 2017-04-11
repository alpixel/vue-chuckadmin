<template>
    <form :action="url" class="dropzone" :id="id"></form>
</template>

<script>
    import Dropzone from 'dropzone'

    export default {
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
                        dictMaxFilesExceeded: 'You can not upload any more files. (max: {{maxFiles}})'
                    }
                }
            },
            dpOptions: {
                type: Object
            }
        },

        methods: {
        },

        mounted () {

            Dropzone.autoDiscover = false

            var element = document.getElementById(this.id)


            this.dropzone = new Dropzone(element, {
                clickable: this.dpOptions.clickable || this.clickable,
                paramName: this.dpOptions.paramName || this.paramName,
                thumbnailWidth: this.dpOptions.thumbnailWidth || this.thumbnailWidth,
                thumbnailHeight: this.dpOptions.thumbnailHeight || this.thumbnailHeight,
                maxFiles: this.dpOptions.maxFiles || this.maxFiles,
                maxFilesize: this.dpOptions.maxFilesize || this.maxFilesize,
                addRemoveLinks: this.dpOptions.addRemoveLinks || this.addRemoveLinks,
                acceptedFiles: this.dpOptions.acceptedFiles || this.acceptedFiles,
                autoProcessQueue: this.dpOptions.autoProcessQueue || this.autoProcessQueue,
                headers: this.dpOptions.headers || this.headers,
                previewTemplate: this.dpOptions.previewTemplate || '<div class="dz-preview dz-file-preview">  <div class="dz-image"><img data-dz-thumbnail /></div>  <div class="dz-details">    <div class="dz-size"><span data-dz-size></span></div>    <div class="dz-filename"><span data-dz-name></span></div>  </div>  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark"></div>  <div class="dz-error-mark"></div></div>',
                dictDefaultMessage: this.dpOptions.language.dictDefaultMessage || this.language.dictDefaultMessage,
                dictFallbackMessage: this.dpOptions.language.dictFallbackMessage || this.language.dictFallbackMessage,
                dictFallbackText: this.dpOptions.language.dictFallbackText || this.language.dictFallbackText,
                dictInvalidFileType: this.dpOptions.language.dictInvalidFileType || this.language.dictInvalidFileType,
                dictFileTooBig: this.dpOptions.language.dictFileTooBig || this.language.dictFileTooBig,
                dictResponseError: this.dpOptions.language.dictResponseError || this.language.dictResponseError,
                dictCancelUpload: this.dpOptions.language.dictCancelUpload || this.language.dictCancelUpload,
                dictCancelUploadConfirmation: this.dpOptions.language.dictCancelUploadConfirmation || this.language.dictCancelUploadConfirmation,
                dictRemoveFile: this.dpOptions.language.dictRemoveFile || this.language.dictRemoveFile,
                dictMaxFilesExceeded: this.dpOptions.language.dictMaxFilesExceeded || this.language.dictMaxFilesExceeded
            })



            // Handle the dropzone events
            this.dropzone.on('thumbnail', function (file, dataUrl) {
                console.log('thumbnail')
            })

            this.dropzone.on('addedfile', function (file) {
                console.log('addedfile')
            })

            this.dropzone.on('addedfiles', function (files) {
                console.log('addedfiles')
            })

            this.dropzone.on('removedfile', function (file) {
                console.log('removedfile')
            })

            this.dropzone.on('success', function (file, response, e) {
                console.log('success')
            })

            this.dropzone.on('successmultiple', function (file, response, e) {
                console.log('successmultiple')
            })

            this.dropzone.on('error', function (file, message, xhr) {
                console.log('error')
            })

            this.dropzone.on('errormultiple', function (files, message, xhr) {
                console.log('errormultiple')
            })

            this.dropzone.on('sending', function(file, xhr, formData){
                console.log('sending')
            })

            this.dropzone.on('sendingmultiple', function(file, xhr, formData){
                console.log('sendingmultiple')
            })

            this.dropzone.on('queuecomplete', function(){
                console.log('queuecomplete')
            })

            this.dropzone.on('canceled', function(file){
                console.log('canceled')
            })

            this.dropzone.on('canceledmultiple', function(file){
                console.log('canceledmultiple')
            })

            this.dropzone.on('complete', function(file){
                console.log('complete')
            })

            this.dropzone.on('completemultiple', function(file){
                console.log('completemultiple')
            })

            this.dropzone.on('maxfilesexceeded', function(file){
                console.log('maxfilesexceeded')
            })

            this.dropzone.on('maxfilesreached', function(files){
                console.log('maxfilesreached')
            })

            this.dropzone.on('processing', function(file){
                console.log('processing')
            })

            this.dropzone.on('processingmultiple', function(files){
                console.log('processingmultiple')
            })

            this.dropzone.on('uploadprogress', function(file, progress, bytesSent){
                console.log('uploadprogress')
            })

            this.dropzone.on('totaluploadprogress', function(totalUploadProgress, totalBytes, totalBytesSent){
                console.log('totaluploadprogress')
            })

        },

        beforeDestroy () {
            this.dropzone.destroy();
        }
    }
</script>


<style scoped>
    @import '~dropzone/dist/dropzone.css';
</style>
