<template>
  <div class="slidev-layout lunchlab">
    <div class="lunchlab-slide scaling-slide" :class="$frontmatter.slideClass">
      <div class="scaling-frame">
        <header class="scaling-header">
          <div class="eyebrow">{{ $frontmatter.eyebrow }}</div>
          <h2>{{ $frontmatter.title }}</h2>
        </header>
        <main class="scaling-body"><slot /></main>
        <footer v-if="$frontmatter.prompt" class="scaling-prompt">{{ $frontmatter.prompt }}</footer>
      </div>
    </div>
  </div>
</template>
