export default function App() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white via-purple-800 to-white p-4 md:p-0">
      <h1 className="text-xl font-semibold my-10">
        Welcome! Secure your spot in the ADIS Summit
      </h1>
      <div className="md:w-[500px] bg-white rounded shadow-2xl shadow-black p-4">
        <form>
          <div className="mx-4">
            <label className="mb-2 text-sm font-medium text-[#2d3748]">
              Name
            </label>
            <input
              type="text"
              className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
              required
              //   name="fullname"
              //   value={fullname}
              //   onChange={handleChange}
            />
          </div>
          <div className="m-4">
            <label className="mb-2 text-sm font-medium text-[#2d3748]">
              Email
            </label>
            <input
              type="text"
              className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
              required
              //   name="Department"
              //   value={username}
              //   onChange={handleChange}
            />
          </div>
          <div className="m-4">
            <label className="mb-2 text-sm font-medium text-[#2d3748]">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
              required
              //   name="email"
              //   value={email}
              //   onChange={handleChange}
            />
          </div>
          <div className="m-4">
            <label className="mb-2 text-sm font-medium text-[#2d3748]">
              Country
            </label>
            <input
              type="text"
              className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
              required
              //   name="email"
              //   value={email}
              //   onChange={handleChange}
            />
          </div>
          <div className="m-4">
            <label className="mb-2 text-sm font-medium text-[#2d3748]">
              File
            </label>
            <input
              type="file"
              className="w-full"
              required
              //   name="email"
              //   value={email}
              //   onChange={handleChange}
            />
          </div>
          <div className="m-4">
            <button
              type="submit"
              className="text-center p-3 text-white text-lg font-bold bg-purple-600 w-full h-[48px] border rounded-[5px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
