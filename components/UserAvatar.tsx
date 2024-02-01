import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  imageSrc?: string;
  className?: string;
}

const UserAvatar = ({ imageSrc, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageSrc} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
