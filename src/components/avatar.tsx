import { getUserInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface UserAvatarProps {
  userName: string;
}

const UserAvatar = ({ userName }: UserAvatarProps) => {
  return (
    <Avatar className="w-12 h-12 rounded-full border-2 border-[#2A2A2A] bg-[#1E1E1E]">
      <AvatarFallback className="bg-">
        {getUserInitials(userName)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
