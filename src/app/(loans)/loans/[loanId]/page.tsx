import LoanDetails from "@/components/ui/loan-details";

export default async function LoanDetailsPage({
  params,
}: {
  params: { loanId: string };
}) {
  const { loanId } = await params;

  return <LoanDetails loanId={parseInt(loanId)} />;
}
