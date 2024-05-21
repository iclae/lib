/**
 * Get search parameters from URL
 * @param {String} URL - URL to get parameters from
 * @returns {Object}
 */
export const getParameters = URL => {
  const search = URL.split('?')[1]
  if (!search) return {}
  return JSON.parse(
    `{"${decodeURI(search)
      .replace(/"/g, '\\\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  )
}
