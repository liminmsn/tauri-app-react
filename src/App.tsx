import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button, Input } from "antd";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="w-full h-full p-1">
      <div className="w-40 mb-1">
        <Input onInput={(e) => setName((e.target as HTMLInputElement)['value'])} />
      </div>
      <Button type={"primary"} onClick={greet}>Send</Button>
      {greetMsg}
    </main>
  );
}

export default App;
