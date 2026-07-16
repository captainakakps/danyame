import config from "@/payload.config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

await payload.updateGlobal({
  slug: "home-page",
  data: {
    galleryUseCmsGallery: false,
  },
  overrideAccess: true,
});

console.log("Home page gallery set to manual picks (galleryUseCmsGallery: false).");
process.exit(0);
