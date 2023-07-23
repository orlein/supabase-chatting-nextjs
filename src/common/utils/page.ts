export function getFromToRange(page: number, pageSize: number) {
  return [(page - 1) * pageSize, page * pageSize - 1] as const;
}

export function validatePaginated<T>(data: T[] | null) {
  if (typeof data === 'object' && data === null) {
    return [];
  }

  return data;
}
