import Image from "next/image";
import { useGetProductReviews } from "../_api/query";

const reviews = [
  {
    id: "1",
    customer: {
      avatar_url: "https://randomuser.me/api/portraits/med/men/75.jpg",
      display_name: "John Doe",
    },
    rating: 5,
    heading: "Great Product",
    body: "I love this product",
    media: [
      {
        url: "https://via.placeholder.com/150",
        id: "1",
      },
    ],
  },
  {
    id: "2",
    customer: {
      avatar_url: "https://randomuser.me/api/portraits/med/men/75.jpg",
      display_name: "Jane Doe",
    },
    rating: 4,
    heading: "Good Product",
    body: "I like this product",
    media: [
      {
        url: "https://via.placeholder.com/150",
        id: "2",
      },
    ],
  },
];

const Reviews = ({ productId }: { productId: string }) => {
  const { error, isError, isLoading, refetch, reviews } =
    useGetProductReviews(productId);

  if (reviews?.length === 0) return <p>No reviews yet</p>;

  return reviews?.map((review: ReviewType) => (
    <div className="flex flex-col gap-4" key={review._id}>
      {/* USER */}
      <div className="flex items-center gap-4 font-medium">
        <Image
          src={review?.user?.image}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{review.user?.name}</span>
      </div>
      {/* STARS */}
      <div className="flex gap-2">
        {Array.from({ length: review.rating }).map((_, index) => (
          <Image src="/star.png" alt="" key={index} width={16} height={16} />
        ))}
      </div>
      {/* DESC */}
      {review.title && <p>{review.title}</p>}
      {/* <div className="">
        {review.media.map((media: any) => (
          <Image
            src={media.url}
            key={media.id}
            alt=""
            width={100}
            height={50}
            className="object-cover"
          />
        ))}
      </div> */}
    </div>
  ));
};

export default Reviews;
