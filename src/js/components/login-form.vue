<template>
	<form @submit.prevent="submitForm" class="boxed form">
        
        <h1 class="cc-txt-center">Sign In</h1>

        <div class="alert alert-error" v-if="error">
            Error in login or password!
        </div>

        <div class="form-item" :class="{ 'error': $v.login.loginInput.$error }">
            <div class="form-ps">
                <span><i class="ion-ios-contact-outline"></i> Login</span>
                <input type="text" v-model.trim="login.loginInput" placeholder="..." @input="$v.login.loginInput.$touch()" />
            </div>

            <span class="warning" v-if="!$v.login.loginInput.minLength">
                Name must have at least {{$v.login.loginInput.$params.minLength.min}} letters.
            </span>
            <span class="warning" v-if="!$v.login.loginInput.required">
                Field is required
            </span>
        </div>

        <div class="form-item" :class="{ 'error': $v.login.loginPass.$error }">
            <div class="form-ps">
                <span><i class="ion-ios-locked-outline"></i> Pass.</span>
                <input type="password" v-model.trim="login.loginPass" placeholder="..." @input="$v.login.loginPass.$touch()" />
            </div>

            <span class="warning" v-if="!$v.login.loginPass.minLength">
                Name must have at least {{$v.login.loginPass.$params.minLength.min}} letters.
            </span>
            <span class="warning" v-if="!$v.login.loginPass.required">
                Field is required
            </span>
        </div>

        <div class="form-item">
            <div class="form-checkbox">
                <label>
                    <input type="checkbox" name="remember" value="1" v-model="login.loginRemember" />
                    Remember me
                </label>
            </div>
        </div>

        <button type="submit" ref="submitButton">Sign In</button>
    </form>


</template>

<script>
	import Vue from 'vue'
    import { minLength,required } from 'vuelidate/lib/validators'

    const api = 'https://randomuser.me/api/?results=1&nat=fr'

	export default {
		name: 'header',
        data() {
            return {
                login: {
                    loginInput: null,
                    loginPass: null,
                    loginRemember: null
                },
                error : false
            }
        },
        validations: {
            login: {
                loginInput: {
                    required,
                    minLength: minLength(4)
                },
                loginPass: {
                    required,
                    minLength: minLength(4)
                }
            }
        },
        methods: {
            submitForm() {

                // touch form validators
                this.$v.login.$touch()

                // If no errors
                if(!this.$v.login.$error) {

                    // show loading button
                    this.$refs.submitButton.classList.add('cc-loading')

                
                    // Launch Ajax login request    
                    setTimeout(() => {

                        // Ajax
                        Vue.axios.get(api, {
                            // params
                        }).then(response => {

                            // Si case rememberme is checked
                            if(this.login.loginRemember) {
                                this.$cookie.set('appLogged', 'ef9d0f5b727e98e187a225c4e4e67d1f', 1);
                            }

                            // ...remove loading button...
                            this.$refs.submitButton.classList.remove('cc-loading')

                            // ...emit login event...
                            this.$emit('login', response.data.results[0])

                            // ...reset this.login inputs values...
                            this.login = {
                                loginInput: null,
                                loginPass: null,
                                loginRemember: null
                            }

                        }).catch(error => {

                            // ...remove loading button...
                            this.$refs.submitButton.classList.remove('cc-loading')

                            // ...show error message...
                            this.error = true

                            // ...reset this.login inputs values...
                            this.login = {
                                loginInput: null,
                                loginPass: null,
                                loginRemember: null
                            }

                        })
                    },
                    500)
                    
                }

                
            }
        }
	}

</script>