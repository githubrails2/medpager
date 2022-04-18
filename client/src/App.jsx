import './App.css';

import { Auth, ChannelContainer, ChannelListContainer } from './components';

import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';

const App = () => {
	const cookies = new Cookies();
	const authToken = false;
	if (!authToken) return <Auth/>
	const client = StreamChat.getInstance(process.env.REACT_STREAM_API_KEY);
	return <div className="app__wrapper">
		<Chat client={client} theme="team light">
			<ChannelListContainer />
			<ChannelContainer/>
		</Chat>
	</div>


};

export default App;
