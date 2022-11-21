var app = new Vue({
    el: '#app',
    data: {
        text: "",
        url : "https://www.mxnzp.com/api/daily_word/recommend?app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09&app_id=rgihdrm0kslojqvm"
    },
    mounted(){
        this.refresh()
    },
    methods: {
        refresh() {
            axios.get(this.url)
                .then(res => {
                    this.text =res.data.data[0].content
                })
                .catch(err => {
                    console.log('错误' + err)
                })
        }
    },

})
