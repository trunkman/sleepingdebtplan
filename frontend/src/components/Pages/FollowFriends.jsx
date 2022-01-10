import React, { useState, useReducer, useEffect } from "react";
// styles
import Box from '@mui/material/Box';
import { styled } from '@mui/system'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
// Api
import { fetchFollowing } from "../../apis/users";
import { fetchFollowers } from "../../apis/users";
// Reducer
import { followInitialState, followReducer } from '../../reducer/FollowReducer';
// コンポーネント
import { FollowList } from '../Lists/FollowList';
import { Loading } from '../Items/Loading';

const Container = styled('box')(() => ({
  alignItems: 'center',
  border: 1,
  justifyContent: 'center',
  maxWidth: 600,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 2,
}));

export const FollowFriends = ({ userId, initialTab }) => {
  const [tab, setTab] = useState(initialTab);
  const [followState, followDispatch] = useReducer(followReducer, followInitialState);

  // フォロー中のユーザーを取得する
  const Following = () => {
    fetchFollowing(userId)
      .then(data => {
        followDispatch({
          type: 'fetchSuccessFollowing',
          payload: {
            following: data.following,
            user: data.user,
          },
        });
      });
  }

  // フォロワーを取得する
  const Followers = () => {
    fetchFollowers(userId)
      .then(data => {
        followDispatch({
          type: 'fetchSuccessFollowers',
          payload: {
            followers: data.followers,
            user: data.user,
          },
        });
      });
  }

  useEffect(() => {
    followDispatch({ type: 'fetching' });
    tab === 'following'
      ? Following()
      : Followers()
  }, [tab])

  return (
    <Container>
      <Typography variant="h2" sx={{ width: '100%' }}>
        <Title>≪ {followState.user.name} ≫</Title>
      </Typography>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(event, newTab) => { setTab(newTab) }}
            variant="fullWidth"
          >
            <Tab
              label="フォロー中"
              value="following"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
            <Tab
              label="フォロワー"
              value="followers"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
          </TabList>
        </Box>
        <TabPanel value="following">
          {
            followState.fetchState !== 'ok' ? <Loading /> :
              followState.following.map(followed =>
                <FollowList
                  user={followed.user}
                  followStatus={followed.followStatus}
                />
              )
          }
        </TabPanel>
        <TabPanel value="followers">
          {
            followState.fetchState !== 'ok' ? <Loading /> :
              followState.followers.map(follower =>
                <FollowList
                  user={follower.user}
                  followStatus={follower.followStatus}
                />
              )
          }
        </TabPanel>
      </TabContext>
    </Container>
  )
}