<template>
<div class="rotating-cube">
  <div 
    :class="`cube show-${side}`"
  >
    <div 
      :class="`cube__face cube__face--${idx}`"
      v-for="(icon, idx) in icons" 
      :key="idx"
    >
      <img :alt="icon.alt" :src="icon.src"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "rotating-cube",
  props: {
    icons: Array,
    side: Number
  }
}
</script>

<style lang="stylus" scoped>

$size = 95px;

* { box-sizing: border-box; }

.rotating-cube {
  width: $size;
  height: $size;
  perspective: $size * 2;
  box-sizing: content-box;
}

.cube {
  width: $size;
  height: $size;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ($size / 2 * -1);
  transition: transform 1.5s ease-in-out;
}

.cube.show-0 { transform: translateZ($size / 2 * -1) rotateY(   0deg); }
.cube.show-1 { transform: translateZ($size / 2 * -1) rotateY( -90deg); }
.cube.show-2 { transform: translateZ($size / 2 * -1) rotateY(-180deg); }
.cube.show-3 { transform: translateZ($size / 2 * -1) rotateY(  90deg); }
.cube.show-4 { transform: translateZ($size / 2 * -1) rotateX( -90deg); }
.cube.show-5 { transform: translateZ($size / 2 * -1) rotateX(  90deg); }

.cube__face {
  position: absolute;
  width: $size;
  height: $size;
  background: #fafafa;
  padding: 10px;
}

.cube__face img {
  filter: drop-shadow(1px 1px 2px #aaaaaa);
}

.cube__face--0 { transform: rotateY(  0deg) translateZ($size / 2); }
.cube__face--1 { transform: rotateY( 90deg) translateZ($size / 2); }
.cube__face--2 { transform: rotateY(180deg) translateZ($size / 2); }
.cube__face--3 { transform: rotateY(-90deg) translateZ($size / 2); }
.cube__face--4 { transform: rotateX( 90deg) translateZ($size / 2); }
.cube__face--5 { transform: rotateX(-90deg) translateZ($size / 2); }
</style>
