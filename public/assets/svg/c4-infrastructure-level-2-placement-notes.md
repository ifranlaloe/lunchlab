# Level 2 placement notes

These overlays are positioned on top of `c4-infrastructure-level-1.svg`.

## Base map

- Level 1 Netherlands boundary:
  - Source: PDOK / Kadaster `Bestuurlijke Gebieden` OGC API.
  - Collection: `landgebied`.
  - Feature: `Nederland`.
  - Use: the largest land-boundary polygon is simplified for presentation-scale rendering inside the C4 context box.

## Geometry-backed overlays

- Road network:
  - Source: PDOK / Rijkswaterstaat `NWB - Wegen` OGC API.
  - Collection: `wegvakken`.
  - Use: main A-road network only, derived from Rijksbeheer segments and A-route metadata in the same official dataset, then simplified for facilitation-scale readability.
  - Styling: dual red/orange stroke to keep road structure visible on top of the Level 1 base.
- Waterways:
  - Source: PDOK / Rijkswaterstaat `NWB - Vaarwegen` OGC API.
  - Collection: `vaarwegvakken`.
  - Use: selected national-scale inland routes such as Maas, Waal, Lek, Neder-Rijn, Geldersche IJssel, Amsterdam-Rijnkanaal, Noordzeekanaal, Prinses Margrietkanaal, Schelde-Rijnverbinding, and major delta waterways.
  - Styling: main waterways use a stronger blue stroke; secondary waterways use a lighter blue stroke.
- Rail network:
  - Source: PDOK / ProRail `Spoorwegen` OGC API.
  - Collection: `trace`.
  - Use: simplified trace midlines over 250 meters, clipped to the Netherlands map extent.
  - Styling: one consistent orange rail stroke so the layer remains readable in the Level 2 build slides.
- Air airports:
  - Source: LVNL Geoportaal `Aerodrome_data` Feature Service (ArcGIS REST), data owner LVNL.
  - Layers: `Aerodrome Civil` (0) and `Aerodrome Joint` (2).
  - Use: selected major airport locations as point markers (EHAM, EHRD, EHEH, EHBK, EHGG, EHLE) to keep the air mode clear at facilitation scale.
  - Styling: purple circles with dark outline, without route lines.

## Coordinate approach

- ViewBox and geometry remain identical to Level 1 (`1600x900`) for direct stacking.
- Official line and point geometries are fetched in WGS84 longitude/latitude from PDOK and LVNL APIs.
- The Level 1 country boundary uses the same transform as the Level 2 route overlays.
- Coordinates are transformed into the existing simplified Level 1 SVG outline using a deck-specific lon/lat-to-viewBox fit:
  - longitude range `3.25..7.25`
  - latitude range `50.75..53.60`
  - SVG x range `235.7..1364.5`
  - SVG y range `734.7..166.6`
- The result is not intended as a survey map; it is a facilitation map aligned to the deck's simplified Level 1 country outline.
