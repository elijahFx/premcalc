const Session = require("../models/Session");
const mongoose = require("mongoose");


const addSession = async (req, res) => {
  try {
    const newSessions = req.body;
    
    const addedSessions = [];

    for (const newSession of newSessions) {
      const exists = await Session.findOne({
        name: newSession.name,
        date: newSession.date,
        time: newSession.time,
        user_id: newSession.user_id,
      });

      console.log(`Сессия внутри sessionControllers: ${JSON.stringify(newSession)}`);
      

      if (!exists) {
        const sessionToAdd = new Session(newSession);
        await sessionToAdd.save();
        console.log("МЫ ТУТУ");
        addedSessions.push(sessionToAdd); // Push the saved session
      }
    }

    res.status(200).json({ added: addedSessions });
  } catch (error) {
    console.error("Error adding sessions:", error);
    res.status(500).json({ error: `ЧТО БЛЯТЬ?` });
  }
};

const getSessions = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ err: "Нет такого пользователя" });
  }

  const sessions = await Session.find({ user_id: id }).sort({ createdAt: 1 });
  res.status(200).json(sessions);
};

const deleteSession = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ err: "Нет такого дела" });
  }

  const session = await Session.findOneAndDelete({ _id: id });

  if (!session) {
    return res.status(404).json({ err: "Нет такого дела" });
  }

  res.status(200).json(session);
};

module.exports = {
  addSession,
  getSessions,
  deleteSession,
};
