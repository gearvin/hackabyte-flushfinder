import { Accessibility, Image, Mars, SquarePen, Venus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Modal from '../components/Modal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5300/api';

function ReviewPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [' building', id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/buildings/${id}`, {
        headers: {
          'x-api-key': 'toilet-finder-api-key-hackathon-2025'
        }
      })
      return response.data
    },
    enabled: !!id,
  });

  const { isPending: isPendingReview, isError: isErrorReview, data: reviewData, error: reviewError } = useQuery({
    queryKey: [' reviews', id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/toilets/${id}/reviews`, {
        headers: {
          'x-api-key': 'toilet-finder-api-key-hackathon-2025'
        }
      })
      return response.data
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data && reviewData) {
      console.log(data)
      console.log(reviewData)
    }
  }, [isPending, data, reviewData])

  if (isPending || isPendingReview) {
    return <span>Loading...</span>
  }

  if (isError || isErrorReview) {
    return <span>Error: {error?.message || reviewError?.message}</span>
  }

  const renderEmoji = (rating) => {
    if (rating >= 4) {
      return "✨🌟"; // Excellent: Sparkling clean, star-worthy
    } else if (rating >= 3) {
      return "👌😎"; // Good: Pretty good, you could live with it
    } else if (rating >= 2) {
      return "🙄🤢"; // Fair: Could be better, but it's still usable
    } else {
      return "💩😭"; // Poor: A nightmare, run away!
    }
  };

  const enumThing = (num) => {
    if (num === 1) return "Disabled";
    if (num === 2) return "Female";
    if (num === 3) return "Male";
  }
  

  return (
    <div className="flex-1 ml-14 md:ml-20">
      <div className="relative mx-auto max-w-4xl px-8">
        {/* holder */}
        <div
          className="absolute w-full h-20 bg-gray-700 top-[250px] left-0 z-0 rounded-xl"
        ></div>

        {/* roll */}
        <div className="relative z-10 flex flex-col divide-y-5 divide-dashed divide-gray-300 shadow-2xl rounded-t-4xl">
          {/* info */}
          <div className="min-h-[400px] bg-gradient-to-t from-gray-100 to-gray-200 rounded-t-4xl rounded-b-sm pt-18 px-14 pb-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold italic font-serif text-[#8E562E]">{data.name}</h1>
              <div className="relative w-[99px]">
                <span className="absolute text-gray-300 text-xl">★★★★★</span>
                <span
                  className="absolute text-yellow-700 text-xl overflow-hidden"
                  style={{ width: `${(data.average_overall / 5) * 100}%` }}
                >
                  ★★★★★
                </span>
              </div>
              <div className="flex mt-7 divide-x-2 divide-gray-300 text text-gray-600">
                <div className="flex items-center gap-1 pr-2">
                  <span>{data.unisex_toilet_count}</span>
                  <Accessibility className="text-gray-600" size={20} />
                </div>

                <div className="flex items-center gap-1 px-2">
                  <span>{data.male_toilets_count}</span>
                  <Mars className="text-blue-300" size={20} />
                </div>

                <div className="flex items-center gap-1 pl-2">
                  <span>{data.female_toilets_count}</span>
                  <Venus className="text-pink-300" size={20} />
                </div>
              </div>

              {/* <div className="flex h-[200px] gap-4 mt-4">
                <div className="flex-1 rounded-sm bg-gray-300 flex justify-center items-center">
                  <Image />
                </div>
                <div className="flex-1 rounded-sm bg-gray-300 flex justify-center items-center">
                  <Image />
                </div>
                <div className="flex-1 rounded-sm bg-gray-300 flex justify-center items-center">
                  <Image />
                </div>
              </div> */}
              
              <div className="flex justify-evenly mt-5 space-x-8">
                <div className="flex flex-col items-center">
                  <p className="font-medium text-gray-500 text-lg">Cleanliness</p>
                  <div className="flex items-center">
                    <p className="font-semibold text-xl text-[#8E562E]">{Math.round(data.average_cleanliness * 100) / 100} / 5</p>
                    <span className="ml-2">{renderEmoji(data.average_cleanliness)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <p className="font-medium text-gray-500 text-lg">Accessibility</p>
                  <div className="flex items-center">
                    <p className="font-semibold text-xl text-[#8E562E]">{Math.round(data.average_accessibility * 100) / 100} / 5</p>
                    <span className="ml-2">{renderEmoji(data.average_accessibility)}</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="flex items-center gap-4">
              <p className="text-xl font-serif font-semibold italic">Reviews ({data.reviews_count})</p>
              <select className="flex-1 h-10 p-2 border rounded-xl border-gray-400 outline-[#8E562E] bg-white">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
              <button
                role='button'
                className="font-medium h-10 px-4 rounded-xl text-white bg-[#8E562E] flex gap-2 justify-center items-center hover:bg-amber-900 hover:cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <SquarePen />
                <span>
                  Leave a review!
                </span>
              </button>
              
            </div>
          </div>

          {/* reviews */}
          {reviewData.map(review => (
            <div className="min-h-[200px] bg-gray-100 px-14 flex flex-col py-5 justify-between gap-5">
              <div>
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">{review.title}</h2>
                  <div className="relative w-[99px]">
                  <span className="absolute text-gray-300 text-xl">★★★★★</span>
                  <span
                    className="absolute text-yellow-700 text-xl overflow-hidden"
                    style={{ width: `${(review.overall_rating / 5) * 100}%` }}
                  >
                    ★★★★★
                  </span>
                </div>
                </div>
                <p className='text-sm text-gray-500'>Cleanliness: {review.cleanliness_rating}</p>
                <p className='text-sm text-gray-500'>Accessibility: {review.accessibility_rating}</p>
                <p className='text-sm text-gray-500'>Overall: {review.overall_rating}</p>
                <p className='text-sm text-gray-500'>Gender: {enumThing(review.type)}</p>
                <p className='mt-2 text-lg'>{review.comment}</p>
                
              </div>
              <div>
                <p className="text-sm font-semibold">Author: {review.reviewer_nickname}</p>
                <p className="text-sm text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
          <div className="min-h-[200px] bg-gradient-to-b from-gray-100 to-gray-200"></div>

        </div>
      </div>
      <Modal
        id={Number(id)}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export default ReviewPage;
