import { create } from "zustand";
import { Course } from "@/types/course";

type CourseState = {
  courses: Course[];
  selectedCourse: Course | null;
};

type CourseActions = {
  setCourses: (courses: Course[]) => void;
  setSelectedCourse: (course: Course | null) => void;
};

const useCourseStore = create<CourseState & CourseActions>((set) => ({
  // state
  courses: [],
  selectedCourse: null,

  // actions
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
}));

export default useCourseStore;
