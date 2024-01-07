import React, { BaseSyntheticEvent, FC, ReactElement, useState } from "react";
import * as ReactDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, ButtonColor, ButtonWidth } from "./Button";

interface ConfirmationDialogProps {
  triggerButton: ReactElement;
  claimed: boolean;
  onConfirm: (e?: BaseSyntheticEvent) => void;
  loading?: boolean;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  triggerButton,
  claimed,
  onConfirm: onConfirmProp,
  loading,
}) => {
  const [open, setOpen] = useState(false);

  const onConfirm = () => {
    onConfirmProp();
    setOpen(false);
  };

  return (
    <ReactDialog.Root open={open} onOpenChange={setOpen}>
      <ReactDialog.Trigger asChild>{triggerButton}</ReactDialog.Trigger>
      <ReactDialog.Portal>
        <ReactDialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
        <ReactDialog.Content className="fixed left-1/2 top-1/2 z-20 max-h-[85vh] w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-6 shadow-xl">
          <div className="flex flex-col items-center space-y-3 text-center">
            <ReactDialog.Title className="text-2xl font-medium">
              Are you sure?
            </ReactDialog.Title>
            <ReactDialog.Description className="text-art-gray-light">
              {claimed
                ? "You can reclaim this art later if it's still available."
                : "Claimed art works appear on the dashboard."}
            </ReactDialog.Description>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2">
            <ReactDialog.Close asChild>
              <Button
                label="Cancel"
                color={ButtonColor.GRAY}
                width={ButtonWidth.FULL}
                disabled={loading}
              />
            </ReactDialog.Close>
            <Button
              label={claimed ? "Unclaim" : "Claim"}
              width={ButtonWidth.FULL}
              disabled={loading}
              onClick={onConfirm}
            />
          </div>
          <ReactDialog.Close asChild>
            <button className="absolute right-4 top-4" aria-label="Close">
              <Cross2Icon />
            </button>
          </ReactDialog.Close>
        </ReactDialog.Content>
      </ReactDialog.Portal>
    </ReactDialog.Root>
  );
};

export default ConfirmationDialog;
