<template>
  <div class="wrapper" id="music">
    <div class="title">- <span class="title-spacing">今日的</span>BGM -</div>
    <div class="player">
      <!-- 圖片 & 控制按鈕 -->
      <div class="player__top">
        <!-- 圖片 -->
        <div class="player-cover">
          <div class="player-cover__item" :style="{ backgroundImage: `url(${currentTrack.cover})`}">
            <img :src="currentTrack.cover"/>
          </div>
        </div>
        <!-- 控制按鈕 -->
        <div class="player-controls">
          <div class="player-controls__item" :class="{ active : liked }" @click="liked = !liked">
            <svg class="icon">
              <use xlink:href="#icon-heart-o"></use>
            </svg>
          </div>
          <div class="player-controls__item active" @click="shuffleMode = !shuffleMode">
            <svg class="icon">
              <use xlink:href="#icon-shuffle" v-if="shuffleMode"></use>
              <use xlink:href="#icon-repeat-1" v-else></use>
            </svg>
          </div>
          <div class="player-controls__item" :style="{'opacity': preTrackBtnStyle}" @click="playPrevTrack">
            <svg class="icon">
              <use xlink:href="#icon-prev"></use>
            </svg>
          </div>
          <div class="player-controls__item" @click="nextRandomTrack">
            <svg class="icon">
              <use xlink:href="#icon-next"></use>
            </svg>
          </div>
          <div class="player-controls__item -xl" @click="togglePlay">
            <svg class="icon">
              <use xlink:href="#icon-pause" v-if="isPlaying"></use>
              <use xlink:href="#icon-play" v-else></use>
            </svg>
          </div>
        </div>
      </div>
      <!-- 曲目資訊 -->
      <div class="album-info">
        <div class="album-info__title">
          <span v-if="currentTrack.limited" class="badge">{{ currentTrack.limited }}限定
          </span>{{ currentTrack.title || '--'}}
        </div>
        <div class="album-info__subTitle">{{ currentTrack.subTitle || '--' }}
          <a v-if="currentTrack.link" :href="currentTrack.link" target="_blank" style="color: inherit;">
            <svg class="icon" style="margin-bottom: -2px;">
              <use xlink:href="#icon-link"></use>
            </svg>
          </a>
        </div>
      </div>
      <!-- 進度條 -->
      <div class="progress" ref="progress">
        <div class="progress__duration">{{ duration }}</div>
        <div class="progress__bar" @click="clickProgress">
          <div class="progress__current active" :style="{ width : barWidthPercent }"></div>
        </div>
        <div class="progress__time">{{ currentTime }}</div>
      </div>
    </div>
    <div class="footer">
      <div>Inspired by
        <a href="https://github.com/itanand/mini-music-player" target="_blank" class="footer-link">itanand</a>.
      </div>
      <div>Background from
        <a href="https://www.vecteezy.com/video/2017224-small-particles-and-stars-moving-on-galaxy" target="_blank" class="footer-link">Vecteezy</a>.
      </div>
    </div>
  </div>
  <!-- svg 模板 -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="icon-heart-o" viewBox="0 0 32 32">
        <title>like</title>
        <path
          d="M22.88 1.952c-2.72 0-5.184 1.28-6.88 3.456-1.696-2.176-4.16-3.456-6.88-3.456-4.48 0-9.024 3.648-9.024 10.592 0 7.232 7.776 12.704 15.072 17.248 0.256 0.16 0.544 0.256 0.832 0.256s0.576-0.096 0.832-0.256c7.296-4.544 15.072-10.016 15.072-17.248 0-6.944-4.544-10.592-9.024-10.592zM16 26.56c-4.864-3.072-12.736-8.288-12.736-14.016 0-5.088 3.040-7.424 5.824-7.424 2.368 0 4.384 1.504 5.408 4.032 0.256 0.608 0.832 0.992 1.472 0.992s1.248-0.384 1.472-0.992c1.024-2.528 3.040-4.032 5.408-4.032 2.816 0 5.824 2.304 5.824 7.424 0.064 5.728-7.808 10.976-12.672 14.016z">
        </path>
        <path
          d="M16 30.144c-0.32 0-0.64-0.096-0.896-0.256-7.296-4.576-15.104-10.048-15.104-17.344 0-7.008 4.576-10.688 9.12-10.688 2.656 0 5.152 1.216 6.88 3.392 1.728-2.144 4.224-3.392 6.88-3.392 4.544 0 9.12 3.68 9.12 10.688 0 7.296-7.808 12.768-15.104 17.344-0.256 0.16-0.576 0.256-0.896 0.256zM9.12 2.048c-4.448 0-8.928 3.616-8.928 10.496 0 7.168 7.744 12.64 15.008 17.152 0.48 0.288 1.12 0.288 1.568 0 7.264-4.544 15.008-9.984 15.008-17.152 0-6.88-4.48-10.496-8.928-10.496-2.656 0-5.088 1.216-6.816 3.392l-0.032 0.128-0.064-0.096c-1.696-2.176-4.192-3.424-6.816-3.424zM16 26.688l-0.064-0.032c-3.808-2.4-12.768-8.032-12.768-14.112 0-5.152 3.072-7.52 5.952-7.52 2.432 0 4.48 1.536 5.504 4.096 0.224 0.576 0.768 0.928 1.376 0.928s1.152-0.384 1.376-0.928c1.024-2.56 3.072-4.096 5.504-4.096 2.848 0 5.952 2.336 5.952 7.52 0 6.080-8.96 11.712-12.768 14.112l-0.064 0.032zM9.12 5.248c-2.752 0-5.728 2.304-5.728 7.328 0 5.952 8.8 11.488 12.608 13.92 3.808-2.4 12.608-7.968 12.608-13.92 0-5.024-2.976-7.328-5.728-7.328-2.336 0-4.32 1.472-5.312 3.968-0.256 0.64-0.864 1.056-1.568 1.056s-1.312-0.416-1.568-1.056c-0.992-2.496-2.976-3.968-5.312-3.968z">
        </path>
        <path
          d="M6.816 20.704c0.384 0.288 0.512 0.704 0.48 1.12 0.224 0.256 0.384 0.608 0.384 0.96 0 0.032 0 0.032 0 0.064 0.16 0.128 0.32 0.256 0.48 0.384 0.128 0.064 0.256 0.16 0.384 0.256 0.096 0.064 0.192 0.16 0.256 0.224 0.8 0.576 1.632 1.12 2.496 1.664 0.416 0.128 0.8 0.256 1.056 0.32 1.984 0.576 4.064 0.8 6.112 0.928 2.688-1.92 5.312-3.904 8-5.792 0.896-1.088 1.92-2.080 2.912-3.104v-7.552c-0.096-0.128-0.192-0.288-0.32-0.416-0.768-1.024-1.184-2.176-1.6-3.296-0.768-0.416-1.536-0.8-2.336-1.12-0.128-0.064-0.256-0.096-0.384-0.16h-21.568v12.992c1.312 0.672 2.496 1.6 3.648 2.528z">
        </path>
      </symbol>
      <symbol id="icon-repeat-1" viewBox="0 0 32 32">
        <title>repeat</title>
        <path d="M3 18V9.36432C3 8.16492 3.38219 5.86207 6.09524 5.86207M6.09524 5.86207C8.80828 5.86207 22.5942 5.86207 29 5.86207M6.09524 5.86207H29M29 5.86207L24.6667 2M29 5.86207L24.6667 9.72414" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M29 14V22.6357C29 23.8351 28.6178 26.1379 25.9048 26.1379M25.9048 26.1379C23.1917 26.1379 9.4058 26.1379 3 26.1379M25.9048 26.1379H3M3 26.1379L7.33333 30M3 26.1379L7.33333 22.2759" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 13.5L17 12V20" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="icon-shuffle" viewBox="0 0 32 32" fill="none">
        <title>shuffle</title>
        <path d="M24 9.91304L28.1364 5.95652L24 2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 24H7C7.5 24 8.33333 24 9 23C9.8 21.8 15.8333 11.6667 18.5 7C18.6667 6.66667 19.3 6 20.5 6C21.7 6 25.6667 6 27.5 6" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 20.087L28.1364 24.0435L24 28" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 6H7C7.5 6 8.33333 6 9 7C9.8 8.2 15.8333 18.3333 18.5 23C18.6667 23.3333 19.3 24 20.5 24C21.7 24 25.6667 24 27.5 24" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="icon-link" viewBox="0 0 32 32">
        <title>link</title>
        <path
          d="M23.584 17.92c0 0.864 0 1.728 0 2.56 0 1.312 0 2.656 0 3.968 0 0.352 0.032 0.736-0.032 1.12 0.032-0.16 0.032-0.288 0.064-0.448-0.032 0.224-0.096 0.448-0.16 0.64 0.064-0.128 0.128-0.256 0.16-0.416-0.096 0.192-0.192 0.384-0.32 0.576 0.096-0.128 0.16-0.224 0.256-0.352-0.128 0.16-0.288 0.32-0.48 0.48 0.128-0.096 0.224-0.16 0.352-0.256-0.192 0.128-0.352 0.256-0.576 0.32 0.128-0.064 0.256-0.128 0.416-0.16-0.224 0.096-0.416 0.16-0.64 0.16 0.16-0.032 0.288-0.032 0.448-0.064-0.256 0.032-0.512 0.032-0.768 0.032-0.448 0-0.896 0-1.312 0-1.472 0-2.976 0-4.448 0-1.824 0-3.616 0-5.44 0-1.568 0-3.104 0-4.672 0-0.736 0-1.44 0-2.176 0-0.128 0-0.224 0-0.352-0.032 0.16 0.032 0.288 0.032 0.448 0.064-0.224-0.032-0.448-0.096-0.64-0.16 0.128 0.064 0.256 0.128 0.416 0.16-0.192-0.096-0.384-0.192-0.576-0.32 0.128 0.096 0.224 0.16 0.352 0.256-0.16-0.128-0.32-0.288-0.48-0.48 0.096 0.128 0.16 0.224 0.256 0.352-0.128-0.192-0.256-0.352-0.32-0.576 0.064 0.128 0.128 0.256 0.16 0.416-0.096-0.224-0.16-0.416-0.16-0.64 0.032 0.16 0.032 0.288 0.064 0.448-0.032-0.256-0.032-0.512-0.032-0.768 0-0.448 0-0.896 0-1.312 0-1.472 0-2.976 0-4.448 0-1.824 0-3.616 0-5.44 0-1.568 0-3.104 0-4.672 0-0.736 0-1.44 0-2.176 0-0.128 0-0.224 0.032-0.352-0.032 0.16-0.032 0.288-0.064 0.448 0.032-0.224 0.096-0.448 0.16-0.64-0.064 0.128-0.128 0.256-0.16 0.416 0.096-0.192 0.192-0.384 0.32-0.576-0.096 0.128-0.16 0.224-0.256 0.352 0.128-0.16 0.288-0.32 0.48-0.48-0.128 0.096-0.224 0.16-0.352 0.256 0.192-0.128 0.352-0.256 0.576-0.32-0.128 0.064-0.256 0.128-0.416 0.16 0.224-0.096 0.416-0.16 0.64-0.16-0.16 0.032-0.288 0.032-0.448 0.064 0.48-0.064 0.96-0.032 1.44-0.032 0.992 0 1.952 0 2.944 0 1.216 0 2.432 0 3.616 0 1.056 0 2.112 0 3.168 0 0.512 0 1.024 0 1.536 0 0 0 0 0 0.032 0 0.448 0 0.896-0.192 1.184-0.48s0.512-0.768 0.48-1.184c-0.032-0.448-0.16-0.896-0.48-1.184s-0.736-0.48-1.184-0.48c-0.64 0-1.28 0-1.92 0-1.408 0-2.816 0-4.224 0-1.44 0-2.848 0-4.256 0-0.672 0-1.344 0-2.016 0-0.736 0-1.472 0.192-2.112 0.576s-1.216 0.96-1.568 1.6c-0.384 0.64-0.544 1.376-0.544 2.144 0 0.672 0 1.376 0 2.048 0 1.28 0 2.56 0 3.84 0 1.504 0 3.040 0 4.544 0 1.408 0 2.848 0 4.256 0 0.992 0 1.952 0 2.944 0 0.224 0 0.448 0 0.64 0 0.864 0.224 1.76 0.768 2.464 0.16 0.192 0.288 0.384 0.48 0.576s0.384 0.352 0.608 0.512c0.32 0.224 0.64 0.384 1.024 0.512 0.448 0.16 0.928 0.224 1.408 0.224 0.16 0 0.32 0 0.48 0 0.896 0 1.792 0 2.72 0 1.376 0 2.784 0 4.16 0 1.536 0 3.040 0 4.576 0 1.312 0 2.656 0 3.968 0 0.768 0 1.536 0 2.336 0 0.416 0 0.832-0.032 1.248-0.128 1.504-0.32 2.784-1.6 3.104-3.104 0.128-0.544 0.128-1.056 0.128-1.568 0-0.608 0-1.184 0-1.792 0-1.408 0-2.816 0-4.224 0-0.256 0-0.512 0-0.768 0-0.448-0.192-0.896-0.48-1.184s-0.768-0.512-1.184-0.48c-0.448 0.032-0.896 0.16-1.184 0.48-0.384 0.384-0.576 0.768-0.576 1.248v0z">
        </path>
        <path
          d="M32 11.232c0-0.8 0-1.568 0-2.368 0-1.248 0-2.528 0-3.776 0-0.288 0-0.576 0-0.864 0-0.896-0.768-1.696-1.696-1.696-0.8 0-1.568 0-2.368 0-1.248 0-2.528 0-3.776 0-0.288 0-0.576 0-0.864 0-0.448 0-0.896 0.192-1.184 0.48s-0.512 0.768-0.48 1.184c0.032 0.448 0.16 0.896 0.48 1.184s0.736 0.48 1.184 0.48c0.8 0 1.568 0 2.368 0 1.248 0 2.528 0 3.776 0 0.288 0 0.576 0 0.864 0-0.576-0.576-1.12-1.12-1.696-1.696 0 0.8 0 1.568 0 2.368 0 1.248 0 2.528 0 3.776 0 0.288 0 0.576 0 0.864 0 0.448 0.192 0.896 0.48 1.184s0.768 0.512 1.184 0.48c0.448-0.032 0.896-0.16 1.184-0.48 0.352-0.256 0.544-0.64 0.544-1.12v0z">
        </path>
        <path
          d="M15.040 21.888c0.16-0.16 0.288-0.288 0.448-0.448 0.384-0.384 0.8-0.8 1.184-1.184 0.608-0.608 1.184-1.184 1.792-1.792 0.704-0.704 1.44-1.44 2.176-2.176 0.8-0.8 1.568-1.568 2.368-2.368s1.6-1.6 2.4-2.4c0.736-0.736 1.504-1.504 2.24-2.24 0.64-0.64 1.248-1.248 1.888-1.888 0.448-0.448 0.896-0.896 1.344-1.344 0.224-0.224 0.448-0.416 0.64-0.64 0 0 0.032-0.032 0.032-0.032 0.32-0.32 0.48-0.768 0.48-1.184s-0.192-0.896-0.48-1.184c-0.32-0.288-0.736-0.512-1.184-0.48-0.512 0.032-0.928 0.16-1.248 0.48-0.16 0.16-0.288 0.288-0.448 0.448-0.384 0.384-0.8 0.8-1.184 1.184-0.608 0.608-1.184 1.184-1.792 1.792-0.704 0.704-1.44 1.44-2.176 2.176-0.8 0.8-1.568 1.568-2.368 2.368s-1.6 1.6-2.4 2.4c-0.736 0.736-1.504 1.504-2.24 2.24-0.64 0.64-1.248 1.248-1.888 1.888-0.448 0.448-0.896 0.896-1.344 1.344-0.224 0.224-0.448 0.416-0.64 0.64 0 0-0.032 0.032-0.032 0.032-0.32 0.32-0.48 0.768-0.48 1.184s0.192 0.896 0.48 1.184c0.32 0.288 0.736 0.512 1.184 0.48 0.48 0 0.928-0.16 1.248-0.48v0z">
        </path>
      </symbol>
      <symbol id="icon-play" viewBox="0 0 32 32">
        <title>play</title>
        <path
          d="M21.216 15.168l-7.616-5.088c-0.672-0.416-1.504 0.032-1.504 0.832v10.176c0 0.8 0.896 1.248 1.504 0.832l7.616-5.088c0.576-0.416 0.576-1.248 0-1.664z">
        </path>
        <path
          d="M13.056 22.4c-0.224 0-0.416-0.064-0.608-0.16-0.448-0.224-0.704-0.672-0.704-1.152v-10.176c0-0.48 0.256-0.928 0.672-1.152s0.928-0.224 1.344 0.064l7.616 5.088c0.384 0.256 0.608 0.672 0.608 1.088s-0.224 0.864-0.608 1.088l-7.616 5.088c-0.192 0.16-0.448 0.224-0.704 0.224zM13.056 10.272c-0.096 0-0.224 0.032-0.32 0.064-0.224 0.128-0.352 0.32-0.352 0.576v10.176c0 0.256 0.128 0.48 0.352 0.576 0.224 0.128 0.448 0.096 0.64-0.032l7.616-5.088c0.192-0.128 0.288-0.32 0.288-0.544s-0.096-0.416-0.288-0.544l-7.584-5.088c-0.096-0.064-0.224-0.096-0.352-0.096z">
        </path>
        <path
          d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z">
        </path>
        <path
          d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z">
        </path>
      </symbol>
      <symbol id="icon-pause" viewBox="0 0 32 32">
        <title>pause</title>
        <path
          d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z">
        </path>
        <path
          d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z">
        </path>
        <path
          d="M12.16 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z">
        </path>
        <path
          d="M19.84 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z">
        </path>
      </symbol>
      <symbol id="icon-next" viewBox="0 0 32 32">
        <title>next</title>
        <path
          d="M2.304 18.304h14.688l-4.608 4.576c-0.864 0.864-0.864 2.336 0 3.232 0.864 0.864 2.336 0.864 3.232 0l8.448-8.48c0.864-0.864 0.864-2.336 0-3.232l-8.448-8.448c-0.448-0.448-1.056-0.672-1.632-0.672s-1.184 0.224-1.632 0.672c-0.864 0.864-0.864 2.336 0 3.232l4.64 4.576h-14.688c-1.248 0-2.304 0.992-2.304 2.272s1.024 2.272 2.304 2.272z">
        </path>
        <path
          d="M29.696 26.752c1.248 0 2.304-1.024 2.304-2.304v-16.928c0-1.248-1.024-2.304-2.304-2.304s-2.304 1.024-2.304 2.304v16.928c0.064 1.28 1.056 2.304 2.304 2.304z">
        </path>
      </symbol>
      <symbol id="icon-prev" viewBox="0 0 32 32">
        <title>prev</title>
        <path
          d="M29.696 13.696h-14.688l4.576-4.576c0.864-0.864 0.864-2.336 0-3.232-0.864-0.864-2.336-0.864-3.232 0l-8.448 8.48c-0.864 0.864-0.864 2.336 0 3.232l8.448 8.448c0.448 0.448 1.056 0.672 1.632 0.672s1.184-0.224 1.632-0.672c0.864-0.864 0.864-2.336 0-3.232l-4.608-4.576h14.688c1.248 0 2.304-1.024 2.304-2.304s-1.024-2.24-2.304-2.24z">
        </path>
        <path
          d="M2.304 5.248c-1.248 0-2.304 1.024-2.304 2.304v16.928c0 1.248 1.024 2.304 2.304 2.304s2.304-1.024 2.304-2.304v-16.928c-0.064-1.28-1.056-2.304-2.304-2.304z">
        </path>
      </symbol>
      <symbol id="icon-link" viewBox="0 0 24 24">
        <title>link</title>
        <path d="M16,3h4.44a.56.56,0,0,1,.56.56V8" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
        </path>
        <line x1="20.84" y1="3.16" x2="12" y2="12" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line>
        <path d="M21,12v8a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3h8" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path>
      </symbol>
    </defs>
  </svg>
</template>

<script>
import { tracks } from '@/data/trackData.js';

export default {
  data() {
    return {
      audio: null,
      tracks,
      prevTracks: [],
      currentTrack: {},
      currentTrackIdx: 0,
      duration: '--:--',
      currentTime: '--:--',
      barWidthPercent: 0,
      isPlaying: false,
      shuffleMode: false,
      preTrackBtnStyle: 0.3,
      liked: false,
    };
  },
  watch: {
    'currentTrack.id'(n,o){
      this.preTrackBtnStyle = this.prevTracks.length === 0 ? 0.3 : 1
    },
  },
  methods: {
    togglePlay() {
      this.audio.paused ? this.audio.play() : this.audio.pause();
      this.isPlaying = !this.audio.paused;
    },
    generateTime() {
      // 更新進度條
      let width = ((this.audio.currentTime / this.audio.duration) * 100).toFixed(2);
      this.barWidthPercent = width + "%";
      // 更新目前時間
      if(!this.audio.currentTime && !this.isPlaying){
        this.currentTime = '--:--';
      } else {
        this.currentTime = this.formatTime(this.audio.currentTime);
      }
    },
    formatTime(time) {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    },
    clickProgress(e) {
      this.isPlaying = true;

      const progressBar = this.$refs.progress;
      const progressBarRect = progressBar.getBoundingClientRect();

      let clickX = e.pageX - progressBarRect.left; 
      let ratio = this.updateBarWidth(clickX);

      this.audio.currentTime = this.audio.duration * ratio;
      this.audio.play();
    },
    updateBarWidth(clickX) {
      let progress = this.$refs.progress;
      let progressBarWidth = progress.querySelector('.progress__bar').offsetWidth;
      let ratio = clickX / progressBarWidth;

      this.barWidthPercent = (ratio * 100).toFixed(2) + "%";
      return ratio;
    },
    playPrevTrack() {
      if (!this.prevTracks.length){
        return
      }
      this.audio.pause();
      this.currentTrack = this.prevTracks[this.prevTracks.length - 1];
      this.prevTracks.pop();
      this.resetPlayer();
    },
    nextRandomTrack(){
      this.prevTracks.push(this.currentTrack);
      this.shuffleMode = true;

      const tracksOtherThenCurrent = this.tracks.filter(track => track.id !== this.currentTrack.id);
      const nextTrack = this.shuffleArray(tracksOtherThenCurrent)[0];

      this.audio.pause();
      this.currentTrack = nextTrack;
      
      this.resetPlayer();
    },
    getToday(){
      const time = new Date();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const day = time.getDay();  // Sun: 0, Mon: 1 
      const mmdd = `${month < 10 ? '0' : ''}${month}${date < 10 ? '0' : ''}${date}`;

      const seoulHour = time.toLocaleString('en-US', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        hour12: false
      })

      console.log('tw mmdd:', mmdd);
      console.log('tw 星期幾:', day);
      console.log("seoulHour:", seoulHour);
    },
    shuffleTracks(tracks) {
      // 根據今天是星期幾來設置 priorityFactor
      const priorityFactor = (() => {
        const today = new Date().getDay();  // 取得今天是星期幾，0: 星期天, 1: 星期一, ..., 3: 星期三
        if (today === 1) {
          return 'Monday';
        }
        // if () {...}
        return null;
      })();

      // 如果有 priorityFactor，將對應的 track 排到前面
      if (priorityFactor) {
        const priorityTracks = tracks.filter(track => track.id === priorityFactor);
        if (priorityTracks.length > 0) {
          const remainingTracks = tracks.filter(track => track.id !== priorityFactor);
          const shuffledRemainingTracks = this.shuffleArray(remainingTracks);
          return [...priorityTracks, ...shuffledRemainingTracks];  // 優先順序的 track 放在最前面
        }
      }

      // if no priority，移除 id 比較特別的（限定版:英文單字或比較長的日期）
      const filteredTracks = tracks.filter(track => track.id.toString().length <= 2);
      return this.shuffleArray(filteredTracks);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    resetPlayer() {
      this.barWidthPercent = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        this.isPlaying ? this.audio.play() : this.audio.pause();
      }, 100);
    },
    handleVisibilityChange() {
      if (document.hidden) {
        this.audio.pause();
        this.isPlaying = false;
      }
    }
  },
  created() {
    this.audio = new Audio();
    this.audio.ontimeupdate = () => {
      this.generateTime();
    };
    this.audio.onloadedmetadata = () => {
      this.duration = this.formatTime(this.audio.duration);
    };
    this.audio.onended = () => {
      this.isPlaying = true;
      this.shuffleMode ? this.nextRandomTrack() : this.resetPlayer();
    };
  },
  mounted() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.tracks = this.shuffleTracks(this.tracks);
    this.currentTrack = this.tracks[0];
    this.audio.src = this.currentTrack.source;


    // this.getToday();
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
}
</script>

<style scoped>

</style>
