import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';

export function useAuth() {
  const isAuthenticated = ref(false);
  const { cookies } = useCookies();

  const checkAuthentication = () => {
    const token = cookies.get('authToken');
    isAuthenticated.value = !!token; // Convert token to boolean
  };

  checkAuthentication(); // Check on initial load

  const logout = () => {
    cookies.remove('authToken');
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    logout,
  };
}
