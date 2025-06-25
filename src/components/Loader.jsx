const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-16 h-16 border-4 border-purple-500 rounded-full border-t-pink-400 animate-spin"></div>
    </div>
  );
};

export default Loader;
