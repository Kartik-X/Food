const ContactUs = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl m-4">Contact us</h1>
      <form>
        <input
          type="text"
          className="border border-black p-2 m-2 rounded-lg"
          placeholder="Name"
        />
        <input
          type="text"
          className="border border-black p-2 m-2 rounded-lg"
          placeholder="Message"
        />
        <button className="border border-black p-2 m-2 rounded-lg bg-green-300">
          Submit
        </button>
      </form>
    </div>
  );
};
export default ContactUs;
