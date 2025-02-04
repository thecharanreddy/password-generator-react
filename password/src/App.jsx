import { useCallback, useState, useRef, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numsAllowed, setNumsAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numsAllowed) str += "0123456789";
    if (symbolsAllowed) str += "!@#$%^&*()_+-=?/~`[]{}\\|<>,.";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numsAllowed, symbolsAllowed, length]);

  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numsAllowed, symbolsAllowed, passwordGenerator]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-blue-900"
      }`}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } p-6 rounded-2xl shadow-lg max-w-md w-full text-center`}
      >
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-pink-500" : "text-blue-600"
          }`}
        >
          Password Generator
        </h1>

        <div
          className={`${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } flex items-center mt-4 p-2 rounded-lg`}
        >
          <input
            type="text"
            className="w-full bg-transparent text-lg px-2 outline-none"
            placeholder="Your Password"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className={`ml-2 px-4 py-2 ${
              isDarkMode
                ? "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
                : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            } text-white rounded-lg transition duration-200`}
            onClick={copyToClipboard}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="mt-4 flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-lg">Length: {length}</label>
            <input
              type="range"
              className={`w-2/3 ${isDarkMode ? "accent-pink-500" : "accent-blue-500"}`}
              min="4"
              max="20"
              step="1"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg">Include Numbers</label>
            <input
              type="checkbox"
              className={`w-5 h-5 ${isDarkMode ? "accent-pink-500" : "accent-blue-500"}`}
              checked={numsAllowed}
              onChange={() => setNumsAllowed((prev) => !prev)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg">Include Symbols</label>
            <input
              type="checkbox"
              className={`w-5 h-5 ${isDarkMode ? "accent-pink-500" : "accent-blue-500"}`}
              checked={symbolsAllowed}
              onChange={() => setSymbolsAllowed((prev) => !prev)}
            />
          </div>
        </div>

        <button
          className={`w-full mt-5 px-4 py-2 ${
            isDarkMode
              ? "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          } text-white rounded-lg transition duration-200`}
          onClick={passwordGenerator}
        >
          Generate Password
        </button>

        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setIsDarkMode((prev) => !prev)} // Toggle mode
        >
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
}

export default App;
