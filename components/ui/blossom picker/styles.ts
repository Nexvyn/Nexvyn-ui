export const blossomPickerStyles = `
.bcp-root {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.bcp-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bcp-petal {
  position: absolute;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
}

.bcp-petal-visible:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2.5px rgba(255, 255, 255, 0.95), 0 0 0 4px rgba(59, 130, 246, 0.8);
}

.bcp-core {
  position: relative;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
}

.bcp-core:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2.5px rgba(59, 130, 246, 0.9), 0 0 0 5px rgba(255, 255, 255, 0.9);
}

.bcp-core:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.bcp-svg {
  position: absolute;
  pointer-events: none;
}

.bcp-slider-track {
  pointer-events: auto;
  cursor: pointer;
  touch-action: none;
}

.bcp-slider-handle {
  pointer-events: auto;
  cursor: grab;
  touch-action: none;
}

.bcp-slider-handle:active {
  cursor: grabbing;
}

.bcp-bg-wrapper {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.bcp-bg-solid {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .bcp-petal,
  .bcp-core,
  .bcp-bg-solid,
  .bcp-svg,
  .bcp-slider-handle {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
}
`
