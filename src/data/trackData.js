export const tracks = [
  {
    id: 1,
    name: '這是第一首歌歌名取長點',
    artist: '20200101',
    cover: new URL('@/assets/images/img01.jpg', import.meta.url).href,
    source: new URL('@/assets/audio/01.mp3', import.meta.url).href,
    liked: false
  },
  {
    id: 'Monday',
    name: '喜歡星期一',
    artist: '20241231 某個地方',
    cover: new URL('@/assets/images/img02.jpg', import.meta.url).href,
    source: new URL('@/assets/audio/02.mp3', import.meta.url).href,
    liked: true
  },
  {
    id: 3,
    name: '第三首歌短一點',
    artist: '1234567 AbcDef',
    cover: new URL('@/assets/images/img03.png', import.meta.url).href,
    source: new URL('@/assets/audio/03.mp3', import.meta.url).href,
    liked: false
  },
  {
    id: 4,
    name: '第四首',
    artist: '',
    cover: '',
    source: new URL('@/assets/audio/04.mp3', import.meta.url).href,
    liked: true
  },
  {
    id: 5,
    name: '第五首',
    artist: '',
    cover: '',
    source: new URL('@/assets/audio/05.mp3', import.meta.url).href,
    liked: false
  },
]