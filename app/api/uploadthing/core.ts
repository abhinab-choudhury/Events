import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
const authSession = async (request: NextRequest) => {
  return await getToken({ req: request });
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      try {
        const user = await authSession(req);
        if (!user) throw new UploadThingError("Unauthorized");

        return { userId: user.id };
      } catch (error) {
        console.error("Upload middleware error:", error);
        throw new UploadThingError("Session validation failed");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
       
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
