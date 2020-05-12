import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({open, handleClose}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">모니터링 주식정보 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            모니터링 대상이 되는 주식종목코드 혹은 주식명을 입력하세요
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="주식정보"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleClose} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}