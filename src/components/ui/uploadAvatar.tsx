import { Avatar } from "antd";
import { CiCamera } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
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
          <>
            {imageList.map((image, index) => (
              <div
                key={index}
                className=" relative w-fit flex justify-center items-center rounded-full border"
              >
                <Avatar
                  src={image?.data_url || "./profile.png"}
                  alt=""
                  size={100}
                  className="w-full h-full object-center object-cover z-10"
                />
                <div className=" w-full h-full text-white bg-black/40  flex  opacity-0 hover:opacity-100 justify-center p-4 items-center absolute z-30 rounded-full">
                  <button type="button" onClick={() => onImageUpdate(index)}>
                    <CiCamera
                      className="hover:text-blue-500 transition"
                      size={20}
                    />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadAvatar;
