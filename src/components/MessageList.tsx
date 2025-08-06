import React, { useEffect, useRef } from "react";
import type { ChatMessage } from "../hooks/useWebSocket";

interface Props {
	messages: ChatMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
	const listRef = useRef<HTMLDivElement>(null);

	// メッセージが増えたらスクロールを一番下に
	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div
			ref={listRef}
			className="h-80 overflow-y-auto border border-gray-600 bg-gray-700 rounded-lg p-4 space-y-2"
		>
			{messages.length === 0 && (
				<p className="text-gray-400 text-center italic">まだメッセージはありません</p>
			)}
			{messages.map((msg, idx) => (
				<div key={idx} className="flex flex-col space-y-1">
					<div className="flex items-center space-x-2">
						<span className="text-sm font-semibold text-blue-300">{msg.user_name}:</span>
						<span className="text-xs text-gray-500">
							{new Date().toLocaleTimeString()}
						</span>
					</div>
					<p 
						style={{ color: msg.color }} 
						className="ml-4 text-base leading-relaxed"
					>
						{msg.message}
					</p>
				</div>
			))}
		</div>
	);
};

export default MessageList;
