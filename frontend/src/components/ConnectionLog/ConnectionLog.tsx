import React from 'react'
import { useSelector } from 'react-redux'
import { ListItemIcon, ListItemText, ListItemSecondaryAction, List, Divider, Typography } from '@material-ui/core'
import { ApplicationState } from '../../store'
import { ListItemLocation } from '../ListItemLocation'
import { useLocation } from 'react-router-dom'
import { colors } from '../../styling'
import { Icon } from '../Icon'

type Props = {
  connection?: IConnection
}

export const ConnectionLog: React.FC<Props> = ({ connection }) => {
  const location = useLocation()
  const id = connection ? connection.id : ''
  const log = useSelector((state: ApplicationState) => state.logs[id])
  const disabled: boolean = !log

  return (
    <>
      <List>
        <ListItemLocation disabled={disabled} pathname={location.pathname + '/log'}>
          <ListItemIcon>
            <Icon name="stream" color={disabled ? 'gray' : 'primary'} size="lg" />
          </ListItemIcon>
          <ListItemText primary="Raw Connection Log" />
        </ListItemLocation>
        {disabled && (
          <ListItemSecondaryAction>
            <Typography variant="caption">EMPTY</Typography>
          </ListItemSecondaryAction>
        )}
      </List>
      <Divider />
    </>
  )
}