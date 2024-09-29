import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 cent flex-col overflow-y-scroll gap-y-16">
        <section className="w-1/2 h-max bg-indigo-600 text-white text-center shadow-lg">
          <h1 className="text-3xl font-bold">
            Collaborate in Real-Time with DocuFlow
          </h1>
          <p className="text-lg">
            Effortless document sharing and collaboration, anytime, anywhere.
          </p>
        </section>

        <section className="flex flex-col gap-x-32 lg:flex-row items-center justify-between w-max max-w-6xl px-4">
          <div className="flex flex-col w-96 max-w-fit text-center lg:text-left gap-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              Create, Share, and Collaborate Instantly!
            </h2>
            <p className="text-gray-600 text-lg">
              Say goodbye to email attachments and slow document sharing. With
              DocuFlow, you can edit and work together in real-time with your
              team.
            </p>
            <Link
              className="max-w-40 text-center px-6 bg-indigo-600 text-white text-lg rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
              to="/docs"
            >
              Get Started for Free
            </Link>
          </div>
          <div className="flex">
            <img
              src="/fancydocument.jpg"
              alt="document-img"
              className="rounded-lg shadow-lg max-w-80"
            />
          </div>
        </section>

        <section className="w-full max-w-6xl px-4 overflow-scroll grid grid-flow-row gap-y-6">
          <h3 className="text-3xl font-bold text-center text-gray-800">
            Why Choose DocuFlow?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md text-center">
              <svg
                className="w-16 h-16 text-indigo-600 mx-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h4 className="text-xl font-semibold text-gray-800">
                Real-Time Collaboration
              </h4>
              <p className="text-gray-600">
                Edit documents with your team in real-time from anywhere in the
                world.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md text-center">
              <svg
                className="w-16 h-16 text-indigo-600 mx-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-6.9-3.6"
                />
              </svg>
              <h4 className="text-xl font-semibold text-gray-800">
                Secure Cloud Storage
              </h4>
              <p className="text-gray-600">
                All your documents are saved in the cloud, safe and accessible
                24/7.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md text-center">
              <svg
                className="w-16 h-16 text-indigo-600 mx-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h4 className="text-xl font-semibold text-gray-800">
                Easy Sharing
              </h4>
              <p className="text-gray-600">
                Invite others to edit or view your documents with just a link.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl px-4 text-center ">
          <h3 className="text-2xl font-bold text-gray-800">
            Ready to Collaborate?
          </h3>
          <p className="text-gray-600">
            Join thousands of teams and individuals using DocuFlow to boost
            their productivity.
          </p>
          <Link
            to="signup"
            className="px-8 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-500 transition-colors"
          >
            Sign Up Now
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;
