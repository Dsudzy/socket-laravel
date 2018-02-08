<template>
    
</template>

<script>
export default {
    data() {
        return {
            user: null
        };
    },
    props: [
        'page_name',
        'socket',
    ],
    created() {
        this.user_id = window.user_id;
        this.fetchActiveUsers();
        this.registerActiveUser();
        setInterval(function() {
            this.registerActiveUser();
        }, 5000);
        setInterval(function() {
            this.fetchActiveUsers();
        }, 5000);
    },
    methods: {
        registerActiveUser() {
            axios.post('/register-active-user', {
                user: this.user,
                page_name: this.page_name
            })
            .then((response) => {
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        fetchActiveUsers() {
            axios.get('/active-user-list?page_name=' + this.page_name)
            .then((response) => {
                
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    }
}
</script>