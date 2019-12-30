import React from 'react'
import { Grid, Segment, TransitionablePortal } from 'semantic-ui-react'

interface SnackBarProps {
  open?: boolean
  message?: string
  onClose: () => void
}

const SnackBar: React.FC<SnackBarProps> = ({
  open = true,
  message = '投稿が完了しました!!',
  onClose = () => {}
}) => {
  return (
    <Grid columns={2}>
      <Grid.Column>
        <TransitionablePortal
          open={open}
          transition={{ animation: 'fade down', duration: 400 }}
          onClose={onClose}
        >
          <Segment
            style={{
              left: '40%',
              position: 'fixed',
              top: '50%',
              zIndex: 1000
            }}
          >
            <p>{message}</p>
          </Segment>
        </TransitionablePortal>
      </Grid.Column>
    </Grid>
  )
  // }
}

export default SnackBar
