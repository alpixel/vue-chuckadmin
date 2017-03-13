<template>
    <div class="form">

        <form @submit.prevent="submitForm">

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

    </div>
</template>

<script>
    import Vue from 'vue'
    import { alpha,alphaNum,and,between,email,maxLength,minLength,numeric,or,required,sameAs } from 'vuelidate/lib/validators'

    export default {
        name: 'admin-add',
        data () {
            return {
                // Inputs definitions
                user: {
                    lastname: null,
                    firstname: null,
                    email: null,
                    password: null,
                    confirmPassword: null
                }
            }
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

            // Submit form method
            submitForm(){

                // touch ALL form validators
                this.$v.user.$touch();

                // If no errors
                if(!this.$v.user.$error) {

                    // show loading button
                    this.$refs.submitButton.classList.add('cc-loading');

                    // Stringify user datas
                    let userToSave = JSON.stringify(this.user);
                    alert(userToSave)

                    // Send ajax request to save user
                    setTimeout( () => {
                        // when registration is done, remove loading button && show modal
                        this.$refs.submitButton.classList.remove('cc-loading');
                        
                        // Reset form inputs
                        this.user = {
                            lastname: null,
                            firstname: null,
                            email: null,
                            age: 0,
                            password: null,
                            confirmPassword: null
                        }

                        // Emit succes to parent for showing success modal
                        this.$emit('addAdminSuccess', true);

                    },2500);
                }
            }
        }
    }
</script>
