"use client";

import { useState } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, MapPin, Maximize2, Navigation } from "lucide-react";

type EventLocationMapProps = {
  venue: string;
  location: string;
  center?: [number, number];
};

const mapStyles = {
  dark: "https://tiles.openfreemap.org/styles/bright",
};

export function EventLocationMap({
  venue,
  location,
  center = [32.6237, 0.2422], // Speke Resort Munyonyo fallback
}: EventLocationMapProps) {
  const [open, setOpen] = useState(false);

  const [lng, lat] = center;

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="group cursor-pointer overflow-hidden border-white/10 bg-white/[0.03] p-0 text-white"
      >
        <div className="relative h-[220px] overflow-hidden">
          <Map center={center} zoom={11.5} styles={mapStyles}>
            <MapMarker longitude={lng} latitude={lat}>
              <MarkerContent>
                <div className="relative flex size-6 items-center justify-center rounded-full bg-violet-400 shadow-[0_0_24px_rgba(167,139,250,0.9)]">
                  <div className="absolute size-10 animate-ping rounded-full bg-violet-400/30" />
                  <MapPin className="relative z-10 size-4 fill-violet-950 text-violet-950" />
                </div>
              </MarkerContent>
              <MarkerLabel position="bottom">{venue}</MarkerLabel>
            </MapMarker>
          </Map>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d141d] via-[#0d141d]/30 to-transparent" />

          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-md">
            <Maximize2 className="h-4 w-4 text-violet-300" />
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-semibold text-white">{venue}</p>
            <p className="mt-1 text-xs text-slate-300">{location}</p>
            <p className="mt-3 text-xs text-violet-300 opacity-0 transition group-hover:opacity-100">
              Click to view larger map
            </p>
          </div>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-4xl max-w-5xl overflow-hidden border-white/10 bg-[#0d141d] p-0 text-white">
          <DialogHeader className="border-b border-white/10 px-6 py-5">
            <DialogTitle className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-violet-300" />
              {venue}
            </DialogTitle>
            <p className="text-sm text-slate-400">{location}</p>
          </DialogHeader>

          <div className="relative h-[70vh] -mt-5">
            <Map center={center} zoom={13.5} theme="dark" styles={mapStyles}>
              <MapControls
                position="top-right"
                showZoom
                showCompass
                showLocate
                showFullscreen
                className="text-black"
              />

              <MapMarker longitude={lng} latitude={lat}>
                <MarkerContent>
                  <div className="relative flex size-7 items-center justify-center rounded-full bg-violet-400 shadow-[0_0_28px_rgba(167,139,250,1)]">
                    <div className="absolute size-12 animate-ping rounded-full bg-violet-400/30" />
                    <MapPin className="relative z-10 size-4 fill-violet-950 text-violet-950" />
                  </div>
                </MarkerContent>

                <MarkerLabel position="bottom">{venue}</MarkerLabel>

                <MarkerPopup>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{venue}</p>
                    <p className="text-xs text-muted-foreground">{location}</p>
                  </div>
                </MarkerPopup>
              </MapMarker>
            </Map>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),rgba(13,20,29,0.28))]" />

            {/* <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                  <Navigation className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium">Event venue location</p>
                  <p className="text-sm text-slate-400">
                    Open the map to view the venue clearly.
                  </p>
                </div>
              </div>

              <Button className="bg-violet-500 hover:bg-violet-400">
                Get Directions
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
