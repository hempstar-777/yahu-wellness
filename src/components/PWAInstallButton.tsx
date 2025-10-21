import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowButton(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!showButton) return null;

  return (
    <Button
      onClick={handleInstall}
      size="lg"
      className="bg-gradient-spiritual shadow-elevated hover:shadow-glow transition-all duration-300 gap-2"
    >
      <Download className="h-5 w-5" />
      Install App
    </Button>
  );
};

export default PWAInstallButton;
