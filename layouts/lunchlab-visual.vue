<template>
  <div class="slidev-layout lunchlab">
    <div class="lunchlab-slide c4-visual-slide" :class="{ 'level1-questions-slide': $frontmatter.questions }">
      <div class="slide-frame">
        <div class="slide-header">
          <div class="eyebrow">{{ $frontmatter.eyebrow }}</div>
          <h2>{{ $frontmatter.title }}</h2>
        </div>
        <div class="slide-body">
          <div class="content c4-visual-wrap" :class="{ 'level1-questions-wrap': $frontmatter.questions }"><slot /></div>
        </div>
      </div>
    </div>
  </div>
</template>
