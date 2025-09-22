import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { JSX, useState } from "react";

interface UseConfrimProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmColor?: "red" | "blue" | "green";
}

export const useConfirm = ({
  title,
  description,
}: UseConfrimProps): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => setPromise({ resolve }));
  };

  const handelClose = () => {
    setPromise(null);
  };

  const handelConfirm = () => {
    promise?.resolve(true);
    handelClose();
  };

  const handelCancel = () => {
    promise?.resolve(false);
    handelClose();
  };

  const ConfirmationDialog = () => (
    <Drawer open={promise !== null} onOpenChange={handelClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <DrawerFooter>
          <button
            onClick={handelCancel}
            className="px-6 py-2 rounded-lg bg-[#2a2a2a] text-white font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handelConfirm}
            className={cn(
              "px-6 py-2 rounded-lg text-white font-semibold bg-red-600"
            )}
          >
            Confirm
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return [ConfirmationDialog, confirm];
};
