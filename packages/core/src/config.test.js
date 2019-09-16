import { getToken, getApiUrl } from './config'

describe('config', () => {
  describe('#getToken', () => {
    it('throws an error if token is not specified', () => {
      expect(() => getToken()).toThrow(
        'Token not found, please specify a token using BUNDLE_ANALYZER_TOKEN env variable',
      )
    })

    describe('with BUNDLE_ANALYZER_TOKEN env variable', () => {
      beforeEach(() => {
        process.env.BUNDLE_ANALYZER_TOKEN = 'env-token'
      })

      afterEach(() => {
        delete process.env.BUNDLE_ANALYZER_TOKEN
      })

      it('returns provided token', () => {
        expect(getToken('foo')).toBe('foo')
      })

      it('uses it as default', () => {
        expect(getToken()).toBe('env-token')
      })
    })
  })

  describe('#getApiUrl', () => {
    describe('with BUNDLE_ANALYZER_API_URL env variable', () => {
      beforeEach(() => {
        process.env.BUNDLE_ANALYZER_API_URL = 'env-api'
      })

      afterEach(() => {
        delete process.env.BUNDLE_ANALYZER_API_URL
      })

      it('uses it', () => {
        expect(getApiUrl()).toBe('env-api')
      })
    })

    it('returns default API url', () => {
      expect(getApiUrl()).toBe('https://api.bundle-analyzer.com')
    })
  })
})
