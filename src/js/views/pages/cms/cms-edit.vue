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
                                <span v-if="$route.params.id">
                                    Edit
                                </span>
                                <span v-else>
                                    Create
                                </span>
                                CMS page <span v-if="page.title">: "{{ page.title | truncate(50) }}"</span>
                            </h1>
                            <div class="cc-w-auto cc-right">
                                <router-link class="btn cc-bg-green fa-angle-left" :to="{name : 'cms'}">Back to CMS pages</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cc-inside">

                    <!-- FORM -->
                    <form @submit.prevent="submitForm" class="form-large">

                        <div class="columns">
                            <div class="cc-12 cc-9-l">

                                <!-- PAGE CONTENT -->
                                <div class="boxed">
                                    <h3>Page content</h3>

                                    <!-- TITLE -->
                                    <div class="form-item" :class="{ 'error': $v.page.title.$error }">
                                        <label class="block">
                                            Title

                                            <div class="pull-right form-checkbox">
                                                <label>
                                                    <input type="checkbox" name="autoSlug" v-model="autoSlug" />
                                                    Auto-fill slug ?
                                                </label>
                                            </div>
                                            <div class="clearfix"></div>

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

                                        <tinymce
                                            textareaId="text1"
                                            v-model="page.content"
                                            :content="page.content"
                                            @input="$v.page.content.$touch()">
                                        </tinymce>

                                        <span class="warning" v-if="!$v.page.content.required">
                                            Field is required
                                        </span>
                                    </div>

                                    <!-- BODY2 -->
                                    <div class="form-item" :class="{ 'error': $v.page.content2.$error }">
                                        <label class="block">
                                            Body 2
                                        </label>

                                        <tinymce
                                            textareaId="text2"
                                            v-model="page.content2"
                                            :content="page.content2"
                                            @input="$v.page.content2.$touch()">
                                        </tinymce>
                                    </div>


                                    <!-- IMAGES - DROPZONE -->
                                    <div class="form-item">
                                        <label class="block cc-mab-10">
                                            Images
                                            <span class="pull-right badge cc-bg-red">
                                                ({{dzOptions.maxFiles}} files max - {{dzOptions.maxFilesize}}Mo max. / file)
                                            </span>
                                            <div class="clearfix"></div>
                                        </label>

                                        <dropzone
                                            :id="'dropzone1'"
                                            :url="dzOptions.url"
                                            :dz-options="dzOptions"
                                            :dz-medias="page.media"
                                            >
                                        </dropzone>
                                    </div>
                                </div>

                            </div>
                            <div class="cc-12 cc-3-l">

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

                                        <Flatpickr
                                            :options="fpOptions"
                                            v-model.trim="page.dateCreated"
                                            @input="$v.page.dateCreated.$touch()"
                                        />

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
                                    <div class="form-item" :class="{ 'error': $v.page.metatitle.$error }">
                                        <label class="block">Meta title ({{ $v.page.metatitle.$params.minLength.min }}-{{ $v.page.metatitle.$params.maxLength.max }} caract.)</label>
                                        <input type="text" v-model.trim="page.metatitle" @input="$v.page.metatitle.$touch()" />
                                        <span class="warning" v-if="!$v.page.metatitle.required">
                                            Field is required
                                        </span>
                                        <span class="warning" v-if="!$v.page.metatitle.maxLength">
                                            Can not be longer than {{ $v.page.metatitle.$params.maxLength.max }} letters.
                                        </span>
                                        <span class="warning" v-if="!$v.page.metatitle.minLength">
                                            Can not be shorter than {{ $v.page.metatitle.$params.minLength.min }} letters.
                                        </span>
                                    </div>

                                    <!-- META DESCRIPTION -->
                                    <div class="form-item" :class="{ 'error': $v.page.metadescription.$error }">
                                        <label class="block">Meta description ({{ $v.page.metadescription.$params.minLength.min }}-{{ $v.page.metadescription.$params.maxLength.max }} caract.)</label>
                                        <textarea v-model.trim="page.metadescription" @input="$v.page.metadescription.$touch()"></textarea>
                                        <span class="warning" v-if="!$v.page.metadescription.required">
                                            Field is required
                                        </span>
                                        <span class="warning" v-if="!$v.page.metadescription.maxLength">
                                            Can not be longer than {{ $v.page.metadescription.$params.maxLength.max }} letters.
                                        </span>
                                        <span class="warning" v-if="!$v.page.metadescription.minLength">
                                            Can not be shorter than {{ $v.page.metadescription.$params.minLength.min }} letters.
                                        </span>
                                    </div>

                                    <!-- META KEYWORDS -->
                                    <div class="form-item" :class="{ 'error': $v.page.metakeywords.$error }">
                                        <label class="block">Meta keywords (spaced with comas)</label>
                                        <textarea v-model.trim="page.metakeywords" ></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- Check form errors -->
                            <div class="cc-12" v-if="$v.page.$error">
                                <div class="boxed">
                                    <p>
                                        <strong>Please check the following fields before saving the page :</strong>
                                    </p>

                                    <p class="cc-pat-10">
                                        <span :class="[$v.page.title.$error ? 'cc-bg-red' : 'cc-bg-green', 'badge']">
                                            <i :class="[$v.page.title.$error ? 'fa-times' : 'fa-check']"></i> Page Title
                                        </span>
                                        <span :class="[$v.page.content.$error ? 'cc-bg-red' : 'cc-bg-green', 'badge']">
                                            <i :class="[$v.page.content.$error ? 'fa-times' : 'fa-check']"></i> Body
                                        </span>
                                        <span :class="[$v.page.lang.$error ? 'cc-bg-red' : 'cc-bg-green', 'badge']">
                                            <i :class="[$v.page.lang.$error ? 'fa-times' : 'fa-check']"></i> Lang
                                        </span>
                                        <span :class="[$v.page.slug.$error ? 'cc-bg-red' : 'cc-bg-green', 'badge']">
                                            <i :class="[$v.page.slug.$error ? 'fa-times' : 'fa-check']"></i> Slug
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <!-- SUBMIT -->
                            <div class="cc-12">
                                <div class="boxed columns">
                                    <div>
                                        <button type="submit" ref="submitButton" class="fa-save cc-bg-primary" :class="[$v.page.$error ? 'cc-disabled' : '']">Save</button>
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
                                <div class="alert alert-success fa-thumbs-up">
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
    import Dropzone from '../../../components/dropzone.vue'
    import tinymce from '../../../components/tinymce.vue'


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
                autoSlug: true,

                // All page fields & datas
                page: {
                    id: null,
                    lang: null,
                    type: 'cms',
                    dateCreated: moment(new Date()).format('YYYY-MM-DD H:m:s'),
                    dateUpdated: null,
                    title: null,
                    published: false,
                    url: 'http://www.google.com',
                    slug: '',
                    media: [],
                    content: '',
                    content2: '',
                    metatitle: null,
                    metadescription: null,
                    metakeywords: null,
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

                // Dropzone options
                dzOptions: {
                    headers: {'Token': '2343'},
                    url: "https://httpbin.org/post",
                    thumbnailHeight: 200,
                    thumbnailWidth: 200,
                    acceptedFiles : "image/*, application/pdf",
                    addRemoveLinks: true,
                    maxFilesize: 1,
                    maxFiles: 3,
                    language: {
                    },
                    previewTemplate: `
                        <div class="dz-preview dz-file-preview">
                            <div class="dz-image">
                                <img data-dz-thumbnail />
                            </div>
                            <div class="dz-progress">
                                <span class="dz-upload" data-dz-uploadprogress></span>
                            </div>
                            <div class="dz-error-message">
                                <span data-dz-errormessage></span>
                            </div>
                            <div class="dz-success-mark"></div>
                            <div class="dz-error-mark"></div>
                        </div>`
                }
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
            }
        },
        validations: {
            page: {
                id: {},
                type: {},
                lang: {
                    required
                },
                dateCreated: {
                    required
                },
                dateUpdated: {
                    required
                },
                title: {
                    required,
                    maxLength: maxLength(255)
                },
                published: {
                    required
                },
                url: {},
                slug: {
                    required
                },
                media: {},
                content: {
                    required
                },
                content2: {},
                metatitle: {
                    maxLength: maxLength(100),
                    minLength: minLength(50)
                },
                metadescription: {
                    maxLength: maxLength(200),
                    minLength: minLength(100)
                },
                metakeywords: {
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
            }
        },
        created () {
            // If created page (no ID in $router.params)
            if(_.isUndefined(this.$route.params.id)) {

                this.loading = false

            } else {

                // Load CMS page
                this.fetchData()

            }
        },
        methods: {
            uniqid() {
                return Math.floor((Math.random()*9999999)*1234)
            },

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
                this.page = {}
            },

            submitForm () {

                // page.dateUpdated data
                this.page.dateUpdated = moment(new Date()).format('YYYY-MM-DD H:m:s')


                // touch form validators
                this.$v.page.$touch()

                // If no errors
                if(!this.$v.page.$error) {

                    // show loading button
                    this.$refs.submitButton.classList.add('cc-loading')


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
                if(this.autoSlug)
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
            }

        },
        components: {
            Dropzone,
            tinymce
        }
    }
</script>
