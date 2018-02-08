<template>
    <div>
        <div class="message-text" v-html="messageText"></div>
        <input type="text" class="" v-model="inputMessageText" @keydown.enter.prevent="sendMessage">
        <button class="button" @click="sendMessage">Send</button>
    </div>
</template>
<style lang="scss">
    .message-text {
        height: 400px;
        overflow: scroll;
        p {
            margin-bottom: 0;
        }
    }
</style>

<script>
export default {
    name: 'chat-messenger',
    props: [
        'socket',
    ],
    data() {
        return {
            inputMessageText: '',
            messageText: '',
            username: null,
        };
    },
    created() {
        this.username = this.$store.getters.username;
        this.socket.on('newMessage', (data) => {
            this.messageText += '<p><em>' + data.username + ':</em> ' + data.msg + '</p>';
        });
    },
    methods: {
        sendMessage() {
            if(this.inputMessageText) {
                this.socket.emit('sendMessage', this.inputMessageText);
                this.inputMessageText = '';
            }
        }
    }
}
</script>