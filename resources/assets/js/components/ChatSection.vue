<template>
    <div class="row chat-container">
        <div class="columns">
            <tabs>
                <tab name="Message" :selected="true">
                    <chat-messenger :socket="socket"></chat-messenger>
                </tab>
                <!-- <tab name="User List">
                    <user-list :socket="socket"></user-list>
                </tab> -->
            </tabs>
        </div>
    </div>
</template>

<style lang="scss">
.chat-container {
    border: 1px solid grey;
}
</style>

<script>
import UserList from './ActiveUserList.vue';
import ChatMessenger from './ChatMessenger.vue';
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
import io from 'socket.io-client';

export default {
    name: 'chat-section',
    props: [
        'room',
    ],
    components: {
        UserList,
        ChatMessenger,
        Tabs,
        Tab,
    },
    data() {
        return {
            username: null,
            socket: null,
        };
    },
    mounted() {

    },
    created() {
        // console.log(process.env.PORT);
        console.log('connect');
        console.log(window.location.origin);
        this.socket = io.connect(window.location.origin + ':3000', {
            forceNew: true,
            secure: true,
            reconnect: true,
            rejectUnauthorized : false
        });
        console.log('connected?');
        this.socket.on('connect', () => {
            this.joinRoom();
        });
        this.$store.commit('room', this.room);
        this.username = window.username;
    },
    methods: {
        joinRoom() {
            // join the room to start receiving messages regardless of auth
            this.socket.emit('join', {room: this.room, username: this.username});
            // this.$socket.emit('join', this.room);
            // if user is authenticated
            if(this.username) {
                // store username in vuex to be used across components
                this.$store.commit('username', this.username);
            }
        }
    }
}
</script>
