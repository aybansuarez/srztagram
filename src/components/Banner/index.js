import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import defaultLogo from '../../assets/default_avatar.png';
import { bannerStyle } from './styles';
import FollowButton from '../FollowButton'
import UnfollowButton from '../UnfollowButton'
import { findProfile } from '../../utils/helper';

function Banner({ profile }) {
  const style = bannerStyle();
  const profileID = useSelector(state => state.currentUser).profile;

  return (
    <Grid container>
      <Grid container className={style.username}>
        <Grid item xs={4}>
          {profile.username}
        </Grid>
        <Grid item xs={8} className={style.button}>
          {
            profile._id === profileID ? null :
              findProfile(profile.followers, profileID) ?
                <UnfollowButton reload user={profile} profile={profileID} />
                :
                <FollowButton reload user={profile} profile={profileID} />
          }
        </Grid>
      </Grid>
      <Grid container className={style.root}>
        <Grid item xs={5}>
          <Avatar
            src={profile.avatar ? profile.avatar : defaultLogo}
            alt={profile.username}
            className={style.avatar}
          />
        </Grid>
        <Grid item xs={6} className={style.user}>
          <Typography variant='body1' className={style.display}>
            {profile.name}
          </Typography>
          <Typography noWrap={true} className={style.caption}>
            {profile.bio}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={style.stats}>
        <Grid item xs={4}>
          <NavLink
            activeClassName={style.active}
            exact to={`/${profile.username}`}
          >
            <div>Posts</div>
            <div>{profile.posts.length}</div>
          </NavLink>
        </Grid>
        <Grid item xs={4}>
          <NavLink
            activeClassName={style.active}
            to={`/${profile.username}/followers`}
          >
            <div>Followers</div>
            <div>{profile.followers.length}</div>
          </NavLink>
        </Grid>
        <Grid item xs={4}>
          <NavLink
            activeClassName={style.active}
            to={`/${profile.username}/following`}
          >
            <div> Following</div>
            <div>{profile.following.length}</div>
          </NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Banner;
