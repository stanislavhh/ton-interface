import { CSSProperties } from 'react'
import {
  ListItem,
  Box,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  Typography,
  Fade,
  CircularProgress,
} from '@material-ui/core'
import { FixedSizeList as List } from 'react-window'
import { Token, TokenWithBalance } from 'modules/shared'

interface TokensListProps {
  tokens: TokenWithBalance[]
  selected: Token | null
  loading?: boolean
  onSelect: (token: Token) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    overflow: 'auto',
    margin: 'auto',
  },
  centeredFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    minWidth: '40px',
  },
  avatar: {
    width: '28px',
    height: '28px',
  },
}))

export const TokensList = (props: TokensListProps) => {
  const { tokens, selected, loading, onSelect } = props
  const classes = useStyles()

  const renderTokenListItem = (token: TokenWithBalance, style: CSSProperties, index: number) => (
    <ListItem
      key={index}
      style={style}
      onClick={() => onSelect(token)}
      selected={token.address === selected?.address && token.name === selected?.name}
      button
    >
      <Fade key={`${token.address}_${token.name}`}>
        <>
          <ListItemAvatar className={classes.avatarContainer}>
            <Avatar className={classes.avatar} src={token.logoURI} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{token.symbol}</Typography>
                </Box>
              </>
            }
            secondary={<Typography variant="caption">{token.name}</Typography>}
          />
          <Typography variant="caption">{token.balance.toFixed(2)}</Typography>
        </>
      </Fade>
    </ListItem>
  )

  return loading ? (
    <Box className={`${classes.root} ${classes.centeredFlex}`}>
      <CircularProgress size={32} />
    </Box>
  ) : (
    <List
      itemData={tokens}
      width="100%"
      itemCount={tokens.length}
      itemSize={56}
      height={400}
      className={`${classes.root} ${loading ? classes.centeredFlex : ''}`}
    >
      {({ data, index, style }) => renderTokenListItem(data[index], style, index)}
    </List>
  )
}
