const Heading = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {title && <h2 className="h2">{title}</h2>}
      {text && <p className="mt-4 body-2 text-n-4">{text}</p>}
    </div>
  );
};

export default Heading;
