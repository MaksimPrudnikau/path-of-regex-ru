const GAP = 8;

export function placeTooltip(anchor: HTMLElement, tooltip: HTMLElement) {
  const anchorRect = anchor.getBoundingClientRect();
  const { width, height } = tooltip.getBoundingClientRect();
  const left = anchorRect.left + anchorRect.width / 2 - width / 2;
  const below = anchorRect.bottom + GAP;
  const fitsBelow = below + height <= innerHeight - GAP;

  tooltip.style.left = `${Math.min(Math.max(left, GAP), innerWidth - width - GAP)}px`;
  tooltip.style.top = `${fitsBelow ? below : anchorRect.top - height - GAP}px`;
}
