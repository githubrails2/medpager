import { StreamChat } from "stream-chat";
import bcrypt from "bcrypt";
import { connect } from "getstream";
import crypto from "crypto";

const api_key = "ch4wbyccbapj";
const api_secret =
	"y9kdsqh5vav3886quqzs7ucnzfpmpxhdrtfjenkxehb2mc4gmamtushs7h3qzz78";
const app_id = process.env.STREAM_APP_ID;

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, phoneNumber } = req.body;
		const userId = crypto.randomBytes(16).toString("hex");
		const serverClient = connect(api_key, api_secret, app_id);
		const hashedPassword = await bcrypt.hash(password, 10);
		const token = serverClient.createUserToken(userId);
		res
			.status(200)
			.json({ token, fullName, username, userId, hashedPassword, phoneNumber });
	} catch (error) {
		console.log(error);
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const serverClient = connect(api_key, api_secret, app_id);
		const client = StreamChat.getInstance(api_key, api_secret);
		const { users } = await client.queryUsers({ name: username });
		if (!users.length)
			return res.status(400).json({ message: "User not found" });
		const success = await bcrypt.compare(password, users[0].hashedPassword);
		const token = serverClient.createUserToken(users[0].id);
		if (success) {
			res.status(200).json({
				token,
				fullName: users[0].fullName,
				username,
				userId: users[0].id,
			});
		} else {
			res.status(500).json({ message: "Incorrect Password" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error });
	}
};
