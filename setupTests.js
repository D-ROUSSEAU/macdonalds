import "@testing-library/jest-dom"

beforeAll(() => {
  // Fake geolocation API
  global.navigator.geolocation = {
    getCurrentPosition: vi.fn((success, error) => {
      success({
        coords: {
          latitude: 48.8566,
          longitude: 2.3522,
        },
      })
    }),
  }
})
