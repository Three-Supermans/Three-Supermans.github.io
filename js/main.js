const App = {
    data() {
        return {
            cacheTime: 3600000,
            isLogged: false,
            todoInput: "",
            context: "https://graph.microsoft.com/v1.0",
            getTodoListPath: "/me/todo/lists/",
            getTasksPath: "/tasks/",
            todoList: [],
            toDoListTableData: [],
            currentListId:"",
        }
    },
    mounted() {

        if (window.location.href.includes("access_token")) {
            let token = decodeURIComponent(window.location.href).split("=")[1].split("&")[0]
            localStorage.setItem("lastTokenTime", new Date().valueOf().toString())
            localStorage.setItem("accessToken", token)
            this.isLogged = true

            this.refreshTodoList()
        }
    },
    methods: {

        handleSubmit() {
            if (localStorage.getItem("accessToken") == null || new Date().valueOf() - parseInt(localStorage.getItem("lastTokenTime")) > this.cacheTime) {
                window.open('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=44f6e5be-cecd-4c50-a615-3a2fb4b18b3e&scope=Tasks.ReadWrite&response_type=token' +
                    '&redirect_uri=http://localhost:3000', '_self')
            }
        },
        logout() {
            localStorage.clear()
            this.isLogged = false
        },
        statusChange(index) {
            //调api改status
            let that = this
            let taskId = this.toDoListTableData[index].id
            let todoListId = this.currentListId
            let taskStatus
            if (this.toDoListTableData[index].status == "completed") {
                taskStatus = "notStarted"
            } else {
                taskStatus = "completed"
            }
            axios.patch(this.context + this.getTodoListPath + todoListId + this.getTasksPath + taskId,
                {
                    status: taskStatus
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                        "Content-Type": "application/json"
                    },

                }).then(res => {
                that.getTasksById(todoListId)
                that.toDoListTableData.sort(this.compareIfFinished)
            }).catch(err => {
                console.log('错误' + err)
            })
        },
        compareIfFinished(a, b) {
            if (a.status == "completed" && b.status !== "completed") {
                return 1
            } else if (b.status == "completed" && a.status !== "completed") {
                return -1
            } else {
                return 0;
            }

        },
        addTodo() {
            let that = this
            axios.post(this.context + this.getTodoListPath + this.currentListId + this.getTasksPath, {
                status: "notStarted",
                title: that.todoInput
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then(res => {
                this.getTasksById(this.currentListId)
                this.todoInput = ""
            }).catch(err => {
                console.log('错误' + err)
            })
        },
        refreshTodoList() {
            let that = this
            that.menuList = []
            axios.get(this.context + this.getTodoListPath, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then(res => {
                that.todoList = res.data.value
                if (Array.isArray(res.data.value) && res.data.value.length) {
                    that.getTasksById(res.data.value[0].id)
                }
            }).catch(err => {
                console.log('错误' + err)
            })
        },
        getTasksById(listId) {
            let that = this
            that.currentListId = listId
            axios.get(this.context + this.getTodoListPath + listId + this.getTasksPath, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then(res => {
                that.toDoListTableData = res.data.value
                this.toDoListTableData.sort(this.compareIfFinished)
            }).catch(err => {
                console.log('错误' + err)
            })
        }
    },

}
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
