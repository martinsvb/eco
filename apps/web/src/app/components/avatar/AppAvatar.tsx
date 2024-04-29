import { memo } from "react";
import { Avatar, AvatarProps, Tooltip } from "@mui/material";
import ms from "ms";
import { UserFull, UserItems, getUserInitials } from "@eco/types";

export type AppAvatarProps = {
  showTooltip?: boolean;
} & Pick<UserFull, UserItems.Name | UserItems.Picture> & AvatarProps;


const AppAvatar = ({
  name,
  picture,
  showTooltip,
  ...rest
}: AppAvatarProps) => {

  const userInitials = getUserInitials(name);

  const avatar = (
    <Avatar
      {...rest}
      alt={userInitials}
      src={picture || ''}
    >
      {userInitials}
    </Avatar>
  );

  return (
    showTooltip ?
      <Tooltip
        title={name}
        enterDelay={ms('0.1s')}
      >
        {avatar}
      </Tooltip>
      :
      avatar
  )
}

export default memo(AppAvatar);
