import Messenger from "../Model/messengerModel";

export const createMess = async (data) => {
  let message = new Messenger(data);
  const mess = await message.save();
  //   console.log(mess);
  return mess;
};
