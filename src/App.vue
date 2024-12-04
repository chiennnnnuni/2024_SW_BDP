<template>
  <div class="video-background">
    <video autoplay loop muted>
      <source src="./assets/bg.mp4" type="video/mp4">
    </video>
    <MusicPlayer/>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue';

export default {
  components: {
    MusicPlayer
  }
}
</script>