export function generateOrderNumber() {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `FL-${randomDigits}`;
}

export function generateId(prefix = 'item') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}
