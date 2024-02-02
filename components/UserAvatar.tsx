import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface UserAvatarProps {
  imageSrc?: string;
  className?: string;
}

const UserAvatar = ({ imageSrc, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageSrc} />
      <AvatarFallback>
        <Image
          src="/assets/default-avatar.svg"
          width={30}
          height={30}
          alt="avatar"
        />
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
