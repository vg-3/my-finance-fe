import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Options {
  id: number | string;
  name: string;
}

interface CustomSelectProps {
  placeholder: string;
  options: Options[];
  value: string;
  onChange: (value: string) => void;
}

export const CustomSelect = ({
  placeholder,
  options,
  value,
  onChange,
}: CustomSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((options) => {
          return (
            <SelectItem key={options.id} value={String(options.id)}>
              {options.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
