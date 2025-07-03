import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import ImageUploading from "react-images-uploading";

// return array of uploaded images,  image =>  {data_url: string, file: File}
// data_url: for displaying image at frontend
// file: for passing to backend
const ImageUploader = ({
  multiple = false,
  images = [],
  setImages,
}: {
  multiple?: boolean;
  images: any;
  setImages: any;
}) => {
  const maxNumber = 69;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple={multiple}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className=" relative  w-60 h-60 border flex justify-center items-center rounded-md overflow-hidden"
                >
                  <img
                    src={image?.data_url}
                    alt=""
                    className="w-full h-full object-center object-cover absolute top-0 left-0"
                  />
                  <div className="  w-full h-full  text-white hover:bg-black/20 flex justify-end p-4 items-start gap-3 absolute z-30">
                    <button type="button" onClick={() => onImageUpdate(index)}>
                      <MdEdit
                        className="hover:text-blue-500 transition"
                        size={20}
                      />
                    </button>
                    <button type="button" onClick={() => onImageRemove(index)}>
                      <TiDeleteOutline
                        className="hover:text-primary transition"
                        size={20}
                      />
                    </button>
                  </div>
                </div>
              ))}

              {(multiple || images.length === 0) && (
                <div className=" w-60 h-60 border flex justify-center items-center rounded-md overflow-hidden">
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    type="button"
                    {...dragProps}
                  >
                    <div className="mx-auto w-fit mb-2">
                      <BiImageAdd size={30} />
                    </div>
                    <span className=" text-gray-500 text-sm px-1">
                      Click to add an asset or drag and drop one in this area
                    </span>
                  </button>
                </div>
              )}
            </div>
            {multiple && images.length > 0 && (
              <button
                onClick={onImageRemoveAll}
                className="mt-2 flex items-center hover:underline  "
              >
                <MdDelete size={18} />
                Remove all images
              </button>
            )}
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
