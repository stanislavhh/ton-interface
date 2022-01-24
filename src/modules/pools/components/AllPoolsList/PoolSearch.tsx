import BaseInput from 'components/BaseInput'
import { makeStyles } from '@material-ui/core'
import { BORDER_RADIUS3 } from 'helpers/themeHelper'

export interface PoolSearchProps {
  search: string
  onChange: (value: string) => void
}

const useStyles = makeStyles((theme) => ({
  searchInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: BORDER_RADIUS3,
    },
    '& input': {
      '&::placeholder': {
        fontSize: '13px',
      },
      paddingBlock: theme.spacing(1.5),
    },
  },
}))

export const PoolSearch = ({ search, onChange }: PoolSearchProps) => {
  const classes = useStyles()

  return (
    <BaseInput
      variant="standard"
      value={search}
      onChange={onChange}
      fullWidth
      className={classes.searchInput}
      placeholder="Search by name"
    />
  )
}
