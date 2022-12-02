const App = {
    data() {
        return {
            cacheTime: 3600000,
            isLogged: false,
            todoInput: "",
            toDoListTableData: [
                {
                    finished: false,
                    content: 'ODP Live SOP late shift',
                },
                {
                    finished: false,
                    content: 'Fix the vulnerability of Spring framework in SRVADM',
                },
                {
                    finished: false,
                    content: '[SRVADM] New database table to store timestamp,SopId and userId',
                },
                {
                    finished: false,
                    content: 'integrate renovate bot for MOCKS',
                },
                {
                    finished: true,
                    content: 'integrate renovate bot for ECHO',
                },
            ],
        }
    },
    mounted() {
        if (window.location.href.includes("access_token")) {
            let token = window.location.href.split("=")[1].split("&")[0]
            console.log('外部进入：' + token)
            localStorage.setItem("lastTokenTime", new Date().valueOf().toString())
            localStorage.setItem("accessToken", token)
            this.isLogged = true
        }
    },
    methods: {

        handleSubmit() {
            if (localStorage.getItem("accessToken") == null || new Date().valueOf() - parseInt(localStorage.getItem("lastTokenTime")) > this.cacheTime) {
                window.open('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=44f6e5be-cecd-4c50-a615-3a2fb4b18b3e&scope=files.readwrite.all&response_type=token' +
                    '&redirect_uri=http://localhost:3000', '_self')
            }
        },
        logout() {
            localStorage.clear()
            this.isLogged = false
        },
        statusChange(index, preStatus) {
            this.toDoListTableData[index].finished = !preStatus
            this.toDoListTableData.sort(this.compareIfFinished)
        },
        compareIfFinished(a, b) {
            if (a.finished && !b.finished) {
                return 1
            } else if (b.finished && !a.finished) {
                return -1
            } else {
                return 0;
            }
        },
        addTodo() {
            this.toDoListTableData.unshift({
                finished: false,
                content: this.todoInput,
            })
            this.todoInput = ""
        },
    },

}
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
