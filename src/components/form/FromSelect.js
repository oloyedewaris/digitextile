import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'

const FormSelect = ({ isRequired, onChange, value, label, placeholder, options, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      <Select
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      >
        {options.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </Select>
    </FormControl>
  )
}

export default FormSelect