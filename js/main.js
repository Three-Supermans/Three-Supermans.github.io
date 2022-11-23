

var app = new Vue({
    el: '#app',
    data: {
        text: "",
        url: "https://www.mxnzp.com/api/daily_word/recommend?app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09&app_id=rgihdrm0kslojqvm"
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
            axios.get(this.url)
                .then(res => {
                    this.text = res.data.data[0].content
                })
                .catch(err => {
                    console.log('错误' + err)
                })
        },

        async sendReqs() {
            console.log('JavaScript Graph Tutorial');
            let choice = 0;
            // Initialize Graph
            this.initializeGraph(settings);
            await this.greetUserAsync();

            const choices = [
                'Display access token',
                'List my inbox',
                'Send mail',
                'List users (requires app-only)',
                'Make a Graph call'
            ];

            while (choice !== -1) {
                choice = readline.keyInSelect(choices, 'Select an option', {cancel: 'Exit'});

                switch (choice) {
                    case -1:
                        // Exit
                        console.log('Goodbye...');
                        break;
                    case 0:
                        // Display access token
                        await displayAccessTokenAsync();
                        break;
                    case 1:
                        // List emails from user's inbox
                        await listInboxAsync();
                        break;
                    case 2:
                        // Send an email message
                        await sendMailAsync();
                        break;
                    case 3:
                        // List users
                        await listUsersAsync();
                        break;
                    case 4:
                        // Run any Graph code
                        await makeGraphCallAsync();
                        break;
                    default:
                        console.log('Invalid choice! Please try again.');
                }
            }
        },
        async greetUserAsync() {
            try {
                const user = await graphHelper.getUserAsync();
                console.log(`Hello, ${user?.displayName}!`);
                // For Work/school accounts, email is in mail property
                // Personal accounts, email is in userPrincipalName
                console.log(`Email: ${user?.mail ?? user?.userPrincipalName ?? ''}`);
            } catch (err) {
                console.log(`Error getting user: ${err}`);
            }
        },
        initializeGraph(settings) {
            graphHelper.initializeGraphForUserAuth(settings, (info) => {
                // Display the device code message to
                // the user. This tells them
                // where to go to sign in and provides the
                // code to use.
                console.log(info.message);
            });
        }
    }
})
