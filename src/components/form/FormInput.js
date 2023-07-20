import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'

const FormInput = ({ isRequired, onChange, error, value, label, placeholder, type, ...rest }) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel color='#A2A6AB'>{label}</FormLabel>
      <Text color='red' fontSize='12px'>{error}</Text>
      <Input
        {...rest}
        border={error ? '1px solid red' : '1px solid #2B2D42'}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormControl>
  )
}

export default FormInput