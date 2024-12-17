// "use client";
// import { useCheckMe } from "@/_api/query";
// import useAuthStore from "@/store/useAuthStore";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useResetAppData } from "../global/useResetAppData";
// import useUserStore from "@/store/useUserStore";

// const useCheckUser = () => {
//   const route = useRouter();
//   const pathName = usePathname();
//   const isLogin = useAuthStore((state) => state.isLogin);
//   const reset = useResetAppData();
//   const { setUser, user: storeUser } = useUserStore();
//   const { user, refetch } = useCheckMe();

//   useEffect(() => {
//     if (!isLogin) return;
//     const checkUser = async () => {
//       try {
//         await refetch();
//         if (user.id) {
//           setUser({ ...storeUser, ...user });
//           if (!user.active && pathName !== "/inactiveAccount") {
//             reset("/inactiveAccount");
//           }
//           if (!user.emailVerified && pathName !== "/verifyEmail") {
//             return route.push("/verifyEmail?status=send-code");
//           }
//         }
//       } catch (error) {
//         console.log("🚀 ~ checkUser ~ error:", error);
//       }
//     };

//     checkUser();
//   }, [pathName]);

//   return null;
// };

// export default useCheckUser;
