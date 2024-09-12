export default function isEmpty<T>(value?: T | undefined | null): value is undefined | null {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    return true;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (typeof value === 'object' && Array.isArray(value) && value.length > 0 === false) {
    return true;
  }

  if (typeof value === 'object' && !(value instanceof Date) && Object.keys(value).length > 0 === false) {
    return true;
  }

  return false;
}

export function isNotEmpty<T>(value?: T | undefined | null): value is T {
  return isEmpty(value) === false;
}
