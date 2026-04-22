import ProfilePage from "@/app/components/pages/profile/ProfilePage";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export const metadata = {
  title: "My Profile | CollegeProgram",
  description: "View and manage your CollegeProgram profile",
};

export default function ProfileRoute() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
