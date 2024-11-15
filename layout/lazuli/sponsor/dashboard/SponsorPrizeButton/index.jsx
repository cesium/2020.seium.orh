import Button from "@components/Button";

export default function SponsorPrizeButton({ prize }) {
  return (
    <div className="mt-8 w-auto">
      <Button
        className="h-16 w-full bg-quinary"
        title={`🏅  Prémio ${prize}`}
      />
    </div>
  );
}
