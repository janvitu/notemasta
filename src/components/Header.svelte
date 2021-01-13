<script>
  import Logo from "./Logo.svelte";
  import ModeToggler from "./ModeToggler.svelte";
</script>

<header class="w-screen bg-purple-600 text-white dark:bg-purple-800">
  <nav class="flex flex-row justify-between items-center p-6">
    <div class="logo">
      <a href="/" class="">
        <Logo />
      </a>
    </div>
    <div class="links">
      <a href="/signup">Sign up</a><a href="/">Login</a>
      <ModeToggler />
    </div>
  </nav>
</header>
