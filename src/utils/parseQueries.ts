export function parseQueries(search: string): { [key: string]: string } {
  return search
    .slice(1)
    .split('&')
    .map((val) => ({
      [val.split('=')[0]]: val.split('=')[1],
    }))
    .reduce((res, obj) => ({ ...res, ...obj }), {})
}
