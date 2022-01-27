export const getMockedTransactions = () =>
  Array.from({ length: Math.round(Math.random() * 100) }).map(() => ({
    totalValue: (Math.random() * 10000000).toFixed(2),
    token0Amount: (Math.random() * 1000).toFixed(2),
    token1Amount: (Math.random() * 1000).toFixed(2),
    address: Math.random()
      .toString(36)
      .substr(2, 5)
      .concat(Math.random().toString(36).substr(2, 5), Math.random().toString(36).substr(2, 5)),
    date: new Date(+new Date() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
  }))
