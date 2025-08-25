"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { debounce } from "es-toolkit";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Option = {
  value: string;
  label: string;
};

export type Props = {
  defaultValue?: string;
  placeholder?: string;
  onSearch: (value: React.ChangeEvent<HTMLInputElement>) => Promise<Option[]>;
  onChange: (value: string) => void;
};

export function SmartCombobox({
  defaultValue = "",
  placeholder = "Select an option",
  onSearch,
  onChange,
  ...props
}: Props) {
  console.log('the props', props)
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);
  const [value, setValue] = React.useState(defaultValue);

  const debouncedOnSearch = React.useMemo(
    () =>
      debounce(async (q: React.ChangeEvent<HTMLInputElement>) => {
        const result = await onSearch(q);
        setOptions(result);
      }, 800),
    []
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <input
            type="text"
            name="test"
            id="test"
            onChange={debouncedOnSearch}
          />
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
