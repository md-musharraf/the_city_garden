const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImage = async (file, fileName) => {
  try {
    const response = await imagekit.upload({
      file: file,
      fileName: fileName,
      folder: "the-city-garden",
    });
    return response; // Ensure you return the response
  } catch (error) {
    throw error; // Rethrow or handle as needed
  }
};

module.exports = uploadImage;
