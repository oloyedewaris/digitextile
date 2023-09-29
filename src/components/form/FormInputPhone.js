import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react'
import React from 'react'

const FormInputPhone = ({ isRequired, code, onChange, error, value, label, placeholder, type, ...rest }) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel color='#A2A6AB'>{label}</FormLabel>
      <Text color='red' fontSize='12px'>{error}</Text>

      <InputGroup h='50px' size='md'  {...rest}>
        <InputLeftAddon h='50px' children={code} />
        <Input
          border={error ? '1px solid red' : '1px solid #2B2D42'}
          {...rest}
          h='50px'
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          type='tel'
        />
      </InputGroup>

    </FormControl >
  )
}

export default FormInputPhone