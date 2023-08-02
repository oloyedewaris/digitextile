import { FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react'
import React from 'react';

const ProfileSelect = ({ isRequired, onChange, value, error, label, placeholder, options, ...rest }) => {

  return (
    <FormControl isRequired={isRequired} className="input-container">
      <Text color='red' fontSize='12px'>{error}</Text>
      <FormLabel className={value && 'filled'}>
        {label}
      </FormLabel>

      <Select
        border={error ? '1px solid red' : '1px solid #2B2D42'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      >
        <option value={''} key={''}>{''}</option>
        {options.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProfileSelect
