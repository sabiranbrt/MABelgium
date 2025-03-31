import axios from "axios"

// Configure base URL (replace with your API endpoint)
const api = axios.create({
  baseURL: "https://your-api-endpoint.com/api",
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
})


// Add response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("API Error:", error.response.status, error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error: No response received", error.request)
    } else {
      // Something happened in setting up the request
      console.error("API Error:", error.message)
    }
    return Promise.reject(error)
  }
)

// GET - Fetch items
export const getItems = async () => {
  try {
    const response = await api.get("/items")
    return response.data
  } catch (error) {
    console.log("error",error)
    throw error
  }
}

// POST - Save new item
export const saveItem = async (itemData:TODO) => {
  try {
    const response = await api.post("/items", itemData)
    return response.data
  } catch (error) {
    console.log("error",error)
    throw error
  }
}




