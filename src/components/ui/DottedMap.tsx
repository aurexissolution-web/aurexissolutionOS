"use client";

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "https://unpkg.com/world-atlas@2/countries-110m.json";

const PINS = [
  {
    name: "Sungai Petani",
    coords: [100.4873, 5.6538] as [number, number],
    anchor: "left" as const,
    boxWidth: 14,
  },
  {
    name: "Kuala Lumpur",
    coords: [101.6869, 3.139] as [number, number],
    anchor: "right" as const,
    boxWidth: 13,
  },
];

const MALAYSIA_ID = "458";

type GeographyItem = {
  id: string;
  rsmKey: string;
} & Record<string, unknown>;

export function DottedMap() {
  return (
    <div className="relative w-full h-full select-none bg-[#05060A]">
      <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />

      <ComposableMap
        projection="geoMercator"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          {/* Much smaller dot pattern for land */}
          <pattern id="dots-other" x="0" y="0" width="1" height="1" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.25" fill="#3E4C30" opacity={0.6} />
          </pattern>
          {/* Brighter and slighly larger dot pattern for Malaysia */}
          <pattern id="dots-malaysia" x="0" y="0" width="1" height="1" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.28" fill="#6B8E23" />
          </pattern>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ZoomableGroup center={[105, 5]} zoom={5.5} minZoom={5.5} maxZoom={5.5}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: GeographyItem[] }) =>
              geographies.map((geo: GeographyItem) => {
                const isMalaysia = geo.id === MALAYSIA_ID;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isMalaysia ? "url(#dots-malaysia)" : "url(#dots-other)"}
                    stroke="transparent"
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Arc connecting both cities */}
          <path
            d="M 100.4873,5.6538 Q 103,6 101.6869,3.139"
            fill="none"
            stroke="#00BFFF"
            strokeWidth={0.15}
            strokeOpacity={0.6}
          />

          {PINS.map((pin) => (
            <Marker key={pin.name} coordinates={pin.coords}>
              {/* Pin glow and core */}
              <circle r={1.5} fill="#00BFFF" opacity={0.15} filter="url(#glow)" />
              <circle r={0.6} fill="#00BFFF" opacity={0.4} />
              <circle r={0.3} fill="#00F0FF" />

              <g>
                {/* Curved connecting line */}
                {pin.anchor === "left" && (
                  <path d="M 0 0 Q 1.5 -2.5 4 -2.5" fill="none" stroke="#00BFFF" strokeWidth={0.15} />
                )}
                {pin.anchor === "right" && (
                  <path d="M 0 0 Q -1.5 -2.5 -4 -2.5" fill="none" stroke="#00BFFF" strokeWidth={0.15} />
                )}
                
                {/* Custom SVG Label Box to prevent clipping and match design */}
                <g transform={`translate(${pin.anchor === "left" ? 4 : -(pin.boxWidth + 4)}, -4.5)`}>
                  <rect 
                    width={pin.boxWidth} 
                    height={4} 
                    rx={1} 
                    fill="#0A0F15" 
                    stroke="#1C355E" 
                    strokeWidth={0.15} 
                  />
                  <text 
                    x={pin.boxWidth / 2} 
                    y={2.1} 
                    fill="#F8FAFC" 
                    fontSize="1.6" 
                    fontWeight={600} 
                    textAnchor="middle" 
                    alignmentBaseline="central"
                  >
                    {pin.name}
                  </text>
                </g>
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
