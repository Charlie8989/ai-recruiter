import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MicTestButton() {
  const [testing, setTesting] = useState(false);

  const testMic = async () => {
    try {
      setTesting(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const meter = document.createElement("div");
      meter.id = "mic-meter";
      meter.style.position = "fixed";
      meter.style.left = "20px";
      meter.style.top = "50%";
      meter.style.transform = "translateY(-50%)";
      meter.style.width = "10px";
      meter.style.height = "100px";
      meter.style.background = "lightgray";
      meter.style.borderRadius = "5px";
      document.body.appendChild(meter);

      const level = document.createElement("div");
      level.style.width = "100%";
      level.style.height = "0px";
      level.style.background = "#2E318F";
      level.style.borderRadius = "5px";
      level.style.transition = "height 0.1s linear";
      meter.appendChild(level);

      let running = true;

      const updateMeter = () => {
        if (!running) return;
        analyser.getByteFrequencyData(dataArray);
        let volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        level.style.height = `${Math.min(volume, 100)}px`;
        requestAnimationFrame(updateMeter);
      };
      updateMeter();

      // stop after 6 seconds
      setTimeout(() => {
        running = false;
        stream.getTracks().forEach((t) => t.stop());
        audioContext.close();
        document.body.removeChild(meter);
        setTesting(false);

        toast("Mic Test Passed")
      }, 6000);
    } catch (err) {
      console.error("Mic test failed:", err);
      setTesting(false);
      toast("Mic Test Failed");
    }
  };

  return (
    <Button
      variant="outline"
      className="border rounded-md border-black/30"
      onClick={testMic}
      disabled={testing}
    >
      <Settings className="w-4" />
      {testing ? "Testing..." : "Test Microphone"}
    </Button>
  );
}
