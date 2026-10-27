<script setup lang="ts">
const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
</script>

<template>
  <div class="slidev-layout lunchlab" :class="{ 'scaling-deck': $frontmatter.scalingTheme }">
    <div class="lunchlab-slide text-slide" :class="{ 'closing-slide': $frontmatter.closing }">
      <HalloweenDecor v-if="$frontmatter.scalingTheme" :items="$frontmatter.halloween" />
      <div class="slide-frame">
        <div class="slide-header">
          <div class="eyebrow">{{ $frontmatter.eyebrow }}</div>
        </div>
        <div class="slide-body">
          <div class="content"><slot /></div>
        </div>
      </div>
      <img
        v-if="$frontmatter.revealImage"
        v-click="1"
        class="scaling-fullscreen-reveal"
        :src="publicAssetUrl($frontmatter.revealImage)"
        :alt="$frontmatter.revealImageAlt || ''"
      />
    </div>
  </div>
</template>
