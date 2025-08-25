import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface MessageType {
  message: string;
}

const App = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const { register, reset, handleSubmit } = useForm<MessageType>();

  const sendMessage = ({ message }: MessageType) => {
    console.log(message);
    socket?.send(message);
    reset();
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  return (
    <div className="md:w-1/4 w-full py-4 px-6">
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          className="border border-black p-2 outline-none focus:outline-none focus:ring-2 focus:border-none focus:ring-sky-400"
          placeholder="Message..."
          {...register("message")}
          required
        />
        <button type="submit" className="bg-sky-400 p-2 text-white rounded-md">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default App;
