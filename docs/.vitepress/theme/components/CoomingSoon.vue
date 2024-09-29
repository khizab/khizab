<template>
  <div class="docs-coming-soon">
    <h1>Documentation Coming Soon!</h1>

    <a href="/" class="home-button">Go Home</a>
  </div>
</template>

<style scoped>
.docs-coming-soon {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ff463f;
}

.progress {
  width: 33%;
  height: 100%;
  background-color: #ff463f;
}

.home-button {
  background-color: #ff463f;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #e12e27;
}
</style>
