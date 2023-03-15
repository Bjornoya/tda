export const INITIAL_PAGE = 0;
export const STEP_SIZE = 10;
export const NO_VALUE = '-';

export const FILTERS = [
  {
    value: 'open',
    label: 'Open',
  },
  {
    value: 'progress',
    label: 'Progress',
  },
  {
    value: 'finished',
    label: 'Finished',
  },
  {
    value: '',
    label: '-',
  },
];

export function getPageCount(count?: number) {
  return Math.ceil((count || 1) / 10);
}

// avoid a layout jump when reaching the last page with empty rows
export function makeEmptyRows(page: number, count?: number) {
  if (page > 0) return Math.max(0, (1 + page) * STEP_SIZE - (count || 0));
  return 0;
}

export const errorHandler = {
  get(target: any, name: string) {
    return name in target ? target[name] : NO_VALUE;
  },
};
