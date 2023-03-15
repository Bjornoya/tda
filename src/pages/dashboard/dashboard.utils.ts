export const INITIAL_PAGE = 0;
export const STEP_SIZE = 10;

export function getPageCount(count?: number) {
  return Math.ceil((count || 1) / 10);
}

// avoid a layout jump when reaching the last page with empty rows
export function makeEmptyRows(page: number, count?: number) {
  if (page > 0) return Math.max(0, (1 + page) * STEP_SIZE - (count || 0));
  return 0;
}
