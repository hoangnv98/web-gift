/**
 * Image registry.
 * Today images come from Unsplash (free to use). When you move to a CMS or
 * your own product photography, replace `unsplash()` with your asset URLs —
 * every component only consumes `src` strings, nothing else changes.
 */
export function unsplash(id: string, w = 1200, h?: number) {
  const params = new URLSearchParams({
    w: String(w),
    q: "80",
    auto: "format",
    fit: "crop",
  });
  if (h) params.set("h", String(h));
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
}

export const img = {
  // Gift boxes & wrapping
  redGifts: "1513885535751-8b9238bd345a",
  handingGift: "1512909006721-3d6018887383",
  goldBows: "1607344645866-009c320b63e0",
  darkLuxuryGifts: "1608755728617-aefab37d2edd",
  kraftPinkRibbon: "1513201099705-a9746e1e201f",
  handmadeWrap: "1584305574647-0cc949a2bb9f",
  pineBerries: "1512389142860-9c449e58a543",
  ornaments: "1512474932049-78ac69ede12c",
  // Decor
  blossom: "1517646331032-9e8563c520a1",
  tulips: "1561181286-d3fee7d55364",
  // Wine
  wineToast: "1510812431401-41d2bd2722f3",
  wineVineyard: "1506377247377-2a5b3b417ebb",
  wineGrapes: "1474722883778-792e7990302f",
  winePour: "1553361371-9b22f78e8b1d",
  // Tea
  teaGlass: "1576092768241-dec231879fc3",
  teaCup: "1597318181409-cf64d0b5d8a2",
  teaPot: "1564890369478-c89ca6d9cde9",
  // Coffee
  coffeeFlatlay: "1497935586351-b67a49e012bf",
  coffeeSack: "1524350876685-274059332603",
  coffeeLatte: "1561336313-0bd5e0b27ec8",
  coffeeBag: "1559056199-641a0ac8b55e",
  coffeeGround: "1559525839-b184a4d698c7",
  espresso: "1610889556528-9a770e32642f",
  coffeeCookies: "1544787219-7f47ccb76574",
  // Chocolate
  chocolateBox: "1481391319762-47dff72954d9",
  chocolateStack: "1606312619070-d48b4c652a52",
  chocolateBar: "1610450949065-1f2841536c88",
  // Nuts, fruit, honey
  mixedNuts: "1543158181-1274e5362710",
  nutJars: "1542990253-a781e04c0082",
  fruits: "1610832958506-aa56368176cf",
  berries: "1596591606975-97ee5cef3a1e",
  honeyMandarin: "1471943311424-646960669fbc",
} as const;

export type ImageKey = keyof typeof img;
