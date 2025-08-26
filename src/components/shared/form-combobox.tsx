/**
 * Important!
 * This component should be used in conjunction with the react-hook-form <Form /> component.
 */
"use client";

import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { debounce } from "es-toolkit";
import {
  UseFormReturn,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
export type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  id: Path<T>;
  label: string;
  description?: string;
  disabled?: boolean;
  options: ComboboxOption[];
  defaultOption?: ComboboxOption;
  placeholder?: string;
  emptyPlaceholder?: string;
  onSearch: (search: string) => Promise<void> | void;
};

function getComboboxValueLabel({
  selectedOption,
  options,
  placeholder,
}: {
  selectedOption: ComboboxOption | undefined;
  options: ComboboxOption[];
  placeholder: string;
}): string {
  if (!selectedOption) {
    return placeholder;
  }
  if (options.length) {
    const option = options.find(
      (option) => option.value === selectedOption.value
    );
    if (option) {
      return option.label;
    }
  }

  return selectedOption.label;
}

export function FormCombobox<T extends FieldValues>({
  form,
  name,
  id,
  label,
  description,
  disabled,
  options,
  defaultOption,
  placeholder = "Select Item",
  emptyPlaceholder = "No item found.",
  onSearch,
}: Props<T>) {
  const [selectedOption, setSelectedOption] = useState<
    ComboboxOption | undefined
  >(undefined);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    const value = target.value || "";
    onSearch(value);
  };
  const debouncedOnSearch = useMemo(() => debounce(handleSearch, 800), []);

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <Popover>
            <PopoverTrigger asChild disabled={disabled}>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {getComboboxValueLabel({
                    selectedOption,
                    options,
                    placeholder,
                  })}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[480px] p-0">
              <Command>
                <CommandInput
                  className="h-9 focus:outline-none flex-1"
                  placeholder={placeholder}
                  onInput={debouncedOnSearch}
                />
                <CommandList>
                  <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option: ComboboxOption) => (
                      <CommandItem
                        value={option.label}
                        key={`cbb-option-${option.value}`}
                        onSelect={() => {
                          form.setValue(
                            id,
                            option.value as PathValue<T, Path<T>>
                          );
                          setSelectedOption(option);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage id={`${name}-error`} />
        </FormItem>
      )}
    />
  );
}
