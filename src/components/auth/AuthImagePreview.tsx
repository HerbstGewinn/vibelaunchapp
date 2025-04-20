
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AuthImagePreviewProps {
  imageUrl: string;
  title: string;
}

const AuthImagePreview = ({ imageUrl, title }: AuthImagePreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer transition-transform hover:scale-[1.02]">
          <AspectRatio ratio={16/9}>
            <img 
              src={imageUrl} 
              alt={title}
              className="rounded-md object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-launch-dark border-gray-800">
        <div className="relative w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full rounded-lg object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthImagePreview;
