@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 230 50% 5%;
    --foreground: 190 100% 95%;

    --card: 230 40% 8%;
    --card-foreground: 190 100% 95%;

    --popover: 230 40% 8%;
    --popover-foreground: 190 100% 95%;

    --primary: 187 100% 50%;
    --primary-foreground: 230 50% 5%;

    --secondary: 348 100% 55%;
    --secondary-foreground: 0 0% 100%;

    --muted: 230 30% 15%;
    --muted-foreground: 220 20% 55%;

    --accent: 270 100% 77%;
    --accent-foreground: 230 50% 5%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 230 40% 18%;
    --input: 230 40% 18%;
    --ring: 187 100% 50%;

    --radius: 0.5rem;

    --neon-blue: 187 100% 50%;
    --neon-red: 348 100% 55%;
    --neon-purple: 270 100% 77%;
    --cyber-dark: 230 50% 5%;
    --cyber-darker: 230 50% 3%;
    --glass-bg: 230 40% 10%;
    --glass-border: 230 40% 20%;

    --font-display: 'Orbitron', sans-serif;
    --font-body: 'Rajdhani', sans-serif;

    --glow-blue: 0 0 20px hsl(187 100% 50% / 0.5), 0 0 60px hsl(187 100% 50% / 0.2);
    --glow-red: 0 0 20px hsl(348 100% 55% / 0.5), 0 0 60px hsl(348 100% 55% / 0.2);
    --glow-purple: 0 0 20px hsl(270 100% 77% / 0.5), 0 0 60px hsl(270 100% 77% / 0.2);

    --sidebar-background: 230 40% 8%;
    --sidebar-foreground: 190 100% 95%;
    --sidebar-primary: 187 100% 50%;
    --sidebar-primary-foreground: 230 50% 5%;
    --sidebar-accent: 230 30% 15%;
    --sidebar-accent-foreground: 190 100% 95%;
    --sidebar-border: 230 40% 18%;
    --sidebar-ring: 187 100% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
    cursor: none !important;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
  }
}

@layer components {
  .glass-panel {
    @apply bg-glass/40 border border-glass-border/30;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .neon-text-blue {
    color: hsl(var(--neon-blue));
    text-shadow: var(--glow-blue);
  }

  .neon-text-red {
    color: hsl(var(--neon-red));
    text-shadow: var(--glow-red);
  }

  .neon-text-purple {
    color: hsl(var(--neon-purple));
    text-shadow: var(--glow-purple);
  }

  .neon-border-blue {
    border-color: hsl(var(--neon-blue) / 0.5);
    box-shadow: var(--glow-blue);
  }

  .neon-border-red {
    border-color: hsl(var(--neon-red) / 0.5);
    box-shadow: var(--glow-red);
  }

  .scanline-overlay {
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      hsl(var(--neon-blue) / 0.03) 2px,
      hsl(var(--neon-blue) / 0.03) 4px
    );
    pointer-events: none;
  }

  .glitch-text {
    position: relative;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch-text::before {
    color: hsl(var(--neon-red));
    animation: glitch-1 3s infinite linear alternate-reverse;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }

  .glitch-text::after {
    color: hsl(var(--neon-blue));
    animation: glitch-2 2s infinite linear alternate-reverse;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }

  .cyber-grid {
    background-image: 
      linear-gradient(hsl(var(--neon-blue) / 0.05) 1px, transparent 1px),
      linear-gradient(90deg, hsl(var(--neon-blue) / 0.05) 1px, transparent 1px);
    background-size: 60px 60px;
  }
}

@keyframes glitch-1 {
  0%, 90% { transform: translate(0); }
  91% { transform: translate(-2px, 1px); }
  93% { transform: translate(2px, -1px); }
  95% { transform: translate(-1px, 2px); }
  97% { transform: translate(1px, -2px); }
  100% { transform: translate(0); }
}

@keyframes glitch-2 {
  0%, 88% { transform: translate(0); }
  89% { transform: translate(2px, -1px); }
  92% { transform: translate(-2px, 1px); }
  94% { transform: translate(1px, 2px); }
  96% { transform: translate(-1px, -2px); }
  100% { transform: translate(0); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes web-shoot {
  0% { transform: scaleY(0); opacity: 0; }
  50% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0.5; }
}
