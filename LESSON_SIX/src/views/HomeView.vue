<script setup lang="ts">
import { onMounted, ref } from 'vue'

const theme = ref<'dark' | 'light'>('dark')

function applyTheme(value: 'dark' | 'light') {
  theme.value = value
  document.documentElement.dataset.theme = value
  try {
    localStorage.setItem('lesson6-theme', value)
  } catch (error) {
    // ignore if storage is unavailable
  }
}

function toggleTheme() {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('lesson6-theme') as 'dark' | 'light' | null
  applyTheme(saved === 'light' ? 'light' : 'dark')
})
</script>

<template>
  <main class="page-shell">
    <section class="card">
      <div class="card-top">
        <div class="photo" aria-hidden="true">KM</div>
        <button class="theme-toggle" @click="toggleTheme" :aria-pressed="theme === 'light'">
          {{ theme === 'light' ? '🌙' : '☀️' }}
          <span class="theme-label">{{ theme === 'light' ? 'Dark' : 'Light' }} mode</span>
        </button>
      </div>

      <div class="hero-content">
        <h1>Krissy Morency</h1>
        <p>Designer building elegant digital experiences for brands and businesses.</p>
      </div>

      <div class="links" role="list">
        <a class="link-btn" href="https://krissymorency.myportfolio.com" target="_blank" rel="noopener noreferrer" role="listitem">
          <span class="link-icon">🎨</span>
          <span>Portfolio</span>
        </a>
        <a class="link-btn" href="https://dribbble.com/" target="_blank" rel="noopener noreferrer" role="listitem">
          <span class="link-icon">🏀</span>
          <span>Dribbble</span>
        </a>
        <a class="link-btn" href="https://linkedin.com/in/krissy-morency" target="_blank" rel="noopener noreferrer" role="listitem">
          <span class="link-icon">🔗</span>
          <span>LinkedIn</span>
        </a>
        <a class="link-btn" href="mailto:kfmorency@yahoo.com" role="listitem">
          <span class="link-icon">✉️</span>
          <span>Email</span>
        </a>
      </div>

      <footer class="page-footer">Made with coffee & Copilot</footer>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.card {
  width: min(100%, 480px);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 32px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
}

.card-top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.photo {
  width: 100px;
  height: 100px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--card-text);
  background: var(--photo-bg);
  border: 1px solid var(--card-border);
}

.theme-toggle {
  border: 1px solid var(--button-border);
  background: var(--button-bg);
  color: var(--text);
  padding: 0.75rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.hero-content h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
}

.hero-content p {
  color: var(--text-muted);
  margin-top: 0.75rem;
  line-height: 1.7;
}

.links {
  display: grid;
  gap: 0.85rem;
  margin-top: 1.75rem;
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: var(--button-bg);
  color: var(--text);
  text-decoration: none;
  transition: transform 220ms ease, background 220ms ease, box-shadow 220ms ease;
  box-shadow: var(--button-shadow);
}

.link-btn:hover {
  transform: translateY(-3px);
  background: var(--button-hover);
  box-shadow: var(--button-shadow-hover);
}

.link-icon {
  font-size: 1.2rem;
}

.page-footer {
  margin-top: 1.75rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 420px) {
  .card {
    padding: 1.6rem;
  }

  .card-top {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
