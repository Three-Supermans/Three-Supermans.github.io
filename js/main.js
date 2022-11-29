const App = {
    data() {
        return {
            msg: '',
            cacheTime: 3600000,
        }
    },
    mounted() {
        if (window.location.href.includes("access_token")) {
            let token = window.location.href.split("=")[1].split("&")[0]
            console.log('外部进入：' + token)
            localStorage.setItem("lastTokenTime", new Date().valueOf().toString())
            localStorage.setItem("accessToken", JSON.stringify(token))
            this.msg = "Login succeeded. Your token is " + token
        }
    },
    methods: {

        handleSubmit() {
            if (localStorage.getItem("accessToken") == null || new Date().valueOf() - parseInt(localStorage.getItem("lastTokenTime")) > this.cacheTime) {
                window.open('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=44f6e5be-cecd-4c50-a615-3a2fb4b18b3e&scope=files.readwrite.all&response_type=token' +
                    '&redirect_uri=http://localhost:3000', '_self')
            } else {
                this.msg =  "You are already logged in"
            }
        },
        logout() {
            if (localStorage.getItem("accessToken") == null) {
                this.msg = "Please login first"
            } else {
                this.msg = "Log out successfully"
                localStorage.clear()
            }
        },
    },

}
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
