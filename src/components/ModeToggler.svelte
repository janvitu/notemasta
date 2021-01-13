<script>
  let mode = localStorage.getItem("mode");
  let htmlElement = document.documentElement;
  const toggleMode = () => {
    if (mode === "light") {
      htmlElement.classList.remove(mode);
      mode = "dark";
      htmlElement.classList.add(mode);
    } else {
      htmlElement.classList.remove(mode);
      mode = "light";
      htmlElement.classList.add(mode);
    }
    localStorage.setItem("mode", mode);
  };
</script>

<button on:click={toggleMode}>
  {#if mode === 'light'}
    <i class="fas fa-moon-cloud" />
  {:else}<i class="fas fa-sun" />{/if}
</button>
