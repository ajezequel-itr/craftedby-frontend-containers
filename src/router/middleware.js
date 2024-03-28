import { useUserStore } from '@/stores/user.js'

export function redirectToLogin(to) {
    const userStore = useUserStore()
    if (!userStore.userObject) {
      return `/login?to=${to.name}`;
    }
}