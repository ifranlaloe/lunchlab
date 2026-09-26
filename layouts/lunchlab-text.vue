<template>
  <div class="slidev-layout lunchlab">
    <div class="lunchlab-slide text-slide" :class="{ 'closing-slide': $frontmatter.closing }">
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
