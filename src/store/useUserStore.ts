import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { clearScheduledRefresh, scheduleRefresh, validateAccessToken } from "@/lib/helpers";
import { User } from "@/@types";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UserStore {
   user: User | null;
   showEditProfile: boolean;
   loading: boolean;
   accessToken: string | null;
   justLoggedIn: boolean;
   setUser: (user: User | null, accessToken: string) => void;
   setShowEditProfile: () => void;
   clearUser: () => void;
   setJustLoggedIn: (value: boolean) => void;
   updateUserFromStore: (userObject: Partial<User>, callback?: () => void) => void;
   refresh: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
   persist((set, get) => ({
      user: null,
      showEditProfile: false,
      loading: true,
      accessToken: null,
      justLoggedIn: false,

      setUser: (user, accessToken) => {
         set({ user, accessToken, loading: false, justLoggedIn: true });
         scheduleRefresh(accessToken, () => get().refresh());
      },

      setShowEditProfile: () => set((state) => ({ 
         showEditProfile: !state.showEditProfile 
      })),

      clearUser: () => {
         clearScheduledRefresh();
         set({ user: null, accessToken: null, loading: false, justLoggedIn: false });
      },

      setJustLoggedIn: (value) => set({ justLoggedIn: value }),

      updateUserFromStore: (userObject, callback) => set((state) => {
         const updatedUser = state.user
            ? { ...state.user, ...userObject }
            : (userObject as User);
         queueMicrotask(() => callback?.());
         return { user: updatedUser };
      }),

      refresh: async () => {
         try {
            const res = await fetch(`${baseURL}/auth/refresh`, {
               method: "GET",
               credentials: "include",
            });

            if (!res.ok) throw new Error("Refresh failed");

            const data = await res.json();
            const validated = await validateAccessToken(data.accessToken);

            set({
               user: validated.user,
               accessToken: data.accessToken,
               loading: false,
            });

            scheduleRefresh(data.accessToken, () => get().refresh());
         } catch (err) {
            console.error("Refresh error:", err);
            get().clearUser();
         }
      },
   }),
   {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
         user: state.user,
      }),
      onRehydrateStorage: () => (state, error) => {
         if (error) {
            console.error("Error rehydrating user store:", error);
            return;
         }
         state?.refresh();
      },
   })
);