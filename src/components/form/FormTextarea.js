import { FormControl, FormLabel, Text, Textarea } from '@chakra-ui/react'
import React from 'react'

const FormTextarea = ({ isRequired, onChange, error, value, label, placeholder, type, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel color='#A2A6AB'>{label}</FormLabel>
      <Text color='red' fontSize='12px'>{error}</Text>
      <Textarea
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

export default FormTextarea