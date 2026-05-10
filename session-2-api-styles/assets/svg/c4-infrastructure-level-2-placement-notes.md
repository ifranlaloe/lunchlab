# Level 2 placement notes

These overlays are positioned on top of `c4-infrastructure-level-1.svg`.

## Base map

- Level 1 Netherlands boundary:
  - Source: PDOK / Kadaster `Bestuurlijke Gebieden` OGC API.
  - Collection: `landgebied`.
  - Feature: `Nederland`.
  - Use: the largest land-boundary polygon is simplified for presentation-scale rendering inside the C4 context box.

## Geometry-backed overlays

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

## Anchor-only overlays

The remaining Level 2 overlays are still conceptual anchor overlays:

- Road network anchor near Utrecht.
- Energy grid anchor near Eemshaven.
- Telecom anchor near Amsterdam.
- Data centers anchor in the Amsterdam metro region.
- Control centers anchor near Arnhem.

## Coordinate approach

- ViewBox and geometry remain identical to Level 1 (`1600x900`) for direct stacking.
- Official route geometries are fetched in CRS84 longitude/latitude from PDOK OGC API Features.
- The Level 1 country boundary uses the same transform as the Level 2 route overlays.
- Coordinates are transformed into the existing simplified Level 1 SVG outline using a deck-specific lon/lat-to-viewBox fit:
  - longitude range `3.25..7.25`
  - latitude range `50.75..53.60`
  - SVG x range `235.7..1364.5`
  - SVG y range `734.7..166.6`
- The result is not intended as a survey map; it is a facilitation map aligned to the deck's simplified Level 1 country outline.
