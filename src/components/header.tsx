import { formatToINR } from "@/lib/utils";
import UserAvatar from "./avatar";
import { useAuthStore } from "@/store/store";
import { redirect } from "next/navigation";
import { useGetLoans } from "@/api/use-get-loans";
import { Loan } from "@/api/use-get-loan";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    redirect("/sign-in");
  }
  const { data: loans } = useGetLoans(user.id);

  const totalOutstanding =
    loans?.reduce((acc: number, loan: Loan) => acc + loan.remainingAmount, 0) ||
    0;

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
            {formatToINR(totalOutstanding)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
