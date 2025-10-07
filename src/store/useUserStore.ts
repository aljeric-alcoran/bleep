import { decodeJwt } from "jose";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { scheduleRefresh, validateAccessToken } from "@/lib/helpers";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface User {
   id: string;
   firstname: string;
   lastname: string;
   phoneNumber: string;
   email: string;
   avatar: string;
}

interface UserStore {
   user: User | null;
   accessToken: string | null;
   justLoggedIn: boolean;
   setUser: (user: User, accessToken: string) => void;
   clearUser: () => void;
   setJustLoggedIn: (value: boolean) => void;
   refresh: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
   persist(
      (set, get) => ({
         user: null,
         accessToken: null,
         justLoggedIn: false,

         setUser: (user, accessToken) => {
            set({ user, accessToken, justLoggedIn: true });
            scheduleRefresh(accessToken);
         },

         clearUser: () => set({ user: null, accessToken: null }),

         setJustLoggedIn: (value) => set({ justLoggedIn: value }),

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
               scheduleRefresh(data.accessToken); // ✅ reschedule after refresh
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
               // ✅ run check after reload
               const { exp } = decodeJwt(state.accessToken);
               if (exp && Date.now() >= exp * 1000) {
                  // already expired → try refresh immediately
                  state.refresh();
               } else {
                  // still valid → schedule refresh
                  scheduleRefresh(state.accessToken);
               }
            }
         },
      }
   )
);