import { useState, useEffect, useRef } from 'react'
import { Grid, makeStyles, debounce } from '@material-ui/core'
import BaseDialog, { BaseDialogProps } from 'components/BaseDialog'
import BaseInput from 'components/BaseInput'
import { BORDER_RADIUS3 } from 'helpers/themeHelper'
import { Token } from 'modules/shared'
import { TokensList } from './TokensList'

interface TokensListDialogProps extends BaseDialogProps {
  tokens: Token[]
  selectedToken: Token | null
  onTokenSelect: (token: Token) => void
  loading?: boolean
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

export const TokensListDialog = (props: TokensListDialogProps) => {
  const { tokens, onTokenSelect, selectedToken, loading, open, ...rest } = props
  const classes = useStyles()

  const [searchableList, setList] = useState<Token[]>(tokens)
  const [search, setSearch] = useState<string>('')

  const debounced = useRef(debounce((list) => setList(list), 350))

  useEffect(() => {
    const lcs = search.toLowerCase()
    debounced.current(
      tokens.filter((token) => token.name.toLowerCase().includes(lcs) || token.symbol.toLowerCase().includes(lcs)),
    )
  }, [tokens, search])

  useEffect(() => {
    setList(tokens)
    setSearch('')
  }, [tokens, open])

  return (
    <BaseDialog title="Select Token" open={open} fullWidth maxWidth="xs" {...rest}>
      <Grid item xs={12}>
        <BaseInput
          variant="standard"
          value={search}
          onChange={setSearch}
          fullWidth
          className={classes.searchInput}
          placeholder="Search by name"
        />
      </Grid>
      <Grid item xs={12}>
        <TokensList onSelect={onTokenSelect} loading={loading} selected={selectedToken} tokens={searchableList} />
      </Grid>
    </BaseDialog>
  )
}
