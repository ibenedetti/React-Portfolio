// imageUtils.js

// Helper function to import images dynamically
export const importImages = async (prefix, count) => {
    let images = [];
    for (let i = 1; i <= count; i++) {
      const imageModule = await import(`../assets/img/${prefix}-${i}.jpg`);
      images.push(imageModule.default);
    }
    return images;
  };
  