import { PaginatedResponse } from "@/types/dto/paginated-response";
import { CourseModule } from "@/types/course";

export type GetModulesResponse = PaginatedResponse<CourseModule>;

export type GetModuleByIdResponse = {
  data: CourseModule;
};

export type CreateModuleResponse = {
  message: string;
  data: CourseModule;
};

export type UpdateModuleResponse = {
  message: string;
  data: CourseModule;
};

export type DeleteModuleResponse = {
  message: string;
};
