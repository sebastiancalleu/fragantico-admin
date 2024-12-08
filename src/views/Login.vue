<script>
    import { GoogleAuthProvider, getRedirectResult, signInWithPopup, signInWithRedirect, getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { mapActions } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';

    const provider = new GoogleAuthProvider();

    export default {
    data() {
        return {
            signView: 'SignIn',
            loading: true,
            loginStatus: null,
            username: null,
            password: null,
        }
    },
    async mounted() {
        this.validateSession();
        const auth = getAuth();
        const result = await getRedirectResult(auth);
        console.log(auth)

        console.log(result);
        if (result) {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            await this.loginUserProvider(credential.idToken, result.user.uid);
        }
        setTimeout(() => {
            this.loading = false
        }, 1000)
    },
    methods: {
        async loginWithGoogleProvider() {
            const auth = getAuth();
            await signInWithRedirect(auth, provider);
        },
        async validateSession() {
            const authToken = localStorage.getItem('DSauthToken22')
            if (authToken) {
                const validationResult = await this.validateUser(authToken);
                if (validationResult === 'success') {
                    this.$router.push('/Dashboard')
                }
            }
        },
        async loginEmailAndPassword() {
            if (this.username && this.password) {
                console.log(this.username, this.password)
                const auth = getAuth();
                this.loginStatus = await signInWithEmailAndPassword(auth, this.username, this.password)
            }

            console.log(this.loginStatus)

            if (this.loginStatus.status !== 'success') {
                this.error = true;
            }
        },
        setLoginView(view) {
            this.signView = view;
        },
        ...mapActions(useGlobalStore, ['setUsername', 'validateUser', 'loginUserProvider'])
    },
}
</script>

<template>
    <div class="login">
        <div v-if="loading" class="login__spinner">
            <span class="loader"></span>
        </div>
        <div v-else class="login__card">
            <div class="login__message">
                <div class="login__logo">
                </div>
                <div class="welcome__mesagge">
                    <h4 class="login__header">Admin</h4>
                    <h1 class="login__header">Fragantico</h1>
                </div>
                <div class="login__disclaimer">
                </div>
                <div class="userdata__container">
                    <input class="data__input" type="text" placeholder="Email" v-model="username">
                </div>
                <div class="userdata__container">
                    <input class="data__input" type="text" placeholder="Password" v-model="password">
                </div>
                <!-- <div v-if="this.error" class="error__container">
                    <h5> {{ errorMessages[loginStatus.code] }}</h5>
                </div> -->
                <div class="login__submit">
                    <button @click="loginEmailAndPassword()">Login</button>
                </div>
                <!-- <div class="login__submit">
                    <button class="google__loging" @click="loginWithGoogleProvider()">
                        <img class="google__logo" src="../assets/logos/pngwing.com.png" width="30" alt="google-logo">
                        &nbsp;Continuar con Google
                    </button>
                </div> -->
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #535981;
        background-size: cover;
        filter: grayscale(10%);
        height: 100vh;
        .login__card {
            border-radius: 20px;
            height: 25rem;
            width: 25rem;
            display: flex;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            .login__message {
                background-color: rgb(255 255 255 / 0.15);
                backdrop-filter: blur(20px);
                background-blend-mode: overlay;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                padding: 3rem;
                flex: 1;
                border-radius: 30px;
                .welcome__mesagge {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .login__disclaimer {
                    color: white;
                    margin-top: auto;
                    font-size: 11px;
                }
                .login__header {
                    margin: 0;
                    color: white;
                }
                h1 {
                    font-size: 45px;
                }
                .login__submit {
                    width: 100%;
                    button {
                        margin: 1rem 0;
                        background-color: #646DAB; /* Green */
                        border: 1px solid darkgray;
                        border-radius: 10px;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        font-weight: bold;
                        width: inherit;
                        max-height: 3rem;
                        cursor: pointer;
                        &:active {
                            font-size: 12px;
                            padding: 17px 37px;
                        }
                    }
                    .google__loging {
                        background-color: white;
                        color: black;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                    }
                }
                .google__logo {
                    cursor: pointer;
                    &:active {
                        width: 35px;
                    }
                }
                .data__input {
                    background-color: rgb(250, 250, 250);
                    width: 100%;
                    box-sizing: border-box;
                    border: none;
                    border-left: 5px solid black;
                    font-size: 16px;
                    padding: 12px 10px 12px 10px;
                    margin-bottom: 2rem;
                    border-radius: 4px;
                    &:focus-visible {
                        outline: none;
                        border: 2px solid #2C8FFF;
                        border-radius: 10px;
                    }

                }
            }
            .login__data {
                background-color: rgb(255 255 255 / 0.15);
                backdrop-filter: blur(20px);
                background-blend-mode: overlay;
                border-radius: 0px 30px 30px 0px;
                padding: 2rem 3rem;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .login__view__switcher {
                    color: white;
                    width: 60%;
                    margin-top: 2rem;
                    align-self: center;
                    justify-content: space-around;
                    display: flex;
                    cursor: pointer;
                    .active {
                        border-bottom: solid 1px white;
                    }
                    h3 {
                        &:active {
                            font-size: 20px;
                        }
                    }

                }
            }
            @media only screen and (max-width: 900px) {
                width: 95vw;
                .login__message {
                    display: none;
                }
                .login__data {
                    width: 95vw;
                    border-radius: 30px;
                }
            }
        }
        .login__spinner {
            border-radius: 30px;
            height: 40rem;
            width: 60rem;
            background-color: rgb(255 255 255 / 0.1);
            backdrop-filter: blur(20px);
            background-blend-mode: overlay;
            display: flex;
            justify-content: center;
            align-items: center;
            .loader {
                width: 88px;
                height: 88px;
                border-radius: 50%;
                display: inline-block;
                border-top: 4px solid #FFF;
                border-right: 4px solid transparent;
                box-sizing: border-box;
                animation: rotation 1s linear infinite;
            }
            .loader::after {
                content: '';  
                box-sizing: border-box;
                position: absolute;
                left: 0;
                top: 0;
                width: 88px;
                height: 88px;
                border-radius: 50%;
                border-left: 4px solid #535981;
                border-bottom: 4px solid transparent;
                animation: rotation 0.5s linear infinite reverse;
            }
            @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
            } 
        }
    }
</style>
