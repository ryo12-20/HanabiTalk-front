import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/cookie";
import RoomList from "../components/RoomList";
import { fetchRoomList, isUserNameDuplicated, fetchUserId } from "../utils/api";

const LoginPage = () => {
	const [roomName, setRoomName] = useState("");
	const [userName, setUserName] = useState("");
	const navigate = useNavigate();

	const handleEnter = async () => {
		if (!roomName || !userName) {
			alert("ルーム名とユーザー名を入力してください");
			return;
		}

		const rooms = await fetchRoomList();
		const roomExists = rooms.some((r) => r.room_name === roomName);
		if (!roomExists) {
			alert(`「${roomName}」というルームは存在しません`);
			return;
		}

		const isDuplicate = await isUserNameDuplicated(roomName, userName);
		if (isDuplicate) {
			alert(
				`ユーザー名「${userName}」はすでにルーム「${roomName}」に存在します`,
			);
			return;
		}

		// ユーザーUUIDを取得してCookieに保存
		try {
			const userId = await fetchUserId(userName);
			setCookie("user_name", userName);
			setCookie("room_name", roomName);
			setCookie("user_id", userId);
			navigate("/chat");
		} catch (error) {
			alert("ユーザーIDの取得に失敗しました");
		}
	};

	return (
		<div style={{ padding: "2rem" }}>
			<h1>HanabiTalk - ログイン</h1>

			<input
				placeholder="ユーザー名"
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
				style={{ display: "block", margin: "8px 0" }}
			/>

			<input
				placeholder="ルーム名"
				value={roomName}
				onChange={(e) => setRoomName(e.target.value)}
				style={{ display: "block", margin: "8px 0" }}
			/>

			<button onClick={handleEnter}>入室</button>

			<RoomList />
		</div>
	);
};

export default LoginPage;
