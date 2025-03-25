import { Accessibility, Image, Mars, Venus } from 'lucide-react';
import { useParams } from 'react-router';

function ReviewPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex-1 ml-14 md:ml-20">
      <div className="relative mx-auto max-w-3xl px-6">
        {/* holder */}
        <div
          className="absolute w-full h-14 bg-gray-700 top-[250px] left-0 z-0 rounded-xl"
        ></div>

        {/* roll */}
        <div className="relative z-10 flex flex-col divide-y-5 divide-dashed divide-gray-300 shadow-2xl rounded-t-4xl">
          {/* info */}
          <div className="min-h-[400px] bg-gradient-to-t from-gray-100 to-gray-200 rounded-t-4xl rounded-b-sm pt-18 px-14 pb-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold italic font-serif text-[#8E562E]">Law Building (F8)</h1>
              <div className="relative w-[99px]">
                <span className="absolute text-gray-300 text-xl">★★★★★</span>
                <span
                  className="absolute text-yellow-700 text-xl overflow-hidden"
                  style={{ width: `${(4.5 / 5) * 100}%` }}
                >
                  ★★★★★
                </span>
              </div>
              <div className="flex mt-7 divide-x-2 divide-gray-300 text text-gray-600">
                <div className="flex items-center gap-1 pr-2">
                  <span>2</span>
                  <Accessibility className="text-gray-600 text-xl" />
                </div>

                <div className="flex items-center gap-1 px-2">
                  <span>3</span>
                  <Mars className="text-blue-300 text-xl" />
                </div>

                <div className="flex items-center gap-1 pl-2">
                  <span>3</span>
                  <Venus className="text-pink-300 text-xl" />
                </div>
              </div>

              <div className="flex h-[200px] gap-4 mt-4">
                <div className="flex-1 rounded-sm bg-gray-300 flex justify-center items-center">
                  <Image />
                </div>
                <div className="flex-1 rounded-sm bg-gray-300 flex justify-center items-center">
                  <Image />
                </div>
                <div className="flex-1 rounded-sm bg-gray-300 flex justify-center items-center">
                  <Image />
                </div>
              </div>
            </div>
            <p className="text-xl font-serif font-semibold italic">Reviews (24)</p>
          </div>

          {/* reviews */}
          <div className="min-h-[200px] bg-gray-100 px-14 flex flex-col py-5 justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold">This place sucks 0/10</h2>
              <p>Idk but everyone takes hours in the law toilets. Like r y’all doing some mock debate in the toilets ffs. Get the f out. Not to mention people always shit on men for not knowing how to aim, low key in the female law bathroom some specimen literally shat on the floor. Like how the f did u miss that.</p>
            </div>
            <div>
              <p className="font-semibold">Anonymous</p>
              <p className="text-sm text-gray-400">12 Oct 2024</p>
            </div>
          </div>
          <div className="min-h-[200px] bg-gray-100"></div>
          <div className="min-h-[200px] bg-gray-100"></div>
          <div className="min-h-[200px] bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
