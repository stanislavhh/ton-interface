export type MockedResponse = {
  data: any
}

export const imitateFetch = async (response: MockedResponse, success = true, timeout = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => (success ? resolve(response) : reject(response)), timeout)
  })
}
