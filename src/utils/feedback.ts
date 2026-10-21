/**
 * Web Audio API synthesized tactile feedback chimes and device vibration for clinical actions,
 * card selections, bedside timers, and critical alerts.
 */

let soundMuted = false;

export function isSoundMuted(): boolean {
  return soundMuted;
}

export function setSoundMuted(muted: boolean): void {
  soundMuted = muted;
}

export function playAlertChime(type: 'tap' | 'beep' | 'success' | 'warning' = 'beep') {
  // Device haptic vibration (supported on Android WebView & Chrome!)
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      if (type === 'warning') navigator.vibrate([180, 80, 180, 80, 260]);
      else if (type === 'success') navigator.vibrate([70, 40, 110]);
      else if (type === 'tap') navigator.vibrate(25);
      else navigator.vibrate(45);
    }
  } catch {
    // ignore
  }

  if (soundMuted) return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'tap') {
      // Crisp, tactile pop for card/checkbox toggles
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.065);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.065);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } else if (type === 'beep') {
      // Tactile deck card selection chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === 'success') {
      // Rising 3-note chord for completed checklists or logged regimens
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + (i + 1) * 0.08 + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + (i + 1) * 0.08 + 0.16);
      });
    } else if (type === 'warning') {
      // Urgent triple pulse for timer expiration or high-risk alert
      [880, 880, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.16);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + i * 0.16);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + i * 0.16 + 0.11);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.16);
        osc.stop(ctx.currentTime + i * 0.16 + 0.12);
      });
    }

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 900);
  } catch {
    // Non-fatal if audio context blocked by browser autoplay policy
  }
}
