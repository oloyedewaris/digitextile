import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React from 'react'

const FormInputPassword = ({ isRequired, onChange, error, value, label, placeholder, type, ...rest }) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel color='#A2A6AB'>{label}</FormLabel>
      <Text color='red' fontSize='12px'>{error}</Text>

      <InputGroup size='md'>
        <Input
          {...rest}
          border={error ? '1px solid red' : '1px solid #2B2D42'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}

          pr='4.5rem'
          type={show ? 'text' : 'password'}
        />
        <InputRightElement width='4.5rem'>
          <Button bg='transparent' mt='10px' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>

    </FormControl>
  )
}

export default FormInputPassword