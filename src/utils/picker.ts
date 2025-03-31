import { keepLocalCopy, pick } from "@react-native-documents/picker"
import RNFS from "react-native-fs"

export const pickDocument = async (options: {type: TODO[]; multi?: boolean}, callback: (value: TODO[]) => void) => {
  try {
    // Allow multi-selection of image and PDF files
    const result = await pick({
      allowMultiSelection: options.multi ?? false,
      type: options.type,
      keepLocalCopy: {
        destination: "documentDirectory"
      }
    })
      
    if (result) {
      const newDocs: { link: string; isPdf: boolean }[] = []

      // Loop through selected files and copy them to the app's cache directory
      for (const item of result) {
        const [copyResult] = await keepLocalCopy({
          files: [
            {
              uri: item.uri,
              fileName: item.name ?? "fallback-name",
            },
          ],
          destination: "documentDirectory",
        })
        const fileName = item.name
        const fileType = fileName?.split(".")?.[fileName.split(".").length - 1]?.toLowerCase()

        // Check if the file is a PDF
        const isPdf = fileType === "pdf"

        // Add the file's URI and its type to the array
        newDocs.push({ link: (copyResult as TODO).localUri, isPdf })
      }

      callback(newDocs)
    }
  } catch (err) {
    console.error("Error picking documents:", err)
  }
}

export const unLinkDocuments = async (links: string[]) => {
  for (const item of links) {
    const exist = await RNFS.exists(item)

    if(exist) await RNFS.unlink(item)
  }
}