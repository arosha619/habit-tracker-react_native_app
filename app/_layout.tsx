import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isAuth && isReady) {
      router.replace("/auth");
    }
    setIsReady(true);
  }, [isAuth, isReady, router]);

  // Don't render children until ready to prevent early navigation
  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RouteGuard>
  );
}
