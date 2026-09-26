<template>
  <div class="slidev-layout lunchlab">
    <div class="lunchlab-slide" :class="$frontmatter.slideClass">
      <div class="slide-frame">
        <div class="slide-header">
          <div class="eyebrow">{{ $frontmatter.eyebrow }}</div>
          <h2>{{ $frontmatter.title }}</h2>
        </div>
        <div class="slide-body">
          <div class="content"><slot /></div>
        </div>
      </div>
    </div>
  </div>
</template>
