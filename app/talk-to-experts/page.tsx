import TalkToExperts from "@/app/components/pages/experts/TalkToExperts";
import ProtectedRoute from "../components/ProtectedRoute";

export const metadata = {
  title: "Talk to Our Expert Counselors | CollegeProgram",
  description: "Connect with our expert counselors to get personalized guidance on programs, admissions, and career paths.",
};

export default function TalkToExpertsRoute() {
  return <TalkToExperts />;
}
