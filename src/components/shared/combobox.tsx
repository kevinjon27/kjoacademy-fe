"use client";

import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { debounce } from "es-toolkit";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ComboboxOption = { value: string; label: string };

export type ComboboxProps = {
  value?: string;
  onValueChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  emptyPlaceholder?: string;
  onSearch?: (search: string) => Promise<void> | void;
  disabled?: boolean;
};

function getComboboxValueLabel({
  value,
  options,
  placeholder,
}: {
  value?: string;
  options: ComboboxOption[];
  placeholder: string;
}): string {
  if (!value) {
    return placeholder;
  }
  const option = options.find((option) => option.value === value);
  return option?.label || placeholder;
}

export function Combobox({
  value,
  onValueChange,
  options,
  placeholder = "Select Item",
  emptyPlaceholder = "No item found.",
  onSearch,
  disabled,
}: ComboboxProps) {
  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const searchValue = target.value || "";
    onSearch?.(searchValue);
  };
  const debouncedOnSearch = useMemo(() => debounce(handleSearch, 800), []);

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {getComboboxValueLabel({ value, options, placeholder })}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput
            className="h-9 focus:outline-none flex-1"
            placeholder={placeholder}
            onInput={onSearch ? debouncedOnSearch : undefined}
          />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {options.map((option: ComboboxOption) => (
                <CommandItem
                  value={option.label}
                  key={`cbb-option-${option.value}`}
                  onSelect={() => onValueChange(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      option.value === value ? "opacity-100" : "opacity-0"
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
