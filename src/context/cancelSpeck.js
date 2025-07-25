import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SpeechGuard() {

  const router = useRouter();
  useEffect(() => {
    const stopAll = () => {
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
    };

    router.events?.on?.("routeChangeStart", stopAll);
    return () => {
      router.events?.off?.("routeChangeStart", stopAll);
    };
  }, [router]);

  return null; // This runs globally, no UI
}
