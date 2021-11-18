import React from "react";
import { Link } from "react-router-dom";
// styles
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// アイコン
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

export const RankingButton = (props) => {
  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          color="inherit"
          component={Link}
          to={`/users/${props.loginUserId}`}
        >
          <ListItemIcon>
            <StarOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='ランキング' />
        </ListItem>
      </List>
    </>
  )
}