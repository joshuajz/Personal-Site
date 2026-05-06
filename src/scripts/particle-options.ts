import type { ISourceOptions } from "@tsparticles/engine";

export type ParticleSizeKey = "mobile" | "sm" | "md" | "lg" | "xl" | "2xl";

const baseOptions = (linksDistance: number, particleCount = 40): ISourceOptions => ({
  background: {
    color: "#f0f0f0",
  },
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  style: {
    height: "100vh",
    width: "100%",
  },
  particles: {
    color: {
      value: "#F4A261",
    },
    number: {
      value: particleCount,
    },
    links: {
      distance: linksDistance,
      enable: true,
      color: "#A4451A",
    },
    move: {
      enable: true,
    },
    size: {
      value: 1,
    },
    shape: {
      type: "circle",
    },
  },
});

export const particleOptions: Record<ParticleSizeKey, ISourceOptions> = {
  mobile: baseOptions(60, 20),
  sm: baseOptions(60),
  md: baseOptions(100),
  lg: baseOptions(120),
  xl: baseOptions(150),
  "2xl": baseOptions(200),
};
