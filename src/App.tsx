import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TransformResult {
  isDemo: boolean;
  image_url: string;
  original_url: string;
  prompt: string;
  original_bytes: number;
  original_width: number;
  original_height: number;
  transformed_bytes: number;
  transformed_width: number;
  transformed_height: number;
  effectApplied: string;
  aiSummary?: {
    title: string;
    dominantColors: string[];
    lightingMood: string;
    composition: string;
    detectedObjects: string[];
    keyAestheticSummary: string;
    optimizationRecommendation: string;
  };
}

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="3"
        y="6"
        width="18"
        height="2"
        rx="1"
        fill="currentColor"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
          x: isOpen ? 2 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{ originX: "6px", originY: "7px" }}
      />
      <motion.rect
        x="3"
        y="11"
        width="18"
        height="2"
        rx="1"
        fill="currentColor"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.rect
        x="3"
        y="16"
        width="18"
        height="2"
        rx="1"
        fill="currentColor"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -6 : 0,
          x: isOpen ? 2 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{ originX: "6px", originY: "17px" }}
      />
    </svg>
  );
};

const LogoSymbol = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center">
      {/* Dynamic Glow Aura */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-emerald-300 blur-md opacity-70"
        animate={{
          scale: isLoading ? [1, 1.25, 0.95, 1.2, 1] : [1, 1.1, 1],
          opacity: isLoading ? [0.7, 0.95, 0.7, 0.95, 0.7] : [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: isLoading ? 1.5 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating outer frame */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-emerald-400/40"
        animate={{
          rotate: isLoading ? [0, 360] : [0, 90],
          borderRadius: isLoading ? ["14px", "50%", "14px"] : ["14px", "14px"],
        }}
        transition={{
          duration: isLoading ? 2 : 6,
          repeat: Infinity,
          ease: isLoading ? "linear" : "easeInOut",
        }}
      />

      {/* Main Container */}
      <motion.div
        className="relative w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-inner overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated Background Laser Sweep inside Logo */}
        <motion.div
          className="absolute -inset-x-full h-1/2 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent skew-y-12"
          animate={{
            top: ["-50%", "150%"],
          }}
          transition={{
            duration: isLoading ? 1.2 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="z-10">
          {/* Main Shutter / Aperture Blades representing lens & transformation */}
          <motion.path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v3h-2zm0 8h2v2h-2zm-5-4h3v2H6zm8 0h3v2h-3z"
            fill="url(#logoGrad)"
            animate={{
              rotate: isLoading ? 360 : 0,
            }}
            transition={{
              duration: isLoading ? 1.5 : 0.5,
              repeat: isLoading ? Infinity : 0,
              ease: "linear",
            }}
          />

          {/* Morphing Sparkle / Bolt in center */}
          <motion.path
            d="M12 7.5L9.5 12h5L12 16.5"
            stroke="url(#logoBoltGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={isLoading ? {
              opacity: [1, 0.4, 1],
              scale: [1, 1.2, 0.9, 1.1, 1],
              strokeWidth: [2, 3, 2, 3, 2]
            } : {
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: isLoading ? 0.8 : 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <defs>
            <linearGradient id="logoGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="logoBoltGrad" x1="9" y1="7" x2="15" y2="17" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbit particle when loading */}
        {isLoading && (
          <motion.span
            className="absolute w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_8px_#2DD4BF]"
            animate={{
              x: [12, 28, 12, -4, 12],
              y: [-4, 12, 28, 12, -4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: 0, top: 0 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default function App() {
  // File and preview states
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [filename, setFilename] = useState<string>("No image selected");
  const [imageStats, setImageStats] = useState<{
    size: number;
    width: number;
    height: number;
  }>({ size: 0, width: 0, height: 0 });

  // Input states
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressStatus, setProgressStatus] = useState<string>("Analyzing image metadata...");
  const [result, setResult] = useState<TransformResult | null>(null);

  // Modal and config states
  const [activeModal, setActiveModal] = useState<"effects" | "social" | "professional" | "about" | null>(null);
  const [configStatus, setConfigStatus] = useState<{ isDemoMode: boolean; cloudName: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Navigation and Interactive UI states
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Footer Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setNewsletterEmail("");
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comparison view states
  const [compareMode, setCompareMode] = useState<"side-by-side" | "slider" | "overlay">("side-by-side");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isPeeking, setIsPeeking] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Manual Adjustments and Tuning Studio States
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);
  const [sepia, setSepia] = useState<number>(0);

  // Watermarking / Copyright States
  const [watermarkText, setWatermarkText] = useState<string>("");
  const [watermarkPosition, setWatermarkPosition] = useState<"bottom-right" | "bottom-left" | "top-right" | "top-left" | "center">("bottom-right");
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(50);
  const [watermarkColor, setWatermarkColor] = useState<string>("#ffffff");
  const [watermarkSize, setWatermarkSize] = useState<number>(24);

  // Smart Format Export Settings
  const [exportFormat, setExportFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/png");
  const [exportQuality, setExportQuality] = useState<number>(90);

  // Artistic Grading Presets
  const [activeFilterPreset, setActiveFilterPreset] = useState<string>("none");

  // Active workspace tab in the Adjust & Personalize Studio
  const [studioTab, setStudioTab] = useState<"sliders" | "presets" | "watermark" | "export">("sliders");

  // Dynamically blended image URL
  const [adjustedImageUrl, setAdjustedImageUrl] = useState<string>("");

  // Monitor slider container width for crisp overlay matching
  useEffect(() => {
    if (!sliderContainerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(sliderContainerRef.current);
    return () => resizeObserver.disconnect();
  }, [compareMode, result]);

  // Combined Canvas Adjustment Engine
  useEffect(() => {
    if (!result) {
      setAdjustedImageUrl("");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setAdjustedImageUrl(result.image_url);
          return;
        }

        canvas.width = result.transformed_width || img.naturalWidth || img.width || 800;
        canvas.height = result.transformed_height || img.naturalHeight || img.height || 600;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Compile combined CSS context filters
        const filters: string[] = [];
        if (brightness !== 0) filters.push(`brightness(${100 + brightness}%)`);
        if (contrast !== 0) filters.push(`contrast(${100 + contrast}%)`);
        if (saturation !== 0) filters.push(`saturate(${100 + saturation}%)`);
        if (blur > 0) filters.push(`blur(${blur}px)`);
        if (sepia > 0) filters.push(`sepia(${sepia}%)`);

        // Apply artistic color grading overlays
        if (activeFilterPreset === "noir") {
          filters.push("grayscale(100%) contrast(125%)");
        } else if (activeFilterPreset === "sunset") {
          filters.push("sepia(60%) saturate(140%) hue-rotate(-10deg)");
        } else if (activeFilterPreset === "cyberpunk") {
          filters.push("hue-rotate(130deg) saturate(180%) contrast(110%)");
        } else if (activeFilterPreset === "lomo") {
          filters.push("contrast(140%) saturate(125%) brightness(95%)");
        } else if (activeFilterPreset === "vintage") {
          filters.push("sepia(70%) saturate(90%) brightness(90%) hue-rotate(-15deg)");
        }

        ctx.filter = filters.join(" ") || "none";

        // Render base transformed image with current filters
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply Watermark Text overlay
        if (watermarkText) {
          ctx.filter = "none";
          const relativeSize = Math.max(12, Math.round((canvas.width / 800) * watermarkSize));
          ctx.font = `bold ${relativeSize}px "Inter", sans-serif`;
          ctx.fillStyle = watermarkColor;
          ctx.globalAlpha = watermarkOpacity / 100;

          // Double shadow for clear visibility over dark/light contrast backgrounds
          ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          const textMetrics = ctx.measureText(watermarkText);
          const textWidth = textMetrics.width;
          const textHeight = relativeSize;

          const padding = Math.max(12, Math.round(canvas.width * 0.03));
          let x = padding;
          let y = padding + textHeight;

          if (watermarkPosition === "bottom-right") {
            x = canvas.width - textWidth - padding;
            y = canvas.height - padding;
          } else if (watermarkPosition === "bottom-left") {
            x = padding;
            y = canvas.height - padding;
          } else if (watermarkPosition === "top-right") {
            x = canvas.width - textWidth - padding;
            y = padding + textHeight;
          } else if (watermarkPosition === "top-left") {
            x = padding;
            y = padding + textHeight;
          } else if (watermarkPosition === "center") {
            x = (canvas.width - textWidth) / 2;
            y = (canvas.height + textHeight) / 2;
          }

          ctx.fillText(watermarkText, x, y);

          // Reset canvas drawing context parameters
          ctx.globalAlpha = 1.0;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }

        const dataUrl = canvas.toDataURL(exportFormat, exportQuality / 100);
        setAdjustedImageUrl(dataUrl);
      } catch (err) {
        console.warn("Local canvas adjustments failed. Falling back to base optimized URL.", err);
        setAdjustedImageUrl(result.image_url);
      }
    };
    img.onerror = () => {
      setAdjustedImageUrl(result.image_url);
    };
    img.src = result.image_url;
  }, [
    result,
    brightness,
    contrast,
    saturation,
    blur,
    sepia,
    activeFilterPreset,
    watermarkText,
    watermarkPosition,
    watermarkOpacity,
    watermarkColor,
    watermarkSize,
    exportFormat,
    exportQuality
  ]);

  // Fetch API config status on mount
  useEffect(() => {
    fetch("/api/config-status")
      .then((res) => res.json())
      .then((data) => setConfigStatus(data))
      .catch((err) => console.warn("Failed to fetch config status", err));
  }, []);

  // Initialize tsParticles background
  useEffect(() => {
    const tsp = (window as any).tsParticles;
    if (tsp) {
      tsp.load("tsparticles", {
        fullScreen: { enable: true, zIndex: -10 },
        background: { color: "#07131B" },
        fpsLimit: 60,
        particles: {
          number: { value: 65 },
          color: {
            value: ["#10B981", "#34D399", "#A7F3D0", "#99F6E4"],
          },
          links: {
            enable: true,
            distance: 150,
            color: "#34D399",
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            outModes: { default: "bounce" },
          },
          opacity: { value: 0.5 },
          size: {
            value: { min: 2, max: 5 },
          },
        },
      });
    }
  }, []);

  // Track cursor spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseLight = document.querySelector(".mouse-light") as HTMLElement;
      if (mouseLight) {
        mouseLight.style.left = e.clientX + "px";
        mouseLight.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle file selection
  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setFilename("✅ " + selectedFile.name);

    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Load image metadata
    const img = new Image();
    img.onload = () => {
      setImageStats({
        size: selectedFile.size,
        width: img.width,
        height: img.height,
      });
    };
    img.src = objectUrl;
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setProgressStatus("Reading source file and analyzing dimensions...");

    // Setup animated progress simulator
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 25) {
          setProgressStatus("Preparing and encoding secure image payloads...");
          return prev + Math.floor(Math.random() * 5) + 3;
        } else if (prev < 55) {
          setProgressStatus("Uploading resources to high-speed Morphix AI servers...");
          return prev + Math.floor(Math.random() * 4) + 2;
        } else if (prev < 80) {
          setProgressStatus("Processing intelligent parameters & neural style edits...");
          return prev + Math.floor(Math.random() * 3) + 1;
        } else if (prev < 96) {
          setProgressStatus("Finalizing layout grids, canvas dimensions, and optimization...");
          return prev + (Math.random() > 0.4 ? 1 : 0);
        }
        return prev;
      });
    }, 100);

    try {
      const base64 = await fileToBase64(file);
      setProgress(30);
      setProgressStatus("Uploading resources to high-speed Morphix AI servers...");

      const response = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
          prompt,
          filename: file.name,
          fileSize: imageStats.size,
          width: imageStats.width,
          height: imageStats.height,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to transform image");
      }

      const data = await response.json();

      if (data.isDemo) {
        // Generate real visual changes client-side using Canvas in Demo Mode
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const img = new Image();
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Failed to load image for client-side processing"));
            img.src = base64;
          });

          // Set canvas dimensions
          canvas.width = data.transformed_width;
          canvas.height = data.transformed_height;

          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Apply filter string to 2D context
            let filterStr = "none";
            const eff = data.effectApplied;

            if (eff === "grayscale") {
              filterStr = "grayscale(100%)";
            } else if (eff === "vintage") {
              filterStr = "sepia(85%) saturate(120%) hue-rotate(-10deg) contrast(1.05)";
            } else if (eff === "blur") {
              filterStr = "blur(6px)";
            } else if (eff === "enhance") {
              filterStr = "brightness(1.12) contrast(1.15) saturate(1.1)";
            } else if (eff === "hdr") {
              filterStr = "contrast(1.28) saturate(1.25) brightness(1.05)";
            } else if (eff === "compress") {
              filterStr = "none";
            }

            ctx.filter = filterStr;

            // Compute cropping dimensions (object-cover)
            const sWidth = img.width;
            const sHeight = img.height;
            const dWidth = canvas.width;
            const dHeight = canvas.height;

            const sAspect = sWidth / sHeight;
            const dAspect = dWidth / dHeight;

            let sx = 0, sy = 0, sw = sWidth, sh = sHeight;

            if (sAspect > dAspect) {
              sw = sHeight * dAspect;
              sx = (sWidth - sw) / 2;
            } else if (sAspect < dAspect) {
              sh = sWidth / dAspect;
              sy = (sHeight - sh) / 2;
            }

            if (eff === "remove_background") {
              // Draw checkered background first
              ctx.filter = "none";
              const size = 12;
              for (let y = 0; y < canvas.height; y += size * 2) {
                for (let x = 0; x < canvas.width; x += size * 2) {
                  ctx.fillStyle = "#ffffff";
                  ctx.fillRect(x, y, size, size);
                  ctx.fillRect(x + size, y + size, size, size);
                  ctx.fillStyle = "#d1d5db"; // Gray checkered pattern
                  ctx.fillRect(x + size, y, size, size);
                  ctx.fillRect(x, y + size, size, size);
                }
              }

              // Draw image with simulated cutout (centered and slightly scaled with high contrast)
              ctx.filter = "contrast(1.12) saturate(1.08)";
              // Scale to 85% of target width/height and center it
              const targetW = dWidth * 0.85;
              const targetH = dHeight * 0.85;
              const targetX = (dWidth - targetW) / 2;
              const targetY = (dHeight - targetH) / 2;
              ctx.drawImage(img, sx, sy, sw, sh, targetX, targetY, targetW, targetH);
            } else {
              ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dWidth, dHeight);
            }

            // Export to Base64 data URL
            const exportQuality = eff === "compress" ? 0.15 : 0.90;
            const exportFormat = file.type || "image/jpeg";
            const transformedBase64 = canvas.toDataURL(exportFormat, exportQuality);

            data.image_url = transformedBase64;

            // Recalculate size based on base64 string length
            const head = transformedBase64.indexOf(",") + 1;
            const base64Length = transformedBase64.length - head;
            data.transformed_bytes = Math.round(base64Length * 0.75);
          }
        } catch (canvasErr) {
          console.warn("Client-side canvas rendering failed, using fallback.", canvasErr);
        }
      }

      setResult(data);

      // Scroll to result view
      setTimeout(() => {
        const resultSection = document.getElementById("result-view");
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An error occurred during transformation.");
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
      setProgressStatus("Done!");
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  };

  const resetAll = () => {
    setResult(null);
    setFile(null);
    setPreviewUrl("");
    setFilename("No image selected");
    setPrompt("");
    setImageStats({ size: 0, width: 0, height: 0 });
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Reset Manual Tuning & Branding Lab
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setBlur(0);
    setSepia(0);
    setWatermarkText("");
    setWatermarkPosition("bottom-right");
    setWatermarkOpacity(50);
    setWatermarkColor("#ffffff");
    setWatermarkSize(24);
    setExportFormat("image/png");
    setExportQuality(90);
    setActiveFilterPreset("none");
    setAdjustedImageUrl("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tools = {
    effects: [
      "enhance",
      "hdr",
      "sharpen",
      "bright",
      "black and white",
      "grayscale",
      "vintage",
      "blur",
    ],
    social: [
      "instagram post",
      "instagram story",
      "youtube thumbnail",
      "linkedin banner",
    ],
    professional: [
      "passport photo",
      "profile picture",
      "linkedin profile",
      "remove background",
      "compress image",
    ],
  };

  const selectChipPrompt = (text: string) => {
    setPrompt(text);
    setActiveModal(null);
  };

  // Convert bytes to clean MB or KB
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-100 selection:bg-emerald-400 selection:text-slate-900">
      <div id="tsparticles"></div>
      <div className="noise"></div>
      <div className="mouse-light"></div>

      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ y: -80, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
        style={{
          position: "fixed",
          top: isScrolled ? "8px" : "16px",
          height: isScrolled ? "58px" : "68px",
          width: isScrolled ? "92%" : "88%",
          maxWidth: "1000px",
          padding: isScrolled ? "8px 16px" : "12px 20px",
          background: isScrolled ? "rgba(10, 15, 30, 0.85)" : "rgba(255, 255, 255, 0.04)",
          backdropFilter: isScrolled ? "blur(24px)" : "blur(18px)",
          border: isScrolled ? "1px solid rgba(52, 211, 153, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled ? "0 12px 40px rgba(16, 185, 129, 0.15)" : "0 15px 40px rgba(0, 0, 0, 0.18)",
          borderRadius: "22px",
          zIndex: 9999,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          left: "50%",
        }}
      >
        {/* Brand Section */}
        <div
          className="nav-logo cursor-pointer flex items-center gap-2 sm:gap-3.5 group select-none"
          onClick={() => {
            setActiveLink("home");
            resetAll();
          }}
        >
          <LogoSymbol isLoading={isLoading} />
          <div className="hidden xs:block text-left">
            <h2 className="text-white font-extrabold text-sm sm:text-base md:text-lg leading-tight tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
              Morphix AI
            </h2>
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 tracking-wider block mt-0.5 group-hover:text-slate-300 transition-colors duration-300 uppercase">
              Transform
            </span>
          </div>
        </div>

        {/* Centered Navigation Links - Responsive & Always Visible! */}
        <nav className="nav-links relative flex items-center gap-1.5 sm:gap-2">
          {result && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              onClick={() => {
                setActiveLink("home");
                resetAll();
              }}
              className="mr-1 sm:mr-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-extrabold bg-emerald-500/10 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/20 hover:border-emerald-400 transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 shadow-[0_2px_8px_rgba(16,185,129,0.1)]"
            >
              <i className="bi bi-arrow-left"></i>
              <span className="hidden sm:inline">Back to Upload</span>
            </motion.button>
          )}
          {[
            { id: "home", label: "Home", icon: "bi-house-fill" },
            { id: "about", label: "About", icon: "bi-info-circle-fill" },
            { id: "contact", label: "Contact", icon: "bi-envelope-fill" },
          ].map((link) => {
            const isActive = activeLink === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-300 z-10 ${isActive ? "text-emerald-300" : "text-slate-300 hover:text-white"
                  }`}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link.id);
                  if (link.id === "home") {
                    resetAll();
                  } else if (link.id === "about") {
                    setActiveModal("about");
                  } else if (link.id === "contact") {
                    const contact = document.getElementById("contact");
                    if (contact) contact.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{ textDecoration: "none" }}
              >
                <i className={`bi ${link.icon} text-xs sm:text-sm ${isActive ? "text-emerald-400" : "text-slate-400"}`}></i>
                <span className="hidden sm:inline">{link.label}</span>

                {/* Sliding background pill for hover */}
                {hoveredLink === link.id && (
                  <motion.div
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-slate-800/70 rounded-xl -z-10 border border-slate-700/30 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Animated indicator line for active state */}
                {isActive && (
                  <motion.div
                    layoutId="navActiveLine"
                    className="absolute bottom-[-2px] left-2.5 right-2.5 sm:left-4 sm:right-4 h-[3px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-[0_1px_6px_rgba(52,211,153,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Clean System Status Indicator */}
        <div className="status flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/60 border border-slate-800/80">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]`}></span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-300 tracking-wide uppercase hidden xs:inline">
            {isLoading ? "Morphing..." : "Ready"}
          </span>
        </div>
      </motion.header>



      {/* ================= HOME SECTION ================= */}
      {!result && (
        <section className="hero" id="home">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="glass"
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="badge"
            >
              <i className="bi bi-stars"></i>
              {configStatus?.isDemoMode ? "Instant AI Sandbox" : "Powered by Cloudinary AI"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
              className="font-sans font-black tracking-tight leading-none text-slate-100"
            >
              Transform Images <span>Beautifully</span> with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65 }}
              className="hero-text"
            >
              Professional AI-powered image enhancement, background removal, resizing, optimization and social-ready exports.
            </motion.p>

            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="upload-box"
              >
                <input
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  hidden
                />

                <motion.div
                  whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(52, 211, 153, 0.7)", boxShadow: "0 25px 50px rgba(52, 211, 153, 0.08)" }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className={`upload-area ${isDragOver ? "drag border-emerald-400 shadow-[0_30px_80px_rgba(78,240,195,0.15)]" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-circle">
                    <i className="bi bi-cloud-arrow-up-fill"></i>
                  </div>
                  <h2>Drop your image here</h2>
                  <p>or click anywhere to upload</p>
                  <span>PNG • JPG • WEBP</span>
                  <div className="upload-line"></div>
                </motion.div>

                <p id="filename">{filename}</p>

                {previewUrl && (
                  <img
                    id="preview"
                    src={previewUrl}
                    alt="Preview"
                    style={{ display: "block", opacity: 1, transform: "scale(1)" }}
                  />
                )}
              </motion.div>

              {/* Stats Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="stats"
              >
                <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 350, damping: 20 }} className="stat">
                  <h2>15+</h2>
                  <p>AI Tools</p>
                </motion.div>
                <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 350, damping: 20 }} className="stat">
                  <h2>1 Sec</h2>
                  <p>Processing</p>
                </motion.div>
                <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 350, damping: 20 }} className="stat">
                  <h2>HD</h2>
                  <p>Output</p>
                </motion.div>
                <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 350, damping: 20 }} className="stat">
                  <h2>Cloud</h2>
                  <p>Powered</p>
                </motion.div>
              </motion.div>

              {/* FLAGSHIP FEATURE: PERSONALIZATION STUDIO SPOTLIGHT */}
              <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/50 to-emerald-950/20 border border-emerald-500/20 rounded-3xl p-6 md:p-8 mb-12 text-left relative overflow-hidden shadow-2xl backdrop-blur-xl group">
                {/* Glowing ambient background circle */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/15 transition-all duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-teal-500/5 blur-3xl"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3.5 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      <i className="bi bi-fire text-[10px] animate-pulse"></i> Flagship Feature
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      Interactive Adjust & <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Personalize Studio</span>
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Fine-tune exposure parameters, overlay professional brand watermarks, apply gorgeous color presets, and export web-ready assets in real time. Launch our interactive playground immediately with a high-fidelity sample canvas!
                    </p>
                  </div>
                  <div className="shrink-0 w-full md:w-auto self-stretch md:self-auto flex items-center justify-center bg-slate-950/50 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-[0_4px_24px_rgba(16,185,129,0.04)]">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(52, 211, 153, 0.4)", borderColor: "rgba(52, 211, 153, 0.8)" }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => {
                        setResult({
                          isDemo: true,
                          image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
                          original_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
                          prompt: "Morphix AI Studio Creative Showcase",
                          original_bytes: 1450000,
                          original_width: 1200,
                          original_height: 800,
                          transformed_bytes: 420000,
                          transformed_width: 1200,
                          transformed_height: 800,
                          effectApplied: "Morphix AI Master Tuning",
                          aiSummary: {
                            title: "Futuristic Fluid Satin Waves & Volumetric Neon Glimmer",
                            dominantColors: ["#10B981 (Mint Emerald)", "#1E293B (Slate Dark)", "#EC4899 (Cyberpink)", "#8B5CF6 (Neon Violet)"],
                            lightingMood: "Soft cinematic velvet shadows with dynamic backlighting",
                            composition: "Fluid organic forms sweeping dynamically from top-left to bottom-right",
                            detectedObjects: ["Smooth satin mesh structure", "Volumetric dust glitter", "Vibrant ambient hues"],
                            keyAestheticSummary: "An ultra-modern, professional digital render illustrating exquisite light diffusion, delicate micro-textures, and high contrast curves.",
                            optimizationRecommendation: "Perfect for testing brand watermarks. Try adding watermark text, adjusting soft blur to +3px, and applying the 'Neon' or 'Sunset' preset for maximum aesthetic drama."
                          }
                        });
                        setTimeout(() => {
                          const resView = document.getElementById("result-view");
                          if (resView) resView.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="relative overflow-hidden w-full md:w-auto px-7 py-4 rounded-xl text-xs font-black uppercase tracking-widest bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <i className="bi bi-play-circle-fill text-sm text-emerald-400 group-hover:text-white transition-colors duration-300"></i>
                      <span>Launch Interactive Studio</span>
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <i className="bi bi-sliders text-emerald-400"></i>
                    <span>Precise Sliders & Step Buttons</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <i className="bi bi-palette-fill text-teal-400"></i>
                    <span>Artistic Color Grading</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <i className="bi bi-shield-lock-fill text-emerald-400"></i>
                    <span>Pro Grid Watermark Positioning</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <i className="bi bi-file-earmark-arrow-down-fill text-teal-400"></i>
                    <span>Multi-Format Output Hub</span>
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="feature-title">
                <h2>Everything You Need</h2>
                <p>Professional AI tools powered by intelligent parameters</p>
              </div>

              <div className="instruction-card flex items-center gap-4 bg-slate-800/20 border border-slate-700/30 p-5 rounded-2xl mb-8 text-left">
                <div className="instruction-icon text-3xl text-yellow-400 bg-yellow-400/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <i className="bi bi-lightbulb-fill"></i>
                </div>
                <div className="instruction-text">
                  <h2 className="font-bold text-lg mb-1 text-slate-100">Choose Your AI Tool</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Select a category below based on your editing needs. Choose an AI transformation, it will automatically appear in the prompt box, then click <strong>Transform Image</strong> to generate your optimized image.
                  </p>
                </div>
              </div>

              <div className="cards" id="features">
                {/* AI EFFECTS */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.025, borderColor: "rgba(16, 185, 129, 0.4)", boxShadow: "0 20px 40px rgba(16, 185, 129, 0.06)" }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="card"
                >
                  <div className="card-icon emerald">✨</div>
                  <h3>AI Effects</h3>
                  <p>Instantly enhance photos with HDR, blur, black & white, vintage and smart optimization.</p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(52, 211, 153, 0.4)", x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setActiveModal("effects")}
                    className="w-full mt-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-slate-950 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Effects</span> <i className="bi bi-arrow-right text-sm"></i>
                  </motion.button>
                </motion.div>

                {/* SOCIAL */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.025, borderColor: "rgba(16, 185, 129, 0.4)", boxShadow: "0 20px 40px rgba(16, 185, 129, 0.06)" }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="card"
                >
                  <div className="card-icon blue">📱</div>
                  <h3>Social Media</h3>
                  <p>Create Instagram posts, stories, YouTube thumbnails and LinkedIn banners.</p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(52, 211, 153, 0.4)", x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setActiveModal("social")}
                    className="w-full mt-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-slate-950 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Social</span> <i className="bi bi-arrow-right text-sm"></i>
                  </motion.button>
                </motion.div>

                {/* PROFESSIONAL */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.025, borderColor: "rgba(16, 185, 129, 0.4)", boxShadow: "0 20px 40px rgba(16, 185, 129, 0.06)" }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="card"
                >
                  <div className="card-icon green">💼</div>
                  <h3>Professional</h3>
                  <p>Passport photos, profile pictures, remove background and compress images.</p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(52, 211, 153, 0.4)", x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setActiveModal("professional")}
                    className="w-full mt-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-slate-950 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Professional</span> <i className="bi bi-arrow-right text-sm"></i>
                  </motion.button>
                </motion.div>
              </div>

              {/* Prompt Section */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="prompt-card text-center"
              >
                <div className="prompt-header">
                  <i className="bi bi-robot text-3xl"></i>
                  <h2>Describe Your Image</h2>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Type naturally and let AI understand what you want.
                </p>
                <input
                  type="text"
                  name="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="prompt-box text-center"
                  placeholder="Example: Make this image brighter and create a LinkedIn banner"
                />
              </motion.div>

              {/* CTA */}
              <div className="transform-box flex flex-col items-center">
                <motion.button
                  whileHover={isLoading ? {} : { scale: 1.03, boxShadow: "0 20px 45px rgba(16, 185, 129, 0.25)" }}
                  whileTap={isLoading ? {} : { scale: 0.97 }}
                  className={`main-btn flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 min-w-[320px] ${isLoading ? "cursor-wait scale-[0.98] opacity-95" : ""
                    }`}
                  style={isLoading ? {
                    background: `linear-gradient(90deg, rgba(16, 185, 129, 0.9) 0%, rgba(16, 185, 129, 0.95) ${progress}%, rgba(30, 41, 59, 0.95) ${progress}%, rgba(15, 23, 42, 0.9) 100%)`,
                    padding: "18px 45px",
                    borderRadius: "22px",
                    boxShadow: "0 15px 45px rgba(16, 185, 129, 0.2)"
                  } : {}}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-full text-center z-10">
                      <div className="flex items-center justify-center gap-2 text-white font-bold text-lg mb-1">
                        <i className="bi bi-cpu animate-spin text-emerald-300"></i>
                        <span>Processing: {progress}%</span>
                      </div>
                      <div className="text-xs text-emerald-100/95 font-medium tracking-wide">
                        {progressStatus}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-white">
                      <span>Transform Image</span>
                      <i className="bi bi-arrow-right-circle-fill text-xl"></i>
                    </div>
                  )}
                </motion.button>

                {/* Additional detailed linear progress bar below when active */}
                {isLoading && (
                  <div className="w-full max-w-md mt-6 px-4">
                    <div className="w-full h-2 bg-slate-950/60 rounded-full overflow-hidden border border-slate-800 p-[1px]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 text-center font-mono">
                      Step: {progress < 25 ? "1/4 Payload" : progress < 55 ? "2/4 Upload" : progress < 80 ? "3/4 Engine" : "4/4 Render"} • Please do not close this tab
                    </p>
                  </div>
                )}

                <p className="powered">
                  ⚡ AI powered image transformation • Fast • Secure • High Quality
                </p>
              </div>
            </form>
          </motion.div>
        </section>
      )}

      {/* ================= RESULT SECTION ================= */}
      {result && (
        <section className="result-container" id="result-view">
          <div className="glass max-w-4xl">
            {/* Elegant "Coming Back" Navigation Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60">
              <button
                type="button"
                onClick={resetAll}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900/60 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/20 hover:border-emerald-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
              >
                <i className="bi bi-arrow-left text-sm group-hover:-translate-x-1 transition-transform duration-300"></i>
                <span>Back to Transformer</span>
              </button>

              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <i className="bi bi-clock-history"></i>
                <span>Session Active</span>
              </div>
            </div>

            <div className="success">
              <i className="bi bi-patch-check-fill text-emerald-400"></i>
              AI Transformation Complete {result.isDemo && "(Demo Mode Simulation)"}
            </div>

            <h1 className="font-sans font-black tracking-tight text-slate-100">
              Your Image is <span>Ready</span>
            </h1>

            <p className="hero-text">
              {result.isDemo
                ? "Simulated Cloudinary AI engine has completed image optimizations and calculated parameters."
                : "Cloudinary AI has successfully processed and optimized your image using intelligent transformations."}
            </p>

            {/* AI Dashboard */}
            <div className="ai-dashboard">
              <div className="dashboard-card">
                <h2>92</h2>
                <p>AI Score</p>
              </div>
              <div className="dashboard-card">
                <h2>
                  {result.original_bytes > 0
                    ? Math.round((1 - result.transformed_bytes / result.original_bytes) * 100)
                    : 0}
                  %
                </h2>
                <p>Size Saved</p>
              </div>
              <div className="dashboard-card">
                <h2>HD</h2>
                <p>Output Quality</p>
              </div>
              <div className="dashboard-card">
                <h2>✓</h2>
                <p>Processed</p>
              </div>
            </div>

            {/* BEFORE / AFTER */}
            {/* COMPARISON TABS */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/30 max-w-lg mx-auto mt-10 mb-6">
              <button
                type="button"
                onClick={() => setCompareMode("side-by-side")}
                className={`w-full sm:flex-1 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${compareMode === "side-by-side"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/20"
                  }`}
              >
                <i className="bi bi-columns-gap text-sm"></i> Grid Compare
              </button>
              <button
                type="button"
                onClick={() => setCompareMode("slider")}
                className={`w-full sm:flex-1 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${compareMode === "slider"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/20"
                  }`}
              >
                <i className="bi bi-distribute-vertical text-sm"></i> AI Slider
              </button>
              <button
                type="button"
                onClick={() => setCompareMode("overlay")}
                className={`w-full sm:flex-1 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${compareMode === "overlay"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/20"
                  }`}
              >
                <i className="bi bi-eye-fill text-sm"></i> Tap Peek
              </button>
            </div>

            {/* COMPARISON VIEWPORTS */}
            {compareMode === "side-by-side" && (
              <div className="image-comparison">
                {/* Original */}
                <div className="image-card">
                  <div className="status-badge bg-slate-900/60 px-3 py-1.5 rounded-full text-xs font-semibold inline-block mb-4">
                    📷 Original Image
                  </div>
                  <img
                    src={result.original_url}
                    alt="Original"
                    className="mx-auto block"
                  />
                  <div className="image-info flex justify-around mt-4 pt-4 border-t border-slate-700/30 text-sm">
                    <p>
                      <strong>Size</strong>
                      <br />
                      {formatBytes(result.original_bytes)}
                    </p>
                    <p>
                      <strong>Resolution</strong>
                      <br />
                      {result.original_width} × {result.original_height}
                    </p>
                  </div>
                </div>

                {/* Optimized */}
                <div className="image-card">
                  <div className="status-badge bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold inline-block mb-4">
                    ✨ AI Optimized
                  </div>
                  <img
                    src={adjustedImageUrl || result.image_url}
                    alt="Optimized"
                    className="mx-auto block"
                  />
                  <div className="image-info flex justify-around mt-4 pt-4 border-t border-slate-700/30 text-sm">
                    <p>
                      <strong>Size</strong>
                      <br />
                      {formatBytes(result.transformed_bytes)}
                    </p>
                    <p>
                      <strong>Resolution</strong>
                      <br />
                      {result.transformed_width} × {result.transformed_height}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {compareMode === "slider" && (
              <div className="max-w-2xl mx-auto my-6">
                <p className="text-xs text-slate-400 mb-3 text-center">
                  Drag the vertical line to dynamically slide between the original image and the optimized result.
                </p>
                <div
                  ref={sliderContainerRef}
                  className="relative w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 shadow-2xl select-none"
                  style={{ touchAction: "none" }}
                >
                  {/* Bottom Image (Original) */}
                  <img
                    src={result.original_url}
                    alt="Original"
                    className="w-full h-auto max-h-[500px] object-contain block"
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/50 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-full z-10 pointer-events-none shadow-md">
                    📷 Original
                  </div>

                  {/* Sliding Overlay Container (Optimized) */}
                  <div
                    className="absolute top-0 left-0 h-full overflow-hidden select-none border-r border-emerald-400/80"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={adjustedImageUrl || result.image_url}
                      alt="Optimized"
                      className="absolute top-0 left-0 h-full object-contain max-h-[500px]"
                      style={{ width: containerWidth ? `${containerWidth}px` : "100%", maxWidth: "none" }}
                    />
                    <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur border border-emerald-400/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 pointer-events-none shadow-md whitespace-nowrap">
                      ✨ AI Optimized
                    </div>
                  </div>

                  {/* Drag Handle and Vertical Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-emerald-400 pointer-events-none z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)] cursor-ew-resize">
                      <i className="bi bi-arrows-expand rotate-90 text-xs"></i>
                    </div>
                  </div>

                  {/* Input range over everything for touch and mouse interactions */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
              </div>
            )}

            {compareMode === "overlay" && (
              <div className="max-w-2xl mx-auto my-6 text-center">
                <p className="text-xs text-slate-400 mb-3">
                  Press and hold the image or button to instantly preview the original image. Release to view the optimized image.
                </p>
                <div
                  className="relative w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 shadow-2xl select-none cursor-pointer aspect-auto flex justify-center items-center"
                  onMouseDown={() => setIsPeeking(true)}
                  onMouseUp={() => setIsPeeking(false)}
                  onMouseLeave={() => setIsPeeking(false)}
                  onTouchStart={() => setIsPeeking(true)}
                  onTouchEnd={() => setIsPeeking(false)}
                >
                  <img
                    src={isPeeking ? result.original_url : (adjustedImageUrl || result.image_url)}
                    alt={isPeeking ? "Original" : "Optimized"}
                    className="w-full h-auto max-h-[500px] object-contain block transition-all duration-200"
                  />

                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur border border-slate-700/50 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md pointer-events-none">
                    {isPeeking ? "📷 Showing Original" : "✨ Showing AI Optimized"}
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onMouseDown={() => setIsPeeking(true)}
                    onMouseUp={() => setIsPeeking(false)}
                    onMouseLeave={() => setIsPeeking(false)}
                    onTouchStart={() => setIsPeeking(true)}
                    onTouchEnd={() => setIsPeeking(false)}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-600/50 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 select-none flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md"
                  >
                    <i className="bi bi-hand-index-thumb-fill text-emerald-400"></i>
                    <span>Press & Hold to Peek Original</span>
                  </button>
                </div>
              </div>
            )}

            {/* ADJUST & PERSONALIZE STUDIO */}
            <div className="bg-slate-900/85 border border-emerald-500/30 rounded-3xl p-6 md:p-8 mt-12 text-left relative overflow-hidden shadow-2xl backdrop-blur-xl">
              {/* Decorative accent grid lines */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-emerald-500/10">
                    <i className="bi bi-sliders text-slate-950"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">Adjust & Personalize Studio</h2>
                      <span className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Canvas Live
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Professional-grade dynamic post-processing and asset customizer</p>
                  </div>
                </div>

                {/* Micro System Metadata */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 bg-slate-950/40 px-3.5 py-2 rounded-xl border border-slate-800/60 self-start sm:self-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">FPS:</span>
                    <span className="text-slate-300">60</span>
                  </div>
                  <div className="w-1 h-3 bg-slate-800"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">Canvas:</span>
                    <span className="text-slate-300">{result.transformed_width || 1200}×{result.transformed_height || 800}</span>
                  </div>
                </div>
              </div>

              {/* Responsive Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT: Category Tabs Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-2.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1">
                    Editing Workspaces
                  </div>
                  {[
                    { id: "sliders", label: "Color & Light", desc: "Exposure, contrast & sharpness", icon: "bi-sun-fill", color: "from-amber-400 to-orange-500" },
                    { id: "presets", label: "Cinematic Presets", desc: "Artistic grading overlays", icon: "bi-palette-fill", color: "from-teal-400 to-emerald-600" },
                    { id: "watermark", label: "Brand Watermark", desc: "Inject customizable copyrights", icon: "bi-shield-check", color: "from-teal-300 to-emerald-500" },
                    { id: "export", label: "Export Engine", desc: "Format & compression tuning", icon: "bi-cpu-fill", color: "from-emerald-400 to-teal-500" }
                  ].map((tab) => {
                    const isActive = studioTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setStudioTab(tab.id as any)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${isActive
                          ? "bg-slate-800/80 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/5"
                          : "bg-slate-900/30 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 hover:border-slate-700/60"
                          }`}
                      >
                        {/* Selected Indicator Light */}
                        {isActive && (
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-r-md shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                        )}
                        <div className="flex items-center gap-3.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm transition-all duration-300 ${isActive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800/50 text-slate-400 border border-slate-700/20 group-hover:bg-slate-700/50"
                            }`}>
                            <i className={`bi ${tab.icon}`}></i>
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm tracking-wide transition-colors">{tab.label}</div>
                            <div className="text-[10px] text-slate-500 font-medium tracking-tight mt-0.5">{tab.desc}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Quick Preset Combos (Live Utility Panel) */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60 hidden lg:block">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                      <i className="bi bi-lightning-charge-fill text-emerald-400"></i> Quick Combos
                    </h4>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setBrightness(10);
                          setContrast(15);
                          setSaturation(5);
                          setBlur(0);
                          setSepia(0);
                          setActiveFilterPreset("none");
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-[11px] font-semibold bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex justify-between items-center"
                      >
                        <span>Vibrant Portrait Pop</span>
                        <span className="text-[9px] font-mono text-emerald-400">Load</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setBrightness(-5);
                          setContrast(20);
                          setSaturation(-15);
                          setBlur(0);
                          setSepia(35);
                          setActiveFilterPreset("vintage");
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-[11px] font-semibold bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex justify-between items-center"
                      >
                        <span>Warm Moody Editorial</span>
                        <span className="text-[9px] font-mono text-emerald-400">Load</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Active Workspace Panel */}
                <div className="lg:col-span-8">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 min-h-[380px] flex flex-col justify-between">

                    {/* TAB CONTENT: COLOR & LIGHT */}
                    {studioTab === "sliders" && (
                      <div className="space-y-5 animate-fadeIn">
                        <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                            <i className="bi bi-sun text-emerald-400"></i> Light & Color Balancer
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              setBrightness(0);
                              setContrast(0);
                              setSaturation(0);
                              setBlur(0);
                              setSepia(0);
                            }}
                            className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <i className="bi bi-arrow-counterclockwise"></i> Reset Section
                          </button>
                        </div>

                        <div className="space-y-5">
                          {/* BRIGHTNESS */}
                          <div className="space-y-1.5 bg-slate-950/25 p-3 rounded-xl border border-slate-800/40">
                            <div className="flex justify-between items-center text-xs text-slate-400">
                              <span className="font-semibold text-slate-300">Exposure (Brightness)</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 cursor-pointer hover:bg-slate-700" onClick={() => setBrightness(0)} title="Double click to reset">
                                  {brightness > 0 ? `+${brightness}` : brightness}%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setBrightness(prev => Math.max(-50, prev - 5))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                              >
                                -
                              </button>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                step="5"
                                value={brightness}
                                onChange={(e) => setBrightness(Number(e.target.value))}
                                className="flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer"
                              />
                              <button
                                type="button"
                                onClick={() => setBrightness(prev => Math.min(50, prev + 5))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* CONTRAST */}
                          <div className="space-y-1.5 bg-slate-950/25 p-3 rounded-xl border border-slate-800/40">
                            <div className="flex justify-between items-center text-xs text-slate-400">
                              <span className="font-semibold text-slate-300">Contrast Boost</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 cursor-pointer hover:bg-slate-700" onClick={() => setContrast(0)} title="Click to reset">
                                  {contrast > 0 ? `+${contrast}` : contrast}%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setContrast(prev => Math.max(-50, prev - 5))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                              >
                                -
                              </button>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                step="5"
                                value={contrast}
                                onChange={(e) => setContrast(Number(e.target.value))}
                                className="flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer"
                              />
                              <button
                                type="button"
                                onClick={() => setContrast(prev => Math.min(50, prev + 5))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* SATURATION */}
                          <div className="space-y-1.5 bg-slate-950/25 p-3 rounded-xl border border-slate-800/40">
                            <div className="flex justify-between items-center text-xs text-slate-400">
                              <span className="font-semibold text-slate-300">Vibrancy (Saturation)</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 cursor-pointer hover:bg-slate-700" onClick={() => setSaturation(0)} title="Click to reset">
                                  {saturation > 0 ? `+${saturation}` : saturation}%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setSaturation(prev => Math.max(-50, prev - 5))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                              >
                                -
                              </button>
                              <input
                                type="range"
                                min="-50"
                                max="50"
                                step="5"
                                value={saturation}
                                onChange={(e) => setSaturation(Number(e.target.value))}
                                className="flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer"
                              />
                              <button
                                type="button"
                                onClick={() => setSaturation(prev => Math.min(50, prev + 5))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* BLUR */}
                            <div className="space-y-1.5 bg-slate-950/25 p-3 rounded-xl border border-slate-800/40">
                              <div className="flex justify-between items-center text-xs text-slate-400">
                                <span className="font-semibold text-slate-300">Soft Focus Blur</span>
                                <span className="font-mono text-[11px] text-emerald-400">{blur}px</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setBlur(prev => Math.max(0, prev - 1))}
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                                >
                                  -
                                </button>
                                <input
                                  type="range"
                                  min="0"
                                  max="15"
                                  step="1"
                                  value={blur}
                                  onChange={(e) => setBlur(Number(e.target.value))}
                                  className="flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer"
                                />
                                <button
                                  type="button"
                                  onClick={() => setBlur(prev => Math.min(15, prev + 1))}
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* SEPIA */}
                            <div className="space-y-1.5 bg-slate-950/25 p-3 rounded-xl border border-slate-800/40">
                              <div className="flex justify-between items-center text-xs text-slate-400">
                                <span className="font-semibold text-slate-300">Vintage Warmth (Sepia)</span>
                                <span className="font-mono text-[11px] text-emerald-400">{sepia}%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSepia(prev => Math.max(0, prev - 10))}
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                                >
                                  -
                                </button>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="10"
                                  value={sepia}
                                  onChange={(e) => setSepia(Number(e.target.value))}
                                  className="flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer"
                                />
                                <button
                                  type="button"
                                  onClick={() => setSepia(prev => Math.min(100, prev + 10))}
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center justify-center cursor-pointer active:scale-90"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: ARTISTIC PRESETS */}
                    {studioTab === "presets" && (
                      <div className="space-y-5 animate-fadeIn">
                        <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                            <i className="bi bi-palette text-emerald-400"></i> Cinematic Color Grading
                          </h3>
                          <span className="text-[10px] text-slate-400 font-medium">Click to instantly apply visual mood</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            { id: "none", label: "Raw Optim", desc: "Original balanced AI tuning", icon: "✨", badge: "Balanced" },
                            { id: "noir", label: "Classic Noir", desc: "Moody high-contrast silver scale", icon: "🎬", badge: "Monochrome" },
                            { id: "sunset", label: "Sunset Glow", desc: "Rich amber hues & warm tones", icon: "🌅", badge: "Warmth" },
                            { id: "cyberpunk", label: "Neon Cyber", desc: "Vibrant pink & glowing violet", icon: "🌆", badge: "Vibrant" },
                            { id: "lomo", label: "Lomo Vibe", desc: "Analog saturated vignette look", icon: "📸", badge: "Analog" },
                            { id: "vintage", label: "Nostalgia", desc: "Beautiful faded sepia matte look", icon: "🎞️", badge: "Faded" }
                          ].map((preset) => {
                            const isSelected = activeFilterPreset === preset.id;
                            return (
                              <button
                                key={preset.id}
                                type="button"
                                onClick={() => setActiveFilterPreset(preset.id)}
                                className={`text-left p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-[100px] ${isSelected
                                  ? "bg-slate-800 border-emerald-400/80 text-white shadow-md"
                                  : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700/60"
                                  }`}
                              >
                                <div className="flex justify-between items-start w-full">
                                  <span className="text-xl">{preset.icon}</span>
                                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${isSelected ? "bg-emerald-500/25 text-emerald-300" : "bg-slate-900 text-slate-500"
                                    }`}>
                                    {preset.badge}
                                  </span>
                                </div>
                                <div className="mt-2.5">
                                  <h4 className="font-extrabold text-xs text-slate-200">{preset.label}</h4>
                                  <p className="text-[9px] text-slate-500 font-medium mt-0.5 leading-tight truncate">{preset.desc}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: BRAND WATERMARK */}
                    {studioTab === "watermark" && (
                      <div className="space-y-5 animate-fadeIn">
                        <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                            <i className="bi bi-shield-check text-emerald-400"></i> Pro Brand Watermarking
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              setWatermarkText("");
                              setWatermarkPosition("bottom-right");
                              setWatermarkOpacity(50);
                              setWatermarkColor("#ffffff");
                              setWatermarkSize(24);
                            }}
                            className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <i className="bi bi-trash-fill"></i> Clear Watermark
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Left Inputs */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Watermark Text</label>
                                <button
                                  type="button"
                                  onClick={() => setWatermarkText(`© ${new Date().getFullYear()} Morphix AI`)}
                                  className="text-[9px] font-mono text-emerald-400 hover:underline"
                                >
                                  + Default copyright
                                </button>
                              </div>
                              <input
                                type="text"
                                value={watermarkText}
                                onChange={(e) => setWatermarkText(e.target.value)}
                                placeholder="e.g. © 2026 Mokshith Gowda"
                                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-all font-mono"
                              />
                            </div>

                            {/* Color Selector */}
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Text Color Theme</label>
                              <div className="flex gap-2 bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/60">
                                {[
                                  { color: "#ffffff", label: "White", bg: "bg-white" },
                                  { color: "#000000", label: "Black", bg: "bg-black border border-slate-700" },
                                  { color: "#FBBF24", label: "Gold", bg: "bg-amber-400" },
                                  { color: "#34D399", label: "Mint", bg: "bg-emerald-400" },
                                  { color: "#0D9488", label: "Teal", bg: "bg-teal-500" }
                                ].map((swatch) => (
                                  <button
                                    key={swatch.color}
                                    type="button"
                                    onClick={() => setWatermarkColor(swatch.color)}
                                    className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all ${swatch.bg} ${watermarkColor === swatch.color ? "scale-110 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900" : "opacity-80 hover:opacity-100 hover:scale-105"
                                      }`}
                                    title={swatch.label}
                                  >
                                    {watermarkColor === swatch.color && (
                                      <span className={swatch.color === "#ffffff" ? "text-slate-950 text-xs font-black" : "text-white text-xs font-black"}>✓</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Inputs: Visual Reference Placement Grid */}
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Visual Anchored Placement</label>

                            {/* Visual Grid representing layout */}
                            <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl flex items-center justify-center">
                              <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
                                {[
                                  { id: "top-left", icon: "bi-arrow-up-left" },
                                  { id: "top-center-placeholder", icon: "bi-dash", disabled: true },
                                  { id: "top-right", icon: "bi-arrow-up-right" },

                                  { id: "mid-left-placeholder", icon: "bi-dash", disabled: true },
                                  { id: "center", icon: "bi-record-circle" },
                                  { id: "mid-right-placeholder", icon: "bi-dash", disabled: true },

                                  { id: "bottom-left", icon: "bi-arrow-down-left" },
                                  { id: "bottom-center-placeholder", icon: "bi-dash", disabled: true },
                                  { id: "bottom-right", icon: "bi-arrow-down-right" }
                                ].map((cell, i) => {
                                  if (cell.disabled) {
                                    return <div key={i} className="aspect-square bg-slate-900/10 border border-slate-800/10 rounded-lg"></div>;
                                  }
                                  const isSelected = watermarkPosition === cell.id;
                                  return (
                                    <button
                                      key={cell.id}
                                      type="button"
                                      onClick={() => setWatermarkPosition(cell.id as any)}
                                      className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${isSelected
                                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm"
                                        : "bg-slate-800/40 border-slate-700/30 text-slate-500 hover:text-slate-300 hover:border-slate-600"
                                        }`}
                                      title={`Anchor ${cell.id}`}
                                    >
                                      <i className={`bi ${cell.icon} text-base`}></i>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Opacity & Size Slider Pair */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/40 pt-4">
                          <div className="space-y-1.5 bg-slate-950/25 p-3 rounded-xl border border-slate-800/40">
                            <div className="flex justify-between items-center text-xs text-slate-400">
                              <span className="font-semibold text-slate-300">Watermark Opacity</span>
                              <span className="font-mono text-[11px] text-emerald-400">{watermarkOpacity}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setWatermarkOpacity(prev => Math.max(10, prev - 10))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer"
                              >
                                -
                              </button>
                              <input
                                type="range"
                                min="10"
                                max="100"
                                step="10"
                                value={watermarkOpacity}
                                onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                                className="flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer"
                              />
                              <button
                                type="button"
                                onClick={() => setWatermarkOpacity(prev => Math.min(100, prev + 10))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1.5 bg-slate-950/25 p-3 rounded-xl border border-slate-800/40">
                            <div className="flex justify-between items-center text-xs text-slate-400">
                              <span className="font-semibold text-slate-300">Watermark Font Size</span>
                              <span className="font-mono text-[11px] text-emerald-400">{watermarkSize}px</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setWatermarkSize(prev => Math.max(12, prev - 2))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer"
                              >
                                -
                              </button>
                              <input
                                type="range"
                                min="12"
                                max="48"
                                step="2"
                                value={watermarkSize}
                                onChange={(e) => setWatermarkSize(Number(e.target.value))}
                                className="flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer"
                              />
                              <button
                                type="button"
                                onClick={() => setWatermarkSize(prev => Math.min(48, prev + 2))}
                                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: EXPORT SPECIFICATIONS */}
                    {studioTab === "export" && (
                      <div className="space-y-5 animate-fadeIn">
                        <div className="pb-3 border-b border-slate-800/60 flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                            <i className="bi bi-cpu-fill text-emerald-400"></i> Format & Compression Tuning
                          </h3>
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest text-right">Web Delivery Optim</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Format Choice */}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Export File Container</label>
                              <div className="grid grid-cols-3 gap-2.5">
                                {[
                                  { id: "image/png", label: "PNG", ext: ".png", desc: "Lossless Master", highlight: "border-teal-500/50" },
                                  { id: "image/jpeg", label: "JPEG", ext: ".jpg", desc: "Compressed Pro", highlight: "border-amber-500/50" },
                                  { id: "image/webp", label: "WebP", ext: ".webp", desc: "Ultra Compact", highlight: "border-emerald-500/50" }
                                ].map((fmt) => (
                                  <button
                                    key={fmt.id}
                                    type="button"
                                    onClick={() => setExportFormat(fmt.id as any)}
                                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between h-[85px] active:scale-95 ${exportFormat === fmt.id
                                      ? `bg-slate-800 ${fmt.highlight} text-white ring-1 ring-emerald-500/30`
                                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                                      }`}
                                  >
                                    <span className="font-extrabold text-sm text-slate-100">{fmt.label}</span>
                                    <div>
                                      <span className="text-[10px] font-mono text-slate-500 block">{fmt.desc}</span>
                                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block mt-0.5">{fmt.ext}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Quality Slider with automatic lossless indicator */}
                          <div className="space-y-3.5">
                            <div className="space-y-1.5 bg-slate-950/25 p-3.5 rounded-xl border border-slate-800/40">
                              <div className="flex justify-between items-center text-xs text-slate-400">
                                <span className="font-semibold text-slate-300">Fidelity Level (Quality)</span>
                                <span className="font-mono text-[11px] text-emerald-400">
                                  {exportFormat === "image/png" ? "100% (Lossless)" : `${exportQuality}%`}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  disabled={exportFormat === "image/png"}
                                  onClick={() => setExportQuality(prev => Math.max(10, prev - 5))}
                                  className={`w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer ${exportFormat === "image/png" ? "opacity-30 cursor-not-allowed" : ""
                                    }`}
                                >
                                  -
                                </button>
                                <input
                                  type="range"
                                  min="10"
                                  max="100"
                                  step="5"
                                  disabled={exportFormat === "image/png"}
                                  value={exportQuality}
                                  onChange={(e) => setExportQuality(Number(e.target.value))}
                                  className={`flex-1 accent-emerald-400 bg-slate-800/60 rounded-lg appearance-none h-1.5 cursor-pointer ${exportFormat === "image/png" ? "opacity-30 cursor-not-allowed" : ""
                                    }`}
                                />
                                <button
                                  type="button"
                                  disabled={exportFormat === "image/png"}
                                  onClick={() => setExportQuality(prev => Math.min(100, prev + 5))}
                                  className={`w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center cursor-pointer ${exportFormat === "image/png" ? "opacity-30 cursor-not-allowed" : ""
                                    }`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Estimated Stats simulation box */}
                            <div className="p-3 bg-slate-950/65 rounded-xl border border-slate-800/60">
                              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                <i className="bi bi-info-circle-fill text-emerald-400"></i> Estimated Delivery Profile
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                                <div className="text-slate-400">
                                  Compression:{" "}
                                  <span className="text-emerald-400 font-bold">
                                    {exportFormat === "image/png" ? "Low (High Detail)" : exportQuality < 50 ? "Aggressive" : "Optimal (Visual Lossless)"}
                                  </span>
                                </div>
                                <div className="text-slate-400">
                                  File Saver Rank:{" "}
                                  <span className="text-teal-400 font-bold">
                                    {exportFormat === "image/webp" ? "Rank #1 (Ultra compact)" : exportFormat === "image/jpeg" ? "Rank #2 (Highly compatible)" : "Rank #3 (Preserves layers)"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Status Panel inside active panel */}
                    <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>State: </span>
                        <span className="text-emerald-400">
                          {brightness !== 0 || contrast !== 0 || saturation !== 0 || blur > 0 || sepia > 0 || activeFilterPreset !== "none" || watermarkText !== ""
                            ? "Customized parameters applied"
                            : "Default balanced parameters"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setBrightness(0);
                          setContrast(0);
                          setSaturation(0);
                          setBlur(0);
                          setSepia(0);
                          setActiveFilterPreset("none");
                          setWatermarkText("");
                          setWatermarkPosition("bottom-right");
                          setWatermarkOpacity(50);
                          setWatermarkColor("#ffffff");
                          setWatermarkSize(24);
                          setExportFormat("image/png");
                          setExportQuality(90);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/30 text-[10px] font-sans font-bold uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1 active:scale-95 self-stretch xs:self-auto justify-center"
                      >
                        <i className="bi bi-arrow-counterclockwise"></i> Reset Workspace
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* AI REPORT */}
            <div className="report-card mt-12 text-left">
              <div className="status-badge bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold inline-block mb-4">
                🤖 AI Optimization Report
              </div>
              <h2 className="text-xl font-bold mb-3 text-slate-100">Transformation Analysis</h2>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Snap Optimizer AI analyzed your uploaded image and applied intelligent parameters to improve quality, enhance lighting and resize resolution based on your selected prompt: <code className="bg-slate-900/60 text-emerald-400 px-2 py-1 rounded font-mono font-bold text-xs">"{result.prompt || "Default Auto-Enhance"}"</code>.
              </p>

              <div className="ai-dashboard mt-6">
                <div className="dashboard-card">
                  <h2 className="text-xl font-bold truncate max-w-full px-1" title={result.effectApplied}>
                    {result.effectApplied}
                  </h2>
                  <p>Transformation</p>
                </div>
                <div className="dashboard-card">
                  <h2>{formatBytes(result.original_bytes)}</h2>
                  <p>Original Size</p>
                </div>
                <div className="dashboard-card">
                  <h2>{formatBytes(result.transformed_bytes)}</h2>
                  <p>Optimized Size</p>
                </div>
                <div className="dashboard-card">
                  <h2>
                    {result.original_bytes > 0
                      ? Math.round((1 - result.transformed_bytes / result.original_bytes) * 100)
                      : 0}
                    %
                  </h2>
                  <p>Optimization</p>
                </div>
              </div>

              {/* AUTOMATIC IMAGE STUDY SUMMARY */}
              {result.aiSummary && (
                <div className="mt-8 pt-6 border-t border-slate-700/40">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">
                      <i className="bi bi-eye-fill"></i>
                    </div>
                    <h3 className="text-sm font-bold text-slate-200 tracking-wide">Gemini Automatic Image Study</h3>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-5">
                    {/* Title and Key aesthetic */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Subject Matter</h4>
                      <h5 className="text-sm font-semibold text-emerald-400 mb-1.5">{result.aiSummary.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/30 p-3 rounded-xl border border-slate-800/40">
                        "{result.aiSummary.keyAestheticSummary}"
                      </p>
                    </div>

                    {/* Detected objects & palette */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Detected Key Elements</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {result.aiSummary.detectedObjects?.map((obj, i) => (
                            <span key={i} className="bg-slate-800/60 border border-slate-700/30 text-slate-300 text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <i className="bi bi-search text-emerald-400 text-[10px]"></i> {obj}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Dominant Colors</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {result.aiSummary.dominantColors?.map((color, i) => {
                            const isHex = color.match(/#[0-9A-Fa-f]{6}/);
                            const dotColor = isHex ? isHex[0] : "";
                            return (
                              <span key={i} className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/30 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg">
                                {dotColor ? (
                                  <span
                                    className="w-2.5 h-2.5 rounded-full inline-block border border-slate-600/40 shadow-sm"
                                    style={{ backgroundColor: dotColor }}
                                  ></span>
                                ) : (
                                  <span className="w-2.5 h-2.5 rounded-full inline-block bg-emerald-400 border border-slate-600/40 shadow-sm"></span>
                                )}
                                <span>{color}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Composition and Lighting */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/60 pt-4">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
                          <i className="bi bi-aspect-ratio text-emerald-400"></i> Composition & Framing
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {result.aiSummary.composition}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
                          <i className="bi bi-brightness-high-fill text-yellow-400"></i> Lighting & Atmosphere
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {result.aiSummary.lightingMood}
                        </p>
                      </div>
                    </div>

                    {/* Optimization Tips */}
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3.5 flex gap-3 items-start">
                      <div className="text-base text-emerald-400">
                        <i className="bi bi-magic"></i>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300 mb-0.5">Professional Recommendation</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {result.aiSummary.optimizationRecommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI RECOMMENDATIONS */}
            <div className="recommendation text-left p-6 mt-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span>💡</span> AI Recommendations
              </h2>
              <div className="recommend-grid">
                <div className="recommend-card">
                  <div className="recommend-icon">✨</div>
                  <h3>Enhance</h3>
                  <p>Improve brightness, sharpness and image quality.</p>
                </div>
                <div className="recommend-card">
                  <div className="recommend-icon">📱</div>
                  <h3>Instagram</h3>
                  <p>Export perfectly sized social media assets.</p>
                </div>
                <div className="recommend-card">
                  <div className="recommend-icon">💼</div>
                  <h3>LinkedIn</h3>
                  <p>Create professional profiles and banners.</p>
                </div>
                <div className="recommend-card">
                  <div className="recommend-icon">⚡</div>
                  <h3>Compression</h3>
                  <p>Reduce file size without losing premium fidelity.</p>
                </div>
              </div>
            </div>

            {/* DOWNLOAD SECTION */}
            <div className="report-card mt-8 bg-slate-900/60 border border-slate-700/30 p-6 rounded-2xl">
              <h2 className="text-lg font-bold mb-2 text-slate-100">⬇ Download Your Personalized Masterpiece</h2>
              <p className="text-sm text-slate-400 mb-6">
                Your optimized image is fully rendered with all selected parameters, branding, and chosen file format ({exportFormat.split("/")[1].toUpperCase()}).
              </p>
              <div className="buttons flex flex-wrap gap-4">
                <a
                  href={adjustedImageUrl || result.image_url}
                  download={`morphix-optimized.${exportFormat.split("/")[1] === "jpeg" ? "jpg" : exportFormat.split("/")[1]}`}
                  className="btn inline-flex items-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] border-none py-3 px-6 rounded-xl"
                >
                  <i className="bi bi-download"></i> Download {exportFormat.split("/")[1].toUpperCase()} Image
                </a>
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(52, 211, 153, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  href={adjustedImageUrl || result.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn inline-flex items-center gap-2 cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 px-6 rounded-xl transition-all"
                >
                  <i className="bi bi-arrows-fullscreen"></i> View Full Resolution
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "rgba(52, 211, 153, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={resetAll}
                  className="btn inline-flex items-center gap-2 cursor-pointer bg-transparent hover:bg-slate-800/60 border border-slate-700 text-slate-200 hover:text-white py-3 px-6 rounded-xl transition-all"
                >
                  <i className="bi bi-arrow-repeat"></i> Transform Another Image
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= MODAL WINDOWS ================= */}
      {activeModal && activeModal !== "about" && (
        <div id="toolModal" className="tool-modal" style={{ display: "flex" }}>
          <div className="tool-modal-content">
            <span className="close-modal" onClick={() => setActiveModal(null)}>&times;</span>
            <h2 id="modalTitle" className="capitalize text-2xl font-bold mb-6 text-slate-100">
              {activeModal}
            </h2>
            <div id="modalButtons" className="flex flex-wrap gap-3 justify-center">
              {tools[activeModal as keyof typeof tools].map((item) => (
                <motion.button
                  whileHover={{ scale: 1.08, y: -2, backgroundColor: "rgba(52, 211, 153, 0.15)", borderColor: "rgba(52, 211, 153, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  key={item}
                  className="tool-btn capitalize px-5 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 hover:text-white font-semibold transition-all duration-300 cursor-pointer"
                  onClick={() => selectChipPrompt(item)}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABOUT MODAL */}
      {activeModal === "about" && (
        <div id="aboutModal" className="modal" style={{ display: "flex" }} onClick={() => setActiveModal(null)}>
          <div className="modal-content text-left" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setActiveModal(null)}>&times;</span>
            <div className="modal-logo mx-auto block mb-4 text-center text-4xl">⚡</div>
            <h2 className="text-center text-2xl font-bold mb-1 text-slate-100">About Morphix AI</h2>
            <p className="modal-subtitle text-center text-slate-400 text-sm mb-6">
              Professional AI-powered image optimization platform built with Express, React and Cloudinary AI.
            </p>

            <div className="modal-section mb-6">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>Morphix AI</strong> is an intelligent AI-powered image optimization platform designed to simplify image editing with just a few clicks. It enables users to enhance, transform, resize and optimize images through a clean, modern, and interactive glassmorphic web interface.
              </p>
            </div>

            <div className="modal-section mb-6">
              <h2 className="font-bold text-lg mb-2 text-slate-100">🖼 Upload Page</h2>
              <ul className="feature-list list-disc pl-5 text-sm text-slate-300 space-y-1.5">
                <li>📤 Drag & Drop image upload</li>
                <li>👀 Live image preview before processing</li>
                <li>📂 Supports JPG, PNG and WEBP images</li>
                <li>✨ Interactive AI Effects, Social Media and Professional tool cards</li>
                <li>🤖 Custom AI prompt for personalized image transformations</li>
                <li>⚡ One-click AI image processing</li>
                <li>🎨 Modern glassmorphism user interface</li>
                <li>🌌 Animated particles and gradient background</li>
              </ul>
            </div>

            <div className="modal-section mb-6">
              <h2 className="font-bold text-lg mb-3 text-slate-100">✨ AI Transformations</h2>
              <div className="tech-grid flex flex-wrap gap-2 text-xs">
                {Object.values(tools).flat().concat("background removal").map((t) => (
                  <span key={t} className="bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-md text-slate-300 capitalize">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-section mb-6">
              <h2 className="font-bold text-lg mb-2 text-slate-100">📊 Result Page</h2>
              <ul className="feature-list list-disc pl-5 text-sm text-slate-300 space-y-1.5">
                <li>🖼 Side-by-side comparison of Original and Optimized images</li>
                <li>📏 Original & optimized image resolution</li>
                <li>💾 File size comparison</li>
                <li>📈 Compression percentage analysis</li>
                <li>📋 Optimization summary report</li>
                <li>🔍 Full-size image preview</li>
                <li>🔄 Transform another image instantly</li>
              </ul>
            </div>

            <div className="modal-section">
              <h2 className="font-bold text-lg mb-2 text-slate-100">👩‍💻 Developer Info</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                <strong>Mokshith,Mohith,Guna and Mayur</strong> are the AI & Backend Developer passionate about building modern web applications, focusing on intelligent image transformation with a modern and user-friendly experience.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= PREMIUM FOOTER ================= */}
      <footer className="footer bg-slate-950/40 border-t border-slate-900/60 mt-20 rounded-t-[30px] backdrop-blur-2xl relative overflow-hidden" id="contact">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-slate-900/40">
            {/* Brand Logo and Subline */}
            <div className="flex items-center gap-3 select-none text-left">
              <LogoSymbol isLoading={isLoading} />
              <div>
                <h2 className="text-white font-extrabold text-base leading-none tracking-tight">
                  Morphix AI
                </h2>
                <span className="text-[9px] font-bold text-slate-500 tracking-wider block mt-1 uppercase">
                  Create • Optimize • Transform
                </span>
              </div>
            </div>

            {/* Premium Minimalistic Social Icons */}
            <div className="flex items-center gap-2.5">
              {[
                { icon: "bi-github", url: "https://github.com", name: "GitHub" },
                { icon: "bi-linkedin", url: "https://linkedin.com", name: "LinkedIn" },
                { icon: "bi-envelope-fill", url: "mailto:mokshithgowda329@gmail.com", name: "Email" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-9 h-9 rounded-xl bg-slate-900/60 border border-slate-800/60 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/5 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <i className={`bi ${social.icon} text-base`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Simple Bottom Bar with Copyright & Details */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 justify-center sm:justify-start">
              <span>© 2026 Morphix AI.</span>
              <span className="text-slate-800 hidden sm:inline">•</span>
              <a href="#about" onClick={(e) => { e.preventDefault(); setActiveModal("about"); }} className="hover:text-emerald-400 transition-colors">Platform Info</a>
              <span className="text-slate-800">•</span>
              <span className="flex items-center gap-1"><i className="bi bi-cpu text-[10px]"></i> Cloudinary & Gemini AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
