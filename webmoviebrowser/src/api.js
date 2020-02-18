/* API functions.  Imported and used in store/actions.

Visit www.omdbapi.com for more info about the API */

export const url = "http://www.omdbapi.com/?apikey=86a0e4cc&"

// initial Search function, searchs for the title and returns the entire object for processing
export const searchTitle = async (title, page) => {
  try {

    const response = await fetch(url + "s=" + title + `${page === 1 ? "" : `&page=${page}`}`)
    const result = await response.json()

    if (result.Response === "False") return result.Error

    return result
  } catch (error) {
    return error
  }
}

// secondary search function, searches for details given an id from initial results
export const searchDetails = async (id) => {
  try {
    const response = await fetch(url + "i=" + id);
    const result = await response.json()

    if (result.Response === "False") return result.Error

    // return details
    return result
  } catch (error) {
    return error
  }
}
