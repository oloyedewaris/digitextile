import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react'
import React from 'react'

const FormSelect = ({ isRequired, onChange, value, error, label, placeholder, options, ...rest }) => {
  return (
    <FormControl isRequired={isRequired} {...rest}>
      <FormLabel>{label}</FormLabel>
      <Text color='red' fontSize='12px'>{error}</Text>
      <Select
        border={error ? '1px solid red' : '1px solid #2B2D42'}
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