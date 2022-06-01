export const getImageSize = (image: FileList) => {
  const URL = window.URL || window.webkitURL;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve([img.width, img.height]);
    img.onerror = reject;
    if (image) {
      img.src = URL.createObjectURL(image[0]);
    }
  });
};
