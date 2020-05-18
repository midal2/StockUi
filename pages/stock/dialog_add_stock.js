import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {addStockInfo} from '../../controller/stock';
//리덕스
import { useDispatch } from 'react-redux';

const stockInfo = [
  { title: '웹케시', stockCd: '053580' },
  { title: '셀트리온', stockCd: '068270' },
  { title: '셀트리온제약', stockCd: '068760' }, 
  { title: '아프리카TV', stockCd: '067160' }, 
]

export default function FormDialog({open, handleClose}) {
  const dispatch = useDispatch();
  const [stockinfos, setStockinfos] = useState([]);

  var addHandler =(event)=>{
    addStockInfo(dispatch, stockinfos);
    handleClose(event);
  };

  var onChangeHandler = (event, value, reason) => {
    setStockinfos(value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">모니터링 주식정보 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            모니터링 대상이 되는 주식종목코드 혹은 주식명을 입력하세요
          </DialogContentText>
          <Autocomplete
            multiple
            options={stockInfo}
            getOptionLabel={(option) => option.title}
            id="debug"
            onChange={onChangeHandler}
            debug
            renderInput={(params) => <TextField {...params} label="주식종목명(코드)" margin="normal" placeholder="주식정보"/>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={addHandler} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}