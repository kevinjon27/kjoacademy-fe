import { create } from "zustand";
import { Course } from "@/types/course";

type State = {
  courses: Course[];
  selectedCourse: Course | null;
};

type Actions = {
  setCourses: (courses: Course[]) => void;
  setSelectedCourse: (course: Course | null) => void;
};

const useAuthStore = create<State & Actions>((set) => ({
  // state
  courses: [],
  selectedCourse: null,

  // actions
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
}));

export default useAuthStore;
