import Dialog from "src/components/molecules/Dialog";
import Button from "src/components/atoms/Button";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
};

const ConfirmDialog = ({
  children,
  isOpen,
  onClose,
  onConfirmSubmit,
}: Props) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      {children}
      <div className="mt-4 w-full flex space-x-4 items-center justify-center">
        <Button
          backgroundColor="bg-gray-600"
          borderFormat="rounded-md"
          label="NO"
          onClick={onClose}
          textFormat="text-white font-bold"
        />
        <Button
          backgroundColor="bg-gray-600"
          borderFormat="rounded-md"
          label="YES"
          onClick={onConfirmSubmit}
          textFormat="text-white font-bold"
        />
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
