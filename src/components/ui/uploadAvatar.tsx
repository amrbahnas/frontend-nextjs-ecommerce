import { Avatar } from "antd";
import { CiCamera } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import ImageUploading from "react-images-uploading";

// return  uploaded image,  image =>  {data_url: string, file: File}
// data_url: for displaying image at frontend
// file: for passing to backend

const UploadAvatar = ({
  image,
  setImage,
}: {
  image: { data_url: string; file: File | undefined };
  setImage: any;
}) => {
  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log("🚀 ~ onChange ~ imageList:", imageList);
    setImage(imageList[0]);
  };

  return (
    <div className="App">
      <ImageUploading
        value={[image]}
        onChange={onChange}
        maxNumber={1}
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
          <div
            {...dragProps}
            className=" relative w-36 h-36 flex justify-center items-center rounded-full border"
          >
            {image?.data_url ? (
              <Avatar
                src={image?.data_url}
                alt="Profile Image"
                className="!w-full !h-full object-center object-cover z-10"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full z-10">
                Click to Upload
              </div>
            )}
            {isDragging ? (
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-40 rounded-full">
                <span className="text-white">Drop Here</span>
              </div>
            ) : (
              <div className=" cursor-pointer w-full h-full text-white bg-black/40  flex  opacity-0 hover:opacity-100 justify-center p-4 items-center absolute z-30 rounded-full gap-2">
                <CiCamera
                  className="hover:text-blue-500 transition"
                  size={20}
                  onClick={() => onImageUpdate(0)}
                />
                {image?.data_url && (
                  <TiDeleteOutline
                    onClick={() => onImageRemove(0)}
                    className="hover:text-primary transition"
                    size={20}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadAvatar;
