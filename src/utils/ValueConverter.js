export function formatVND(value) {
  if (value === 0) {
    return '0.000'; // Special case for zero value
  }

  // Split integer and decimal parts (handles values without decimals)
  const parts = value.toString().split('.');

  // Format the integer part with commas for thousands separation
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${integerPart}`;
}
