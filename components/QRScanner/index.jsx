import BarebonesQRScanner from "./BarebonesQRScanner";
import Button from "@components/Button";

export const FEEDBACK = {
  SUCCESS: {
    message: "Success",
    color: "bg-success",
  },
  SCANNING: {
    message: "Scanning...",
    color: "bg-gray-500",
  },
  ALREADY_HAS: {
    message: "User already has badge",
    color: "bg-warning",
  },
  FAILURE: {
    message: "Failure",
    color: "bg-failure",
  },
  INVALID: {
    message: "Invalid QR",
    color: "bg-failure",
  },
};

function QRScanner({
  handleCode,
  pauseRef,
  text,
  feedback,
  showScanner,
  setScanner,
  removeClose,
}) {
  if (!showScanner) {
    return null;
  }

  return (
    <div className="grid-cols-1, grid gap-6">
      <div className="m-auto block flex h-16  w-1/2 items-center justify-center rounded-2xl bg-quinary text-black">
        <p className="font-ibold font-bold">{text}</p>
      </div>
      <BarebonesQRScanner handleCode={handleCode} pauseRef={pauseRef} />
      <div className="w-auto">
        <div
          className={`${feedback.color} m-auto block flex h-16 w-full items-center justify-center rounded-2xl`}
        >
          <p className="font-ibold font-bold">{feedback.message}</p>
        </div>
      </div>
      {removeClose !== true && (
        <Button
          text="Close"
          onClick={() => {
            setScanner(false);
          }}
        ></Button>
      )}
    </div>
  );
}

export default QRScanner;
