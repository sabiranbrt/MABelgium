import { request } from "./axios"

export const getProvince = () => {
  return request<TODO>({
    url: "/province",
    method: "GET",
  })
}

export const getDistrict = (provinceID: number) => {
  return request<TODO>({
    url: `/district/${provinceID}`,
    method: "GET",
  })
}

export const getMunicipality = (districtID: number) => {
  return request<TODO>({
    url: `/municipality/${districtID}`,
    method: "GET",
  })
}