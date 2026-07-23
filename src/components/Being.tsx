import type { CSSProperties } from "react";
import type { SpecKey } from "@/lib/specs";

type BeingProps = {
  spec: SpecKey;
  level: number;
  /** Font-size in px — the whole figure scales off this. */
  size?: number;
  color?: string;
  className?: string;
};

type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

export default function Being({ spec, level, size = 120, color = "#8B93A8", className }: BeingProps) {
  const initiate = spec === "initiate";
  const is = (k: SpecKey) => spec === k;

  const hasArmor = !initiate && level >= 10;
  const armorOp = level >= 20 ? 1 : level >= 10 ? 0.6 : 0;
  const ringOn = !initiate && level >= 20;
  const floats = !initiate && level >= 30;
  const crown = !initiate && level >= 50;
  const backScale = initiate ? 0 : level >= 30 ? 1 : level >= 10 ? 0.62 : 0;

  const figureStyle: CSSVars = {
    "--fy": floats ? "-0.1em" : "0em",
    animation: `beFloat ${floats ? "6s" : "0s"} ease-in-out infinite`,
    position: "absolute",
    inset: 0,
  };
  const armorStyle: CSSProperties = { opacity: armorOp, transition: "opacity .5s" };
  const backStyle: CSSProperties = {
    opacity: backScale ? 1 : 0,
    transform: `scale(${backScale || 0.5})`,
    transformOrigin: "center",
    transition: "all .6s",
  };
  const ringStyle: CSSProperties = { opacity: ringOn ? 0.6 : initiate ? 0.28 : 0.4 };

  const showLegs = !is("scholar") && !is("disciplined");
  const stance = is("warrior") ? 22 : 9;
  const legBase: CSSProperties = {
    position: "absolute",
    top: "1.9em",
    width: "0.12em",
    height: "0.82em",
    borderRadius: "0.06em",
    background: "linear-gradient(180deg,rgba(255,255,255,0.7),currentColor)",
    boxShadow: "0 0 0.14em currentColor",
    transformOrigin: "50% 0",
    zIndex: 2,
  };
  const legLStyle: CSSProperties = { ...legBase, left: "1.14em", transform: `rotate(${stance}deg)` };
  const legRStyle: CSSProperties = { ...legBase, left: "1.34em", transform: `rotate(-${stance}deg)` };

  const coreBase: CSSProperties = {
    position: "absolute",
    zIndex: 4,
    filter: "drop-shadow(0 0 0.16em currentColor)",
    background: "radial-gradient(circle at 40% 35%,#ffffff,currentColor 75%)",
  };
  let coreStyle: CSSProperties;
  if (is("builder")) {
    coreStyle = {
      ...coreBase,
      left: "1.13em",
      top: "1.16em",
      width: "0.34em",
      height: "0.34em",
      clipPath: "polygon(50% 0,100% 27%,100% 73%,50% 100%,0 73%,0 27%)",
    };
  } else if (is("warrior")) {
    coreStyle = {
      ...coreBase,
      left: "1.15em",
      top: "1.16em",
      width: "0.3em",
      height: "0.3em",
      transform: "rotate(45deg)",
      borderRadius: "0.03em",
    };
  } else if (is("scholar")) {
    coreStyle = {
      ...coreBase,
      left: "1.14em",
      top: "1.18em",
      width: "0.3em",
      height: "0.3em",
      clipPath: "polygon(50% 0,90% 50%,50% 100%,10% 50%)",
    };
  } else if (is("operator")) {
    coreStyle = {
      ...coreBase,
      left: "1.15em",
      top: "1.18em",
      width: "0.28em",
      height: "0.28em",
      borderRadius: "50%",
      boxShadow: "0 0 0 0.03em currentColor,0 0 0.16em currentColor",
    };
  } else if (is("disciplined")) {
    coreStyle = {
      ...coreBase,
      left: "1.19em",
      top: "1.24em",
      width: "0.2em",
      height: "0.2em",
      borderRadius: "50%",
    };
  } else {
    coreStyle = {
      ...coreBase,
      left: "1.21em",
      top: "1.26em",
      width: "0.16em",
      height: "0.16em",
      borderRadius: "50%",
      opacity: 0.7,
    };
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "2.6em",
        height: "3em",
        color,
        fontSize: size,
        lineHeight: 1,
      }}
    >
      <div style={figureStyle}>
        {/* AURA */}
        <div
          style={{
            position: "absolute",
            left: "0.1em",
            top: "0.15em",
            width: "2.4em",
            height: "2.4em",
            borderRadius: "50%",
            background: "radial-gradient(circle,currentColor 0%,transparent 60%)",
            opacity: 0.16,
            filter: "blur(0.16em)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            ...ringStyle,
            position: "absolute",
            left: "0.3em",
            top: "0.35em",
            width: "2em",
            height: "2em",
            borderRadius: "50%",
            border: "0.03em solid currentColor",
            filter: "drop-shadow(0 0 0.14em currentColor)",
            zIndex: 0,
          }}
        />
        {is("disciplined") && (
          <>
            <div
              style={{
                position: "absolute",
                left: "0.12em",
                top: "0.17em",
                width: "2.36em",
                height: "2.36em",
                borderRadius: "50%",
                border: "0.02em solid currentColor",
                opacity: 0.4,
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0.5em",
                top: "0.55em",
                width: "1.6em",
                height: "1.6em",
                borderRadius: "50%",
                border: "0.02em dashed currentColor",
                opacity: 0.35,
                zIndex: 0,
              }}
            />
          </>
        )}

        {/* BACK ELEMENT */}
        <div style={{ ...backStyle, position: "absolute", inset: 0, zIndex: 1 }}>
          {is("builder") && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: "0.42em",
                  top: "0.5em",
                  width: "0.62em",
                  height: "1.15em",
                  clipPath: "polygon(34% 0,100% 14%,86% 100%,8% 86%,0 40%)",
                  background: "linear-gradient(120deg,rgba(255,255,255,0.35),rgba(0,0,0,0.42))",
                  transform: "rotate(-13deg)",
                  filter: "drop-shadow(0 0 0.12em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1.56em",
                  top: "0.5em",
                  width: "0.62em",
                  height: "1.15em",
                  clipPath: "polygon(66% 0,0 14%,14% 100%,92% 86%,100% 40%)",
                  background: "linear-gradient(240deg,rgba(255,255,255,0.35),rgba(0,0,0,0.42))",
                  transform: "rotate(13deg)",
                  filter: "drop-shadow(0 0 0.12em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.55em",
                  top: "1.15em",
                  width: "1.5em",
                  height: "0.02em",
                  background: "currentColor",
                  opacity: 0.28,
                  transform: "rotate(24deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.55em",
                  top: "1.15em",
                  width: "1.5em",
                  height: "0.02em",
                  background: "currentColor",
                  opacity: 0.28,
                  transform: "rotate(-24deg)",
                }}
              />
            </>
          )}

          {is("warrior") && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: "1.21em",
                  top: "0.02em",
                  width: "0.18em",
                  height: "1.2em",
                  clipPath: "polygon(50% 0,100% 100%,0 100%)",
                  background: "linear-gradient(180deg,#ffffff,currentColor)",
                  filter: "drop-shadow(0 0 0.14em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.72em",
                  top: "0.45em",
                  width: "0.14em",
                  height: "1.05em",
                  clipPath: "polygon(50% 0,100% 100%,0 100%)",
                  background: "linear-gradient(180deg,#ffffff,currentColor)",
                  transformOrigin: "bottom center",
                  transform: "rotate(-27deg)",
                  filter: "drop-shadow(0 0 0.12em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1.74em",
                  top: "0.45em",
                  width: "0.14em",
                  height: "1.05em",
                  clipPath: "polygon(50% 0,100% 100%,0 100%)",
                  background: "linear-gradient(180deg,#ffffff,currentColor)",
                  transformOrigin: "bottom center",
                  transform: "rotate(27deg)",
                  filter: "drop-shadow(0 0 0.12em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1.92em",
                  top: "0.9em",
                  width: "0.13em",
                  height: "1.25em",
                  clipPath: "polygon(50% 0,100% 10%,50% 100%,0 10%)",
                  background: "linear-gradient(180deg,#ffffff,currentColor)",
                  transformOrigin: "top center",
                  transform: "rotate(-20deg)",
                  filter: "drop-shadow(0 0 0.12em currentColor)",
                }}
              />
            </>
          )}

          {is("scholar") && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: "0.82em",
                  top: "0.12em",
                  width: "0.96em",
                  height: "0.96em",
                  borderRadius: "50%",
                  border: "0.025em solid currentColor",
                  opacity: 0.85,
                  filter: "drop-shadow(0 0 0.1em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1.3em",
                  top: "0.64em",
                  width: "1.5em",
                  height: "1.5em",
                  transform: "translate(-50%,-50%)",
                  animation: "ascOrbit 26s linear infinite",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    transform: "translate(-50%,-50%) rotate(45deg)",
                    width: "0.14em",
                    height: "0.14em",
                    background: "currentColor",
                    filter: "drop-shadow(0 0 0.1em currentColor)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "100%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "0.13em",
                    height: "0.13em",
                    borderRadius: "50%",
                    background: "currentColor",
                    filter: "drop-shadow(0 0 0.1em currentColor)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "100%",
                    transform: "translate(-50%,-50%) rotate(45deg)",
                    width: "0.12em",
                    height: "0.12em",
                    border: "0.02em solid currentColor",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "0.12em",
                    height: "0.12em",
                    borderRadius: "50%",
                    border: "0.02em solid currentColor",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "0.78em",
                  top: "1.0em",
                  width: "1.04em",
                  height: "1.7em",
                  clipPath: "polygon(30% 0,70% 0,100% 100%,0 100%)",
                  background: "linear-gradient(180deg,currentColor,transparent 92%)",
                  opacity: 0.42,
                  filter: "drop-shadow(0 0 0.12em currentColor)",
                }}
              />
            </>
          )}

          {is("operator") && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: "0.5em",
                  top: "0.92em",
                  width: "1.6em",
                  height: "1.85em",
                  clipPath: "polygon(38% 0,62% 0,100% 100%,0 100%)",
                  background: "linear-gradient(180deg,currentColor,transparent 90%)",
                  opacity: 0.34,
                  filter: "drop-shadow(0 0 0.12em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.34em",
                  top: "0.44em",
                  width: "0.9em",
                  height: "0.02em",
                  background: "currentColor",
                  opacity: 0.4,
                  transform: "rotate(38deg)",
                  transformOrigin: "left",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.34em",
                  top: "0.46em",
                  width: "0.7em",
                  height: "0.02em",
                  background: "currentColor",
                  opacity: 0.4,
                  transform: "rotate(-18deg)",
                  transformOrigin: "left",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1.9em",
                  top: "0.42em",
                  width: "0.8em",
                  height: "0.02em",
                  background: "currentColor",
                  opacity: 0.4,
                  transform: "rotate(-40deg)",
                  transformOrigin: "right",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.32em",
                  top: "0.42em",
                  width: "0.1em",
                  height: "0.1em",
                  borderRadius: "50%",
                  background: "currentColor",
                  filter: "drop-shadow(0 0 0.1em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "0.28em",
                  top: "0.86em",
                  width: "0.09em",
                  height: "0.09em",
                  borderRadius: "50%",
                  background: "currentColor",
                  filter: "drop-shadow(0 0 0.1em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1.02em",
                  top: "0.66em",
                  width: "0.08em",
                  height: "0.08em",
                  borderRadius: "50%",
                  background: "currentColor",
                  filter: "drop-shadow(0 0 0.1em currentColor)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "2.24em",
                  top: "0.7em",
                  width: "0.09em",
                  height: "0.09em",
                  borderRadius: "50%",
                  background: "currentColor",
                  filter: "drop-shadow(0 0 0.1em currentColor)",
                }}
              />
            </>
          )}
        </div>

        {/* SKELETON */}
        <div
          style={{
            position: "absolute",
            left: "1.07em",
            top: "0.4em",
            width: "0.46em",
            height: "0.46em",
            borderRadius: "50%",
            background: "radial-gradient(circle at 38% 32%,#ffffff,currentColor 72%)",
            boxShadow: "0 0 0.28em currentColor,0 0 0.6em currentColor",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "0.83em",
            top: "1em",
            width: "0.94em",
            height: "0.11em",
            borderRadius: "0.06em",
            background: "linear-gradient(180deg,rgba(255,255,255,0.8),currentColor)",
            boxShadow: "0 0 0.16em currentColor",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "1.235em",
            top: "1.02em",
            width: "0.13em",
            height: "0.92em",
            borderRadius: "0.06em",
            background: "linear-gradient(90deg,rgba(255,255,255,0.75),currentColor)",
            boxShadow: "0 0 0.16em currentColor",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "0.9em",
            top: "1.05em",
            width: "0.1em",
            height: "0.72em",
            borderRadius: "0.05em",
            background: "linear-gradient(180deg,rgba(255,255,255,0.7),currentColor)",
            boxShadow: "0 0 0.14em currentColor",
            transformOrigin: "50% 0",
            transform: "rotate(17deg)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "1.6em",
            top: "1.05em",
            width: "0.1em",
            height: "0.72em",
            borderRadius: "0.05em",
            background: "linear-gradient(180deg,rgba(255,255,255,0.7),currentColor)",
            boxShadow: "0 0 0.14em currentColor",
            transformOrigin: "50% 0",
            transform: "rotate(-17deg)",
            zIndex: 2,
          }}
        />

        {showLegs && (
          <>
            <div style={legLStyle} />
            <div style={legRStyle} />
          </>
        )}
        {is("disciplined") && (
          <div
            style={{
              position: "absolute",
              left: "0.92em",
              top: "1.94em",
              width: "0.76em",
              height: "0.24em",
              borderRadius: "0.12em",
              background: "linear-gradient(180deg,rgba(255,255,255,0.6),currentColor)",
              boxShadow: "0 0 0.16em currentColor",
              zIndex: 2,
            }}
          />
        )}

        {/* TORSO ARMOR */}
        {hasArmor && (
          <div
            style={{
              ...armorStyle,
              position: "absolute",
              left: "0.94em",
              top: "0.98em",
              width: "0.72em",
              height: "1.0em",
              clipPath: "polygon(12% 0,88% 0,74% 100%,26% 100%)",
              background:
                "linear-gradient(112deg,rgba(255,255,255,0.38) 0%,rgba(255,255,255,0.02) 46%,rgba(0,0,0,0.44) 100%),currentColor",
              filter: "drop-shadow(0 0 0.16em currentColor)",
              zIndex: 3,
            }}
          />
        )}

        {/* CHEST CORE */}
        <div style={coreStyle} />

        {/* CREST / CROWN */}
        {is("warrior") && (
          <>
            <div
              style={{
                position: "absolute",
                left: "1.24em",
                top: "0.24em",
                width: "0.12em",
                height: "0.2em",
                clipPath: "polygon(50% 0,100% 100%,0 100%)",
                background: "linear-gradient(180deg,#ffffff,currentColor)",
                filter: "drop-shadow(0 0 0.1em currentColor)",
                zIndex: 5,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "1.08em",
                top: "0.3em",
                width: "0.1em",
                height: "0.16em",
                clipPath: "polygon(50% 0,100% 100%,0 100%)",
                background: "linear-gradient(180deg,#ffffff,currentColor)",
                transform: "rotate(-18deg)",
                zIndex: 5,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "1.42em",
                top: "0.3em",
                width: "0.1em",
                height: "0.16em",
                clipPath: "polygon(50% 0,100% 100%,0 100%)",
                background: "linear-gradient(180deg,#ffffff,currentColor)",
                transform: "rotate(18deg)",
                zIndex: 5,
              }}
            />
          </>
        )}
        {crown && (
          <div
            style={{
              position: "absolute",
              left: "1.05em",
              top: "0.16em",
              width: "0.5em",
              height: "0.22em",
              clipPath: "polygon(0 100%,12% 30%,30% 100%,50% 10%,70% 100%,88% 30%,100% 100%)",
              background: "linear-gradient(180deg,#ffffff,currentColor)",
              filter: "drop-shadow(0 0 0.16em currentColor)",
              zIndex: 5,
            }}
          />
        )}
      </div>
    </div>
  );
}
