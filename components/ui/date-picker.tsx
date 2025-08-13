import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";

type Props = {
  label?: string;
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

function DatePicker(props: Props) {
  const { label, date, onSelect } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className="w-48 justify-between bg-transparent font-normal"
        >
          {date ? date.toLocaleDateString() : label}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            onSelect(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
