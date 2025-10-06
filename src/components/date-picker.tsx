"use client";

import { ChevronDownIcon } from "lucide-react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useState } from "react";

type DatePickerProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, FieldPath<T>>;
  label?: string;
};

export function DatePicker<T extends FieldValues>({
  field,
  label,
}: DatePickerProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-full justify-between font-normal"
            >
              {field.value ? field.value.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              captionLayout="dropdown"
              onSelect={(date) => {
                field.onChange(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
