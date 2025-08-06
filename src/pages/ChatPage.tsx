import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Logout from "../components/Logout";
import FireworkContainer from "../components/FireworkContainer";
import { useWebSocket } from "../hooks/useWebSocket";

const ChatPage = () => {
	const navigate = useNavigate();
	const roomName = getCookie("room_name") || "";
	const userName = getCookie("user_name") || "";
	const userId = getCookie("user_id") || "";
	const fireworkContainerRef = useRef<{ triggerFirework: () => void } | null>(null);

	const { messages, sendMessage } = useWebSocket(roomName, userId);

	useEffect(() => {
		if (!userName || !roomName) {
			navigate("/login");
		}
	}, []);

	const handleSendMessage = (message: any) => {
		// Send the message
		sendMessage(message);
		
		// Trigger firework animation
		triggerFirework();
	};

	const triggerFirework = () => {
		// Add firework to container
		if (fireworkContainerRef.current) {
			fireworkContainerRef.current.triggerFirework();
		}
	};

	return (
		<div className="relative min-h-screen bg-gray-900 text-white">
			<div className="max-w-2xl mx-auto p-4">
				<div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
					<h1 className="text-3xl font-bold text-center mb-4 text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
						チャットページ
					</h1>
					<div className="flex justify-between items-center mb-4 text-sm text-gray-300">
						<p>ユーザー名: <span className="text-blue-400 font-semibold">{userName}</span></p>
						<p>ルーム名: <span className="text-green-400 font-semibold">{roomName}</span></p>
					</div>
					<div className="flex justify-end">
						<Logout />
					</div>
				</div>

				{/* メッセージリスト */}
				<div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
					<MessageList messages={messages} />
				</div>

				{/* 入力欄 */}
				<div className="bg-gray-800 rounded-lg shadow-lg p-4">
					<MessageInput sendMessage={handleSendMessage} />
				</div>
			</div>

			{/* 花火コンテナ */}
			<FireworkContainer ref={fireworkContainerRef} />
		</div>
	);
};

export default ChatPage;
