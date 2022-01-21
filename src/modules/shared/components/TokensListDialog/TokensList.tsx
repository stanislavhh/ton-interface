import {
  List,
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
import { Token } from 'modules/shared'
import { TransitionGroup } from 'react-transition-group'

interface TokensListProps {
  tokens: Token[]
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

  const renderTokenListItem = (token: Token) => (
    <Fade key={`${token.address}_${token.name}`}>
      <ListItem
        onClick={() => onSelect(token)}
        selected={token.address === selected?.address && token.name === selected?.name}
        button
      >
        <ListItemAvatar className={classes.avatarContainer}>
          <Avatar className={classes.avatar} src={token.logoURI} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{token.symbol}</Typography>
              <Typography variant="caption">{token.name}</Typography>
            </Box>
          }
        />
      </ListItem>
    </Fade>
  )

  return (
    <List className={`${classes.root} ${loading ? classes.centeredFlex : ''}`}>
      {!loading ? (
        <TransitionGroup>{tokens.map((token) => renderTokenListItem(token))}</TransitionGroup>
      ) : (
        <CircularProgress size={32} />
      )}
    </List>
  )
}
