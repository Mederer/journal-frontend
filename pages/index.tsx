import DashboardScreen from "@/components/screens/DashboardScreen";
import WelcomeScreen from "@/components/screens/WelcomeScreen";
import useUser from "@/hooks/useUser";

export default function Home() {
  const { user } = useUser();

  const screen = user ? <DashboardScreen /> : <WelcomeScreen />

  return screen

}
