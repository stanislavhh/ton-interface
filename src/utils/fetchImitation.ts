export type MockedResponse = {
  data: any
}

export const imitateFetch = async (response: MockedResponse, success = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => (success ? resolve(response) : reject(response)), 2000)
  })
}
