import React, { useState } from "react";
import type { ChatMessage } from "../hooks/useWebSocket";

interface Props {
	sendMessage: (message: Omit<ChatMessage, "room_name" | "user_name">) => void;
}

const MessageInput: React.FC<Props> = ({ sendMessage }) => {
	const [message, setMessage] = useState("");
	const [color, setColor] = useState("#0000ff");

	const handleSend = () => {
		if (!message.trim()) return;

		// メッセージ送信
		sendMessage({
			message,
			color,
		});

		setMessage("");
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="flex flex-col space-y-3">
			<div className="flex space-x-2">
				<input
					type="text"
					placeholder="メッセージを入力"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					className="flex-1 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>

				<button 
					onClick={handleSend}
					disabled={!message.trim()}
					className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
				>
					送信
				</button>
			</div>

			<div className="flex flex-wrap gap-2 items-center">
				<span className="text-sm text-gray-300 mr-2">色を選択:</span>
				
				<label className="flex items-center cursor-pointer">
					<input
						type="radio"
						value="#0000ff"
						checked={color === "#0000ff"}
						onChange={(e) => setColor(e.target.value)}
						className="sr-only"
					/>
					<div className={`w-6 h-6 rounded-full bg-blue-500 border-2 ${color === "#0000ff" ? 'border-white shadow-lg scale-110' : 'border-gray-400'} transition-all duration-200`}></div>
					<span className="ml-1 text-sm text-gray-300">青</span>
				</label>

				<label className="flex items-center cursor-pointer">
					<input
						type="radio"
						value="#ff0000"
						checked={color === "#ff0000"}
						onChange={(e) => setColor(e.target.value)}
						className="sr-only"
					/>
					<div className={`w-6 h-6 rounded-full bg-red-500 border-2 ${color === "#ff0000" ? 'border-white shadow-lg scale-110' : 'border-gray-400'} transition-all duration-200`}></div>
					<span className="ml-1 text-sm text-gray-300">赤</span>
				</label>

				<label className="flex items-center cursor-pointer">
					<input
						type="radio"
						value="#00aa00"
						checked={color === "#00aa00"}
						onChange={(e) => setColor(e.target.value)}
						className="sr-only"
					/>
					<div className={`w-6 h-6 rounded-full bg-green-500 border-2 ${color === "#00aa00" ? 'border-white shadow-lg scale-110' : 'border-gray-400'} transition-all duration-200`}></div>
					<span className="ml-1 text-sm text-gray-300">緑</span>
				</label>
			</div>
		</div>
	);
};

export default MessageInput;
