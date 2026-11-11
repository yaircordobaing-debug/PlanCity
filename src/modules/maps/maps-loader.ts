// Loader controlado para Google Maps JavaScript API
let isScriptLoading = false;
let isScriptLoaded = false;

export function loadGoogleMapsSdk(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (isScriptLoaded || (window as any).google?.maps) {
    isScriptLoaded = true;
    return Promise.resolve(true);
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    // Si no está configurada la clave pública, no rompemos la app
    return Promise.resolve(false);
  }

  if (isScriptLoading) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if ((window as any).google?.maps) {
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        resolve(false);
      }, 5000);
    });
  }

  isScriptLoading = true;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      resolve(true);
    };
    script.onerror = () => {
      console.warn('Google Maps JavaScript SDK no pudo cargarse.');
      isScriptLoading = false;
      resolve(false);
    };
    document.head.appendChild(script);
  });
}
