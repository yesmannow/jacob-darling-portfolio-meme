export function defineCustomElementIfNeeded(name: string, ctor: CustomElementConstructor) {
  if (typeof window === 'undefined' || !('customElements' in window)) return;
  if (!customElements.get(name)) {
    try {
      customElements.define(name, ctor);
    } catch (err) {
      // In case of race / vendor issues, swallow and log for diagnostics
      // console.warn(`[guard] failed to define ${name}:`, err);
    }
  } else {
    // already defined - no-op
    // console.debug(`[guard] custom element ${name} already defined`);
  }
}
