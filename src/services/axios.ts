import axios, { AxiosError, AxiosRequestConfig } from "axios"

// Define a custom error type for API errors
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public data?: unknown,
    public originalError?: AxiosError
  ) {
    super(message)
    this.name = "ApiError"
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}



// Configure base URL
const api = axios.create({
  baseURL: "https://demo.magarsanghbelgium.org/api",
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Handles API errors consistently
 */
const handleApiError = (error: AxiosError): never => {
  if (error.response) {
    // Server responded with a status code outside 2xx range
    const { status, data } = error.response
    let errorMessage = "Request failed"

    // Customize messages based on status codes
    if (status === 401) {
      errorMessage = "Unauthorized access"
    } else if (status === 404) {
      errorMessage = "Resource not found"
    } else if (status >= 500) {
      errorMessage = "Server error"
    }

    throw new ApiError(errorMessage, status, data, error)
  } else if (error.request) {
    // Request was made but no response received
    throw new ApiError("No response received from server", undefined, undefined, error)
  }
  // Something happened in setting up the request
  throw new ApiError(error.message, undefined, undefined, error)
}

// Add response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
)

/**
 * Generic request function
 */
export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api.request<T>(config)
    return response.data
  } catch (error) {
    return handleApiError(error as AxiosError)
  }
}

// API Service Methods
