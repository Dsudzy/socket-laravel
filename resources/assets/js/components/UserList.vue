<template>
    <div>
        <div>
            <ul v-for="user in userList">
                <li>{{ user }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user-list',
    data() {
        return {
            userList: '',
        };
    },
    sockets: {
        getUserList(data) {
            this.userList = data;
        }
    }
}
</script>