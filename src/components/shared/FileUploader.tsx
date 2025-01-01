import  { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
// import { set } from "react-hook-form";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {

  console.log(mediaUrl);
  
  const [files, setfiles] = useState<File[]>([]);
  const [fileUrl, setfileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setfiles(acceptedFiles);
      fieldChange(acceptedFiles);
      setfileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-r-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div className="flex flex-1 justify-center w-full py-5 lg:py-10">
            <img src={fileUrl} className="file_iploader-img rounded-xl" />
        </div>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/public/assets/icons/file-upload.svg"
            width={96}
            height={77}
          />
          <h2 className="text-light-1 mb-2 mt-4 base-medium">
            Drage your file here
          </h2>
          <p className="text-light-4 small-regular mb-6">SVG,PNG,JPG</p>

          <Button className="shad-button_dark_4 rounded-3xl">
            Select file from your device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
