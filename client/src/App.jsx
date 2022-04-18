import "./App.css";

import { Auth, ChannelContainer, ChannelListContainer } from "./components";

import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";

const cookies = new Cookies();
const authToken = cookies.get("token");
const client = StreamChat.getInstance(process.env.REACT_STREAM_API_KEY);
if (authToken) {
	client.connectUser(
		{
			id: cookies.get("userId"),
			name: cookies.get("username"),
			fullName: cookies.get("fullName"),
			phoneNumber: cookies.get("phoneNumber"),
			image: cookies.get("avatarURL"),
			hashedPassword: cookies.get("hashedPassword"),
		},
		authToken
	);
}
const App = () => {
	if (!authToken) return <Auth />;

	return (
		<div className="app__wrapper">
			<Chat client={client} theme="team light">
				<ChannelListContainer />
				<ChannelContainer />
			</Chat>
		</div>
	);
};

export default App;
