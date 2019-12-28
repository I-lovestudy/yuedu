<template>
    <div id="app">
        <topnav></topnav>
        <div class="main clear-float">
            <router-view></router-view>
        </div>
        <footerinfo></footerinfo>
    </div>
</template>
<script>
import topnav from "./components/TopNav";

import footerinfo from "./components/FooterInfo";

export default {
    components: {
        topnav,
        footerinfo
    }
};
</script>
<style>
</style>
