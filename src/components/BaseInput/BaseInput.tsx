import React, { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react'
import { TextField, Box, makeStyles } from '@material-ui/core'
import { BORDER_RADIUS5 } from 'helpers/themeHelper'
import { BaseTextFieldProps } from '@material-ui/core/TextField/TextField'

export interface BaseInputProps extends BaseTextFieldProps {
  rtl?: boolean
  otherSizes?: 'extra-sm'
  numeric?: boolean
  min?: number
  max?: number
  precision?: number
  onChange?: (value: string) => void
  onBlur?: FocusEventHandler
}

const useStyles = makeStyles((theme) => ({
  textField: {
    '& input': {
      textAlign: ({ rtl }: { rtl?: boolean }) => (rtl ? 'right' : 'left'),
    },
  },

  extraSmall: {
    '& .MuiInputBase-root': {
      borderRadius: BORDER_RADIUS5,
      '&::after, &::before': {
        content: 'none',
      },
    },
    '& input': {
      padding: '3px 5px',
      ...theme.typography.body2,
    },
  },
}))

const NUMERIC_SPECIAL_KEYS = ['Period', 'Backspace', 'ArrowRight', 'ArrowLeft', 'Delete', 'Minus']
export const DEFAULT_PRECISION = 6

export const BaseInput = (props: BaseInputProps): JSX.Element => {
  const {
    label,
    rtl,
    className,
    otherSizes,
    numeric,
    value,
    onChange,
    onBlur,
    min,
    max,
    onKeyDown,
    precision = DEFAULT_PRECISION,
    ...rest
  } = props
  const classes = useStyles({ rtl })

  const inputValue = String(value || value === 0 ? value : '')

  /**
   * I had to add a lot of shitty cases so the numeric input can work properly on UI
   * @param e
   */
  const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    const sValue = e.target.value

    if (
      numeric &&
      (sValue.split('.')[1]?.length > precision ||
        (sValue.includes('-') && Number(min) >= 0) ||
        (sValue.length > 1 && sValue[sValue.length - 1] === '-') ||
        sValue.split('').reduce((quantity, s) => (s === '.' ? quantity + 1 : quantity), 0) > 1)
    ) {
      return
    }

    onChange?.(sValue)
  }

  const handleBlur: FocusEventHandler = (e) => {
    const numValue = Number(value)

    if (typeof max === 'number' && numValue > max) {
      onChange?.(String(max))
      onBlur?.(e)
      return
    }

    if (typeof min === 'number' && numValue < min) {
      onChange?.(String(min))
      onBlur?.(e)
      return
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (numeric && !e.code.includes('Digit') && !NUMERIC_SPECIAL_KEYS.includes(e.code)) {
      e.preventDefault()
    }

    onKeyDown?.(e)
  }

  return (
    <Box position="relative">
      {label || null}
      <TextField
        value={inputValue}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onChange={handleChange}
        className={`${classes.textField} ${otherSizes === 'extra-sm' ? classes.extraSmall : ''} ${className || ''}`}
        {...rest}
      />
    </Box>
  )
}
