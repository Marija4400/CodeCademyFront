import InfoCircle from "./InfoCircle";

const SearchBar = ({
  searchQuery,
  onSearchChange,
  text = "",
  searchBy,
  position,
  disabled,
}) => {
  const isSmallScreen = window.innerWidth < 768;
  return (
    <div className="flex items-center justify-end lg:w-1/5">
      {/* if the passed value is left, InfoCircle is displayed to the left of the SearchBar */}
      {!isSmallScreen && position === "left" && (
        <InfoCircle type="search" searchBy={searchBy} />
      )}
      {isSmallScreen && position !== "left" && (
        <InfoCircle type="search" searchBy={searchBy} />
      )}
      {isSmallScreen && position === "left" && (
        <InfoCircle type="search" searchBy={searchBy} />
      )}

      <input
        disabled={disabled}
        type="text"
        placeholder={`Pretražite ${text}...`}
        value={searchQuery}
        onChange={onSearchChange}
        className="block w-full px-5 py-3 ml-1 text-white border border-purple-600 rounded-md cursor-pointer bg-opacity-10 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 "
      />
      {position !== "left" && !isSmallScreen && (
        <InfoCircle type="search" searchBy={searchBy} />
      )}
    </div>
  );
};

export default SearchBar;
