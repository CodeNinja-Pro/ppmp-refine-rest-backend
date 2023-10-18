// export const accessControlProvider = {
//     can: async ({ resource, action, params }) => {

//       const permissionsData = await getPermissions(axiosInstance);
//       if (permissionsData?.includes(`${resource}-${action}`)) {
//         return { can: true };
//       } else {
//         return {
//           can: false,
//           reason: "Unauthorized",
//       };
//       }
//     },
//     options: {
//         buttons: {
//             enableAccessControl: true,
//             hideIfUnauthorized: false,
//         },
//     },
// }