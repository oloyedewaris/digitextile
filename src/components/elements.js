import { useQuery } from "react-query";
import FormSelect from "./form/FromSelect"
import { getCategoriesApi } from "@/apis/category";

export const FilterCategory = () => {
  const { data } = useQuery(["getCategories"], getCategoriesApi);
  const categories = data?.data?.data

  return (
    <FormSelect
      borderRadius='full'
      w='120px'
      border='1px solid #2B2D42'
      placeholder={'Category'}
      options={categories?.map(cat => cat?.name) || []}
    />
  )
}

export const FilterSection = () => {
  return (
    <FormSelect
      borderRadius='full'
      w='120px'
      border='1px solid #2B2D42'
      placeholder={'Section'}
      options={[]}
    />
  )
}

export const FilterDate = () => {
  return (
    <FormSelect
      borderRadius='full'
      w='120px'
      border='1px solid #2B2D42'
      placeholder={'Date'}
      options={[]}
    />
  )
}