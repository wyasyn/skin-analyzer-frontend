/**
 * Validates if the provided image contains at least the specified percentage of skin
 *
 * @param imageData Base64 encoded image data
 * @param minPercentage Minimum percentage of skin required (0-100)
 * @returns Promise that resolves to true if image contains enough skin, false otherwise
 */
export async function validateSkinPercentage(imageData: string, minPercentage: number): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Create a canvas to analyze the image
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        console.error("Could not get canvas context")
        resolve(false)
        return
      }

      // Set canvas dimensions to match image
      canvas.width = img.width
      canvas.height = img.height

      // Draw image on canvas
      ctx.drawImage(img, 0, 0)

      // Get image data for analysis
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Count skin pixels
      let skinPixels = 0
      const totalPixels = canvas.width * canvas.height

      // Simple skin detection algorithm
      // This is a basic implementation and could be improved with more sophisticated methods
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Simple skin tone detection based on RGB values
        // This is a very basic approach and could be improved
        if (isSkinTone(r, g, b)) {
          skinPixels++
        }
      }

      // Calculate percentage of skin pixels
      const skinPercentage = (skinPixels / totalPixels) * 100

      // Resolve with result
      resolve(skinPercentage >= minPercentage)
    }

    img.onerror = () => {
      console.error("Error loading image for skin validation")
      resolve(false)
    }

    // Load the image
    img.src = imageData
  })
}

/**
 * Simple function to detect if a pixel is likely to be skin based on RGB values
 * This is a basic implementation and could be improved with more sophisticated methods
 */
function isSkinTone(r: number, g: number, b: number): boolean {
  // Basic skin tone detection rules
  // These thresholds are simplified and could be improved

  // Rule 1: Red value is higher than green and blue
  const rule1 = r > g && r > b

  // Rule 2: Red, green, and blue have certain relationships in skin tones
  const rule2 =
    r > 95 && g > 40 && b > 20 && Math.max(r, g, b) - Math.min(r, g, b) > 15 && Math.abs(r - g) > 15 && r > g && r > b

  // Rule 3: Avoid very bright or very dark pixels
  const brightness = (r + g + b) / 3
  const rule3 = brightness > 20 && brightness < 240

  return (rule1 && rule3) || rule2
}

/**
 * Checks if an image is below the specified size limit
 *
 * @param imageData Base64 encoded image data
 * @param maxSizeKB Maximum size in kilobytes
 * @returns True if image is below size limit, false otherwise
 */
export function isImageBelowSizeLimit(imageData: string, maxSizeKB: number): boolean {
  // Calculate size of base64 string in bytes
  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64String = imageData.split(",")[1]
  const sizeInBytes =
    (base64String.length * 3) / 4 - (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0)
  const sizeInKB = sizeInBytes / 1024

  return sizeInKB <= maxSizeKB
}

/**
 * Compresses an image to be below the specified size limit
 *
 * @param imageData Base64 encoded image data
 * @param maxSizeKB Maximum size in kilobytes
 * @returns Promise that resolves to compressed image data
 */
export async function compressImage(imageData: string, maxSizeKB: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      let quality = 0.9
      const minQuality = 0.1
      let result = imageData

      const compress = () => {
        const canvas = document.createElement("canvas")
        // Maintain aspect ratio but reduce dimensions if the image is very large
        let width = img.width
        let height = img.height

        // If image dimensions are very large, scale them down
        const maxDimension = 1600
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        // Try to compress with current quality
        result = canvas.toDataURL("image/jpeg", quality)

        // Check if the result is below the size limit
        if (isImageBelowSizeLimit(result, maxSizeKB) || quality <= minQuality) {
          resolve(result)
        } else {
          // Reduce quality and try again
          quality -= 0.1
          quality = Math.max(quality, minQuality)
          compress()
        }
      }

      compress()
    }

    img.onerror = () => {
      reject(new Error("Error loading image for compression"))
    }

    img.src = imageData
  })
}

