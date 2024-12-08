<script>
    import { mapActions, mapState } from 'pinia';
    import { useGlobalStore } from '../stores/globalStore';
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase/firebase';
    import Header from '@/components/Header.vue';

    export default {
    data() {
        return {
        }
    },
    components: {
        Header,
    },
    computed: {
        displayUsername() {
            return this.username.includes('@')
                ? this.username.split('@')[0]
                : this.username
        },
        ...mapState(useGlobalStore, ['username'])
    },
    methods: {
        signOutm() {
            signOut(auth)
        },
    },
    async created() {
    }
}
</script>

<template>
    <div class="dashboard">
        <Header />
        <div class="dashboard__body">
            <div class="body__main">
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">

.dashboard {
    display: flex;
    flex-direction: column;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    .dashboard__body {
        display: flex;
        flex-direction: row;
    }
}



</style>
