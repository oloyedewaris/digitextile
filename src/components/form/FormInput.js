import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const FormInput = ({ isRequired, onChange, value, label, placeholder, type, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      <Input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormControl>
  )
}

export default FormInput