import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        className={cn("space-y-4", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Form.displayName = "Form"

export { Form }
