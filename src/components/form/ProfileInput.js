import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react';

const ProfileInput = ({ isRequired, onChange, error, value, label, placeholder, type, ...rest }) => {

  return (
    <FormControl isRequired={isRequired} className="input-container">
      <Text color='red' fontSize='12px'>{error}</Text>
      <Input
        {...rest}
        border={error ? '1px solid red' : '1px solid #2B2D42'}
        type={type}
        value={value}
        onChange={onChange}
      />
      <FormLabel className={value && 'filled'}>
        {label}
      </FormLabel>
    </FormControl>
  );
}

export default ProfileInput
