import { getDistrict, getMunicipality, getProvince, getSave } from "@/services"
import { useEffect, useState } from "react"

export const useProvinceList = () => {
  const [data, setData] = useState<TODO>(null)
  const [loading, setLoading] = useState<boolean>(false)
  
  const fetchProvince = async () => {
    try {
      const response = await getProvince()
      setData(response)
      
    } catch (err) {
      console.log("Error",err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchProvince()
  }, []) // Refetch when params change
  
  return {
    data,
    loading,
  }
}

export const useDistrictList = (provinceID?: number) => {
  const [data, setData] = useState<TODO>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchDistrict = async () => {
    if (!provinceID) return // Prevent fetching when `provinceID` is undefined
    setLoading(true)
    try {
      const response = await getDistrict(provinceID)
      setData(response)
    } catch (err) {
      console.log("Error", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDistrict()
  }, [provinceID]) // Refetch when provinceID changes

  return { data, loading, refetch: fetchDistrict }
}

export const useMunicipalityList = (districtID? : number) => {
  const [data, setData] = useState<TODO>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchMunicipality = async () => {
    if (!districtID) return // Prevent fetching when `provinceID` is undefined
    setLoading(true)
    try {
      const response = await getMunicipality(districtID)
      setData(response)
    } catch (err) {
      console.log("Error", err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMunicipality()
  }, [districtID]) // Refetch when districtID changes

  return { data, loading, refetch: fetchMunicipality }
}

export const useSaveData = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const saveData = async (data: FormData) => {
    try {
      setIsLoading(true)
      setIsSuccess(false)
      setError(null)

      console.log("Saving data:", data) // Log the request data

      const response = await getSave(data)
      console.log("Save successful:", response) // Log the response
      
      setIsSuccess(true)
    } catch (err) {
      console.error("Save failed:", err) // Log the error
      setError(err as Error)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return { saveData, isLoading, error, isSuccess }
}