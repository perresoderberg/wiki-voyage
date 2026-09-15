import { useTheme, type Theme } from "../context/ThemeContext";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  function handleChange(value: string) {
    setTheme(value as Theme);
  }

  return (
    <select
      value={theme}
      onChange={(event) => handleChange(event.target.value)}
      className="rounded-xl border border-primary px-2 py-1 text-sm text-text bg-header"
    >
      <option value="default">Default</option>
      <option value="forest">Forest</option>
      <option value="ocean">Ocean</option>
      <option value="sunset">Sunset</option>
      <option value="lavender">Lavender</option>
      <option value="library">Library</option>
      <option value="desert">Desert</option>
      <option value="matrix">Matrix</option>
      <option value="space">Space</option>
      <option value="synthwave">Synthwave</option>
      <option value="mono">Monochrome</option>
    </select>
  );
}
