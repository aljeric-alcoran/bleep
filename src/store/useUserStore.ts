import { decodeJwt } from "jose";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { scheduleRefresh, validateAccessToken } from "@/lib/helpers";
import { User } from "@/@types";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface UserStore {
   user: User | null;
   showEditProfile: boolean;
   loading: boolean;
   accessToken: string | null;
   justLoggedIn: boolean;
   setUser: (user: User, accessToken: string) => void;
   setShowEditProfile: () => void;
   clearUser: () => void;
   setJustLoggedIn: (value: boolean) => void;
   updateUserFromStore: (userObject: Partial<User>, callback?: () => void) => void;
   refresh: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
   persist(
      (set, get) => ({
         user: null,
         showEditProfile: false,
         loading: true,
         accessToken: null,
         justLoggedIn: false,
         setUser: (user, accessToken) => {
            set({ user, accessToken, justLoggedIn: true });
            scheduleRefresh(accessToken, () => {
               set({ loading: false})
            });
         },
         setShowEditProfile: () => set((state) => ({ showEditProfile: !state.showEditProfile })),
         clearUser: () => set({ user: null, accessToken: null }),
         setJustLoggedIn: (value) => set({ justLoggedIn: value }),
         updateUserFromStore: (userObject: Partial<User>, callback?: () => void) =>
            set((state) => {
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
               const user = await validateAccessToken(data.accessToken);

               set({ user: user.user, accessToken: data.accessToken });
               scheduleRefresh(data.accessToken, () => {
                  set({ loading: false})
               });
            } catch (err) {
               console.error("refresh error", err);
               get().clearUser();
            }
         },
      }),
      {
         name: "user-store",
         storage: createJSONStorage(() => localStorage),
         partialize: (state) => ({
            user: state.user,
            accessToken: state.accessToken,
         }),
         onRehydrateStorage: () => (state, error) => {
            if (error) {
               console.error("Error rehydrating user store", error);
            } else if (state?.accessToken) {
               const { exp } = decodeJwt(state.accessToken);
               if (exp && Date.now() >= exp * 1000) {
                  state.refresh();
               } else {
                  scheduleRefresh(state.accessToken, () => {
                  state.loading = false;
               });
               }
            }
         },
      }
   )
);