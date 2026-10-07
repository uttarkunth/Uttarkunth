import React, { useState } from 'react';
import { Property } from '../../types/database.types';
import { MapPin, Navigation, ExternalLink, Star } from 'lucide-react';

interface PropertyMapViewProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (property: Property) => void;
  centerCoordinates?: { lat: number; lng: number };
}

export const PropertyMapView: React.FC<PropertyMapViewProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
}) => {
  const [activeProp, setActiveProp] = useState<Property | null>(selectedProperty || properties[0] || null);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] bg-[#EAE5DC] rounded-2xl overflow-hidden border border-[#D9D1C5] shadow-inner">
      {/* Mountain Map Vector Background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#163E2E_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Styled Top Overlay / Legend */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-stone-200 flex items-center gap-2 text-xs font-medium text-stone-700">
        <MapPin size={16} className="text-[#B85D28]" />
        <span>Verified Uttarkunth Homestays in Parvati & Kullu Valleys</span>
      </div>

      {/* Simulated Interactive Map Canvas */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {/* Valley Topography Sketch (Decorative SVG contour lines) */}
        <svg className="absolute inset-0 w-full h-full stroke-stone-300/60 fill-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q300,50 600,180 T1200,120" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M0,250 Q400,200 800,320 T1400,280" strokeWidth="2" />
          <path d="M0,400 Q500,350 900,450 T1600,390" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>

        {/* Property Pins Placed along the valley coordinates */}
        <div className="relative w-full max-w-2xl h-72">
          {properties.map((prop, index) => {
            const isSelected = activeProp?.id === prop.id;
            // Coordinate relative offsets for visual map placement
            const positions = [
              { top: '35%', left: '42%' }, // Jari (Yash Homestay)
              { top: '20%', left: '25%' }, // Naggar
              { top: '70%', left: '65%' }, // Tirthan
            ];
            const pos = positions[index % positions.length];

            return (
              <div
                key={prop.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                <button
                  onClick={() => {
                    setActiveProp(prop);
                    if (onSelectProperty) onSelectProperty(prop);
                  }}
                  className={`px-2.5 py-1.5 rounded-full shadow-lg font-serif font-bold text-xs flex items-center gap-1.5 transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#163E2E] text-white scale-110 ring-4 ring-[#163E2E]/20'
                      : 'bg-white text-stone-900 hover:bg-[#FBF9F5] border border-stone-200'
                  }`}
                >
                  <MapPin size={13} className={isSelected ? 'text-amber-400' : 'text-[#B85D28]'} />
                  <span>₹{prop.starting_price?.toLocaleString('en-IN')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Property Preview Popup Card */}
      {activeProp && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-30 bg-white/98 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-stone-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex gap-3">
            <img
              src={activeProp.cover_image}
              alt={activeProp.property_name}
              className="w-24 h-24 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span>{activeProp.rating || 4.9}</span>
                <span className="text-stone-400">({activeProp.review_count || 12} reviews)</span>
              </div>
              <h4 className="font-serif font-bold text-sm text-stone-900 truncate mt-0.5">
                {activeProp.property_name}
              </h4>
              <p className="text-[11px] text-stone-500 truncate">{activeProp.locality}, {activeProp.city}</p>
              <p className="text-xs font-serif font-bold text-[#163E2E] mt-1">
                From ₹{activeProp.starting_price?.toLocaleString('en-IN')} / night
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeProp.latitude},${activeProp.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#163E2E] hover:text-[#0F2E22] font-medium"
            >
              <Navigation size={13} />
              <span>Get Directions</span>
              <ExternalLink size={11} className="opacity-60" />
            </a>

            {onSelectProperty && (
              <button
                onClick={() => onSelectProperty(activeProp)}
                className="px-3 py-1 bg-[#B85D28] hover:bg-[#964218] text-white rounded text-[11px] font-semibold uppercase tracking-wider"
              >
                View Rooms
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
