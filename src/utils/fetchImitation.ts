export type MockedResponse = {
  data: any
}

export const imitateFetch = async (response: MockedResponse, success = true, timeout = 1500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => (success ? resolve(response) : reject(response)), timeout)
  })
}
