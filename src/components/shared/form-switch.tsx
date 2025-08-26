/**
 * Important!
 * This component should be used in conjunction with the react-hook-form <Form /> component.
 */
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export type Props<T extends FieldValues> = {
  control: Control<T>; // Replace 'any' with your form's specific type
  name: Path<T>;
  id: Path<T>;
  label: string;
  description?: string;
  disabled?: boolean;
};

export function FormSwitch<T extends FieldValues>(props: Props<T>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={props.disabled}
              aria-readonly={props.disabled}
            />
          </FormControl>
          <FormMessage id={`${props.id}-error`} />
        </FormItem>
      )}
    />
  );
}
