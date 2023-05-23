import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <>
        {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}
        <section className="relative bg-[url(https://plus.unsplash.com/premium_photo-1683309563255-fef9e541cdec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l" />
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Welcome to our powerful
                <strong className="block font-extrabold text-gray-700">
                  and intuitive To-Do App,
                </strong>
              </h1>
              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                Unlock the potential of your productivity as we guide you
                through organizing your tasks and achieving your goals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <Link
                  to="Task"
                  className="block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-gray-700 focus:outline-none focus:ring active:bg-gray-500 sm:w-auto"
                >
                  To Do App
                </Link>
                <Link
                  to="About"
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

export default Hero;
