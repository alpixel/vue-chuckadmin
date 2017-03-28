<template>
    <div class="cms-edit">
        <div class="cc-loader" v-if="loading">
            <div class="spinner"></div>
        </div>

        <div v-else>

            <div v-if="!fetchError">

                <div class="top-page">
                    <div class="cc-inside">
                        <div class="columns">
                            <h1>
                                Edit page : "{{ page.title | truncate(50) }}"
                            </h1>
                            <div class="cc-w-auto cc-right">
                                <router-link class="btn cc-bg-green fa-angle-left" :to="{name : 'cms'}">Back to CMS pages</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cc-inside">

                    <!-- FORM EDIT DATA -->
                    <form @submit.prevent="submitForm" class="form-large">

                        <div class="columns">
                            <div class="cc-9">

                                <!-- PAGE CONTENT -->
                                <div class="boxed">
                                    <h3>Page content</h3>

                                    <div class="message message-error">
                                        @TODO :<br />
                                        <ul>
                                            <li>Wysiwyg</li>
                                            <li>Dropzone : skin preview and make it work in local bon sang</li>
                                        </ul>
                                    </div>

                                    <!-- TITLE -->
                                    <div class="form-item" :class="{ 'error': $v.page.title.$error }">
                                        <label class="block">
                                            Title
                                        </label>
                                        <input type="text" v-model.trim="page.title" @input="$v.page.title.$touch(), slugify()" />
                                        <span class="warning" v-if="!$v.page.title.maxLength">
                                            Can not be longer than {{ $v.page.title.$params.maxLength.max }} letters.
                                        </span>
                                        <span class="warning" v-if="!$v.page.title.required">
                                            Field is required
                                        </span>
                                    </div>

                                    <!-- BODY -->
                                    <div class="form-item" :class="{ 'error': $v.page.content.$error }">
                                        <label class="block">
                                            Body
                                        </label>
                                        <!-- <tinymce
                                            :id="'editor-'+ uniqid"
                                            v-model="page.content"
                                            :toolbar="options"
                                            :value="page.content"
                                            >
                                        </tinymce> -->
                                        <textarea v-model.trim="page.content" @input="$v.page.content.$touch()" class="body" /></textarea>
                                    </div>

                                    <div class="form-item">
                                        <label class="block">Images</label>

                                        <dropzone
                                            :id="'dropzone-'+ uniqid"
                                            :url="dropzoneConf.url"
                                            @vdropzone-success="dropzoneSuccess"
                                            :dropzone-options="dropzoneConf"
                                            :use-custom-dropzone-options="true"
                                        >
                                        </dropzone>

                                    </div>
                                </div>

                            </div>
                            <div class="cc-3">

                                <!-- SETTINGS -->
                                <div class="boxed">
                                    <h3>Page settings</h3>

                                    <!-- LANG -->
                                    <div class="form-item" :class="{ 'error': $v.page.lang.$error }">
                                        <label class="block">Language</label>
                                        <select name="lang" v-model.trim="page.lang" @input="$v.page.lang.$touch()">
                                            <option value="fr">fr</option>
                                            <option value="en">en</option>
                                        </select>
                                        <span class="warning" v-if="!$v.page.lang.required">
                                            Field is required
                                        </span>
                                    </div>

                                    <!-- DATE CREATED -->
                                    <div class="form-item" :class="{ 'error': $v.page.dateCreated.$error }">
                                        <label class="block">Created date</label>

                                        <Flatpickr :options="fpOptions" v-model.trim="page.dateCreated" @input="$v.page.dateCreated.$touch()" />

                                        <span class="warning" v-if="!$v.page.dateCreated.required">
                                            Field is required
                                        </span>
                                    </div>

                                    <!-- STATUS -->
                                    <div class="form-item" :class="{ 'error': $v.page.published.$error }">
                                        <label class="block">Status</label>
                                        <div class="form-radio">
                                            <label>
                                                <input type="radio" name="published" value="true" v-model.trim="page.published" />
                                                Published
                                            </label>
                                            <label>
                                                <input type="radio" name="published" value="false" v-model.trim="page.published" />
                                                Pending
                                            </label>
                                        </div>
                                        <span class="warning" v-if="!$v.page.published.required">
                                            Field is required
                                        </span>
                                    </div>
                                </div>

                                <!-- SEO -->
                                <div class="boxed">
                                    <h3>SEO</h3>

                                    <!-- SLUG PAGE -->
                                    <div class="form-item" :class="{ 'error': $v.page.slug.$error }">
                                        <label class="block">Url rewriting</label>
                                        <input type="text" v-model.trim="page.slug" @input="$v.page.slug.$touch()" />
                                        <span class="warning" v-if="!$v.page.slug.required">
                                            Field is required
                                        </span>
                                        <div class="message message-info fa-info-circle">
                                            <em>Apparaît après l'adresse du site.</em><br /><br />
                                            <span v-html="fullUrl"></span>
                                        </div>
                                    </div>

                                    <!-- META TITLE -->
                                    <div class="form-item" :class="{ 'error': $v.page.meta.title.$error }">
                                        <label class="block">Meta title ({{ $v.page.meta.title.$params.minLength.min }}-{{ $v.page.meta.title.$params.maxLength.max }} caract.)</label>
                                        <input type="text" v-model.trim="page.meta.title" @input="$v.page.meta.title.$touch()" />
                                        <span class="warning" v-if="!$v.page.meta.title.required">
                                            Field is required
                                        </span>
                                        <span class="warning" v-if="!$v.page.meta.title.maxLength">
                                            Can not be longer than {{ $v.page.meta.title.$params.maxLength.max }} letters.
                                        </span>
                                        <span class="warning" v-if="!$v.page.meta.title.minLength">
                                            Can not be shorter than {{ $v.page.meta.title.$params.minLength.min }} letters.
                                        </span>
                                    </div>

                                    <!-- META DESCRIPTION -->
                                    <div class="form-item" :class="{ 'error': $v.page.meta.description.$error }">
                                        <label class="block">Meta description ({{ $v.page.meta.description.$params.minLength.min }}-{{ $v.page.meta.description.$params.maxLength.max }} caract.)</label>
                                        <textarea v-model.trim="page.meta.description" @input="$v.page.meta.description.$touch()"></textarea>
                                        <span class="warning" v-if="!$v.page.meta.description.required">
                                            Field is required
                                        </span>
                                        <span class="warning" v-if="!$v.page.meta.description.maxLength">
                                            Can not be longer than {{ $v.page.meta.description.$params.maxLength.max }} letters.
                                        </span>
                                        <span class="warning" v-if="!$v.page.meta.description.minLength">
                                            Can not be shorter than {{ $v.page.meta.description.$params.minLength.min }} letters.
                                        </span>
                                    </div>

                                    <!-- META KEYWORDS -->
                                    <div class="form-item" :class="{ 'error': $v.page.meta.keywords.$error }">
                                        <label class="block">Meta keywords (spaced with comas)</label>
                                        <textarea v-model.trim="page.meta.keywords" ></textarea>
                                    </div>
                                </div>

                            </div>


                            <!-- SUBMIT -->
                            <div>
                                <div class="boxed columns">
                                    <div>
                                        <button type="submit" ref="submitButton" class="fa-save cc-bg-primary">Save</button>
                                    </div>
                                    <div class="cc-w-auto cc-right">
                                        <a class="btn fa-times cc-bg-red" @click.prevent="modalDelete = true">Delete this page</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>

                    <!-- MODAL SHOWN WHEN CMS IS UPDATED / CREATED -->
                    <div :class="[{'active' : modalSuccess}, 'modal']">
                        <!-- Close button -->
                        <button class="modal-close" @click="modalSuccess = false"></button>
                        <!-- Overlay -->
                        <div class="modal-overlay" @click="modalSuccess = false"></div>
                        <!-- Modal content -->
                        <div class="modal-content">
                            <div class="modal-header">
                                Success
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-info fa-thumbs-up">
                                    Page saved with success
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- MODAL CONFIRM DELETE -->
                    <div :class="[{'active' : modalDelete}, 'modal']">
                        <!-- Close button -->
                        <button class="modal-close" @click="modalDelete = false"></button>
                        <!-- Overlay -->
                        <div class="modal-overlay"></div>
                        <!-- Modal content -->
                        <div class="modal-content">
                            <div class="modal-header">
                                Confirm action
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-info">
                                    Do you really want to delete this page ?
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="cc-bg-red fa-check" ref="btnDelete" @click.prevent="deleteData">CONFIRM DELETE</button>
                            </div>
                        </div>
                    </div>



                </div><!-- /end cc-inside -->

            </div><!-- /end v-if="!fetchError" -->

            <div v-else>
                <div class="top-page">
                    <div class="cc-inside">
                        <div class="columns">
                            <h1>
                                Error for editing CMS page #{{ $route.params.id }}
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="cc-inside">
                    <div class="alert alert-error">
                        {{fetchError}}
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { alpha,alphaNum,and,between,email,maxLength,minLength,numeric,or,required,sameAs } from 'vuelidate/lib/validators'
    import moment from 'moment'
    import Dropzone from 'vue2-dropzone'


    // Set const api url to get datas
    const api = 'src/js/fakeapi/cms-edit.json'

    export default {
        name: 'cms-edit',
        data () {
            return {
                loading:true,
                fetchError : '',
                modalSuccess: false,
                modalDelete: false,

                page: {
                    title: null,
                    content: null,
                    lang: null,
                    dateCreated: null,
                    dateUpdated: null,
                    published: null,
                    type: null,
                    id: null,
                    url: null,
                    slug: null,
                    meta: {
                        title: null,
                        description: null,
                        keywords: null
                    }
                },

                // Date Picket options : Flatpickr
                fpOptions: {
                    onValueUpdate : null,
                    enableTime: true,
                    enableSeconds: true,
                    dateFormat: "Y-m-d H:i:S",
                    altInput: true,
                    altFormat: "d.m.Y"
                },

                // Dropzone configuration
                dropzoneConf: {
                    headers: {'Token': '2343'},
                    useFontAwesome: true,
                    url: "https://httpbin.org/post",
                    thumbnailHeight: 250,
                    thumbnailWidth: 250,
                    acceptedFiles : "image/*, application/pdf",
                    addRemoveLinks: true,
                    maxFilesize: 1,
                    maxFiles: 2
                }

                // ,
                // options: [
                //     'undo redo | styleselect | bold italic | link image',
                //     'alignleft aligncenter alignright'
                // ]
            }
        },
        props : {
            id : null
        },
        // Meta tags in <head> section
        head: {
            title() {
                return {
                    inner: 'CMS edit page',
                    separator: '-',
                    complement: 'Made by ALPIXEL agency'
                }
            },
            meta() {
                return [
                ]
            }
        },
        validations: {
            page: {
                title: {
                    required,
                    maxLength: maxLength(255)
                },
                content: {

                },
                lang: {
                    required
                },
                dateCreated: {
                    required
                },
                dateUpdated: {
                    required
                },
                published: {
                    required
                },
                id: {
                    required,
                    numeric
                },
                url: {
                    required
                },
                slug: {
                    required
                },
                meta: {
                    title: {
                        required,
                        maxLength: maxLength(100),
                        minLength: minLength(50)
                    },
                    description: {
                        required,
                        maxLength: maxLength(200),
                        minLength: minLength(100)
                    },
                    keywords: {

                    }
                }
            }
        },
        watch: {
            // When route change but same component is called, launch "fetchData" method
            // for exemple : from "user/25" -> to -> "user/52"
            '$route' : 'fetchData'
        },
        computed: {
            fullUrl() {
                return this.page.url+'/<strong>'+this.page.slug+'</strong>'
            },
            uniqid() {
                return (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16)
            }

        },
        created () {
            this.fetchData()
        },
        methods: {
            fetchData () {

                // It's loading dude :)
                this.loading = true

                // Set var before fetching datas
                this.fetchError = null

                // API call with Axios
                Vue.axios.get(api, {
                    // params
                }).then(response => {

                    if(response.data.error) {

                        this.showError('data.error : JSON file return an error value')

                    } else {

                        this.loading = false
                        this.page = response.data.page[0]

                    }

                }).catch(error => {

                    this.showError('Error : JSON file not found OR error during fetching datas')

                })
            },

            showError(msg) {

                this.fetchError = msg
                this.loading = false
                this.page = []

            },

            submitForm () {

                // touch form validators
                this.$v.page.$touch()

                // If no errors
                if(!this.$v.page.$error) {

                    // show loading button
                    this.$refs.submitButton.classList.add('cc-loading')


                    // Update dateUpdated data
                    this.page.dateUpdated = moment(new Date()).format('YYYY-MM-DD H:m:s')

                    // Stringify datas
                    let toSave = JSON.stringify(this.page)
                    alert(toSave)


                    // SEND AJAX REQUEST FOR ADDING USER IN DATABASE
                    // when registration is done...
                    setTimeout(() => {
                        // ...remove loading button...
                        this.$refs.submitButton.classList.remove('cc-loading')

                        // ...show modal...
                        this.modalSuccess = true
                    },
                    2500)
                }
            },

            // When Title change, update slug to adapt it to the title
            slugify() {
                this.page.slug = this.$options.filters.sanitize(this.page.title)
            },

            // Delete a data
            deleteData() {

                // Loading btn
                this.$refs.btnDelete.classList.add('cc-loading')


                // SEND AJAX REQUEST FOR DELETING PAGE IN DATABASE
                // Below when succeed
                setTimeout(() => {

                    // Hide modal
                    this.modalDelete = false

                    // Redict to cms pages
                    this.$router.push({name: 'cms'})
                },
                2500)
            },



            // Dropzone success upload
            dropzoneSuccess (file) {
                console.log('Success: '+file)

            }
        },
        components: {
            Dropzone
        }
    }
</script>
