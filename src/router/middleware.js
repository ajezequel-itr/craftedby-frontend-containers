import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

export function redirectToLogin(to) {
    const userStore = useUserStore()
    if (!userStore.userObject) {
      return `/login?to=${to.name}`;
    }
}

export function checkAdminRights(to) {
  const userStore = useUserStore();

  const isAdmin = userStore.userObject.role.some(role => role.name === "admin");
  if (!isAdmin) {
    // return `/login?to=${to.name}`;
    return router.push('/login');
  }
}
