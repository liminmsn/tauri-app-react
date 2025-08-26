import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Button, Input } from "antd";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <Input onInput={(e) => setName((e.target as HTMLInputElement)['value'])} />
      <Button type={"primary"} onClick={greet}>{greetMsg}</Button>
    </main>
  );
}

export default App;
