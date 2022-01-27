export const calculateRate = (i0Price?: number, i1Price?: number) => {
  return (1 / (i1Price || 1)) * (i0Price || 1)
}
