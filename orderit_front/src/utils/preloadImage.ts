export async function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => {
      const defaultImg = new Image();
      defaultImg.src = 'Orderit-logo.png';
      defaultImg.onload = () => resolve(defaultImg);
      defaultImg.onerror = () => {
        reject();
      }
    };
  });
}