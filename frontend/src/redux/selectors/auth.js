export const isSuperAdminSelector = (state) => {
  const userRole = state.auth.user?.role;

  return (
    userRole == "SUPER-ADMIN" ||
    userRole == "is_superuser" ||
    userRole == "superadmin"
  );
};
