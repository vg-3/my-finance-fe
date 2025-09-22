import { formatToINR } from "@/lib/utils";
import UserAvatar from "./avatar";
import { useAuthStore } from "@/store/store";

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <UserAvatar userName={`${user?.firstName} ${user?.lastName}`} />
          <div>
            <p className="text-sm text-gray-400">Welcome back,</p>
            <h1 className="text-xl font-bold text-white">{user?.firstName}</h1>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Outstanding</p>
          <p className="text-2xl font-bold text-sky-400">
            {formatToINR(12450)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
