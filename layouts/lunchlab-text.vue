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
    </div>
  </div>
</template>
