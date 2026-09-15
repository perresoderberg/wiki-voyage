import logo from "../../assets/logo.png";

export function Logo() {
  return (
    <>
      <span className="flex items-center text-xl font-semibold text-text">
        <img src={logo} alt="WikiVoyage" className="h-7 w-7" />
        ikiVoyage
      </span>
    </>
  );
}
