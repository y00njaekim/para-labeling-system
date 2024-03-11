import Image from 'next/image';
import { Button } from '@/components/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 ">
      <section className="w-full py-12 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Study 1</h3>
                <div className="w-48 h-48 mx-auto py-5">
                  <Image
                    src="/study1.png"
                    alt="Study1 Image"
                    width={256}
                    height={256}
                    layout="responsive"
                  />
                </div>
                <ul className="mt-8 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-sm font-medium bg-green-500 rounded-full mr-2 p-1" />
                    Text to Text
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  href={{
                    pathname: '/login',
                    query: { study: '1' },
                  }}
                >
                  <Button className="w-full">시작하기</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Study 2</h3>
                <div className="w-48 h-48 mx-auto py-5">
                  <Image
                    src="/study2.png"
                    alt="Study2 Image"
                    width={256}
                    height={256}
                    layout="responsive"
                  />
                </div>
                <ul className="mt-8 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-sm font-medium bg-green-500 rounded-full mr-2 p-1" />
                    Text to Recording
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  className="w-full"
                  href={{
                    pathname: '/login',
                    query: { study: '2' },
                  }}
                >
                  <Button className="w-full">시작하기</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
