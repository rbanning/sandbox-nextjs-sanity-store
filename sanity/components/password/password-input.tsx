import {FormEvent, useCallback, useMemo, useState} from 'react'
import {TextInput, Button} from '@sanity/ui'
import {StringInputProps, set, unset} from 'sanity'
import { pick } from '@/lib';



export function PasswordInput(props: StringInputProps) {
  const { elementProps, onChange, validationError, value = '' } = props;
  
  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const nextValue = (e.currentTarget as HTMLInputElement).value;
    onChange(nextValue ? set(nextValue) : unset());
  }, [onChange]);

  console.log("PWD - props", props);

  return (
    <div className="flex flex-col">

      <TextInput  
        {...pick(elementProps, 'id', 'readOnly', 'placeholder', 'ref', 'onFocus', 'onBlur')}
        fontSize={[2,2,3,4]}
        onChange={handleChange}
        defaultValue={buildDots((value || '').length)} />

      <span>pwd: {value}</span>
      {!!validationError && (
        <span className="text-rose-600">{validationError}</span>
      )}
    </div>
  )
}

function buildDots(count: number) {
  return (new Array(count)).fill('•', 0, count).join('');
}