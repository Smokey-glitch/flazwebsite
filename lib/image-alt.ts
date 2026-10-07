/**
 * Descriptive alt text for the site's photographs, keyed by public path. Describes what is visible in each image
 * (not the project it is used for), so the text stays accurate wherever the photo appears.
 */
const IMAGE_ALT: Record<string, string> = {
  "/images/the-lakes-villa-living.jpg":
    "Villa living room with folding glass doors open to a garden, walnut shelving and cream sofas",
  "/images/business-bay-office.jpg":
    "Open-plan office with desks, teal armchairs, glass meeting rooms and a view of the Burj Khalifa",
  "/images/dubai-apartment-living.jpg":
    "High-floor apartment living room with a curved sofa, walnut joinery and views of the Burj Khalifa at sunset",
  "/images/emirati-majlis.jpg":
    "Traditional majlis with carved plaster walls, a decorative ceiling, built-in seating and large rugs",
  "/images/jvc-one-bedroom.jpg":
    "One-bedroom apartment with a slatted oak sliding partition, grey sofa, kitchenette and balcony",
  "/images/palm-jumeirah-villa.jpg":
    "Modern waterfront villa with an infinity pool, lounge terrace and the Dubai skyline at sunset",
  "/images/dubai-villa-exterior.jpg":
    "Two-storey sandstone villa with carved lattice screens, palm trees, lawn and pool at sunset",
  "/images/dubai-villa-pool.jpg":
    "Villa terrace with an infinity pool and a pergola over lounge seating, facing a golf course",
  "/images/dubai-warehouse-shell.jpg":
    "Empty steel-framed warehouse interior with roller doors and a concrete floor",
  "/images/before-the-lakes-villa.jpg":
    "Villa living room before renovation, with floral sofas, tiled floor and sliding glass doors",
  "/images/before-business-bay-office.jpg":
    "Unfinished office shell with bare concrete, exposed ducts and floor-to-ceiling windows",
  "/images/before-dubai-hills-apartment.jpg":
    "Apartment living room before renovation, with floral sofas, an old television and a tiled floor",
  "/images/before-jvc-studio.jpg":
    "Empty studio apartment before renovation, with a tiled floor, marked walls and a balcony door",
  "/images/before-palm-jumeirah-villa.jpg":
    "Waterfront villa under construction, with a bare concrete structure, scaffolding and an unfinished pool",
  "/images/before-arabian-ranches-villa.jpg":
    "Weathered sandstone villa with a peeling facade, palm trees and an empty pool",
};

/** Alt text for a photo; falls back to the given text when the image has no description yet. */
export function imageAlt(src: string, fallback: string): string {
  return IMAGE_ALT[src] ?? fallback;
}
