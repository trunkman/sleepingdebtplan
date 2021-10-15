import React, { useState } from 'react';
import { useHistory } from 'react-router';

// api
import { patchUpdate } from '../apis/users';

// ダイアログのstyles
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// Formsコンポーネント
import { Name } from './Forms/Name';
import { Email } from './Forms/Email';
import { Password } from './Forms/Password';
import { PasswordConfirmation } from './Forms/PasswordConfirmation';

export const SettingDialog = (props) => {
  const [name, setName] = useState(props.user.name)
  const [email, setEmail] = useState(props.user.email)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmaiton] = useState('')
  const history = useHistory()

  const handleSubmit = () => {
    patchUpdate({
      user_id: props.user.id,
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }).then((data) => {
      setName('')
      setEmail('')
      setPassword('')
      setpasswordConfirmaiton('')
      alert('ユーザー情報の更新に成功しました')
      history.push(`/user/${data.user.id}`)
    }).catch(() => {
      alert('ユーザー情報の更新失敗')
    })
  }

  // Settingダイアログの内容を返す
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>設定</DialogTitle>
      <DialogContent>
        <DialogContentText>
          情報更新する項目を入力し、送信ボタンを押してください。
        </DialogContentText>

        <Name
          name={name}
          handleChange={e => setName(e.target.value)}
        />
        <Email
          email={email}
          handleChange={e => setEmail(e.target.value)}
        />
        <Password
          password={password}
          handleChange={e => setPassword(e.target.value)}
        />
        <PasswordConfirmation
          passwordConfirmation={passwordConfirmation}
          handleChange={e => setpasswordConfirmaiton(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>
          キャンセル
        </Button>
        <Button
          onClick={handleSubmit}
          type='submit'
          autoFocus
        >
          情報の更新
        </Button>
      </DialogActions>
    </Dialog>
  );
}
