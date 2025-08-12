import axiosInstance, { AxiosRequestConfig } from './axios';

// Generic API service class
export class ApiService {
  // GET request
  static async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  }

  // POST request
  static async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  // PUT request
  static async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  // PATCH request
  static async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  // DELETE request
  static async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

// Public API functions (no authentication required)
export const publicApi = {
  // Example public endpoints
  getPublicData: () => ApiService.get('/public/data'),
  login: (credentials: { phone: string; password?: string }) => 
    ApiService.post('/auth/login', credentials),
  register: (userData: any) => 
    ApiService.post('/auth/register', userData),
};

// Private API functions (authentication required)
export const privateApi = {
  // User profile
  getUserProfile: () => ApiService.get('/user/profile'),
  updateUserProfile: (data: any) => ApiService.put('/user/profile', data),
  
  // Notifications
  getNotifications: () => ApiService.get('/user/notifications'),
  markNotificationAsRead: (id: string) => ApiService.patch(`/user/notifications/${id}/read`),
  
  // Courses
getCourses: () => ApiService.get('/courses'),
getCourseById: (id: string) => ApiService.get(`/courses/${id}`),
  
  // Logout
  logout: () => ApiService.post('/auth/logout'),
};

// Export the axios instance for direct use if needed
export { default as axios } from './axios';
