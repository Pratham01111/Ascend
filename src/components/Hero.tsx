type HeroProps = {
  /** Font-size in px — the whole badge scales off this, matching the design's em-based sizing. */
  size?: number;
  /** CSS color; the badge draws entirely in currentColor. */
  color?: string;
  className?: string;
};

export default function Hero({ size = 64, color = "#F2A94E", className }: HeroProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "1.75em",
        height: "2.35em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        fontSize: size,
        lineHeight: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "2.7em",
          height: "2.7em",
          borderRadius: "50%",
          background: "radial-gradient(circle,currentColor 0%,transparent 60%)",
          opacity: 0.2,
          filter: "blur(0.16em)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "2.4em",
          height: "2.4em",
          borderRadius: "50%",
          border: "0.02em solid currentColor",
          opacity: 0.18,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "2.08em",
          height: "2.08em",
          borderRadius: "50%",
          border: "0.035em solid currentColor",
          opacity: 0.55,
          filter: "drop-shadow(0 0 0.16em currentColor)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          width: "2.08em",
          height: "2.08em",
          transform: "translate(-50%,-50%)",
          animation: "ascOrbit 22s linear infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translate(-50%,-50%)",
            width: "0.12em",
            height: "0.12em",
            borderRadius: "50%",
            background: "radial-gradient(circle,#ffffff,currentColor)",
            filter: "drop-shadow(0 0 0.13em currentColor)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "93%",
            top: "75%",
            transform: "translate(-50%,-50%)",
            width: "0.1em",
            height: "0.1em",
            borderRadius: "50%",
            background: "radial-gradient(circle,#ffffff,currentColor)",
            filter: "drop-shadow(0 0 0.12em currentColor)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "7%",
            top: "75%",
            transform: "translate(-50%,-50%)",
            width: "0.08em",
            height: "0.08em",
            borderRadius: "50%",
            background: "radial-gradient(circle,#ffffff,currentColor)",
            filter: "drop-shadow(0 0 0.1em currentColor)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "0.44em",
            height: "0.44em",
            clipPath: "polygon(50% 0,100% 27%,100% 73%,50% 100%,0 73%,0 27%)",
            background:
              "linear-gradient(125deg,rgba(255,255,255,0.55) 0%,rgba(255,255,255,0.05) 42%,rgba(0,0,0,0.42) 100%),currentColor",
            filter: "drop-shadow(0 0 0.16em currentColor)",
          }}
        />

        <div
          style={{
            marginTop: "0.06em",
            width: "1.04em",
            height: "0.3em",
            clipPath: "polygon(0 58%,17% 0,83% 0,100% 58%,90% 100%,10% 100%)",
            background:
              "linear-gradient(90deg,transparent 48.8%,rgba(0,0,0,0.4) 49.4%,rgba(0,0,0,0.4) 50.6%,transparent 51.2%),linear-gradient(120deg,rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.03) 45%,rgba(0,0,0,0.42) 100%),currentColor",
            filter: "drop-shadow(0 0 0.15em currentColor)",
          }}
        />

        <div
          style={{
            position: "relative",
            marginTop: "-0.02em",
            width: "0.88em",
            height: "0.84em",
            clipPath: "polygon(11% 0,89% 0,75% 100%,25% 100%)",
            background:
              "linear-gradient(90deg,transparent 48.6%,rgba(0,0,0,0.38) 49.4%,rgba(0,0,0,0.38) 50.6%,transparent 51.4%),linear-gradient(115deg,rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.02) 46%,rgba(0,0,0,0.44) 100%),currentColor",
            filter: "drop-shadow(0 0 0.16em currentColor)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "0.07em",
              transform: "translateX(-50%)",
              width: "0.055em",
              height: "0.6em",
              borderRadius: "0.03em",
              background: "linear-gradient(180deg,rgba(255,255,255,0.75),transparent)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "-0.02em",
            width: "0.52em",
            height: "0.4em",
            clipPath: "polygon(26% 0,74% 0,60% 100%,40% 100%)",
            background: "linear-gradient(180deg,currentColor,transparent)",
            opacity: 0.7,
            filter: "drop-shadow(0 0 0.12em currentColor)",
          }}
        />
      </div>
    </div>
  );
}
