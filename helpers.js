/**
 * Parse the data to show required params from Lighthouse API
 *
 * @param {object} data Lighthouse API response data
 * @returns {object} with the required params.
 */
const parseLighthouseAPI = (data) => {
  let audit = data.lighthouseResult.audits;

  return {
    LCP: audit["largest-contentful-paint"],
    FCP: audit["first-contentful-paint"],
    TTI: audit["interactive"],
    SI: audit["speed-index"],
    TBT: audit["total-blocking-time"],
    CLS: audit["cumulative-layout-shift"]
  }
}

module.exports = {
  parseLighthouseAPI
}