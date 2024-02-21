import Image from 'next/image';
import { Button } from "@/app/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 ">
      <section className="min-h-screen w-full py-12 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Basic</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$29</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    720p Video Rendering
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    2GB Cloud Storage
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Basic Video Templates
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
              <div>
                <h3 className="text-2xl font-bold text-center">Enterprise</h3>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$99</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    4K Video Rendering
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Unlimited Cloud Storage
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Custom Video Templates
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Advanced Collaboration Tools
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Dedicated Support
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckIcon(props) {
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