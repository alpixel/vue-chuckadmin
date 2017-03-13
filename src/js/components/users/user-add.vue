<template>
    <div class="form">
        <div class="cc-loader" v-if="loading">
          <div class="spinner"></div>
        </div>

        <div v-else>

            <div class="top-page">
                <div class="cc-inside">
                    <div class="columns">
                        <h1>
                            Add a new Users 
                        </h1>
                        <div class="cc-w-auto cc-right">
                            <router-link class="btn cc-bg-green fa-angle-left" :to="{name : 'users'}">Back to users</router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cc-inside">
                <form @submit.prevent="submitForm" class="boxed">

                    <div class="form-item cc-txt-center" :class="{ 'error': $v.user.lastname.$error }">
                        <label class="block">Last Name</label>
                        <input type="text" name="lastname" v-model.trim="user.lastname" @input="$v.user.lastname.$touch()" />

                        <span class="warning" v-if="!$v.user.lastname.minLength">
                            Name must have at least {{$v.user.lastname.$params.minLength.min}} letters.
                        </span>
                        <span class="warning" v-if="!$v.user.lastname.required">
                            Field is required
                        </span>
                    </div>
                    <!-- <pre>{{$v.user.lastname}}</pre> -->


                    <div class="form-item cc-txt-center" :class="{ 'error': $v.user.firstname.$error }">
                        <label class="block">First Name</label>
                        <input type="text" name="firstname" v-model.trim="user.firstname" @input="$v.user.firstname.$touch()" />
                        
                        <span class="warning" v-if="!$v.user.firstname.minLength">
                            Name must have at least {{$v.user.firstname.$params.minLength.min}} letters.
                        </span>
                        <span class="warning" v-if="!$v.user.firstname.required">
                            Field is required
                        </span>
                    </div>
                    <!-- <pre>{{$v.user.firstname}}</pre> -->


                    <div class="form-item cc-txt-center" :class="{ 'error': $v.user.age.$error }">
                        <label class="block">Age</label>
                        <input type="number" name="age" v-model.trim="user.age" @blur="$v.user.age.$touch()" />
                        
                        <span class="warning" v-if="!$v.user.age.between">
                            Must be between {{$v.user.age.$params.between.min}} and {{$v.user.age.$params.between.max}}
                        </span>
                    </div>
                    <!-- <pre>{{$v.user.age}}</pre> -->


                    <div class="form-item cc-txt-center" :class="{ 'error': $v.user.email.$error }">
                        <label class="block">Email</label>
                        <input type="email" name="email" v-model.trim="user.email" @input="$v.user.email.$touch()" />
                        
                        <span class="warning" v-if="!$v.user.email.email">
                            Must be an email format "@"
                        </span>
                        <span class="warning" v-if="!$v.user.email.required">
                            Field is required
                        </span>
                    </div>
                    <!-- <pre>{{$v.user.email}}</pre> -->

                    <div class="form-item cc-txt-center" :class="{ 'error': $v.user.password.$error }">
                        <label class="block">Password</label>
                        <input type="password" name="password" v-model.trim="user.password" @input="$v.user.password.$touch()" />
                        
                        <span class="warning" v-if="!$v.user.password.required">
                            This field is required
                        </span>
                        <span class="warning" v-if="!$v.user.password.minLength">
                            Name must have at least {{$v.user.password.$params.minLength.min}} letters.
                        </span>
                    </div>
                    <!-- <pre>{{$v.user.password}}</pre> -->

                    <div class="form-item cc-txt-center" :class="{ 'error': $v.user.confirmPassword.$error }">
                        <label class="block">Confirm password</label>
                        <input type="password" name="confirmPassword" v-model.trim="user.confirmPassword" @input="$v.user.confirmPassword.$touch()" />

                        <span class="warning" v-if="!$v.user.confirmPassword.required">
                            This field is required
                        </span>
                        <span class="warning" v-if="!$v.user.confirmPassword.sameAsPassword">
                            Must be identical to Password field
                        </span>
                        <span class="warning" v-if="!$v.user.confirmPassword.minLength">
                            Name must have at least {{$v.user.confirmPassword.$params.minLength.min}} letters.
                        </span>
                    </div>
                    <!-- <pre>{{$v.user.confirmPassword}}</pre> -->

                    
                    <div class="cc-txt-center">
                        <button type="submit" class="fa-save" ref="submitButton">Save</button>
                    </div>
                    

                    <!-- <pre>{{$v.user}}</pre> -->
                </form>

                <!-- MODAL SHOWN WHEN USER IS CREATED -->
                <div :class="[{'active' : modalUserSuccess}, 'modal']">
                    <!-- Close button -->
                    <button class="modal-close" @click="modalUserSuccess = false"></button>
                    <!-- Overlay -->
                    <div class="modal-overlay" @click="modalUserSuccess = false"></div>
                    <!-- Modal content -->
                    <div class="modal-content">
                        <div class="modal-header">
                            Registration success
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-info fa-thumbs-up">
                                User registered with success
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { alpha,alphaNum,and,between,email,maxLength,minLength,numeric,or,required,sameAs } from 'vuelidate/lib/validators'


    export default {
        name: 'user-add',
        data () {
            return {
                // Is the page loading ?
                loading:true,

                // Modal when user is created with success
                modalUserSuccess: false,
                
                // Inputs definitions
                user: {
                    lastname: null,
                    firstname: null,
                    email: null,
                    age: 0,
                    password: null,
                    confirmPassword: null
                }

            }
        },
        created () {
            this.loading = false;
        },
        validations: {
            user: {
                lastname: {
                    required,
                    minLength: minLength(4)
                },
                firstname: {
                    required,
                    minLength: minLength(4)
                },
                email: {
                    required,
                    email
                },
                age: {
                    between: between(18, 99)
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
                confirmPassword: {
                    required,
                    minLength: minLength(6),
                    sameAsPassword: sameAs('password')
                }
            }
        },
        watch: {
            // When route change but same component is called, launch "fetchData" method
            // for exemple : from "user/25" -> to -> "user/52"
            '$route' : 'fetchData'
        },
        methods: {
            submitForm(){

                // touch form validators
                this.$v.user.$touch();

                // If errors
                if(!this.$v.user.$error) {

                    // show loading button
                    this.$refs.submitButton.classList.add('cc-loading');

                    // Stringify user datas
                    let userToSave = JSON.stringify(this.user);
                    alert(userToSave)


                    // SEND AJAX REQUEST FOR ADDING USER IN DATABASE
                    // when registration is done...
                    setTimeout(() => {
                        // ...remove loading button...
                        this.$refs.submitButton.classList.remove('cc-loading');

                        // ...show modal...
                        this.modalUserSuccess = true;

                        // ...reset this.user values...
                        this.user = {
                            lastname: null,
                            firstname: null,
                            email: null,
                            age: 0,
                            password: null,
                            confirmPassword: null
                        }
                    },
                    2500)
                    
                }
            }
        }
    }
</script>
